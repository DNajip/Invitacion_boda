"use client";

import Image from "next/image";

interface Props {
  groom: string;
  bride: string;
}

export default function Section01Welcome({ groom, bride }: Props) {
  return (
    <section className="relative w-full max-w-[420px] mx-auto min-h-[640px] rounded-[32px] bg-[#FAF8F5] text-[#122438] p-6 sm:p-8 text-center shadow-2xl flex flex-col justify-between overflow-hidden border border-[#D4BC92]">
      {/* Marco ornamental interior con filete dorado doble */}
      <div className="absolute inset-[8px] rounded-[24px] border border-[#C8A569]/35 pointer-events-none" />

      {/* Ramillete de lirios blancos y follaje dorado en la esquina inferior derecha */}
      <div className="absolute -bottom-6 -right-6 w-44 h-36 pointer-events-none select-none z-20 scale-x-[-1]">
        <Image
          src="/images/assets/floral-corner.png"
          alt="Lirios y hojas doradas"
          width={360}
          height={255}
          className="w-full h-full object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.25)]"
        />
      </div>

      <div className="relative z-10 py-6 space-y-4">
        {/* Cabecera */}
        <p className="font-cinzel text-[11px] tracking-[0.25em] text-[#8C6D37] uppercase font-semibold">
          CON LA BENDICIÓN DE DIOS
        </p>

        {/* Alianzas matrimoniales entrelazadas */}
        <div className="w-14 h-9 mx-auto drop-shadow-md">
          <Image
            src="/images/assets/wedding-rings.png"
            alt="Alianzas de oro"
            width={140}
            height={90}
            className="w-full h-full object-contain"
          />
        </div>

        {/* ¡Nos casamos! en Great Vibes */}
        <h2 className="font-script text-4xl sm:text-5xl text-[#112338] tracking-wide pt-1">
          ¡Nos casamos!
        </h2>

        {/* Texto editorial nupcial */}
        <div className="space-y-3.5 max-w-[280px] mx-auto text-xs sm:text-[13px] text-[#334253] leading-relaxed font-serif font-medium pt-2">
          <p>
            Hay momentos en la vida que merecen ser compartidos con las personas que más queremos.
          </p>
          <p>
            Con el corazón lleno de amor y alegría, hemos decidido unir nuestras vidas en matrimonio y
            comenzar juntos un nuevo capítulo de nuestra historia.
          </p>
          <p>
            Nos encantaría que nos acompañaras a celebrar este día tan especial.
          </p>
        </div>

        {/* Corazón dorado sutil */}
        <div className="pt-2">
          <svg viewBox="0 0 24 24" className="w-5 h-5 mx-auto text-[#C8A569] fill-none stroke-current stroke-[1.5]">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>

        {/* Firma caligráfica de los novios */}
        <div className="pt-1">
          <p className="font-script text-3xl sm:text-4xl text-[#C8A569] tracking-wider leading-tight">
            {groom} & {bride}
          </p>
        </div>
      </div>
    </section>
  );
}
