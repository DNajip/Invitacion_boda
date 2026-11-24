export interface RestrictedColor {
  name: string;
  color: string;
}

export interface Wedding {
  id: string;
  slug: string;
  groom_name: string;
  bride_name: string;
  monogram: string;
  wedding_date: string;
  timezone: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface WeddingSettings {
  id: string;
  wedding_id: string;
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
  restricted_colors: RestrictedColor[];
  special_adults_title: string;
  special_adults_text: string;
  special_envelope_title: string;
  special_envelope_text: string;
  primary_color: string;
  gold_color: string;
  white_color: string;
  music_url: string;
  rsvp_deadline: string;
  allow_rsvp_updates: boolean;
  whatsapp_template: string;
  created_at: string;
  updated_at: string;
}

export interface Guest {
  id: string;
  invitation_id: string;
  full_name: string;
  created_at: string;
}

export interface GuestWithRsvp {
  id: string;
  full_name: string;
  rsvp_status: 'confirmed' | 'declined' | 'pending';
  dietary_notes?: string | null;
  table_id?: string | null;
  table_name?: string | null;
}

export interface Invitation {
  id: string;
  wedding_id: string;
  token: string;
  recipient_name: string;
  authorized_count: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  guests?: GuestWithRsvp[];
}

export interface WeddingTable {
  id: string;
  wedding_id: string;
  name: string;
  capacity: number;
  position_x: number;
  position_y: number;
  assigned_guests?: GuestWithRsvp[];
}

export interface InvitationFullData {
  success: boolean;
  error?: string;
  invitation: {
    id: string;
    token: string;
    recipient_name: string;
    authorized_count: number;
  };
  wedding: Wedding;
  settings: WeddingSettings;
  guests: GuestWithRsvp[];
  assigned_table?: {
    table_id: string;
    table_name: string;
    capacity: number;
    position_x: number;
    position_y: number;
  } | null;
}

export interface DashboardStats {
  totalInvitations: number;
  totalGuests: number;
  confirmedGuests: number;
  declinedGuests: number;
  pendingGuests: number;
}
