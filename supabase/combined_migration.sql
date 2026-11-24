-- ==============================================================================
-- MIGRACIÓN COMPLETA UNIFICADA: WEDDING INVITATION MANAGER
-- Copia y pega todo este script en el SQL Editor de Supabase y presiona "Run"
-- ==============================================================================

-- 1. EXTENSIONES
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. TABLAS BASE
CREATE TABLE IF NOT EXISTS public.weddings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT NOT NULL UNIQUE DEFAULT 'daren-fabiola',
    groom_name TEXT NOT NULL,
    bride_name TEXT NOT NULL,
    monogram TEXT NOT NULL DEFAULT 'D & F',
    wedding_date TIMESTAMPTZ NOT NULL,
    timezone TEXT NOT NULL DEFAULT 'America/Managua',
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

CREATE TABLE IF NOT EXISTS public.wedding_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    wedding_id UUID NOT NULL REFERENCES public.weddings(id) ON DELETE CASCADE,
    ceremony_time TEXT NOT NULL DEFAULT '5:00 p. m.',
    ceremony_venue TEXT NOT NULL DEFAULT '[Nombre de la iglesia]',
    ceremony_description TEXT DEFAULT 'Ante Dios y nuestros seres queridos, daremos el sí que unirá nuestras vidas.',
    ceremony_maps_url TEXT DEFAULT '',
    reception_time TEXT NOT NULL DEFAULT '7:00 p. m.',
    reception_venue TEXT NOT NULL DEFAULT '[Nombre del restaurante]',
    reception_description TEXT DEFAULT 'Te esperamos para compartir una velada llena de amor y alegría.',
    reception_maps_url TEXT DEFAULT '',
    dresscode_title TEXT NOT NULL DEFAULT 'Una noche de elegancia',
    dresscode_subtitle TEXT NOT NULL DEFAULT 'Vestimenta formal',
    dresscode_description TEXT NOT NULL DEFAULT 'Nos encantaría que nos acompañaras luciendo tu mejor atuendo para celebrar juntos una noche llena de amor, alegría y elegancia.',
    restricted_colors JSONB NOT NULL DEFAULT '[{"name":"Verde","color":"#2D6A4F"},{"name":"Negro","color":"#111111"},{"name":"Blanco","color":"#FFFFFF"},{"name":"Beige","color":"#D4B996"}]'::jsonb,
    special_adults_title TEXT NOT NULL DEFAULT 'Una velada solo para adultos',
    special_adults_text TEXT NOT NULL DEFAULT 'Aunque los pequeños ocupan un lugar especial en nuestros corazones, en esta ocasión hemos preparado una celebración exclusiva para adultos. Agradecemos de corazón tu comprensión.',
    special_envelope_title TEXT NOT NULL DEFAULT 'Lluvia de sobres',
    special_envelope_text TEXT NOT NULL DEFAULT 'Tu presencia es nuestro mejor regalo. Si deseas tener un detalle con nosotros, agradeceremos una contribución monetaria en lugar de regalos materiales. Durante la recepción encontrarás sobres y un buzón especialmente preparado para esta ocasión.',
    primary_color TEXT NOT NULL DEFAULT '#10243B',
    gold_color TEXT NOT NULL DEFAULT '#C8A569',
    white_color TEXT NOT NULL DEFAULT '#FFFFFF',
    music_url TEXT DEFAULT '/audio/ambient-romance.mp3',
    rsvp_deadline TIMESTAMPTZ DEFAULT '2026-11-19T23:59:59-06:00',
    allow_rsvp_updates BOOLEAN NOT NULL DEFAULT true,
    whatsapp_template TEXT NOT NULL DEFAULT '¡Hola {destinatario}! Con mucha emoción te compartimos nuestra invitación a nuestra boda: {enlace}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
    CONSTRAINT uq_wedding_settings_wedding_id UNIQUE (wedding_id)
);

CREATE TABLE IF NOT EXISTS public.invitations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    wedding_id UUID NOT NULL REFERENCES public.weddings(id) ON DELETE CASCADE,
    token TEXT NOT NULL UNIQUE,
    recipient_name TEXT NOT NULL,
    authorized_count INTEGER NOT NULL DEFAULT 1 CHECK (authorized_count >= 1),
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

CREATE TABLE IF NOT EXISTS public.guests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    invitation_id UUID NOT NULL REFERENCES public.invitations(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

CREATE TABLE IF NOT EXISTS public.rsvp_responses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    guest_id UUID NOT NULL REFERENCES public.guests(id) ON DELETE CASCADE,
    status TEXT NOT NULL CHECK (status IN ('confirmed', 'declined', 'pending')) DEFAULT 'pending',
    dietary_notes TEXT,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
    CONSTRAINT uq_rsvp_responses_guest_id UNIQUE (guest_id)
);

CREATE TABLE IF NOT EXISTS public.tables (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    wedding_id UUID NOT NULL REFERENCES public.weddings(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    capacity INTEGER NOT NULL DEFAULT 8 CHECK (capacity > 0),
    position_x NUMERIC NOT NULL DEFAULT 0,
    position_y NUMERIC NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

CREATE TABLE IF NOT EXISTS public.table_assignments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    table_id UUID NOT NULL REFERENCES public.tables(id) ON DELETE CASCADE,
    guest_id UUID NOT NULL REFERENCES public.guests(id) ON DELETE CASCADE,
    assigned_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
    CONSTRAINT uq_table_assignments_guest_id UNIQUE (guest_id)
);

-- 3. ÍNDICES
CREATE INDEX IF NOT EXISTS idx_invitations_token ON public.invitations(token);
CREATE INDEX IF NOT EXISTS idx_invitations_wedding_id ON public.invitations(wedding_id);
CREATE INDEX IF NOT EXISTS idx_guests_invitation_id ON public.guests(invitation_id);
CREATE INDEX IF NOT EXISTS idx_rsvp_responses_guest_id ON public.rsvp_responses(guest_id);
CREATE INDEX IF NOT EXISTS idx_tables_wedding_id ON public.tables(wedding_id);
CREATE INDEX IF NOT EXISTS idx_table_assignments_table_id ON public.table_assignments(table_id);
CREATE INDEX IF NOT EXISTS idx_table_assignments_guest_id ON public.table_assignments(guest_id);

-- 4. SEGURIDAD ROW LEVEL SECURITY (RLS)
ALTER TABLE public.weddings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wedding_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.guests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rsvp_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tables ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.table_assignments ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admins have full access to weddings') THEN
        CREATE POLICY "Admins have full access to weddings" ON public.weddings FOR ALL TO authenticated USING (true) WITH CHECK (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admins have full access to wedding_settings') THEN
        CREATE POLICY "Admins have full access to wedding_settings" ON public.wedding_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admins have full access to invitations') THEN
        CREATE POLICY "Admins have full access to invitations" ON public.invitations FOR ALL TO authenticated USING (true) WITH CHECK (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admins have full access to guests') THEN
        CREATE POLICY "Admins have full access to guests" ON public.guests FOR ALL TO authenticated USING (true) WITH CHECK (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admins have full access to rsvp_responses') THEN
        CREATE POLICY "Admins have full access to rsvp_responses" ON public.rsvp_responses FOR ALL TO authenticated USING (true) WITH CHECK (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admins have full access to tables') THEN
        CREATE POLICY "Admins have full access to tables" ON public.tables FOR ALL TO authenticated USING (true) WITH CHECK (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admins have full access to table_assignments') THEN
        CREATE POLICY "Admins have full access to table_assignments" ON public.table_assignments FOR ALL TO authenticated USING (true) WITH CHECK (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public can view active weddings') THEN
        CREATE POLICY "Public can view active weddings" ON public.weddings FOR SELECT TO anon USING (is_active = true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public can view settings of active weddings') THEN
        CREATE POLICY "Public can view settings of active weddings" ON public.wedding_settings FOR SELECT TO anon USING (
            EXISTS (SELECT 1 FROM public.weddings w WHERE w.id = wedding_settings.wedding_id AND w.is_active = true)
        );
    END IF;
END $$;

-- 5. FUNCIONES RPC SEGURAS
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
    SELECT * INTO v_invitation
    FROM public.invitations
    WHERE token = p_token AND is_active = true;

    IF NOT FOUND THEN
        RETURN jsonb_build_object('success', false, 'error', 'Invitación no encontrada o inactiva');
    END IF;

    SELECT * INTO v_wedding
    FROM public.weddings
    WHERE id = v_invitation.wedding_id AND is_active = true;

    IF NOT FOUND THEN
        RETURN jsonb_build_object('success', false, 'error', 'Boda no encontrada');
    END IF;

    SELECT * INTO v_settings
    FROM public.wedding_settings
    WHERE wedding_id = v_invitation.wedding_id;

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
    IF p_status NOT IN ('confirmed', 'declined') THEN
        RETURN jsonb_build_object('success', false, 'error', 'Estado RSVP no válido');
    END IF;

    SELECT * INTO v_invitation
    FROM public.invitations
    WHERE token = p_token AND is_active = true;

    IF NOT FOUND THEN
        RETURN jsonb_build_object('success', false, 'error', 'Invitación no válida');
    END IF;

    SELECT EXISTS (
        SELECT 1 FROM public.guests
        WHERE id = p_guest_id AND invitation_id = v_invitation.id
    ) INTO v_valid_guest;

    IF NOT v_valid_guest THEN
        RETURN jsonb_build_object('success', false, 'error', 'El invitado no pertenece a esta invitación');
    END IF;

    SELECT * INTO v_settings
    FROM public.wedding_settings
    WHERE wedding_id = v_invitation.wedding_id;

    IF v_settings.rsvp_deadline IS NOT NULL AND now() > v_settings.rsvp_deadline THEN
        RETURN jsonb_build_object('success', false, 'error', 'El plazo para confirmar asistencia ha expirado');
    END IF;

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

-- 6. DATOS SEMILLA: DAREN & FABIOLA + MESAS + INVITACIONES DE MUESTRA
DO $$
DECLARE
    v_wedding_id UUID;
    v_inv_daren UUID;
    v_inv_jill UUID;
    v_inv_mama UUID;
    v_inv_jackson UUID;
    v_g1 UUID;
    v_g2 UUID;
    v_g3 UUID;
    v_g4 UUID;
    v_g5 UUID;
    v_g6 UUID;
    v_g7 UUID;
    v_g8 UUID;
    v_tbl_honor UUID;
    v_tbl_1 UUID;
    v_tbl_2 UUID;
    v_tbl_3 UUID;
BEGIN
    INSERT INTO public.weddings (
        slug, groom_name, bride_name, monogram, wedding_date, timezone, is_active
    ) VALUES (
        'daren-fabiola',
        'Daren',
        'Fabiola',
        'D & F',
        '2026-12-19 17:00:00-06'::timestamptz,
        'America/Managua',
        true
    )
    ON CONFLICT (slug) DO UPDATE
    SET groom_name = EXCLUDED.groom_name,
        bride_name = EXCLUDED.bride_name
    RETURNING id INTO v_wedding_id;

    INSERT INTO public.wedding_settings (
        wedding_id,
        ceremony_time,
        ceremony_venue,
        ceremony_description,
        ceremony_maps_url,
        reception_time,
        reception_venue,
        reception_description,
        reception_maps_url,
        dresscode_title,
        dresscode_subtitle,
        dresscode_description,
        restricted_colors,
        special_adults_title,
        special_adults_text,
        special_envelope_title,
        special_envelope_text,
        primary_color,
        gold_color,
        white_color,
        music_url,
        rsvp_deadline,
        allow_rsvp_updates,
        whatsapp_template
    ) VALUES (
        v_wedding_id,
        '5:00 p. m.',
        '[Nombre de la iglesia]',
        'Ante Dios y nuestros seres queridos, daremos el sí que unirá nuestras vidas.',
        'https://maps.google.com',
        '7:00 p. m.',
        '[Nombre del restaurante]',
        'Te esperamos para compartir una velada llena de amor y alegría.',
        'https://maps.google.com',
        'Una noche de elegancia',
        'Vestimenta formal',
        'Nos encantaría que nos acompañaras luciendo tu mejor atuendo para celebrar juntos una noche llena de amor, alegría y elegancia.',
        '[
            {"name":"Verde","color":"#2D6A4F"},
            {"name":"Negro","color":"#111111"},
            {"name":"Blanco","color":"#FFFFFF"},
            {"name":"Beige","color":"#D4B996"}
        ]'::jsonb,
        'Una velada solo para adultos',
        'Aunque los pequeños ocupan un lugar especial en nuestros corazones, en esta ocasión hemos preparado una celebración exclusiva para adultos. Agradecemos de corazón tu comprensión.',
        'Lluvia de sobres',
        'Tu presencia es nuestro mejor regalo. Si deseas tener un detalle con nosotros, agradeceremos una contribución monetaria en lugar de regalos materiales. Durante la recepción encontrarás sobres y un buzón especialmente preparado para esta ocasión.',
        '#10243B',
        '#C8A569',
        '#FFFFFF',
        '/audio/ambient-romance.mp3',
        '2026-11-19 23:59:59-06'::timestamptz,
        true,
        '¡Hola {destinatario}! Con mucha emoción te compartimos nuestra invitación a nuestra boda: {enlace}'
    )
    ON CONFLICT (wedding_id) DO NOTHING;

    -- Mesas
    INSERT INTO public.tables (wedding_id, name, capacity, position_x, position_y)
    VALUES (v_wedding_id, 'Mesa de Honor: D&F', 4, 250, 80)
    RETURNING id INTO v_tbl_honor;

    INSERT INTO public.tables (wedding_id, name, capacity, position_x, position_y)
    VALUES (v_wedding_id, 'Mesa 1: Jazmín Imperial', 8, 120, 220)
    RETURNING id INTO v_tbl_1;

    INSERT INTO public.tables (wedding_id, name, capacity, position_x, position_y)
    VALUES (v_wedding_id, 'Mesa 2: Gardenias de Oro', 8, 380, 220)
    RETURNING id INTO v_tbl_2;

    INSERT INTO public.tables (wedding_id, name, capacity, position_x, position_y)
    VALUES (v_wedding_id, 'Mesa 3: Jardín Real', 8, 250, 340)
    RETURNING id INTO v_tbl_3;

    -- Invitación 1: Daren y Fabiola
    INSERT INTO public.invitations (
        wedding_id, token, recipient_name, authorized_count, is_active
    ) VALUES (
        v_wedding_id,
        'df2026a1b2c3d4e5f60718293a4b5c6d',
        'Daren y Fabiola',
        2,
        true
    ) RETURNING id INTO v_inv_daren;

    INSERT INTO public.guests (invitation_id, full_name) VALUES (v_inv_daren, 'Daren') RETURNING id INTO v_g1;
    INSERT INTO public.guests (invitation_id, full_name) VALUES (v_inv_daren, 'Fabiola') RETURNING id INTO v_g2;

    INSERT INTO public.rsvp_responses (guest_id, status) VALUES (v_g1, 'confirmed');
    INSERT INTO public.rsvp_responses (guest_id, status) VALUES (v_g2, 'confirmed');

    INSERT INTO public.table_assignments (table_id, guest_id) VALUES (v_tbl_honor, v_g1);
    INSERT INTO public.table_assignments (table_id, guest_id) VALUES (v_tbl_honor, v_g2);

    -- Invitación 2: Jill y Merie
    INSERT INTO public.invitations (
        wedding_id, token, recipient_name, authorized_count, is_active
    ) VALUES (
        v_wedding_id,
        'e84920fc11823a9b7cd491e02847aef1',
        'Jill y Merie',
        2,
        true
    ) RETURNING id INTO v_inv_jill;

    INSERT INTO public.guests (invitation_id, full_name) VALUES (v_inv_jill, 'Jill') RETURNING id INTO v_g3;
    INSERT INTO public.guests (invitation_id, full_name) VALUES (v_inv_jill, 'Merie') RETURNING id INTO v_g4;

    INSERT INTO public.rsvp_responses (guest_id, status) VALUES (v_g3, 'pending');
    INSERT INTO public.rsvp_responses (guest_id, status) VALUES (v_g4, 'pending');

    INSERT INTO public.table_assignments (table_id, guest_id) VALUES (v_tbl_1, v_g3);
    INSERT INTO public.table_assignments (table_id, guest_id) VALUES (v_tbl_1, v_g4);

    -- Invitación 3: Mamá y tía Estela
    INSERT INTO public.invitations (
        wedding_id, token, recipient_name, authorized_count, is_active
    ) VALUES (
        v_wedding_id,
        'c718293a4b5c6df0e1a2b3c4d5e6f7a8',
        'Mamá y tía Estela',
        2,
        true
    ) RETURNING id INTO v_inv_mama;

    INSERT INTO public.guests (invitation_id, full_name) VALUES (v_inv_mama, 'Mamá') RETURNING id INTO v_g5;
    INSERT INTO public.guests (invitation_id, full_name) VALUES (v_inv_mama, 'Tía Estela') RETURNING id INTO v_g6;

    INSERT INTO public.rsvp_responses (guest_id, status) VALUES (v_g5, 'pending');
    INSERT INTO public.rsvp_responses (guest_id, status) VALUES (v_g6, 'pending');

    -- Invitación 4: Jackson y Karen
    INSERT INTO public.invitations (
        wedding_id, token, recipient_name, authorized_count, is_active
    ) VALUES (
        v_wedding_id,
        '9f8e7d6c5b4a3928170e1f2a3b4c5d6e',
        'Jackson y Karen',
        2,
        true
    ) RETURNING id INTO v_inv_jackson;

    INSERT INTO public.guests (invitation_id, full_name) VALUES (v_inv_jackson, 'Jackson') RETURNING id INTO v_g7;
    INSERT INTO public.guests (invitation_id, full_name) VALUES (v_inv_jackson, 'Karen') RETURNING id INTO v_g8;

    INSERT INTO public.rsvp_responses (guest_id, status) VALUES (v_g7, 'pending');
    INSERT INTO public.rsvp_responses (guest_id, status) VALUES (v_g8, 'pending');

END $$;
