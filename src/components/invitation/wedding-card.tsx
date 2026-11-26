"use client";

import { useEffect, useRef, useState } from "react";
import Section00Cover from "@/components/invitation/sections/section-00-cover";
import Section01Welcome from "@/components/invitation/sections/section-01-welcome";
import Section02Countdown from "@/components/invitation/sections/section-02-countdown";
import Section03Locations from "@/components/invitation/sections/section-03-locations";
import Section04Details from "@/components/invitation/sections/section-04-details";
import Section05Dresscode from "@/components/invitation/sections/section-05-dresscode";
import RsvpSection from "@/components/invitation/rsvp-section";
import Section08Closing from "@/components/invitation/sections/section-08-closing";
import AudioPlayer, { AudioPlayerRef } from "@/components/invitation/audio-player";
import AmbientStardust from "@/components/ornaments/ambient-stardust";
import ScrollReveal from "@/components/invitation/scroll-reveal";
import { InvitationFullData } from "@/types/wedding";

interface Props {
  data: InvitationFullData;
}

export default function WeddingCard({ data }: Props) {
  const { invitation, wedding, settings, guests } = data;
  const audioPlayerRef = useRef<AudioPlayerRef | null>(null);

  // Estado de apertura del sobre
  const [isOpen, setIsOpen] = useState(false);
  const welcomeRef = useRef<HTMLDivElement | null>(null);

  // Inhabilitar scroll hacia las demás tarjetas hasta que se abra el sobre
  useEffect(() => {
    if (!isOpen) {
      const originalBodyOverflow = document.body.style.overflow;
      const originalHtmlOverflow = document.documentElement.style.overflow;
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";

      const preventScroll = (e: Event) => {
        e.preventDefault();
      };

      window.addEventListener("wheel", preventScroll, { passive: false });
      window.addEventListener("touchmove", preventScroll, { passive: false });

      return () => {
        document.body.style.overflow = originalBodyOverflow;
        document.documentElement.style.overflow = originalHtmlOverflow;
        window.removeEventListener("wheel", preventScroll);
        window.removeEventListener("touchmove", preventScroll);
      };
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
  }, [isOpen]);

  const handleOpenInvitation = () => {
    setIsOpen(true);
    // Iniciar música con fade-in
    audioPlayerRef.current?.startAudioWithFade();
    // Desplazamiento suave hacia la sección de bienvenida una vez emergida la tarjeta
    setTimeout(() => {
      welcomeRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 950);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const groom = wedding.groom_name || "Daren";
  const bride = wedding.bride_name || "Fabiola";
  const monogram = wedding.monogram || "D&F";
  const weddingDateStr = wedding.wedding_date || "2026-12-19T17:00:00-06:00";

  return (
    <div className={`min-h-screen bg-[#070D16] text-white flex flex-col items-center px-3 sm:px-4 relative font-sans selection:bg-[#C8A569] selection:text-[#10243B] ${isOpen ? "py-6" : "py-2 sm:py-6 justify-center"}`}>
      {/* Música ambiental con control flotante */}
      <AudioPlayer ref={audioPlayerRef} audioSrc={settings.music_url || "/audio/ambient-romance.wav"} />

      {/* Partículas de polvo de oro y destellos ambientales a 60 FPS */}
      <AmbientStardust />

      {/* Iluminación ambiental difusa de fondo */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-[#C8A569]/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#10243B]/40 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md mx-auto relative z-10">
        {/* ============================================================================== */}
        {/* SECCIÓN 00: PORTADA Y SOBRE 3D INTERACTIVO */}
        {/* ============================================================================== */}
        <Section00Cover
          groom={groom}
          bride={bride}
          monogram={monogram}
          recipientName={invitation.recipient_name}
          authorizedCount={invitation.authorized_count}
          onOpen={handleOpenInvitation}
          isOpen={isOpen}
        />

        {/* ============================================================================== */}
        {/* SECCIONES 01 A 08: BLOQUEADAS HASTA QUE SE ABRA LA INVITACIÓN                 */}
        {/* ============================================================================== */}
        <div
          className={`space-y-10 transition-opacity duration-1000 ${
            isOpen
              ? "opacity-100 visible h-auto mt-10"
              : "opacity-0 invisible h-0 overflow-hidden pointer-events-none select-none"
          }`}
          aria-hidden={!isOpen}
        >
          {/* ============================================================================== */}
          {/* SECCIÓN 01: BIENVENIDA EDITORIAL CON TARJETA DE ALGODÓN Y LIRIOS */}
          {/* ============================================================================== */}
          <div ref={welcomeRef}>
            <ScrollReveal>
              <Section01Welcome groom={groom} bride={bride} />
            </ScrollReveal>
          </div>

          {/* ============================================================================== */}
          {/* SECCIÓN 02: FECHA Y CUENTA REGRESIVA CON CINTA DORADA */}
          {/* ============================================================================== */}
          <ScrollReveal>
            <Section02Countdown targetDateString={weddingDateStr} />
          </ScrollReveal>

          {/* ============================================================================== */}
          {/* SECCIÓN 03: CEREMONIA RELIGIOSA Y RECEPCIÓN CON FOTOGRAFÍA Y GOOGLE MAPS */}
          {/* ============================================================================== */}
          <ScrollReveal>
            <Section03Locations settings={settings} />
          </ScrollReveal>

          {/* ============================================================================== */}
          {/* SECCIÓN 04: DETALLES ESPECIALES (COPAS DE CHAMPAÑA, BUZÓN DE REGALOS Y SOBRES) */}
          {/* ============================================================================== */}
          <ScrollReveal>
            <Section04Details settings={settings} />
          </ScrollReveal>

          {/* ============================================================================== */}
          {/* SECCIÓN 05: CÓDIGO DE VESTIMENTA Y COLORES RESERVADOS */}
          {/* ============================================================================== */}
          <ScrollReveal>
            <Section05Dresscode settings={settings} />
          </ScrollReveal>

          {/* ============================================================================== */}
          {/* SECCIÓN 06: CONFIRMACIÓN DE ASISTENCIA (RSVP) */}
          {/* ============================================================================== */}
          <ScrollReveal>
            <RsvpSection
              token={invitation.token}
              initialGuests={guests}
              rsvpDeadlineString={settings.rsvp_deadline}
              allowUpdates={settings.allow_rsvp_updates}
            />
          </ScrollReveal>

          {/* ============================================================================== */}
          {/* SECCIÓN 07: DESPEDIDA CON ARCO FLORAL MONUMENTAL */}
          {/* ============================================================================== */}
          <ScrollReveal>
            <Section08Closing
              groom={groom}
              bride={bride}
              onScrollToTop={scrollToTop}
            />
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
