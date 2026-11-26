"use client";

import Image from "next/image";
import { WeddingSettings } from "@/types/wedding";

interface Props {
  settings: WeddingSettings;
}

export default function Section04Details({ settings }: Props) {
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
      {/* CAPA 3: COMPOSICIONES FLORALES FOTORREALISTAS EN LAS 4 ESQUINAS                */}
      {/* ============================================================================== */}
      {/* Esquina Superior Izquierda */}
      <div className="absolute -top-3 -left-3 w-36 sm:w-42 h-36 sm:h-42 pointer-events-none select-none z-20">
        <Image
          src="/images/wedding/redesign/floral/floral-corner-tl.webp"
          alt="Flores esquina sup. izq."
          width={1284}
          height={1225}
          className="w-full h-full object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.7)]"
          priority
        />
      </div>

      {/* Esquina Superior Derecha */}
      <div className="absolute -top-3 -right-3 w-36 sm:w-42 h-36 sm:h-42 pointer-events-none select-none z-20">
        <Image
          src="/images/wedding/redesign/floral/floral-corner-tr.webp"
          alt="Flores esquina sup. der."
          width={1284}
          height={1225}
          className="w-full h-full object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.7)]"
          priority
        />
      </div>

      {/* Esquina Inferior Izquierda */}
      <div className="absolute -bottom-4 -left-4 w-40 sm:w-46 h-40 sm:h-46 pointer-events-none select-none z-20">
        <Image
          src="/images/wedding/redesign/floral/floral-corner-bl.webp"
          alt="Flores esquina inf. izq."
          width={1284}
          height={1225}
          className="w-full h-full object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.7)]"
        />
      </div>

      {/* Esquina Inferior Derecha */}
      <div className="absolute -bottom-4 -right-4 w-40 sm:w-46 h-40 sm:h-46 pointer-events-none select-none z-20">
        <Image
          src="/images/wedding/redesign/floral/floral-corner-br.webp"
          alt="Flores esquina inf. der."
          width={1284}
          height={1225}
          className="w-full h-full object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.7)]"
        />
      </div>

      {/* ============================================================================== */}
      {/* CAPA 4: CONTENIDO EDITORIAL DE PEQUEÑOS DETALLES                               */}
      {/* ============================================================================== */}
      <div className="relative z-30 flex flex-col items-center px-6 sm:px-8 pt-20 sm:pt-24 pb-20 sm:pb-24 text-center space-y-4 max-w-[320px] mx-auto">
        {/* Cabecera */}
        <div>
          <p className="font-cinzel text-[10px] sm:text-[10.5px] tracking-[0.28em] text-[#C8A569] uppercase font-bold mb-1">
            INFORMACIÓN IMPORTANTE
          </p>
          <h2 className="font-serif italic font-normal text-3xl sm:text-4xl text-white tracking-wide leading-tight drop-shadow-md">
            Pequeños Detalles
          </h2>
        </div>

        {/* Separador con rombo */}
        <div className="w-24 h-1.5 mx-auto relative opacity-75">
          <Image
            src="/images/wedding/redesign/ornaments/separator-gold-diamond.webp"
            alt="Separador dorado"
            fill
            className="object-contain"
          />
        </div>

        {/* ============================================================================ */}
        {/* TARJETA 1: SOLO ADULTOS CON COPAS DE CHAMPAÑA                               */}
        {/* ============================================================================ */}
        <div className="w-full bg-[#0A1D33]/85 border border-[#C8A569]/40 rounded-2xl p-4 sm:p-5 shadow-[0_4px_20px_rgba(0,0,0,0.5)] space-y-2.5 backdrop-blur-sm">
          <div className="w-24 h-20 mx-auto relative drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
            <Image
              src="/assets/templates/romantic-garden/champagne-glasses.webp"
              alt="Copas de champaña"
              fill
              sizes="96px"
              className="object-contain"
            />
          </div>

          <h3 className="font-serif italic font-normal text-xl sm:text-2xl text-white">
            {settings.special_adults_title || "Una velada solo para adultos"}
          </h3>

          <p className="font-serif text-xs sm:text-[12px] text-[#E1D3BF] max-w-xs mx-auto leading-relaxed">
            {settings.special_adults_text ||
              "Aunque los pequeños ocupan un lugar especial en nuestros corazones, en esta ocasión hemos preparado una celebración exclusiva para adultos. Agradecemos de corazón tu comprensión."}
          </p>
        </div>

        {/* Separador fino entre tarjetas */}
        <div className="w-20 h-1 mx-auto relative opacity-60">
          <Image
            src="/images/wedding/redesign/ornaments/separator-gold-diamond.webp"
            alt="Separador"
            fill
            className="object-contain"
          />
        </div>

        {/* ============================================================================ */}
        {/* TARJETA 2: LLUVIA DE SOBRES CON BUZÓN Y SOBRES BLANCOS                      */}
        {/* ============================================================================ */}
        <div className="w-full bg-[#0A1D33]/85 border border-[#C8A569]/40 rounded-2xl p-4 sm:p-5 shadow-[0_4px_20px_rgba(0,0,0,0.5)] space-y-2.5 backdrop-blur-sm">
          <div className="flex items-center justify-center gap-2">
            <div className="w-20 h-20 relative drop-shadow-md">
              <Image
                src="/assets/templates/romantic-garden/gift-mailbox.webp"
                alt="Buzón de regalos de cristal"
                fill
                sizes="80px"
                className="object-contain"
              />
            </div>
            <div className="w-20 h-16 relative drop-shadow-md -ml-3">
              <Image
                src="/assets/templates/romantic-garden/white-envelopes.webp"
                alt="Sobres blancos con sello"
                fill
                sizes="80px"
                className="object-contain"
              />
            </div>
          </div>

          <h3 className="font-serif italic font-normal text-xl sm:text-2xl text-white">
            {settings.special_envelope_title || "Lluvia de sobres"}
          </h3>

          <p className="font-serif text-xs sm:text-[12px] text-[#E1D3BF] max-w-xs mx-auto leading-relaxed">
            {settings.special_envelope_text ||
              "Tu presencia es nuestro mejor regalo. Si deseas tener un detalle con nosotros, agradeceremos una contribución monetaria en lugar de regalos materiales. Durante la recepción encontrarás sobres y un buzón especialmente preparado para esta ocasión."}
          </p>
        </div>

        {/* Separador con corazón central */}
        <div className="flex items-center justify-center gap-2 pt-1 w-32">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#C8A569]/50 to-[#C8A569]" />
          <span className="text-[#E5C388] text-xs">♡</span>
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#C8A569]/50 to-[#C8A569]" />
        </div>
      </div>
    </section>
  );
}
