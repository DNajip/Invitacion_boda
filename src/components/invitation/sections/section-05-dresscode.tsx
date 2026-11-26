"use client";

import Image from "next/image";
import { WeddingSettings } from "@/types/wedding";

interface Props {
  settings: WeddingSettings;
}

export default function Section05Dresscode({ settings }: Props) {
  // 5 colores reservados oficiales según la maqueta de referencia
  const defaultRestricted = [
    { name: "VERDE", color: "#1B4D3E" },
    { name: "NEGRO", color: "#1A1A1A" },
    { name: "BLANCO", color: "#FAF8F5" },
    { name: "BEIGE", color: "#D2B48C" },
    { name: "AZUL", color: "#123D70" },
  ];

  const restrictedColors = settings.restricted_colors && settings.restricted_colors.length >= 4
    ? settings.restricted_colors
    : defaultRestricted;

  return (
    <section className="relative w-full max-w-[430px] mx-auto rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)] bg-[#FAF7F0] text-center isolate text-[#10243B]">
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
      {/* Esquina Superior Izquierda: Rosas azules, lirios y hojas de oro */}
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

      {/* Esquina Inferior Derecha: Rosas azules, lirios y hojas de oro */}
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
      {/* CAPA 4: CONTENIDO EDITORIAL DE CÓDIGO DE VESTIMENTA                            */}
      {/* ============================================================================== */}
      <div className="relative z-30 flex flex-col items-center px-6 sm:px-8 pt-20 sm:pt-24 pb-28 sm:pb-32 text-center space-y-3.5 max-w-[320px] mx-auto">
        {/* Ornamento caligráfico superior */}
        <div className="w-16 h-2 mx-auto relative opacity-70">
          <Image
            src="/images/wedding/redesign/ornaments/ornament-infinity-gold.webp"
            alt="Ornamento caligráfico"
            fill
            className="object-contain"
          />
        </div>

        {/* Cabecera */}
        <div>
          <p className="font-cinzel text-[10px] sm:text-[10.5px] tracking-[0.28em] text-[#99763D] uppercase font-bold mb-1">
            CÓDIGO DE VESTIMENTA
          </p>
          <h2 className="font-serif italic font-normal text-3xl sm:text-4xl text-[#0E1A29] tracking-wide leading-tight">
            {settings.dresscode_title || "Una noche de elegancia"}
          </h2>
        </div>

        {/* Separador con rombo */}
        <div className="w-24 h-1.5 mx-auto relative opacity-80">
          <Image
            src="/images/wedding/redesign/ornaments/separator-gold-diamond.webp"
            alt="Separador"
            fill
            className="object-contain"
          />
        </div>

        {/* Fotografía editorial de la pareja de gala con ramas doradas en los laterales */}
        <div className="relative w-full max-w-[240px] mx-auto my-1">
          {/* Rama dorada lateral izquierda */}
          <div className="absolute -left-5 top-1/2 -translate-y-1/2 w-9 h-26 pointer-events-none z-10 opacity-80">
            <Image
              src="/images/wedding/redesign/ornaments/branch-gold-curved-side.webp"
              alt="Rama dorada lateral"
              fill
              className="object-contain"
            />
          </div>

          {/* Rama dorada lateral derecha */}
          <div className="absolute -right-5 top-1/2 -translate-y-1/2 w-9 h-26 pointer-events-none z-10 opacity-80 scale-x-[-1]">
            <Image
              src="/images/wedding/redesign/ornaments/branch-gold-curved-side.webp"
              alt="Rama dorada lateral"
              fill
              className="object-contain"
            />
          </div>

          {/* Marco con fotografía de la pareja */}
          <div className="w-full aspect-[4/5] relative rounded-2xl overflow-hidden shadow-[0_8px_25px_rgba(0,0,0,0.18)] border-2 border-[#C8A569]">
            <Image
              src="/images/wedding/redesign/photos/dresscode-couple.webp"
              alt="Pareja de gala"
              fill
              sizes="270px"
              className="object-cover object-top"
            />
            {/* Degradado y Badge inferior */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#08192D]/85 via-transparent to-transparent" />
            <div className="absolute bottom-2.5 left-0 right-0 flex items-center justify-center gap-1.5 px-3">
              <span className="w-4 h-2 relative opacity-80">
                <Image
                  src="/images/wedding/redesign/ornaments/branches-gold-symmetric.webp"
                  alt="Laurel"
                  fill
                  className="object-contain"
                />
              </span>
              <span className="font-cinzel text-[9.5px] sm:text-[10px] tracking-[0.2em] text-[#E5C388] uppercase font-bold drop-shadow">
                {settings.dresscode_subtitle || "VESTIMENTA FORMAL"}
              </span>
              <span className="w-4 h-2 relative opacity-80 scale-x-[-1]">
                <Image
                  src="/images/wedding/redesign/ornaments/branches-gold-symmetric.webp"
                  alt="Laurel"
                  fill
                  className="object-contain"
                />
              </span>
            </div>
          </div>
        </div>

        {/* Mensaje editorial */}
        <p className="font-serif italic text-xs sm:text-[12.5px] text-[#2D3A4B] max-w-xs mx-auto leading-relaxed">
          {settings.dresscode_description ||
            "Nos encantaría que nos acompañaras luciendo tu mejor atuendo para celebrar juntos una noche llena de amor, alegría y elegancia."}
        </p>

        {/* Separador con corazón */}
        <div className="flex items-center justify-center gap-2 my-1 w-32">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#C8A569]/50 to-[#C8A569]" />
          <span className="text-[#99763D] text-xs">♡</span>
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#C8A569]/50 to-[#C8A569]" />
        </div>

        {/* Sección de Colores Reservados */}
        <div className="space-y-2 pt-1 w-full">
          {/* Título de colores flanqueado por laureles dorados */}
          <div className="flex items-center justify-center gap-1.5">
            <span className="w-4 h-2 relative opacity-80">
              <Image
                src="/images/wedding/redesign/ornaments/branches-gold-symmetric.webp"
                alt="Laurel"
                fill
                className="object-contain"
              />
            </span>
            <h4 className="font-cinzel text-[10px] sm:text-[10.5px] tracking-widest text-[#99763D] uppercase font-bold">
              COLORES RESERVADOS PARA LOS NOVIOS
            </h4>
            <span className="w-4 h-2 relative opacity-80 scale-x-[-1]">
              <Image
                src="/images/wedding/redesign/ornaments/branches-gold-symmetric.webp"
                alt="Laurel"
                fill
                className="object-contain"
              />
            </span>
          </div>

          <p className="font-serif text-[11px] sm:text-xs text-[#5A687A] max-w-xs mx-auto leading-normal">
            Agradecemos cordialmente evitar los siguientes tonos reservados para la novia y el cortejo:
          </p>

          {/* 5 Círculos cromáticos tachados con filo dorado y relieve */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 pt-1.5">
            {restrictedColors.map((col, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full border-2 border-[#C8A569] shadow-[0_3px_8px_rgba(0,0,0,0.2)] overflow-hidden flex items-center justify-center">
                  <div
                    className="w-full h-full"
                    style={{ backgroundColor: col.color }}
                  />
                  {/* Línea diagonal tachada dorada fina */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-[140%] h-[2px] bg-[#E5C388] transform -rotate-45 shadow-[0_0_3px_rgba(0,0,0,0.5)]" />
                  </div>
                </div>
                <span className="font-cinzel text-[8.5px] sm:text-[9px] text-[#99763D] mt-1.5 font-bold tracking-wider">
                  {col.name}
                </span>
              </div>
            ))}
          </div>

          <p className="font-serif italic text-xs text-[#718096] pt-1.5">
            Gracias por ayudarnos a cuidar la armonía estética de nuestra noche.
          </p>
        </div>
      </div>
    </section>
  );
}
