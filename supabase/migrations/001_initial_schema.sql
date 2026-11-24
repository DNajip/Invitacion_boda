-- ==============================================================================
-- 001_initial_schema.sql
-- WEDDING INVITATION MANAGER - MODELO RELACIONAL
-- ==============================================================================

-- Habilitar extensión pgcrypto para generación de UUIDs y utilidades criptográficas
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. TABLA: weddings (Instancia de la boda)
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

-- 2. TABLA: wedding_settings (Configuración detallada de la boda)
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

-- 3. TABLA: invitations (Grupos de invitación con token)
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

-- 4. TABLA: guests (Personas individuales asociadas a la invitación)
CREATE TABLE IF NOT EXISTS public.guests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    invitation_id UUID NOT NULL REFERENCES public.invitations(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

-- 5. TABLA: rsvp_responses (Estado de confirmación individual de cada persona)
CREATE TABLE IF NOT EXISTS public.rsvp_responses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    guest_id UUID NOT NULL REFERENCES public.guests(id) ON DELETE CASCADE,
    status TEXT NOT NULL CHECK (status IN ('confirmed', 'declined', 'pending')) DEFAULT 'pending',
    dietary_notes TEXT,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
    CONSTRAINT uq_rsvp_responses_guest_id UNIQUE (guest_id)
);

-- 6. TABLA: tables (Mesas para recepción)
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

-- 7. TABLA: table_assignments (Asignación de invitado a mesa)
CREATE TABLE IF NOT EXISTS public.table_assignments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    table_id UUID NOT NULL REFERENCES public.tables(id) ON DELETE CASCADE,
    guest_id UUID NOT NULL REFERENCES public.guests(id) ON DELETE CASCADE,
    assigned_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
    CONSTRAINT uq_table_assignments_guest_id UNIQUE (guest_id)
);

-- ÍNDICES PARA ALTO RENDIMIENTO
CREATE INDEX IF NOT EXISTS idx_invitations_token ON public.invitations(token);
CREATE INDEX IF NOT EXISTS idx_invitations_wedding_id ON public.invitations(wedding_id);
CREATE INDEX IF NOT EXISTS idx_guests_invitation_id ON public.guests(invitation_id);
CREATE INDEX IF NOT EXISTS idx_rsvp_responses_guest_id ON public.rsvp_responses(guest_id);
CREATE INDEX IF NOT EXISTS idx_tables_wedding_id ON public.tables(wedding_id);
CREATE INDEX IF NOT EXISTS idx_table_assignments_table_id ON public.table_assignments(table_id);
CREATE INDEX IF NOT EXISTS idx_table_assignments_guest_id ON public.table_assignments(guest_id);
