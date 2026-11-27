"use client";

import Image from "next/image";

interface Props {
  groom: string;
  bride: string;
}

export default function Section01Welcome({ groom, bride }: Props) {
  return (
    <section className="relative w-full max-w-[440px] mx-auto rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)] border border-[#C8A569]/40 bg-[#FAF8F5] text-center">
      {/* ============================================================================== */}
      {/* CAPA 1: FONDO BLANCO / ALGODÓN TEXTURIZADO CONTINUO (100% de la tarjeta)        */}
      {/* ============================================================================== */}
      <div className="absolute inset-0 z-0 bg-[#FAF8F5]" />

      {/* ============================================================================== */}
      {/* CAPA 2: MARCO ORNAMENTAL DORADO VECTORIAL CON ESQUINAS FESTONEADAS CLÁSICAS    */}
      {/* ============================================================================== */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
        viewBox="0 0 440 680"
        preserveAspectRatio="none"
      >
        {/* Marco exterior */}
        <path
          d="M 36 16 L 404 16 A 18 18 0 0 0 424 36 L 424 644 A 18 18 0 0 0 404 664 L 36 664 A 18 18 0 0 0 16 644 L 16 36 A 18 18 0 0 0 36 16 Z"
          fill="none"
          stroke="#C8A569"
          strokeWidth="1.5"
          strokeOpacity="0.5"
        />
        {/* Marco interior fino */}
        <path
          d="M 40 21 L 400 21 A 14 14 0 0 0 419 40 L 419 640 A 14 14 0 0 0 400 659 L 40 659 A 14 14 0 0 0 21 640 L 21 40 A 14 14 0 0 0 40 21 Z"
          fill="none"
          stroke="#C8A569"
          strokeWidth="0.8"
          strokeOpacity="0.3"
        />
      </svg>

      {/* ============================================================================== */}
      {/* CAPA 3: COMPOSICIONES FLORALES NUPCIALES EN LAS 4 ESQUINAS                     */}
      {/* ============================================================================== */}
      {/* Esquina Superior Izquierda */}
      <div className="absolute -top-4 sm:-top-6 -left-4 sm:-left-6 w-[125px] sm:w-[150px] h-[120px] sm:h-[145px] pointer-events-none select-none z-20">
        <Image
          src="/assets/templates/romantic-garden/floral-corner-tl.webp"
          alt="Esquina floral superior izquierda"
          width={1284}
          height={1225}
          className="w-full h-full object-contain drop-shadow-[0_4px_14px_rgba(0,0,0,0.15)]"
          priority
        />
      </div>

      {/* Esquina Superior Derecha */}
      <div className="absolute -top-4 sm:-top-6 -right-4 sm:-right-6 w-[125px] sm:w-[150px] h-[120px] sm:h-[145px] pointer-events-none select-none z-20">
        <Image
          src="/assets/templates/romantic-garden/floral-corner-tr.webp"
          alt="Esquina floral superior derecha"
          width={1284}
          height={1225}
          className="w-full h-full object-contain drop-shadow-[0_4px_14px_rgba(0,0,0,0.15)]"
          priority
        />
      </div>

      {/* Esquina Inferior Izquierda */}
      <div className="absolute -bottom-4 sm:-bottom-6 -left-4 sm:-left-6 w-[125px] sm:w-[150px] h-[120px] sm:h-[145px] pointer-events-none select-none z-20">
        <Image
          src="/assets/templates/romantic-garden/floral-corner-bl.webp"
          alt="Esquina floral inferior izquierda"
          width={1284}
          height={1225}
          className="w-full h-full object-contain drop-shadow-[0_4px_14px_rgba(0,0,0,0.15)]"
        />
      </div>

      {/* Esquina Inferior Derecha */}
      <div className="absolute -bottom-4 sm:-bottom-6 -right-4 sm:-right-6 w-[125px] sm:w-[150px] h-[120px] sm:h-[145px] pointer-events-none select-none z-20">
        <Image
          src="/assets/templates/romantic-garden/floral-corner-br.webp"
          alt="Esquina floral inferior derecha"
          width={1284}
          height={1225}
          className="w-full h-full object-contain drop-shadow-[0_4px_14px_rgba(0,0,0,0.15)]"
        />
      </div>

      {/* ============================================================================== */}
      {/* CAPA 5: CONTENIDO TEXTUAL DINÁMICO                                             */}
      {/* ============================================================================== */}
      <div className="relative z-20 flex flex-col items-center justify-center px-8 sm:px-10 pt-18 sm:pt-22 pb-16 sm:pb-20 text-center">
        {/* Cabecera ceremonial */}
        <p className="font-cinzel text-[11px] sm:text-[11.5px] tracking-[0.16em] text-[#8C6D37] uppercase font-semibold mb-1">
          CON LA BENDICIÓN DE DIOS
        </p>

        {/* Alianzas matrimoniales fotorrealistas de oro */}
        <div className="w-14 h-9 relative my-1 drop-shadow-md">
          <Image
            src="/assets/templates/romantic-garden/wedding-rings.webp"
            alt="Alianzas de oro"
            fill
            sizes="56px"
            className="object-contain"
          />
        </div>

        {/* ¡Nos casamos! en Cormorant Garamond Italic */}
        <h2 className="font-serif italic font-normal text-4xl sm:text-5xl text-[#0E1A29] tracking-wide my-1.5 leading-tight drop-shadow-sm">
          ¡Nos casamos!
        </h2>

        {/* Texto editorial nupcial en Cormorant Garamond */}
        <div className="space-y-2.5 max-w-[280px] mx-auto text-[14px] sm:text-[15px] text-[#2D3A4B] leading-relaxed font-serif font-medium my-1.5">
          <p>
            Hay momentos en la vida que merecen ser compartidos con las personas que más queremos.
          </p>
          <p>
            Con el corazón lleno de amor y alegría, hemos decidido unir nuestras vidas en matrimonio y comenzar juntos un nuevo capítulo de nuestra historia.
          </p>
          <p className="font-semibold text-[#10243B]">
            Nos encantaría que nos acompañaras a celebrar este día tan especial.
          </p>
        </div>

        {/* Pequeño ornamento corazón dorado */}
        <div className="my-1.5 text-[#C8A569]">
          <svg viewBox="0 0 24 24" className="w-4 h-4 mx-auto fill-none stroke-current stroke-[1.5]">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>

        {/* Firma editorial de los novios */}
        <div className="pt-0.5">
          <p className="font-serif italic font-medium text-3xl sm:text-4xl text-[#9E7A38] tracking-wider leading-none">
            {groom} y {bride}
          </p>
        </div>
      </div>
    </section>
  );
}
