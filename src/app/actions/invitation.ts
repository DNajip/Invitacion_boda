"use server";

import { createClient } from "@/lib/supabase/server";
import { InvitationFullData } from "@/types/wedding";

/**
 * Obtiene de forma segura los datos completos de una invitación mediante su token de 128 bits.
 * Utiliza la función RPC con SECURITY DEFINER para aislar completamente los datos de otros invitados.
 */
export async function getInvitationData(token: string): Promise<InvitationFullData> {
  if (!token || typeof token !== "string" || token.trim().length === 0) {
    return {
      success: false,
      error: "Token no proporcionado",
      invitation: { id: "", token: "", recipient_name: "", authorized_count: 0 },
      wedding: {} as unknown as InvitationFullData["wedding"],
      settings: {} as unknown as InvitationFullData["settings"],
      guests: [],
      assigned_table: null,
    };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.rpc("get_invitation_by_token", {
    p_token: token.trim(),
  });

  if (error || !data || !data.success) {
    return {
      success: false,
      error: data?.error || error?.message || "Invitación no encontrada o inactiva",
      invitation: { id: "", token: "", recipient_name: "", authorized_count: 0 },
      wedding: {} as unknown as InvitationFullData["wedding"],
      settings: {} as unknown as InvitationFullData["settings"],
      guests: [],
      assigned_table: null,
    };
  }

  return data as InvitationFullData;
}

/**
 * Envía la confirmación RSVP individual de un invitado validando pertenencia y plazo.
 */
export async function submitRsvp(
  token: string,
  guestId: string,
  status: "confirmed" | "declined",
  dietaryNotes?: string
) {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc("submit_rsvp_response", {
    p_token: token.trim(),
    p_guest_id: guestId,
    p_status: status,
    p_dietary_notes: dietaryNotes?.trim() || null,
  });

  if (error || !data || !data.success) {
    return {
      success: false,
      error: data?.error || error?.message || "No se pudo registrar la confirmación",
    };
  }

  return { success: true, message: data.message };
}
