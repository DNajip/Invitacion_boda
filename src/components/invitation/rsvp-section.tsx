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
    <section className="relative w-full max-w-[430px] mx-auto rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)] bg-[#08192D] text-center isolate text-white">
      {/* ============================================================================== */}
      {/* CAPA 1: FONDO PAPEL AZUL NOCHE TEXTURIZADO                                     */}
      {/* ============================================================================== */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/images/wedding/redesign/backgrounds/paper-dark-blue.webp"
          alt="Textura papel azul noche"
          fill
          sizes="(max-width: 768px) 100vw, 480px"
          className="object-cover object-center opacity-95"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#08192D]/70 via-transparent to-[#08192D]/90" />
      </div>

      {/* ============================================================================== */}
      {/* CAPA 2: MARCO RECTANGULAR DORADO CON ESQUINAS ORNAMENTALES (LIMPIO)           */}
      {/* ============================================================================== */}
      <div className="absolute inset-0 pointer-events-none z-10 p-2 sm:p-2.5">
        <div className="relative w-full h-full">
          <Image
            src="/images/wedding/redesign/frames/frame-rect-clean-perfect.webp"
            alt="Marco dorado ornamental"
            fill
            className="object-fill"
            priority
          />
        </div>
      </div>

      {/* ============================================================================== */}
      {/* CAPA 3: COMPOSICIONES FLORALES INDEPENDIENTES (ESQUINAS TL Y BR)              */}
      {/* ============================================================================== */}
      <div className="absolute -top-3 -left-3 w-32 sm:w-38 h-32 sm:h-38 pointer-events-none select-none z-20">
        <Image
          src="/images/wedding/redesign/floral/floral-corner-tl.webp"
          alt="Flores esquina superior izquierda"
          width={1284}
          height={1225}
          className="w-full h-full object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.7)]"
          priority
        />
      </div>

      <div className="absolute -bottom-3 -right-3 w-32 sm:w-38 h-32 sm:h-38 pointer-events-none select-none z-20">
        <Image
          src="/images/wedding/redesign/floral/floral-corner-br.webp"
          alt="Flores esquina inferior derecha"
          width={1284}
          height={1225}
          className="w-full h-full object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.7)]"
        />
      </div>

      {/* ============================================================================== */}
      {/* CAPA 4: CONTENIDO INTERACTIVO RSVP                                             */}
      {/* ============================================================================== */}
      <div className="relative z-30 flex flex-col items-center px-6 sm:px-8 pt-20 sm:pt-24 pb-20 sm:pb-24 text-center space-y-3.5 max-w-[320px] mx-auto">
        {/* Sello de cera dorado ornamental */}
        <div className="w-10 h-10 mx-auto relative drop-shadow-[0_4px_10px_rgba(200,165,105,0.4)]">
          <Image
            src="/assets/templates/romantic-garden/wax-seal.webp"
            alt="Sello de cera D&F"
            fill
            sizes="40px"
            className="object-contain"
          />
        </div>

        <p className="font-cinzel text-[10px] sm:text-[10.5px] tracking-[0.28em] text-[#C8A569] uppercase font-bold">
          CONFIRMACIÓN DE ASISTENCIA
        </p>

        <h2 className="font-serif italic font-normal text-3xl sm:text-4xl text-white tracking-wide leading-tight drop-shadow-md">
          ¿Nos Acompañarás?
        </h2>

        {/* Separador con rombo */}
        <div className="w-24 h-1.5 mx-auto relative opacity-75">
          <Image
            src="/images/wedding/redesign/ornaments/separator-gold-diamond.webp"
            alt="Separador dorado"
            fill
            className="object-contain"
          />
        </div>

        <p className="font-serif italic text-xs sm:text-[12.5px] text-[#E1D3BF] max-w-xs mx-auto leading-relaxed">
          Por favor confirma la asistencia de cada una de las personas autorizadas en tu invitación.
        </p>

        {rsvpDeadlineString && (
          <p className="font-cinzel text-[9.5px] text-[#E5C388] font-bold tracking-widest pt-0.5">
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
            className={`p-2.5 rounded-xl text-xs flex items-center justify-center gap-2 w-full max-w-xs mx-auto shadow-md ${
              notification.type === "success"
                ? "bg-emerald-950/85 border border-emerald-500/50 text-emerald-200"
                : "bg-red-950/85 border border-red-500/50 text-red-200"
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
        <div className="space-y-2.5 pt-1 w-full max-w-[320px] mx-auto">
          {guests.map((guest) => {
            const isConfirmed = guest.rsvp_status === "confirmed";
            const isDeclined = guest.rsvp_status === "declined";
            const isThisLoading = isPending && activeGuestId === guest.id;

            return (
              <div
                key={guest.id}
                className="bg-[#0A1D33]/90 border border-[#C8A569]/40 rounded-2xl p-3 sm:p-3.5 text-left shadow-[0_4px_16px_rgba(0,0,0,0.5)] space-y-2.5 backdrop-blur-sm"
              >
                <div>
                  <h3 className="font-serif font-bold text-base text-white">
                    {guest.full_name}
                  </h3>
                  <p className="font-cinzel text-[9px] text-[#C8A569] tracking-wider mt-0.5">
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

                {/* Botones de Confirmar / Declinar */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    disabled={isThisLoading || (!allowUpdates && isConfirmed)}
                    onClick={() => handleRsvp(guest.id, "confirmed")}
                    className={`py-2 px-3 rounded-xl text-[10.5px] sm:text-[11px] font-cinzel font-semibold tracking-wider flex items-center justify-center gap-1.5 transition cursor-pointer disabled:opacity-50 ${
                      isConfirmed
                        ? "bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-md shadow-emerald-900/50 border border-emerald-400"
                        : "bg-[#0A1726] border border-emerald-500/40 text-emerald-300 hover:bg-emerald-950/50 active:scale-95"
                    }`}
                  >
                    {isThisLoading ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Check className="w-3.5 h-3.5" />
                    )}
                    {isConfirmed ? "ASISTIRÉ" : "ASISTIRÉ"}
                  </button>

                  <button
                    type="button"
                    disabled={isThisLoading || (!allowUpdates && isDeclined)}
                    onClick={() => handleRsvp(guest.id, "declined")}
                    className={`py-2 px-3 rounded-xl text-[10.5px] sm:text-[11px] font-cinzel font-semibold tracking-wider flex items-center justify-center gap-1.5 transition cursor-pointer disabled:opacity-50 ${
                      isDeclined
                        ? "bg-gradient-to-r from-red-700 to-red-800 text-white shadow-md shadow-red-900/50 border border-red-400"
                        : "bg-[#0A1726] border border-red-500/40 text-red-300 hover:bg-red-950/50 active:scale-95"
                    }`}
                  >
                    <X className="w-3.5 h-3.5" />
                    {isDeclined ? "DECLINADO" : "DECLINAR"}
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
