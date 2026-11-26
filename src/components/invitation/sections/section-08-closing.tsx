"use client";

import Image from "next/image";
import { ArrowUp } from "lucide-react";

interface Props {
  groom: string;
  bride: string;
  onScrollToTop: () => void;
}

export default function Section08Closing({ groom, bride, onScrollToTop }: Props) {
  return (
    <section className="relative w-full max-w-[430px] mx-auto rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)] bg-[#08192D] text-white text-center isolate">
      {/* ============================================================================== */}
      {/* CAPA 1: FONDO PAPEL AZUL NOCHE TEXTURIZADO Y ARCO FLORAL MONUMENTAL            */}
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
      </div>

      {/* Fotografía del Arco Floral de Despedida */}
      <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] z-1">
        <Image
          src="/assets/templates/romantic-garden/floral-arch.webp"
          alt="Arco floral monumental de despedida"
          fill
          sizes="(max-width: 768px) 100vw, 440px"
          className="object-cover object-center select-none"
          priority
        />
        {/* Degradado profundo que funde la foto con el fondo azul noche */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#08192D] via-[#08192D]/40 to-transparent" />
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
      {/* CAPA 3: COMPOSICIONES FLORALES COMPLEMENTARIAS EN LAS 4 ESQUINAS              */}
      {/* ============================================================================== */}
      {/* Esquina Superior Izquierda */}
      <div className="absolute -top-2 -left-2 w-28 sm:w-34 h-28 sm:h-34 pointer-events-none select-none z-20">
        <Image
          src="/images/wedding/redesign/floral/floral-corner-tl.webp"
          alt="Flores sup. izq."
          width={1284}
          height={1225}
          className="w-full h-full object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.7)]"
          priority
        />
      </div>

      {/* Esquina Superior Derecha */}
      <div className="absolute -top-2 -right-2 w-28 sm:w-34 h-28 sm:h-34 pointer-events-none select-none z-20">
        <Image
          src="/images/wedding/redesign/floral/floral-corner-tr.webp"
          alt="Flores sup. der."
          width={1284}
          height={1225}
          className="w-full h-full object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.7)]"
          priority
        />
      </div>

      {/* Esquina Inferior Izquierda */}
      <div className="absolute -bottom-2 -left-2 w-28 sm:w-34 h-28 sm:h-34 pointer-events-none select-none z-20">
        <Image
          src="/images/wedding/redesign/floral/floral-corner-bl.webp"
          alt="Flores inf. izq."
          width={1284}
          height={1225}
          className="w-full h-full object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.7)]"
        />
      </div>

      {/* Esquina Inferior Derecha */}
      <div className="absolute -bottom-2 -right-2 w-28 sm:w-34 h-28 sm:h-34 pointer-events-none select-none z-20">
        <Image
          src="/images/wedding/redesign/floral/floral-corner-br.webp"
          alt="Flores inf. der."
          width={1284}
          height={1225}
          className="w-full h-full object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.7)]"
        />
      </div>

      {/* ============================================================================== */}
      {/* CAPA 4: CONTENIDO EDITORIAL DE DESPEDIDA Y AGRADECIMIENTO                      */}
      {/* ============================================================================== */}
      <div className="relative z-30 px-6 sm:px-8 pb-16 sm:pb-20 pt-2 sm:pt-4 text-center space-y-3.5 max-w-[320px] mx-auto">
        <p className="font-cinzel text-[10px] sm:text-[10.5px] tracking-[0.28em] text-[#C8A569] uppercase font-bold">
          NUESTRO PARA SIEMPRE COMIENZA AQUÍ
        </p>

        <h2 className="font-serif italic font-normal text-3xl sm:text-4xl text-white tracking-wide leading-tight drop-shadow-md">
          Gracias por ser parte de nuestra historia
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

        <div className="space-y-2.5 max-w-[270px] mx-auto font-serif italic text-xs sm:text-[12.5px] text-[#E1D3BF] leading-relaxed">
          <p>
            El amor se hace aún más especial cuando se comparte con las personas que forman parte de nuestra vida.
          </p>
          <p>
            Gracias por acompañarnos y bendecir este nuevo comienzo.
          </p>
        </div>

        {/* Separador con corazón central */}
        <div className="flex items-center justify-center gap-2 my-1 w-32 mx-auto">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#C8A569]/50 to-[#C8A569]" />
          <span className="text-[#E5C388] text-xs">♡</span>
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#C8A569]/50 to-[#C8A569]" />
        </div>

        <div className="space-y-0.5 pt-1">
          <p className="font-serif italic text-xs text-[#E1D3BF]/80">
            Con todo nuestro amor,
          </p>
          <p className="font-serif italic font-medium text-3xl sm:text-4xl text-[#E5C388] tracking-wider drop-shadow-sm">
            {groom} y {bride}
          </p>
          <p className="font-cinzel text-[11px] text-[#C8A569] tracking-[0.28em] pt-1 font-semibold">
            19 · 12 · 2026
          </p>
        </div>

        {/* Botón Volver a la portada */}
        <div className="pt-3">
          <button
            type="button"
            onClick={onScrollToTop}
            className="inline-flex items-center justify-center gap-2 w-full max-w-[250px] py-3 px-6 rounded-full bg-gradient-to-r from-[#FFF1D6] via-[#E5C388] to-[#C8A569] border border-[#FFF1D6] text-[#0A1726] text-xs font-cinzel font-bold tracking-wider hover:brightness-110 active:scale-95 transition shadow-[0_4px_20px_rgba(200,165,105,0.45)] cursor-pointer"
          >
            <ArrowUp className="w-4 h-4 text-[#0A1726]" />
            VOLVER A LA PORTADA
          </button>
        </div>
      </div>
    </section>
  );
}
