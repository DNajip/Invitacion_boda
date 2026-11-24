"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient, createAdminClient } from "@/lib/supabase/server";
import { generateSecureToken } from "@/lib/tokens";
import { DashboardStats, Invitation, Wedding, WeddingSettings } from "@/types/wedding";

// ==============================================================================
// AUTENTICACIÓN
// ==============================================================================

export async function loginAdmin(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const redirectTo = (formData.get("redirectTo") as string) || "/admin";

  if (!email || !password) {
    return { success: false, error: "Por favor ingresa tu correo y contraseña." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { success: false, error: "Credenciales inválidas. Verifica tu correo y contraseña." };
  }

  revalidatePath("/admin");
  redirect(redirectTo);
}

export async function logoutAdmin() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}

// ==============================================================================
// OBTENER BODA Y CONFIGURACIÓN
// ==============================================================================

export async function getActiveWedding(): Promise<{ wedding: Wedding | null; settings: WeddingSettings | null }> {
  const supabase = createAdminClient();

  const { data: wedding, error: wError } = await supabase
    .from("weddings")
    .select("*")
    .eq("is_active", true)
    .single();

  if (wError || !wedding) {
    return { wedding: null, settings: null };
  }

  const { data: settings } = await supabase
    .from("wedding_settings")
    .select("*")
    .eq("wedding_id", wedding.id)
    .single();

  return { wedding, settings };
}

// ==============================================================================
// DASHBOARD & ESTADÍSTICAS
// ==============================================================================

export async function getDashboardStats(): Promise<DashboardStats> {
  const supabase = createAdminClient();

  // Total invitaciones
  const { count: totalInvitations } = await supabase
    .from("invitations")
    .select("*", { count: "exact", head: true });

  // Total invitados
  const { count: totalGuests } = await supabase
    .from("guests")
    .select("*", { count: "exact", head: true });

  // Respuestas RSVP
  const { data: rsvpData } = await supabase
    .from("rsvp_responses")
    .select("status");

  let confirmedGuests = 0;
  let declinedGuests = 0;
  let pendingGuests = 0;

  if (rsvpData) {
    rsvpData.forEach((r) => {
      if (r.status === "confirmed") confirmedGuests++;
      else if (r.status === "declined") declinedGuests++;
    });
  }

  // Los pendientes son todos los invitados que no han confirmado ni declinado
  pendingGuests = Math.max(0, (totalGuests || 0) - confirmedGuests - declinedGuests);

  return {
    totalInvitations: totalInvitations || 0,
    totalGuests: totalGuests || 0,
    confirmedGuests,
    declinedGuests,
    pendingGuests,
  };
}

// ==============================================================================
// GESTIÓN DE INVITACIONES E INVITADOS
// ==============================================================================

export async function getInvitations(searchQuery = ""): Promise<Invitation[]> {
  const supabase = createAdminClient();

  let query = supabase
    .from("invitations")
    .select(`
      id,
      wedding_id,
      token,
      recipient_name,
      authorized_count,
      is_active,
      created_at,
      updated_at,
      guests (
        id,
        full_name,
        created_at,
        rsvp_responses (
          status,
          dietary_notes
        ),
        table_assignments (
          table_id,
          tables (
            name
          )
        )
      )
    `)
    .order("created_at", { ascending: false });

  if (searchQuery.trim()) {
    query = query.ilike("recipient_name", `%${searchQuery.trim()}%`);
  }

  const { data, error } = await query;

  if (error || !data) {
    console.error("Error al obtener invitaciones:", error);
    return [];
  }

  interface SupabaseInvitationRow {
    id: string;
    wedding_id: string;
    token: string;
    recipient_name: string;
    authorized_count: number;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    guests: {
      id: string;
      full_name: string;
      rsvp_responses?: { status: "confirmed" | "declined" | "pending"; dietary_notes?: string | null }[];
      table_assignments?: { table_id: string; tables?: { name: string } }[];
    }[];
  }

  // Transformar estructura anidada a la interfaz limpia
  return (data as unknown as SupabaseInvitationRow[]).map((inv) => ({
    id: inv.id,
    wedding_id: inv.wedding_id,
    token: inv.token,
    recipient_name: inv.recipient_name,
    authorized_count: inv.authorized_count,
    is_active: inv.is_active,
    created_at: inv.created_at,
    updated_at: inv.updated_at,
    guests: (inv.guests || []).map((g) => ({
      id: g.id,
      full_name: g.full_name,
      rsvp_status: g.rsvp_responses?.[0]?.status || "pending",
      dietary_notes: g.rsvp_responses?.[0]?.dietary_notes || null,
      table_id: g.table_assignments?.[0]?.table_id || null,
      table_name: g.table_assignments?.[0]?.tables?.name || null,
    })),
  }));
}

export async function createInvitation(payload: {
  recipient_name: string;
  authorized_count: number;
  guest_names: string[];
}) {
  const supabase = createAdminClient();

  // Obtener boda activa
  const { data: wedding } = await supabase
    .from("weddings")
    .select("id")
    .eq("is_active", true)
    .single();

  if (!wedding) {
    return { success: false, error: "No hay una boda activa configurada." };
  }

  const token = generateSecureToken();

  // 1. Insertar invitación
  const { data: invitation, error: invError } = await supabase
    .from("invitations")
    .insert({
      wedding_id: wedding.id,
      token,
      recipient_name: payload.recipient_name.trim(),
      authorized_count: payload.authorized_count,
      is_active: true,
    })
    .select()
    .single();

  if (invError || !invitation) {
    return { success: false, error: `Error al crear invitación: ${invError?.message}` };
  }

  // 2. Insertar personas individuales asociadas
  const guestsToInsert = payload.guest_names
    .filter((name) => name.trim().length > 0)
    .map((name) => ({
      invitation_id: invitation.id,
      full_name: name.trim(),
    }));

  // Si no se proporcionaron nombres suficientes, rellenar con nombres genéricos
  while (guestsToInsert.length < payload.authorized_count) {
    const index = guestsToInsert.length + 1;
    guestsToInsert.push({
      invitation_id: invitation.id,
      full_name: index === 1 ? payload.recipient_name.trim() : `Acompañante ${index}`,
    });
  }

  const { data: insertedGuests, error: guestError } = await supabase
    .from("guests")
    .insert(guestsToInsert)
    .select();

  if (guestError) {
    console.error("Error al insertar invitados:", guestError);
  }

  // 3. Crear registros iniciales de RSVP 'pending'
  if (insertedGuests && insertedGuests.length > 0) {
    const rsvpToInsert = insertedGuests.map((g) => ({
      guest_id: g.id,
      status: "pending",
    }));
    await supabase.from("rsvp_responses").insert(rsvpToInsert);
  }

  revalidatePath("/admin");
  return { success: true, invitation };
}

export async function updateInvitation(
  invitationId: string,
  payload: {
    recipient_name: string;
    authorized_count: number;
    is_active: boolean;
    guest_names?: { id?: string; full_name: string }[];
  }
) {
  const supabase = createAdminClient();

  const { error: invError } = await supabase
    .from("invitations")
    .update({
      recipient_name: payload.recipient_name.trim(),
      authorized_count: payload.authorized_count,
      is_active: payload.is_active,
      updated_at: new Date().toISOString(),
    })
    .eq("id", invitationId);

  if (invError) {
    return { success: false, error: invError.message };
  }

  // Actualizar nombres de invitados si se proporcionan
  if (payload.guest_names) {
    for (const g of payload.guest_names) {
      if (g.id) {
        await supabase
          .from("guests")
          .update({ full_name: g.full_name.trim() })
          .eq("id", g.id);
      }
    }
  }

  revalidatePath("/admin");
  return { success: true };
}

export async function toggleInvitationStatus(invitationId: string, is_active: boolean) {
  const supabase = createAdminClient();

  const { error } = await supabase
    .from("invitations")
    .update({ is_active, updated_at: new Date().toISOString() })
    .eq("id", invitationId);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/admin");
  return { success: true };
}

export async function regenerateInvitationToken(invitationId: string) {
  const supabase = createAdminClient();
  const newToken = generateSecureToken();

  const { error } = await supabase
    .from("invitations")
    .update({ token: newToken, updated_at: new Date().toISOString() })
    .eq("id", invitationId);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/admin");
  return { success: true, token: newToken };
}

// ==============================================================================
// CONFIGURACIÓN DE LA BODA
// ==============================================================================

export async function updateWeddingConfig(payload: {
  weddingId: string;
  groom_name: string;
  bride_name: string;
  monogram: string;
  wedding_date: string;
  timezone: string;
  ceremony_time: string;
  ceremony_venue: string;
  ceremony_description: string;
  ceremony_maps_url: string;
  reception_time: string;
  reception_venue: string;
  reception_description: string;
  reception_maps_url: string;
  dresscode_title: string;
  dresscode_subtitle: string;
  dresscode_description: string;
  restricted_colors: { name: string; color: string }[];
  special_adults_title: string;
  special_adults_text: string;
  special_envelope_title: string;
  special_envelope_text: string;
  music_url: string;
  rsvp_deadline: string;
  allow_rsvp_updates: boolean;
  whatsapp_template: string;
}) {
  const supabase = createAdminClient();

  // 1. Actualizar tabla weddings
  const { error: wError } = await supabase
    .from("weddings")
    .update({
      groom_name: payload.groom_name.trim(),
      bride_name: payload.bride_name.trim(),
      monogram: payload.monogram.trim(),
      wedding_date: payload.wedding_date,
      timezone: payload.timezone,
      updated_at: new Date().toISOString(),
    })
    .eq("id", payload.weddingId);

  if (wError) {
    return { success: false, error: wError.message };
  }

  // 2. Actualizar wedding_settings
  const { error: sError } = await supabase
    .from("wedding_settings")
    .update({
      ceremony_time: payload.ceremony_time,
      ceremony_venue: payload.ceremony_venue,
      ceremony_description: payload.ceremony_description,
      ceremony_maps_url: payload.ceremony_maps_url,
      reception_time: payload.reception_time,
      reception_venue: payload.reception_venue,
      reception_description: payload.reception_description,
      reception_maps_url: payload.reception_maps_url,
      dresscode_title: payload.dresscode_title,
      dresscode_subtitle: payload.dresscode_subtitle,
      dresscode_description: payload.dresscode_description,
      restricted_colors: payload.restricted_colors,
      special_adults_title: payload.special_adults_title,
      special_adults_text: payload.special_adults_text,
      special_envelope_title: payload.special_envelope_title,
      special_envelope_text: payload.special_envelope_text,
      music_url: payload.music_url,
      rsvp_deadline: payload.rsvp_deadline,
      allow_rsvp_updates: payload.allow_rsvp_updates,
      whatsapp_template: payload.whatsapp_template,
      updated_at: new Date().toISOString(),
    })
    .eq("wedding_id", payload.weddingId);

  if (sError) {
    return { success: false, error: sError.message };
  }

  revalidatePath("/admin");
  revalidatePath("/admin/settings");
  return { success: true };
}
