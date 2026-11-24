"use client";

import { useState, useTransition } from "react";
import confetti from "canvas-confetti";
import { submitRsvp } from "@/app/actions/invitation";
import { GuestWithRsvp } from "@/types/wedding";
import FloralCorner from "@/components/ornaments/floral-corner";
import GoldenGlyph from "@/components/ornaments/golden-glyph";
import { Check, X, Loader2, Sparkles, AlertCircle } from "lucide-react";

interface Props {
  token: string;
  initialGuests: GuestWithRsvp[];
  rsvpDeadlineString?: string;
  allowUpdates?: boolean;
}

export default function RsvpSection({
  token,
  initialGuests,
  rsvpDeadlineString,
  allowUpdates = true,
}: Props) {
  const [guests, setGuests] = useState<GuestWithRsvp[]>(initialGuests);
  const [dietaryNotes, setDietaryNotes] = useState<{ [guestId: string]: string }>({});
  const [isPending, startTransition] = useTransition();
  const [activeGuestId, setActiveGuestId] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Comprobar si la fecha límite expiró
  const isExpired = rsvpDeadlineString ? new Date().getTime() > new Date(rsvpDeadlineString).getTime() : false;

  const handleRsvp = (guestId: string, status: "confirmed" | "declined") => {
    if (isExpired) {
      setNotification({
        type: "error",
        text: "El plazo para confirmar asistencia ha finalizado.",
      });
      return;
    }

    setActiveGuestId(guestId);
    setNotification(null);

    startTransition(async () => {
      const notes = dietaryNotes[guestId] || "";
      const res = await submitRsvp(token, guestId, status, notes);

      if (res.success) {
        setGuests((prev) =>
          prev.map((g) =>
            g.id === guestId ? { ...g, rsvp_status: status, dietary_notes: notes } : g
          )
        );

        if (status === "confirmed") {
          // Celebración visual con confeti dorado
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.7 },
            colors: ["#C8A569", "#E5C388", "#FFFFFF"],
          });
        }

        setNotification({
          type: "success",
          text: status === "confirmed" ? "¡Gracias por confirmar tu asistencia!" : "Respuesta registrada. Lamentamos que no puedas asistir.",
        });
      } else {
        setNotification({
          type: "error",
          text: res.error || "Ocurrió un error al guardar tu respuesta.",
        });
      }
      setActiveGuestId(null);
    });
  };

  return (
    <section className="relative w-full max-w-md mx-auto my-6 bg-[#0E1A29] border border-[#C8A569]/30 rounded-3xl p-6 sm:p-8 text-center shadow-2xl overflow-hidden ornamental-card">
      <FloralCorner position="top-left" className="absolute top-0 left-0" />
      <FloralCorner position="bottom-right" className="absolute bottom-0 right-0" />

      <div className="relative z-10 space-y-4">
        <p className="text-[11px] uppercase tracking-widest text-[#C8A569] font-medium">
          CONFIRMACIÓN DE ASISTENCIA
        </p>
        <GoldenGlyph />

        <h2 className="text-2xl sm:text-3xl font-serif italic text-white leading-tight">
          ¿Nos Acompañarás?
        </h2>

        <p className="text-xs text-neutral-300 max-w-xs mx-auto leading-relaxed">
          Por favor confirma la asistencia de cada una de las personas autorizadas en tu invitación.
        </p>

        {rsvpDeadlineString && (
          <p className="text-[11px] text-[#E5C388] font-medium">
            Fecha límite de confirmación:{" "}
            {new Date(rsvpDeadlineString).toLocaleDateString("es-ES", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        )}

        {notification && (
          <div
            className={`p-3 rounded-xl text-xs flex items-center justify-center gap-2 ${
              notification.type === "success"
                ? "bg-emerald-950/80 border border-emerald-500/40 text-emerald-200"
                : "bg-red-950/80 border border-red-500/40 text-red-200"
            }`}
          >
            {notification.type === "success" ? (
              <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            )}
            <span>{notification.text}</span>
          </div>
        )}

        {/* Lista de personas autorizadas */}
        <div className="space-y-4 pt-2">
          {guests.map((guest) => {
            const isConfirmed = guest.rsvp_status === "confirmed";
            const isDeclined = guest.rsvp_status === "declined";
            const isThisLoading = isPending && activeGuestId === guest.id;

            return (
              <div
                key={guest.id}
                className="bg-[#10243B]/90 border border-[#C8A569]/25 rounded-2xl p-4 text-left shadow-lg space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-white">
                      {guest.full_name}
                    </h3>
                    <p className="text-[11px] text-neutral-400 mt-0.5">
                      Estado:{" "}
                      {isConfirmed ? (
                        <span className="text-emerald-400 font-semibold">Confirmado</span>
                      ) : isDeclined ? (
                        <span className="text-red-400 font-semibold">No asistirá</span>
                      ) : (
                        <span className="text-amber-300 font-medium">Pendiente</span>
                      )}
                    </p>
                  </div>
                </div>

                {/* Botones de Confirmar / Rechazar */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    disabled={isThisLoading || (!allowUpdates && isConfirmed)}
                    onClick={() => handleRsvp(guest.id, "confirmed")}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer disabled:opacity-50 ${
                      isConfirmed
                        ? "bg-emerald-600 text-white shadow-lg shadow-emerald-900/40"
                        : "bg-[#0A1726] border border-emerald-500/30 text-emerald-300 hover:bg-emerald-950/30"
                    }`}
                  >
                    {isThisLoading ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Check className="w-3.5 h-3.5" />
                    )}
                    {isConfirmed ? "Asistiré" : "Confirmar"}
                  </button>

                  <button
                    type="button"
                    disabled={isThisLoading || (!allowUpdates && isDeclined)}
                    onClick={() => handleRsvp(guest.id, "declined")}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer disabled:opacity-50 ${
                      isDeclined
                        ? "bg-red-700 text-white shadow-lg shadow-red-900/40"
                        : "bg-[#0A1726] border border-red-500/30 text-red-300 hover:bg-red-950/30"
                    }`}
                  >
                    <X className="w-3.5 h-3.5" />
                    {isDeclined ? "No asistiré" : "No podré"}
                  </button>
                </div>

                {/* Restricciones alimentarias opcionales */}
                <input
                  type="text"
                  placeholder="Alergias o notas de comida (opcional)"
                  defaultValue={guest.dietary_notes || ""}
                  onChange={(e) =>
                    setDietaryNotes({ ...dietaryNotes, [guest.id]: e.target.value })
                  }
                  className="w-full bg-[#070D16] border border-neutral-700/80 rounded-lg px-2.5 py-1 text-[11px] text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-[#C8A569]"
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
