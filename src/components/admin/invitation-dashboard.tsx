"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import {
  Users,
  Copy,
  Check,
  Share2,
  Eye,
  Plus,
  RefreshCw,
  Power,
  Search,
  Loader2,
  AlertCircle,
} from "lucide-react";
import {
  createInvitation,
  toggleInvitationStatus,
  regenerateInvitationToken,
} from "@/app/actions/admin";
import { DashboardStats, Invitation, WeddingSettings } from "@/types/wedding";

interface Props {
  initialStats: DashboardStats;
  initialInvitations: Invitation[];
  settings: WeddingSettings | null;
  siteUrl: string;
}

export default function InvitationDashboard({
  initialStats,
  initialInvitations,
  settings,
  siteUrl,
}: Props) {
  const [invitations, setInvitations] = useState<Invitation[]>(initialInvitations);
  const [stats, setStats] = useState<DashboardStats>(initialStats);
  const [search, setSearch] = useState("");
  const [isPending, startTransition] = useTransition();

  // Estado del formulario de nueva invitación
  const [recipientName, setRecipientName] = useState("");
  const [authorizedCount, setAuthorizedCount] = useState<number>(2);
  const [guestNames, setGuestNames] = useState<string[]>(["", ""]);
  const [formError, setFormError] = useState<string | null>(null);
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  // Manejar cambio en número de personas autorizadas
  function handleCountChange(count: number) {
    setAuthorizedCount(count);
    const newNames = [...guestNames];
    while (newNames.length < count) {
      newNames.push("");
    }
    setGuestNames(newNames.slice(0, count));
  }

  // Manejar creación
  function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!recipientName.trim()) {
      setFormError("Por favor ingresa el nombre que aparecerá en la tarjeta.");
      return;
    }
    setFormError(null);

    startTransition(async () => {
      const res = await createInvitation({
        recipient_name: recipientName.trim(),
        authorized_count: authorizedCount,
        guest_names: guestNames,
      });

      if (res.success && res.invitation) {
        setInvitations([res.invitation as unknown as Invitation, ...invitations]);
        setStats((prev) => ({
          ...prev,
          totalInvitations: prev.totalInvitations + 1,
          totalGuests: prev.totalGuests + authorizedCount,
          pendingGuests: prev.pendingGuests + authorizedCount,
        }));
        setRecipientName("");
        setAuthorizedCount(2);
        setGuestNames(["", ""]);
      } else {
        setFormError(res.error || "Ocurrió un error al crear la invitación.");
      }
    });
  }

  // Copiar enlace al portapapeles
  function handleCopyLink(token: string) {
    const url = `${siteUrl}/i/${token}`;
    navigator.clipboard.writeText(url);
    setCopiedToken(token);
    setTimeout(() => setCopiedToken(null), 2500);
  }

  // Compartir por WhatsApp
  function handleShareWhatsApp(inv: Invitation) {
    const url = `${siteUrl}/i/${inv.token}`;
    const template =
      settings?.whatsapp_template ||
      "¡Hola {destinatario}! Con mucha emoción te compartimos nuestra invitación a nuestra boda: {enlace}";
    const text = template
      .replace("{destinatario}", inv.recipient_name)
      .replace("{enlace}", url);
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, "_blank");
  }

  // Regenerar enlace
  function handleRegenerateToken(id: string) {
    if (!confirm("¿Deseas regenerar el enlace? El enlace anterior dejará de funcionar.")) return;

    startTransition(async () => {
      const res = await regenerateInvitationToken(id);
      if (res.success && res.token) {
        setInvitations((prev) =>
          prev.map((i) => (i.id === id ? { ...i, token: res.token! } : i))
        );
      }
    });
  }

  // Desactivar / Activar
  function handleToggleStatus(inv: Invitation) {
    startTransition(async () => {
      const newStatus = !inv.is_active;
      const res = await toggleInvitationStatus(inv.id, newStatus);
      if (res.success) {
        setInvitations((prev) =>
          prev.map((i) => (i.id === inv.id ? { ...i, is_active: newStatus } : i))
        );
      }
    });
  }

  // Filtrar invitaciones por búsqueda
  const filteredInvitations = invitations.filter((inv) =>
    inv.recipient_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* 1. TARJETAS DE ESTADÍSTICAS (Idéntico a la maqueta) */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        {/* Invitaciones */}
        <div className="bg-[#10243B]/80 border border-[#C8A569]/20 rounded-xl p-4 sm:p-5 shadow-lg">
          <p className="text-xs text-neutral-400 font-medium">Invitaciones</p>
          <p className="text-2xl sm:text-3xl font-bold text-white mt-1">
            {stats.totalInvitations}
          </p>
        </div>

        {/* Invitados */}
        <div className="bg-[#10243B]/80 border border-[#C8A569]/20 rounded-xl p-4 sm:p-5 shadow-lg">
          <p className="text-xs text-neutral-400 font-medium">Invitados</p>
          <p className="text-2xl sm:text-3xl font-bold text-white mt-1">
            {stats.totalGuests}
          </p>
        </div>

        {/* Confirmados */}
        <div className="bg-[#10243B]/80 border border-[#C8A569]/20 rounded-xl p-4 sm:p-5 shadow-lg">
          <p className="text-xs text-neutral-400 font-medium">Confirmados</p>
          <p className="text-2xl sm:text-3xl font-bold text-[#22C55E] mt-1">
            {stats.confirmedGuests}
          </p>
        </div>
      </div>

      {/* 2. FORMULARIO: AGREGAR INVITACIÓN (Idéntico a la maqueta) */}
      <div className="bg-[#10243B]/80 border border-[#C8A569]/20 rounded-2xl p-5 sm:p-6 shadow-xl">
        <h2 className="text-sm font-semibold text-white tracking-wide mb-4">
          Agregar invitación
        </h2>

        {formError && (
          <div className="mb-4 p-3 bg-red-950/60 border border-red-500/40 rounded-lg text-xs text-red-200 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{formError}</span>
          </div>
        )}

        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="block text-xs text-neutral-300 font-medium mb-1.5">
              Nombre que aparecerá en la tarjeta
            </label>
            <input
              type="text"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              placeholder="Ej. Carlos y María"
              className="w-full bg-[#0A1726] border border-[#C8A569]/30 rounded-xl px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#C8A569] transition"
            />
          </div>

          <div>
            <label className="block text-xs text-neutral-300 font-medium mb-2">
              Cantidad de personas autorizadas
            </label>
            <div className="flex items-center gap-4">
              {[1, 2, 3, 4, 5, 6].map((count) => (
                <label
                  key={count}
                  className="flex items-center gap-1.5 cursor-pointer text-sm text-neutral-300"
                >
                  <input
                    type="radio"
                    name="authorized_count"
                    checked={authorizedCount === count}
                    onChange={() => handleCountChange(count)}
                    className="accent-[#C8A569] w-4 h-4 cursor-pointer"
                  />
                  <span>{count}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Desglose de nombres individuales para confirmación RSVP */}
          <div className="pt-2 border-t border-[#C8A569]/10">
            <p className="text-xs text-[#C8A569] mb-2 font-medium">
              Nombres individuales para la lista de asistencia ({authorizedCount}):
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {guestNames.map((name, idx) => (
                <input
                  key={idx}
                  type="text"
                  value={name}
                  onChange={(e) => {
                    const updated = [...guestNames];
                    updated[idx] = e.target.value;
                    setGuestNames(updated);
                  }}
                  placeholder={`Invitado ${idx + 1}`}
                  className="bg-[#0A1726]/80 border border-neutral-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-[#C8A569]"
                />
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full mt-2 bg-gradient-to-r from-[#E5C388] to-[#C8A569] hover:from-[#D4B075] hover:to-[#B89456] text-[#10243B] font-semibold py-2.5 px-4 rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 text-sm"
          >
            {isPending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Plus className="w-4 h-4" />
            )}
            Agregar invitación
          </button>
        </form>
      </div>

      {/* 3. LISTA DE INVITADOS (Idéntico a la maqueta) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-white tracking-wide">
            Lista de invitados ({filteredInvitations.length})
          </h2>
        </div>

        {/* Buscador */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar invitado..."
            className="w-full bg-[#10243B]/60 border border-[#C8A569]/20 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#C8A569] transition"
          />
        </div>

        {/* Tarjetas de cada invitación */}
        <div className="space-y-3">
          {filteredInvitations.length === 0 ? (
            <div className="text-center py-10 bg-[#10243B]/40 rounded-xl border border-dashed border-[#C8A569]/20 text-neutral-400 text-sm">
              No se encontraron invitaciones que coincidan con la búsqueda.
            </div>
          ) : (
            filteredInvitations.map((inv) => {
              const confirmedCount = (inv.guests || []).filter(
                (g) => g.rsvp_status === "confirmed"
              ).length;
              const isFullyConfirmed =
                inv.guests &&
                inv.guests.length > 0 &&
                confirmedCount === inv.guests.length;

              const statusLabel = isFullyConfirmed
                ? "Confirmado"
                : confirmedCount > 0
                ? `${confirmedCount} Confirmados`
                : "Pendiente";

              const statusColor = isFullyConfirmed
                ? "text-emerald-400"
                : confirmedCount > 0
                ? "text-amber-400"
                : "text-neutral-400";

              return (
                <div
                  key={inv.id}
                  className={`bg-[#10243B]/90 border ${
                    inv.is_active ? "border-[#C8A569]/20" : "border-red-500/20 opacity-60"
                  } rounded-2xl p-4 sm:p-5 shadow-lg transition hover:border-[#C8A569]/40`}
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#0A1726] border border-[#C8A569]/20 flex items-center justify-center text-[#C8A569] shrink-0">
                        <Users className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-white leading-tight">
                          {inv.recipient_name}
                        </h3>
                        <p className={`text-xs mt-0.5 font-medium ${statusColor}`}>
                          {inv.authorized_count}{" "}
                          {inv.authorized_count === 1 ? "persona" : "personas"} · {statusLabel}
                          {!inv.is_active && " (Desactivada)"}
                        </p>
                      </div>
                    </div>

                    {/* Ver invitación previa */}
                    <Link
                      href={`/i/${inv.token}`}
                      target="_blank"
                      className="p-2 rounded-lg bg-[#0A1726] hover:bg-[#C8A569]/10 text-neutral-300 hover:text-[#C8A569] transition"
                      title="Previsualizar Invitación"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                  </div>

                  {/* Nombres de personas autorizadas */}
                  {inv.guests && inv.guests.length > 0 && (
                    <div className="mb-3 flex flex-wrap gap-1.5">
                      {inv.guests.map((g) => (
                        <span
                          key={g.id}
                          className={`text-[11px] px-2 py-0.5 rounded-full border ${
                            g.rsvp_status === "confirmed"
                              ? "bg-emerald-950/40 border-emerald-500/30 text-emerald-300"
                              : g.rsvp_status === "declined"
                              ? "bg-red-950/40 border-red-500/30 text-red-300"
                              : "bg-neutral-900 border-neutral-700 text-neutral-400"
                          }`}
                        >
                          {g.full_name}
                          {g.table_name && ` (Mesa: ${g.table_name})`}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Botones de acción principales (Copiar y Compartir) */}
                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    <button
                      type="button"
                      onClick={() => handleCopyLink(inv.token)}
                      className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#0A1726] border border-neutral-700/80 hover:border-[#C8A569]/40 text-xs text-neutral-200 hover:text-white transition cursor-pointer"
                    >
                      {copiedToken === inv.token ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">¡Copiado!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-[#C8A569]" />
                          <span>Copiar enlace</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleShareWhatsApp(inv)}
                      className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#0A1726] border border-neutral-700/80 hover:border-emerald-500/40 text-xs text-neutral-200 hover:text-white transition cursor-pointer"
                    >
                      <Share2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Compartir</span>
                    </button>
                  </div>

                  {/* Acciones adicionales: regenerar y activar/desactivar */}
                  <div className="mt-2.5 pt-2 border-t border-neutral-800/80 flex items-center justify-between text-[11px] text-neutral-400">
                    <button
                      type="button"
                      onClick={() => handleRegenerateToken(inv.id)}
                      className="flex items-center gap-1 hover:text-[#C8A569] transition cursor-pointer"
                      title="Generar nuevo token seguro de 128 bits"
                    >
                      <RefreshCw className="w-3 h-3" />
                      Regenerar enlace
                    </button>

                    <button
                      type="button"
                      onClick={() => handleToggleStatus(inv)}
                      className={`flex items-center gap-1 ${
                        inv.is_active ? "hover:text-red-400" : "hover:text-emerald-400"
                      } transition cursor-pointer`}
                    >
                      <Power className="w-3 h-3" />
                      {inv.is_active ? "Desactivar" : "Reactivar"}
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
