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
          className="w-full h-full object-contain drop-shadow-[0_4px_10px_rgba(0,0,0,0.12)]"
        />
      </div>

      {/* Esquina Superior Derecha */}
      <div className="absolute -top-4 sm:-top-5 -right-4 sm:-right-5 w-[115px] sm:w-[135px] h-[110px] sm:h-[130px] pointer-events-none select-none z-20">
        <Image
          src="/assets/templates/romantic-garden/floral-corner-tr.webp"
          alt="Esquina floral superior derecha"
          width={1284}
          height={1225}
          className="w-full h-full object-contain drop-shadow-[0_4px_10px_rgba(0,0,0,0.12)]"
        />
      </div>

      {/* Esquina Inferior Izquierda */}
      <div className="absolute -bottom-4 sm:-bottom-5 -left-4 sm:-left-5 w-[115px] sm:w-[135px] h-[110px] sm:h-[130px] pointer-events-none select-none z-20">
        <Image
          src="/assets/templates/romantic-garden/floral-corner-bl.webp"
          alt="Esquina floral inferior izquierda"
          width={1284}
          height={1225}
          className="w-full h-full object-contain drop-shadow-[0_4px_10px_rgba(0,0,0,0.12)]"
        />
      </div>

      {/* Esquina Inferior Derecha */}
      <div className="absolute -bottom-4 sm:-bottom-5 -right-4 sm:-right-5 w-[115px] sm:w-[135px] h-[110px] sm:h-[130px] pointer-events-none select-none z-20">
        <Image
          src="/assets/templates/romantic-garden/floral-corner-br.webp"
          alt="Esquina floral inferior derecha"
          width={1284}
          height={1225}
          className="w-full h-full object-contain drop-shadow-[0_4px_10px_rgba(0,0,0,0.12)]"
        />
      </div>

      <div className="relative z-10 space-y-4 pt-6 pb-10 sm:pb-12">
        <div>
          <p className="font-cinzel text-[10px] sm:text-[11px] tracking-[0.28em] text-[#8C6D37] uppercase font-semibold">
            CÓDIGO DE VESTIMENTA
          </p>
          <h2 className="font-serif italic font-normal text-3xl sm:text-4xl text-[#0E1A29] tracking-wide mt-0.5">
            {settings.dresscode_title || "Una noche de elegancia"}
          </h2>
        </div>

        {/* Fotografía de los novios Novios2 */}
        <div className="relative flex flex-col items-center justify-center mx-auto pt-1 pb-3">
          <div className="relative w-full max-w-[290px] sm:max-w-[320px] mx-auto">
            <Image
              src="/images/assets/novios-heart-user.webp"
              alt="Daren y Fabiola"
              width={1245}
              height={1089}
              unoptimized
              priority
              className="w-full h-auto object-contain drop-shadow-[0_12px_28px_rgba(0,0,0,0.15)] transition-transform hover:scale-[1.01]"
            />
            {/* Sello distintivo con filigrana dorada en la punta del corazón */}
            <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap z-10">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-gradient-to-r from-[#0E1A29] to-[#1A314D] border border-[#C8A569] font-cinzel text-[10px] sm:text-[10.5px] tracking-widest text-[#E5C388] uppercase font-bold shadow-[0_4px_14px_rgba(0,0,0,0.4)]">
                {settings.dresscode_subtitle || "VESTIMENTA FORMAL"}
              </span>
            </div>
          </div>
        </div>

        <p className="font-serif italic text-[14px] sm:text-[15px] text-[#2D3A4B] max-w-xs sm:max-w-sm mx-auto leading-relaxed pt-2">
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
          <p className="font-serif text-[13px] sm:text-[14px] text-[#4A5568] max-w-xs mx-auto">
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

          <p className="font-serif italic text-[13px] text-[#718096] pt-1">
            Gracias por ayudarnos a cuidar la armonía estética de nuestra noche.
          </p>
        </div>
      </div>
    </section>
  );
}
