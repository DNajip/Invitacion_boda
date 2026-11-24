-- ==============================================================================
-- 003_seed_daren_fabiola.sql
-- DATOS INICIALES: BODA DAREN & FABIOLA (19 DE DICIEMBRE DE 2026)
-- ==============================================================================

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
    -- 1. Insertar boda de Daren & Fabiola si no existe
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

    -- 2. Insertar configuración de la boda
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

    -- 3. Insertar Mesas iniciales
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

    -- 4. Insertar invitaciones de prueba con tokens seguros de 128-bit
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

    INSERT INTO public.guests (invitation_id, full_name)
    VALUES (v_inv_daren, 'Daren') RETURNING id INTO v_g1;
    INSERT INTO public.guests (invitation_id, full_name)
    VALUES (v_inv_daren, 'Fabiola') RETURNING id INTO v_g2;

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

    INSERT INTO public.guests (invitation_id, full_name)
    VALUES (v_inv_jill, 'Jill') RETURNING id INTO v_g3;
    INSERT INTO public.guests (invitation_id, full_name)
    VALUES (v_inv_jill, 'Merie') RETURNING id INTO v_g4;

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

    INSERT INTO public.guests (invitation_id, full_name)
    VALUES (v_inv_mama, 'Mamá') RETURNING id INTO v_g5;
    INSERT INTO public.guests (invitation_id, full_name)
    VALUES (v_inv_mama, 'Tía Estela') RETURNING id INTO v_g6;

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

    INSERT INTO public.guests (invitation_id, full_name)
    VALUES (v_inv_jackson, 'Jackson') RETURNING id INTO v_g7;
    INSERT INTO public.guests (invitation_id, full_name)
    VALUES (v_inv_jackson, 'Karen') RETURNING id INTO v_g8;

    INSERT INTO public.rsvp_responses (guest_id, status) VALUES (v_g7, 'pending');
    INSERT INTO public.rsvp_responses (guest_id, status) VALUES (v_g8, 'pending');

END $$;
