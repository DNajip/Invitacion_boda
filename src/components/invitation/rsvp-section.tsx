"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import confetti from "canvas-confetti";
import { submitRsvp } from "@/app/actions/invitation";
import { GuestWithRsvp } from "@/types/wedding";
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
      const res = await submitRsvp(token, guestId, status, "");

      if (res.success) {
        setGuests((prev) =>
          prev.map((g) =>
            g.id === guestId ? { ...g, rsvp_status: status } : g
          )
        );

        if (status === "confirmed") {
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
    <section className="relative w-full max-w-[440px] mx-auto rounded-[28px] bg-gradient-to-b from-[#081729] via-[#0E2035] to-[#081729] p-4 sm:p-6 text-center shadow-[0_20px_50px_rgba(0,0,0,0.6)] border border-[#C8A569]/40 overflow-hidden text-white">
      {/* Filetes interiores dorados dobles */}
      <div className="absolute inset-[7px] rounded-[22px] border border-[#C8A569]/30 pointer-events-none z-10" />
      <div className="absolute inset-[11px] rounded-[18px] border border-[#C8A569]/15 pointer-events-none z-10" />

      {/* Ramillete floral superior esquinero optimizado fuera del área del título */}
      <div className="absolute -top-6 -right-6 w-24 sm:w-26 h-20 pointer-events-none select-none z-20 scale-x-[-1] opacity-85">
        <Image
          src="/assets/templates/romantic-garden/floral-composition.webp"
          alt="Flores y hojas doradas"
          width={1774}
          height={887}
          className="w-full h-full object-contain drop-shadow-[0_4px_10px_rgba(0,0,0,0.4)]"
        />
      </div>

      <div className="relative z-10 space-y-2 pt-8 pb-1">
        <p className="font-cinzel text-[10.5px] sm:text-[11px] tracking-[0.15em] text-[#C8A569] uppercase font-semibold">
          CONFIRMACIÓN DE ASISTENCIA
        </p>

        {/* Sello de cera dorado ornamental compacto */}
        <div className="w-8 h-8 sm:w-9 sm:h-9 mx-auto relative drop-shadow-md">
          <Image
            src="/assets/templates/romantic-garden/wax-seal.webp"
            alt="Sello de cera D&F"
            fill
            sizes="36px"
            className="object-contain"
          />
        </div>

        <h2 className="font-serif italic font-normal text-2xl sm:text-3xl text-white tracking-wide leading-tight drop-shadow-md">
          ¿Nos Acompañarás?
        </h2>

        <p className="font-serif italic text-[13.5px] sm:text-[14px] text-[#E1D3BF] max-w-xs mx-auto leading-relaxed">
          Por favor confirma la asistencia de cada una de las personas autorizadas en tu invitación.
        </p>

        {rsvpDeadlineString && (
          <p className="font-cinzel text-[11px] text-[#E5C388] font-semibold tracking-wider">
            FECHA LÍMITE:{" "}
            {new Date(rsvpDeadlineString).toLocaleDateString("es-ES", {
              day: "numeric",
              month: "long",
              year: "numeric",
            }).toUpperCase()}
          </p>
        )}

        {notification && (
          <div
            className={`p-2 rounded-xl text-xs flex items-center justify-center gap-2 ${
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

        {/* Lista de personas autorizadas optimizada en altura y espaciado */}
        <div className="space-y-2 pt-0.5">
          {guests.map((guest) => {
            const isConfirmed = guest.rsvp_status === "confirmed";
            const isDeclined = guest.rsvp_status === "declined";
            const isThisLoading = isPending && activeGuestId === guest.id;

            return (
              <div
                key={guest.id}
                className="bg-[#0A1D33]/90 border border-[#C8A569]/35 rounded-xl p-2.5 sm:p-3 text-left shadow-md space-y-2 backdrop-blur-sm"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-serif font-bold text-sm sm:text-base text-white">
                      {guest.full_name}
                    </h3>
                    <p className="font-cinzel text-[9px] text-[#C8A569] tracking-wider">
                      ESTADO:{" "}
                      {isConfirmed ? (
                        <span className="text-emerald-400 font-bold">CONFIRMADO</span>
                      ) : isDeclined ? (
                        <span className="text-red-400 font-bold">NO ASISTIRÁ</span>
                      ) : (
                        <span className="text-amber-300 font-semibold">PENDIENTE</span>
                      )}
                    </p>
                  </div>
                </div>

                {/* Botones de Confirmar / Rechazar compactos */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    disabled={isThisLoading || (!allowUpdates && isConfirmed)}
                    onClick={() => handleRsvp(guest.id, "confirmed")}
                    className={`py-1.5 px-2.5 rounded-lg text-[10.5px] font-cinzel font-semibold tracking-wider flex items-center justify-center gap-1.5 transition cursor-pointer disabled:opacity-50 ${
                      isConfirmed
                        ? "bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-md shadow-emerald-900/50"
                        : "bg-[#0A1726] border border-emerald-500/40 text-emerald-300 hover:bg-emerald-950/40"
                    }`}
                  >
                    {isThisLoading ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Check className="w-3.5 h-3.5" />
                    )}
                    {isConfirmed ? "ASISTIRÉ" : "CONFIRMAR"}
                  </button>

                  <button
                    type="button"
                    disabled={isThisLoading || (!allowUpdates && isDeclined)}
                    onClick={() => handleRsvp(guest.id, "declined")}
                    className={`py-1.5 px-2.5 rounded-lg text-[10.5px] font-cinzel font-semibold tracking-wider flex items-center justify-center gap-1.5 transition cursor-pointer disabled:opacity-50 ${
                      isDeclined
                        ? "bg-gradient-to-r from-red-700 to-red-800 text-white shadow-md shadow-red-900/50"
                        : "bg-[#0A1726] border border-red-500/40 text-red-300 hover:bg-red-950/40"
                    }`}
                  >
                    <X className="w-3.5 h-3.5" />
                    {isDeclined ? "NO ASISTIRÉ" : "DECLINAR"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
