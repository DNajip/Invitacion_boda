"use client";

import { useRef, useState } from "react";
import Section00Cover from "@/components/invitation/sections/section-00-cover";
import Section01Welcome from "@/components/invitation/sections/section-01-welcome";
import Section02Countdown from "@/components/invitation/sections/section-02-countdown";
import AudioPlayer, { AudioPlayerRef } from "@/components/invitation/audio-player";
import RsvpSection from "@/components/invitation/rsvp-section";
import TableAssignedSection from "@/components/invitation/table-assigned-section";
import { ChurchIcon, ChampagneIcon, MailboxIcon, SuitAndDressIllustration } from "@/components/ornaments/event-icons";
import FloralCorner from "@/components/ornaments/floral-corner";
import GoldenGlyph from "@/components/ornaments/golden-glyph";
import { InvitationFullData } from "@/types/wedding";
import { MapPin, ArrowUp } from "lucide-react";

interface Props {
  data: InvitationFullData;
}

export default function WeddingCard({ data }: Props) {
  const { invitation, wedding, settings, guests, assigned_table } = data;
  const audioPlayerRef = useRef<AudioPlayerRef | null>(null);

  // Estado de apertura del sobre
  const [isOpen, setIsOpen] = useState(false);
  const welcomeRef = useRef<HTMLDivElement | null>(null);

  const handleOpenInvitation = () => {
    setIsOpen(true);
    // Iniciar música con fade-in
    audioPlayerRef.current?.startAudioWithFade();
    // Desplazamiento suave hacia la sección de bienvenida
    setTimeout(() => {
      welcomeRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 600);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const groom = wedding.groom_name || "Daren";
  const bride = wedding.bride_name || "Fabiola";
  const monogram = wedding.monogram || "D&F";
  const weddingDateStr = wedding.wedding_date || "2026-12-19T17:00:00-06:00";

  return (
    <div className="min-h-screen bg-[#070D16] text-white flex flex-col items-center py-6 px-3 sm:px-4 relative font-sans selection:bg-[#C8A569] selection:text-[#10243B]">
      {/* Música ambiental con control flotante */}
      <AudioPlayer ref={audioPlayerRef} audioSrc={settings.music_url || "/audio/ambient-romance.mp3"} />

      {/* Partículas doradas sutiles en el fondo */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-[#C8A569]/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#10243B]/40 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md mx-auto space-y-8 relative z-10">
        {/* ============================================================================== */}
        {/* SECCIÓN 00: PORTADA Y SOBRE CERRADO FOTORREALISTA */}
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
        {/* SECCIÓN 01: BIENVENIDA EDITORIAL */}
        {/* ============================================================================== */}
        <div ref={welcomeRef}>
          <Section01Welcome groom={groom} bride={bride} />
        </div>

        {/* ============================================================================== */}
        {/* SECCIÓN 02: FECHA Y CUENTA REGRESIVA EN TIEMPO REAL */}
        {/* ============================================================================== */}
        <Section02Countdown targetDateString={weddingDateStr} />

        {/* ============================================================================== */}
        {/* SECCIÓN 03: CEREMONIA RELIGIOSA Y RECEPCIÓN (CON ENLACES GOOGLE MAPS) */}
        {/* ============================================================================== */}
        <section className="relative w-full bg-[#FAF7F0] text-[#10243B] border border-[#D8C39E] rounded-3xl p-6 sm:p-8 text-center shadow-2xl overflow-hidden ornamental-card">
          <FloralCorner position="top-left" className="absolute top-0 left-0" />
          <FloralCorner position="bottom-right" className="absolute bottom-0 right-0" />

          <div className="relative z-10 space-y-6 py-3">
            <div>
              <p className="text-[11px] uppercase tracking-widest text-[#8C6D37] font-semibold">
                NUESTRO GRAN DÍA
              </p>
              <h2 className="text-2xl sm:text-3xl font-serif italic font-bold text-[#10243B] mt-1">
                Celebramos juntos
              </h2>
            </div>

            {/* Ceremonia religiosa */}
            <div className="space-y-2.5">
              <ChurchIcon className="w-12 h-12" />
              <h3 className="text-xl font-serif italic font-bold text-[#10243B]">
                Ceremonia religiosa
              </h3>
              <p className="text-lg font-serif font-bold text-[#8C6D37]">
                {settings.ceremony_time}
              </p>
              <p className="text-sm font-semibold text-[#10243B]">
                {settings.ceremony_venue}
              </p>
              <p className="text-xs text-[#2D3A4B] max-w-xs mx-auto leading-relaxed">
                {settings.ceremony_description}
              </p>
              {settings.ceremony_maps_url && (
                <a
                  href={settings.ceremony_maps_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#10243B] text-white hover:bg-[#1a385c] text-xs font-medium transition shadow-md"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#E5C388]" />
                  Ver ubicación en Google Maps
                </a>
              )}
            </div>

            <div className="w-32 h-px bg-[#D8C39E] mx-auto my-4" />

            {/* Recepción */}
            <div className="space-y-2.5">
              <ChampagneIcon className="w-12 h-12" />
              <h3 className="text-xl font-serif italic font-bold text-[#10243B]">
                Recepción
              </h3>
              <p className="text-lg font-serif font-bold text-[#8C6D37]">
                {settings.reception_time}
              </p>
              <p className="text-sm font-semibold text-[#10243B]">
                {settings.reception_venue}
              </p>
              <p className="text-xs text-[#2D3A4B] max-w-xs mx-auto leading-relaxed">
                {settings.reception_description}
              </p>
              {settings.reception_maps_url && (
                <a
                  href={settings.reception_maps_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#10243B] text-white hover:bg-[#1a385c] text-xs font-medium transition shadow-md"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#E5C388]" />
                  Ver ubicación en Google Maps
                </a>
              )}
            </div>
          </div>
        </section>

        {/* ============================================================================== */}
        {/* SECCIÓN 04: DETALLES ESPECIALES (ADULTOS & LLUVIA DE SOBRES) */}
        {/* ============================================================================== */}
        <section className="relative w-full bg-[#FAF7F0] text-[#10243B] border border-[#D8C39E] rounded-3xl p-6 sm:p-8 text-center shadow-2xl overflow-hidden ornamental-card">
          <FloralCorner position="top-left" className="absolute top-0 left-0" />
          <FloralCorner position="bottom-right" className="absolute bottom-0 right-0" />

          <div className="relative z-10 space-y-6 py-3">
            <div>
              <p className="text-[11px] uppercase tracking-widest text-[#8C6D37] font-semibold">
                CON AMOR Y CARIÑO
              </p>
              <h2 className="text-2xl sm:text-3xl font-serif italic font-bold text-[#10243B] mt-1">
                Pequeños detalles
              </h2>
            </div>

            {/* Solo Adultos */}
            <div className="space-y-2">
              <ChampagneIcon className="w-10 h-10" />
              <h3 className="text-lg font-serif italic font-bold text-[#10243B]">
                {settings.special_adults_title}
              </h3>
              <p className="text-xs text-[#2D3A4B] max-w-xs mx-auto leading-relaxed">
                {settings.special_adults_text}
              </p>
            </div>

            <div className="w-32 h-px bg-[#D8C39E] mx-auto my-2" />

            {/* Lluvia de sobres */}
            <div className="space-y-2">
              <MailboxIcon className="w-10 h-10" />
              <h3 className="text-lg font-serif italic font-bold text-[#10243B]">
                {settings.special_envelope_title}
              </h3>
              <p className="text-xs text-[#2D3A4B] max-w-xs mx-auto leading-relaxed">
                {settings.special_envelope_text}
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================================== */}
        {/* SECCIÓN 05: CÓDIGO DE VESTIMENTA Y COLORES RESERVADOS */}
        {/* ============================================================================== */}
        <section className="relative w-full bg-[#0E1A29] border border-[#C8A569]/40 rounded-3xl p-6 sm:p-8 text-center shadow-2xl overflow-hidden ornamental-card">
          <FloralCorner position="top-left" className="absolute top-0 left-0" />
          <FloralCorner position="bottom-right" className="absolute bottom-0 right-0" />

          <div className="relative z-10 space-y-4 py-3">
            <p className="text-[11px] uppercase tracking-widest text-[#C8A569] font-medium">
              DRESSCODE
            </p>
            <h2 className="text-2xl sm:text-3xl font-serif italic text-white leading-tight">
              {settings.dresscode_title}
            </h2>

            {/* Ilustración de traje y vestido */}
            <SuitAndDressIllustration />

            <div className="space-y-1">
              <h3 className="text-base font-serif font-bold text-[#E5C388]">
                {settings.dresscode_subtitle}
              </h3>
              <p className="text-xs text-neutral-300 max-w-xs mx-auto leading-relaxed">
                {settings.dresscode_description}
              </p>
            </div>

            <div className="w-24 h-px bg-[#C8A569]/40 mx-auto my-3" />

            {/* Colores reservados */}
            <div className="space-y-3 pt-1">
              <h4 className="text-sm font-serif italic text-[#C8A569]">
                Colores reservados
              </h4>
              <p className="text-[11px] text-neutral-300 max-w-xs mx-auto">
                Para mantener la armonía de nuestra celebración, agradecemos evitar los siguientes colores en tu vestimenta.
              </p>

              {/* Círculos tachados */}
              <div className="flex items-center justify-center gap-3 sm:gap-4 pt-2">
                {(settings.restricted_colors || []).map((col, idx) => (
                  <div key={idx} className="flex flex-col items-center">
                    <div className="relative w-11 h-11 rounded-full border-2 border-[#C8A569] shadow-md overflow-hidden flex items-center justify-center">
                      <div
                        className="w-full h-full"
                        style={{ backgroundColor: col.color }}
                      />
                      {/* Línea diagonal tachada dorada */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-full h-[2.5px] bg-[#C8A569] transform -rotate-45 shadow-[0_0_2px_rgba(0,0,0,0.8)]" />
                      </div>
                    </div>
                    <span className="text-[10px] text-neutral-300 mt-1 font-medium">
                      {col.name}
                    </span>
                  </div>
                ))}
              </div>

              <p className="text-[10px] text-neutral-400 italic pt-2">
                Gracias por ayudarnos a cuidar cada detalle de nuestro gran día.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================================== */}
        {/* SECCIÓN 06: CONFIRMACIÓN DE ASISTENCIA (RSVP) */}
        {/* ============================================================================== */}
        <RsvpSection
          token={invitation.token}
          initialGuests={guests}
          rsvpDeadlineString={settings.rsvp_deadline}
          allowUpdates={settings.allow_rsvp_updates}
        />

        {/* ============================================================================== */}
        {/* SECCIÓN 07: DISTRIBUCIÓN DE MESAS */}
        {/* ============================================================================== */}
        <TableAssignedSection
          assignedTable={assigned_table}
          guestNames={guests.map((g) => g.full_name)}
        />

        {/* ============================================================================== */}
        {/* SECCIÓN 08: DESPEDIDA Y AGRADECIMIENTO */}
        {/* ============================================================================== */}
        <section className="relative w-full bg-[#0E1A29] border border-[#C8A569]/40 rounded-3xl p-6 sm:p-8 text-center shadow-2xl overflow-hidden ornamental-card">
          <FloralCorner position="top-left" className="absolute top-0 left-0" />
          <FloralCorner position="bottom-right" className="absolute bottom-0 right-0" />

          <div className="relative z-10 space-y-4 py-4">
            <p className="text-[11px] uppercase tracking-widest text-[#C8A569] font-medium">
              NUESTRO PARA SIEMPRE COMIENZA AQUÍ
            </p>
            <GoldenGlyph />

            <h2 className="text-2xl sm:text-3xl font-serif italic text-white leading-tight">
              Gracias por ser parte de nuestra historia
            </h2>

            <div className="space-y-2.5 max-w-xs mx-auto text-xs text-neutral-300 leading-relaxed">
              <p>
                El amor se hace aún más especial cuando se comparte con las personas que forman parte de nuestra vida.
              </p>
              <p>
                Gracias por acompañarnos en este nuevo comienzo.
              </p>
            </div>

            <div className="w-24 h-px bg-[#C8A569]/40 mx-auto my-3" />

            <div className="space-y-1 pt-1">
              <p className="font-serif italic text-xs text-neutral-400">
                Con todo nuestro amor,
              </p>
              <p className="text-2xl font-serif italic font-bold text-[#E5C388]">
                {groom} & {bride}
              </p>
              <p className="text-xs text-[#C8A569] tracking-wider pt-1">
                19.12.2026
              </p>
            </div>

            {/* Botón Volver a la portada */}
            <div className="pt-4">
              <button
                type="button"
                onClick={scrollToTop}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#E5C388] via-[#C8A569] to-[#B89456] text-[#10243B] text-xs font-bold hover:brightness-110 active:scale-95 transition shadow-lg cursor-pointer"
              >
                <ArrowUp className="w-3.5 h-3.5" />
                Volver a la portada
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
