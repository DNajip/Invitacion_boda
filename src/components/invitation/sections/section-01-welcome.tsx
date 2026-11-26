"use client";

import Image from "next/image";

interface Props {
  groom: string;
  bride: string;
}

export default function Section01Welcome({ groom, bride }: Props) {
  return (
    <section className="relative w-full max-w-[430px] mx-auto rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)] bg-[#FAF7F0] text-center isolate">
      {/* ============================================================================== */}
      {/* CAPA 1: FONDO BLANCO MARFIL CON TEXTURA DE PAPEL FINO                          */}
      {/* ============================================================================== */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/images/wedding/redesign/backgrounds/paper-ivory.webp"
          alt="Textura papel marfil"
          fill
          sizes="(max-width: 768px) 100vw, 480px"
          className="object-cover object-center opacity-95"
          priority
        />
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
      {/* CAPA 3: COMPOSICIONES FLORALES FOTORREALISTAS INDEPENDIENTES                   */}
      {/* ============================================================================== */}
      {/* Esquina Superior Izquierda: Rosas azules, lirios y hojas doradas */}
      <div className="absolute -top-3 -left-3 w-36 sm:w-42 h-36 sm:h-42 pointer-events-none select-none z-20">
        <Image
          src="/images/wedding/redesign/floral/floral-corner-tl.webp"
          alt="Flores y hojas doradas superiores"
          width={1284}
          height={1225}
          className="w-full h-full object-contain drop-shadow-[0_8px_18px_rgba(0,0,0,0.18)]"
          priority
        />
      </div>

      {/* Esquina Inferior Derecha: Rosas azules, lirios y hojas doradas */}
      <div className="absolute -bottom-4 -right-4 w-40 sm:w-46 h-40 sm:h-46 pointer-events-none select-none z-20">
        <Image
          src="/images/wedding/redesign/floral/floral-corner-br.webp"
          alt="Flores y hojas doradas inferiores"
          width={1284}
          height={1225}
          className="w-full h-full object-contain drop-shadow-[0_8px_18px_rgba(0,0,0,0.18)]"
        />
      </div>

      {/* ============================================================================== */}
      {/* CAPA 4: CONTENIDO TEXTUAL NUPCIAL (100% libre de superposiciones)              */}
      {/* ============================================================================== */}
      <div className="relative z-30 flex flex-col items-center px-6 sm:px-8 pt-20 sm:pt-24 pb-20 sm:pb-24 text-center max-w-[280px] mx-auto space-y-2">
        {/* Cabecera ceremonial */}
        <p className="font-cinzel text-[10px] sm:text-[10.5px] tracking-[0.25em] text-[#99763D] uppercase font-bold mb-1">
          CON LA BENDICIÓN DE DIOS
        </p>

        {/* Alianzas matrimoniales fotorrealistas de oro */}
        <div className="w-16 h-10 relative my-1 drop-shadow-md">
          <Image
            src="/assets/templates/romantic-garden/wedding-rings.webp"
            alt="Alianzas de oro"
            fill
            sizes="64px"
            className="object-contain"
          />
        </div>

        {/* ¡Nos casamos! en Cormorant Garamond Italic azul marino */}
        <h2 className="font-serif italic font-normal text-4xl sm:text-5xl text-[#0E1A29] tracking-wide my-1 leading-tight drop-shadow-sm">
          ¡Nos casamos!
        </h2>

        {/* Separador dorado con rombo central */}
        <div className="w-24 h-1.5 relative my-1 opacity-80">
          <Image
            src="/images/wedding/redesign/ornaments/separator-gold-diamond.webp"
            alt="Separador dorado"
            fill
            className="object-contain"
          />
        </div>

        {/* Texto editorial nupcial */}
        <div className="space-y-3 max-w-[260px] mx-auto text-xs sm:text-[12.5px] text-[#2D3A4B] leading-relaxed font-serif font-medium my-1">
          <p>
            Hay momentos en la vida que merecen ser compartidos con las personas que más queremos.
          </p>
          <p>
            Con el corazón lleno de amor y alegría, hemos decidido unir nuestras vidas en matrimonio y comenzar juntos un nuevo capítulo de nuestra historia.
          </p>
          <p>
            Nos encantaría que nos acompañaras a celebrar este día tan especial.
          </p>
        </div>

        {/* Separador con corazón central */}
        <div className="flex items-center justify-center gap-2 my-1 w-32">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#C8A569]/60 to-[#C8A569]" />
          <span className="text-[#99763D] text-xs">♡</span>
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#C8A569]/60 to-[#C8A569]" />
        </div>

        {/* Nombres de los novios en dorado cálido */}
        <p className="font-serif italic font-normal text-3xl sm:text-4xl text-[#B8860B] tracking-wide drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)] pt-1">
          {groom} y {bride}
        </p>
      </div>
    </section>
  );
}
