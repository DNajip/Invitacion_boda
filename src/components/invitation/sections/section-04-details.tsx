"use client";

import Image from "next/image";
import { WeddingSettings } from "@/types/wedding";

interface Props {
  settings: WeddingSettings;
}

export default function Section04Details({ settings }: Props) {
  return (
    <section className="relative w-full max-w-[440px] mx-auto rounded-[32px] bg-gradient-to-b from-[#081729] via-[#0E2035] to-[#081729] p-4 sm:p-5 text-center shadow-[0_20px_50px_rgba(0,0,0,0.6)] border border-[#C8A569]/40 overflow-hidden text-white">
      {/* Filetes dorados dobles */}
      <div className="absolute inset-[8px] rounded-[24px] border border-[#C8A569]/30 pointer-events-none z-10" />
      <div className="absolute inset-[13px] rounded-[19px] border border-[#C8A569]/15 pointer-events-none z-10" />

      {/* ============================================================================== */}
      {/* COMPOSICIONES FLORALES NUPCIALES EN LAS 4 ESQUINAS                              */}
      {/* ============================================================================== */}
      {/* Esquina Superior Izquierda */}
      <div className="absolute -top-4 sm:-top-5 -left-4 sm:-left-5 w-[115px] sm:w-[135px] h-[110px] sm:h-[130px] pointer-events-none select-none z-20">
        <Image
          src="/assets/templates/romantic-garden/floral-corner-tl.webp"
          alt="Esquina floral superior izquierda"
          width={1284}
          height={1225}
          className="w-full h-full object-contain drop-shadow-[0_4px_14px_rgba(0,0,0,0.5)]"
        />
      </div>

      {/* Esquina Superior Derecha */}
      <div className="absolute -top-4 sm:-top-5 -right-4 sm:-right-5 w-[115px] sm:w-[135px] h-[110px] sm:h-[130px] pointer-events-none select-none z-20">
        <Image
          src="/assets/templates/romantic-garden/floral-corner-tr.webp"
          alt="Esquina floral superior derecha"
          width={1284}
          height={1225}
          className="w-full h-full object-contain drop-shadow-[0_4px_14px_rgba(0,0,0,0.5)]"
        />
      </div>

      {/* Esquina Inferior Izquierda */}
      <div className="absolute -bottom-4 sm:-bottom-5 -left-4 sm:-left-5 w-[115px] sm:w-[135px] h-[110px] sm:h-[130px] pointer-events-none select-none z-20">
        <Image
          src="/assets/templates/romantic-garden/floral-corner-bl.webp"
          alt="Esquina floral inferior izquierda"
          width={1284}
          height={1225}
          className="w-full h-full object-contain drop-shadow-[0_4px_14px_rgba(0,0,0,0.5)]"
        />
      </div>

      {/* Esquina Inferior Derecha */}
      <div className="absolute -bottom-4 sm:-bottom-5 -right-4 sm:-right-5 w-[115px] sm:w-[135px] h-[110px] sm:h-[130px] pointer-events-none select-none z-20">
        <Image
          src="/assets/templates/romantic-garden/floral-corner-br.webp"
          alt="Esquina floral inferior derecha"
          width={1284}
          height={1225}
          className="w-full h-full object-contain drop-shadow-[0_4px_14px_rgba(0,0,0,0.5)]"
        />
      </div>

      <div className="relative z-10 space-y-4 pt-6 pb-2">
        <div>
          <p className="font-cinzel text-[10px] sm:text-[11px] tracking-[0.25em] text-[#C8A569] uppercase font-semibold">
            INFORMACIÓN IMPORTANTE
          </p>
          <h2 className="font-serif italic font-normal text-3xl sm:text-4xl text-white tracking-wide mt-1 drop-shadow-md">
            Pequeños Detalles
          </h2>
        </div>

        {/* 1. SOLO ADULTOS — CON COPAS DE CHAMPAÑA FOTORREALISTAS */}
        <div className="bg-[#0A1D33]/90 border border-[#C8A569]/35 rounded-2xl p-4 sm:p-4.5 shadow-md space-y-2 backdrop-blur-sm">
          <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto relative drop-shadow-md">
            <Image
              src="/assets/templates/romantic-garden/champagne-glasses.webp"
              alt="Copas de champaña"
              fill
              sizes="80px"
              className="object-contain"
            />
          </div>
          <h3 className="font-serif italic font-bold text-lg sm:text-xl text-white">
            {settings.special_adults_title || "Una velada solo para adultos"}
          </h3>
          <p className="font-serif text-[14px] sm:text-[15px] text-[#E1D3BF] max-w-sm mx-auto leading-relaxed">
            {settings.special_adults_text ||
              "Aunque los pequeños ocupan un lugar especial en nuestros corazones, en esta ocasión hemos preparado una celebración exclusiva para adultos. Agradecemos de corazón tu comprensión."}
          </p>
        </div>

        {/* Separador rombo */}
        <div className="flex items-center justify-center gap-2 py-0.5">
          <div className="w-12 h-px bg-[#C8A569]/40" />
          <div className="w-1.5 h-1.5 rotate-45 border border-[#C8A569] bg-[#0E2035]" />
          <div className="w-12 h-px bg-[#C8A569]/40" />
        </div>

        {/* 2. LLUVIA DE SOBRES — CON BUZÓN DE REGALOS Y SOBRES BLANCOS FOTORREALISTAS */}
        <div className="bg-[#0A1D33]/90 border border-[#C8A569]/35 rounded-2xl p-4 sm:p-4.5 shadow-md space-y-2 backdrop-blur-sm">
          <div className="flex items-center justify-center gap-2">
            <div className="w-16 h-16 sm:w-20 sm:h-20 relative drop-shadow-md">
              <Image
                src="/assets/templates/romantic-garden/gift-mailbox.webp"
                alt="Buzón de regalos de cristal"
                fill
                sizes="80px"
                className="object-contain"
              />
            </div>
            <div className="w-16 h-14 sm:w-20 sm:h-16 relative drop-shadow-md -ml-3">
              <Image
                src="/assets/templates/romantic-garden/white-envelopes.webp"
                alt="Sobres blancos con sello"
                fill
                sizes="80px"
                className="object-contain"
              />
            </div>
          </div>

          <h3 className="font-serif italic font-bold text-lg sm:text-xl text-white">
            {settings.special_envelope_title || "Lluvia de sobres"}
          </h3>
          <p className="font-serif text-[14px] sm:text-[15px] text-[#E1D3BF] max-w-sm mx-auto leading-relaxed">
            {settings.special_envelope_text ||
              "Tu presencia es nuestro mejor regalo. Si deseas tener un detalle con nosotros, agradeceremos una contribución monetaria en lugar de regalos materiales. Durante la recepción encontrarás sobres y un buzón especialmente preparado para esta ocasión."}
          </p>
        </div>
      </div>
    </section>
  );
}
