"use client";

import Image from "next/image";
import { WeddingSettings } from "@/types/wedding";

interface Props {
  settings: WeddingSettings;
}

export default function Section05Dresscode({ settings }: Props) {
  return (
    <section className="relative w-full max-w-[440px] mx-auto rounded-[32px] bg-[#FAF8F5] p-4 sm:p-5 text-center shadow-[0_20px_50px_rgba(0,0,0,0.6)] border border-[#C8A569]/40 overflow-hidden text-[#10243B]">
      {/* Filetes interiores dorados dobles */}
      <div className="absolute inset-[8px] rounded-[24px] border border-[#C8A569]/30 pointer-events-none z-10" />
      <div className="absolute inset-[13px] rounded-[19px] border border-[#C8A569]/15 pointer-events-none z-10" />

      {/* Ramillete floral superior fotorrealista */}
      <div className="absolute -top-6 -left-6 w-24 sm:w-28 h-20 pointer-events-none select-none z-20 opacity-85">
        <Image
          src="/assets/templates/romantic-garden/floral-composition.webp"
          alt="Flores y hojas doradas"
          width={1774}
          height={887}
          className="w-full h-full object-contain drop-shadow-[0_4px_10px_rgba(0,0,0,0.2)]"
        />
      </div>

      <div className="relative z-10 space-y-4 pt-6 pb-2">
        <div>
          <p className="font-cinzel text-[10px] sm:text-[11px] tracking-[0.28em] text-[#8C6D37] uppercase font-semibold">
            CÓDIGO DE VESTIMENTA
          </p>
          <h2 className="font-serif italic font-normal text-3xl sm:text-4xl text-[#0E1A29] tracking-wide mt-0.5">
            {settings.dresscode_title || "Una noche de elegancia"}
          </h2>
        </div>

        {/* Fotografía editorial de la pareja de gala más compacta */}
        <div className="w-full max-w-[240px] h-48 sm:h-52 mx-auto relative rounded-2xl overflow-hidden shadow-md border-2 border-[#C8A569]/50">
          <Image
            src="/images/assets/dresscode-couple.webp"
            alt="Pareja de gala"
            fill
            sizes="240px"
            className="object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#08192D]/85 via-transparent to-transparent" />
          <div className="absolute bottom-2 left-0 right-0 px-2">
            <span className="font-cinzel text-[9.5px] tracking-widest text-[#E5C388] uppercase font-bold drop-shadow">
              {settings.dresscode_subtitle || "VESTIMENTA FORMAL"}
            </span>
          </div>
        </div>

        <p className="font-serif italic text-xs sm:text-[13px] text-[#2D3A4B] max-w-xs mx-auto leading-relaxed">
          {settings.dresscode_description ||
            "Nos encantaría que nos acompañaras luciendo tu mejor atuendo para celebrar juntos una noche llena de amor, alegría y elegancia."}
        </p>

        {/* Separador rombo */}
        <div className="flex items-center justify-center gap-2 py-0.5">
          <div className="w-12 h-px bg-[#C8A569]/40" />
          <div className="w-1.5 h-1.5 rotate-45 border border-[#C8A569] bg-[#FAF8F5]" />
          <div className="w-12 h-px bg-[#C8A569]/40" />
        </div>

        {/* Colores reservados */}
        <div className="space-y-2 pt-0.5">
          <h4 className="font-cinzel text-xs tracking-widest text-[#8C6D37] uppercase font-bold">
            COLORES RESERVADOS PARA LOS NOVIOS
          </h4>
          <p className="font-serif text-[11px] sm:text-xs text-[#4A5568] max-w-xs mx-auto">
            Agradecemos cordialmente evitar los siguientes tonos reservados para la novia y el cortejo:
          </p>

          {/* Círculos tachados con filo dorado */}
          <div className="flex items-center justify-center gap-2.5 sm:gap-3.5 pt-1.5 flex-wrap">
            {(settings.restricted_colors || [
              { name: "Blanco / Marfil", color: "#FFFFFF" },
              { name: "Azul Marino", color: "#0B1B3D" },
            ]).map((col, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full border-2 border-[#C8A569] shadow-md overflow-hidden flex items-center justify-center">
                  <div
                    className="w-full h-full"
                    style={{ backgroundColor: col.color }}
                  />
                  {/* Línea diagonal tachada dorada */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-[2px] bg-[#C8A569] transform -rotate-45 shadow-[0_0_4px_rgba(0,0,0,0.4)]" />
                  </div>
                </div>
                <span className="font-cinzel text-[8.5px] sm:text-[9px] text-[#8C6D37] mt-1 font-semibold tracking-wider">
                  {col.name}
                </span>
              </div>
            ))}
          </div>

          <p className="font-serif italic text-[11px] text-[#718096] pt-1">
            Gracias por ayudarnos a cuidar la armonía estética de nuestra noche.
          </p>
        </div>
      </div>
    </section>
  );
}
