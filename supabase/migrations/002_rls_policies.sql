-- ==============================================================================
-- 002_rls_policies.sql
-- POLÍTICAS DE ROW LEVEL SECURITY (RLS) Y FUNCIONES RPC SEGURAS
-- ==============================================================================

-- 1. HABILITAR RLS EN TODAS LAS TABLAS
ALTER TABLE public.weddings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wedding_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.guests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rsvp_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tables ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.table_assignments ENABLE ROW LEVEL SECURITY;

-- 2. POLÍTICAS PARA ADMINISTRADORES AUTENTICADOS (FULL ACCESS)
CREATE POLICY "Admins have full access to weddings"
    ON public.weddings FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Admins have full access to wedding_settings"
    ON public.wedding_settings FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Admins have full access to invitations"
    ON public.invitations FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Admins have full access to guests"
    ON public.guests FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Admins have full access to rsvp_responses"
    ON public.rsvp_responses FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Admins have full access to tables"
    ON public.tables FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Admins have full access to table_assignments"
    ON public.table_assignments FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- 3. POLÍTICAS DE LECTURA PÚBLICA (ANON) PARA BODA Y CONFIGURACIÓN ACTIVA
CREATE POLICY "Public can view active weddings"
    ON public.weddings FOR SELECT
    TO anon
    USING (is_active = true);

CREATE POLICY "Public can view settings of active weddings"
    ON public.wedding_settings FOR SELECT
    TO anon
    USING (
        EXISTS (
            SELECT 1 FROM public.weddings w
            WHERE w.id = wedding_settings.wedding_id AND w.is_active = true
        )
    );

-- 4. FUNCIÓN RPC: OBTENER INVITACIÓN COMPLETA POR TOKEN SEGURO
-- Permite que el invitado consulte sus datos, invitados autorizados, su estado de RSVP
-- y su mesa asignada SIN exponer datos de otros invitados.
CREATE OR REPLACE FUNCTION public.get_invitation_by_token(p_token TEXT)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_invitation RECORD;
    v_guests JSONB;
    v_wedding RECORD;
    v_settings RECORD;
    v_table_info JSONB;
BEGIN
    -- Validar token e invitación activa
    SELECT * INTO v_invitation
    FROM public.invitations
    WHERE token = p_token AND is_active = true;

    IF NOT FOUND THEN
        RETURN jsonb_build_object('success', false, 'error', 'Invitación no encontrada o inactiva');
    END IF;

    -- Obtener datos de la boda
    SELECT * INTO v_wedding
    FROM public.weddings
    WHERE id = v_invitation.wedding_id AND is_active = true;

    IF NOT FOUND THEN
        RETURN jsonb_build_object('success', false, 'error', 'Boda no encontrada');
    END IF;

    -- Obtener configuración de la boda
    SELECT * INTO v_settings
    FROM public.wedding_settings
    WHERE wedding_id = v_invitation.wedding_id;

    -- Obtener invitados con sus respuestas RSVP
    SELECT jsonb_agg(
        jsonb_build_object(
            'id', g.id,
            'full_name', g.full_name,
            'rsvp_status', COALESCE(r.status, 'pending'),
            'dietary_notes', r.dietary_notes,
            'table_id', ta.table_id,
            'table_name', t.name
        ) ORDER BY g.created_at ASC
    ) INTO v_guests
    FROM public.guests g
    LEFT JOIN public.rsvp_responses r ON r.guest_id = g.id
    LEFT JOIN public.table_assignments ta ON ta.guest_id = g.id
    LEFT JOIN public.tables t ON t.id = ta.table_id
    WHERE g.invitation_id = v_invitation.id;

    -- Identificar si hay mesa asignada para el grupo
    SELECT jsonb_build_object(
        'table_id', t.id,
        'table_name', t.name,
        'capacity', t.capacity,
        'position_x', t.position_x,
        'position_y', t.position_y
    ) INTO v_table_info
    FROM public.guests g
    JOIN public.table_assignments ta ON ta.guest_id = g.id
    JOIN public.tables t ON t.id = ta.table_id
    WHERE g.invitation_id = v_invitation.id
    LIMIT 1;

    RETURN jsonb_build_object(
        'success', true,
        'invitation', jsonb_build_object(
            'id', v_invitation.id,
            'token', v_invitation.token,
            'recipient_name', v_invitation.recipient_name,
            'authorized_count', v_invitation.authorized_count
        ),
        'wedding', to_jsonb(v_wedding),
        'settings', to_jsonb(v_settings),
        'guests', COALESCE(v_guests, '[]'::jsonb),
        'assigned_table', v_table_info
    );
END;
$$;

-- 5. FUNCIÓN RPC: ENVIAR RESPUESTA RSVP DE FORMA SEGURA
CREATE OR REPLACE FUNCTION public.submit_rsvp_response(
    p_token TEXT,
    p_guest_id UUID,
    p_status TEXT,
    p_dietary_notes TEXT DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_invitation RECORD;
    v_settings RECORD;
    v_valid_guest BOOLEAN;
BEGIN
    -- Validar estado permitido
    IF p_status NOT IN ('confirmed', 'declined') THEN
        RETURN jsonb_build_object('success', false, 'error', 'Estado RSVP no válido');
    END IF;

    -- Validar token
    SELECT * INTO v_invitation
    FROM public.invitations
    WHERE token = p_token AND is_active = true;

    IF NOT FOUND THEN
        RETURN jsonb_build_object('success', false, 'error', 'Invitación no válida');
    END IF;

    -- Validar pertenencia del invitado a la invitación
    SELECT EXISTS (
        SELECT 1 FROM public.guests
        WHERE id = p_guest_id AND invitation_id = v_invitation.id
    ) INTO v_valid_guest;

    IF NOT v_valid_guest THEN
        RETURN jsonb_build_object('success', false, 'error', 'El invitado no pertenece a esta invitación');
    END IF;

    -- Validar fecha límite de RSVP
    SELECT * INTO v_settings
    FROM public.wedding_settings
    WHERE wedding_id = v_invitation.wedding_id;

    IF v_settings.rsvp_deadline IS NOT NULL AND now() > v_settings.rsvp_deadline THEN
        RETURN jsonb_build_object('success', false, 'error', 'El plazo para confirmar asistencia ha expirado');
    END IF;

    -- Insertar o actualizar confirmación
    INSERT INTO public.rsvp_responses (guest_id, status, dietary_notes, updated_at)
    VALUES (p_guest_id, p_status, p_dietary_notes, timezone('utc', now()))
    ON CONFLICT (guest_id)
    DO UPDATE SET
        status = EXCLUDED.status,
        dietary_notes = EXCLUDED.dietary_notes,
        updated_at = timezone('utc', now());

    RETURN jsonb_build_object('success', true, 'message', 'Confirmación guardada correctamente');
END;
$$;
