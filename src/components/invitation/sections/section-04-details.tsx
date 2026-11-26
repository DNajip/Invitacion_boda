"use client";

import Image from "next/image";
import { WeddingSettings } from "@/types/wedding";

interface Props {
  settings: WeddingSettings;
}

export default function Section04Details({ settings }: Props) {
  return (
    <section className="relative w-full max-w-[440px] mx-auto rounded-[32px] bg-gradient-to-b from-[#081729] via-[#0E2035] to-[#081729] p-6 sm:p-8 text-center shadow-[0_20px_50px_rgba(0,0,0,0.6)] border border-[#C8A569]/40 overflow-hidden text-white">
      {/* Filetes dorados dobles */}
      <div className="absolute inset-[8px] rounded-[24px] border border-[#C8A569]/30 pointer-events-none z-10" />
      <div className="absolute inset-[13px] rounded-[19px] border border-[#C8A569]/15 pointer-events-none z-10" />

      {/* Ramillete floral superior esquinero */}
      <div className="absolute -top-6 -right-6 w-24 sm:w-28 h-20 pointer-events-none select-none z-20 scale-x-[-1] opacity-85">
        <Image
          src="/assets/templates/romantic-garden/floral-composition.webp"
          alt="Flores y hojas doradas"
          width={1774}
          height={887}
          className="w-full h-full object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.7)]"
        />
      </div>

      <div className="relative z-10 space-y-7 pt-9 pb-3">
        <div>
          <p className="font-cinzel text-[10px] sm:text-[11px] tracking-[0.25em] text-[#C8A569] uppercase font-semibold">
            INFORMACIÓN IMPORTANTE
          </p>
          <h2 className="font-serif italic font-normal text-3xl sm:text-4xl text-white tracking-wide mt-1 drop-shadow-md">
            Pequeños Detalles
          </h2>
        </div>

        {/* 1. SOLO ADULTOS — CON COPAS DE CHAMPAÑA FOTORREALISTAS */}
        <div className="bg-[#0A1D33]/90 border border-[#C8A569]/35 rounded-2xl p-5 shadow-md space-y-3 backdrop-blur-sm">
          <div className="w-24 h-24 mx-auto relative drop-shadow-md">
            <Image
              src="/assets/templates/romantic-garden/champagne-glasses.webp"
              alt="Copas de champaña"
              fill
              sizes="96px"
              className="object-contain"
            />
          </div>
          <h3 className="font-serif italic font-bold text-xl text-white">
            {settings.special_adults_title || "Recepción solo para adultos"}
          </h3>
          <p className="font-serif text-xs sm:text-[13px] text-[#E1D3BF] max-w-xs mx-auto leading-relaxed">
            {settings.special_adults_text ||
              "Amamos a tus pequeños, pero queremos que disfrutes de una noche de total relajación y celebración entre adultos."}
          </p>
        </div>

        {/* Separador rombo */}
        <div className="flex items-center justify-center gap-2">
          <div className="w-16 h-px bg-[#C8A569]/40" />
          <div className="w-2 h-2 rotate-45 border border-[#C8A569] bg-[#0E2035]" />
          <div className="w-16 h-px bg-[#C8A569]/40" />
        </div>

        {/* 2. LLUVIA DE SOBRES — CON BUZÓN DE REGALOS Y SOBRES BLANCOS FOTORREALISTAS */}
        <div className="bg-[#0A1D33]/90 border border-[#C8A569]/35 rounded-2xl p-5 shadow-md space-y-3 backdrop-blur-sm">
          <div className="flex items-center justify-center gap-3">
            <div className="w-24 h-24 relative drop-shadow-md">
              <Image
                src="/assets/templates/romantic-garden/gift-mailbox.webp"
                alt="Buzón de regalos de cristal"
                fill
                sizes="96px"
                className="object-contain"
              />
            </div>
            <div className="w-24 h-20 relative drop-shadow-md -ml-4">
              <Image
                src="/assets/templates/romantic-garden/white-envelopes.webp"
                alt="Sobres blancos con sello"
                fill
                sizes="96px"
                className="object-contain"
              />
            </div>
          </div>

          <h3 className="font-serif italic font-bold text-xl text-white">
            {settings.special_envelope_title || "Lluvia de Sobres"}
          </h3>
          <p className="font-serif text-xs sm:text-[13px] text-[#E1D3BF] max-w-xs mx-auto leading-relaxed">
            {settings.special_envelope_text ||
              "Tu presencia es nuestro mejor regalo. Si deseas hacernos un presente, dispondremos de un buzón para tu muestra de cariño en sobre."}
          </p>
        </div>
      </div>
    </section>
  );
}
