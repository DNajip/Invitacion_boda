"use client";

import Image from "next/image";
import { MapPin } from "lucide-react";
import { WeddingSettings } from "@/types/wedding";

interface Props {
  settings: WeddingSettings;
}

export default function Section03Locations({ settings }: Props) {
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
      {/* CAPA 4: CONTENIDO DE LAS SEDES (CEREMONIA Y RECEPCIÓN)                         */}
      {/* ============================================================================== */}
      <div className="relative z-30 flex flex-col items-center px-5 sm:px-7 pt-20 sm:pt-24 pb-20 sm:pb-24 text-center space-y-4 max-w-[340px] mx-auto">
        {/* Cabecera */}
        <div>
          <p className="font-cinzel text-[10px] sm:text-[10.5px] tracking-[0.25em] text-[#99763D] uppercase font-bold mb-1">
            NUESTRO GRAN DÍA
          </p>
          <h2 className="font-serif italic font-normal text-3xl sm:text-4xl text-[#0E1A29] tracking-wide leading-tight">
            Dónde y Cuándo
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

        {/* ============================================================================ */}
        {/* TARJETA 1: CEREMONIA RELIGIOSA                                              */}
        {/* ============================================================================ */}
        <div className="w-full bg-[#FAF7F0]/90 border border-[#C8A569]/40 rounded-2xl p-3 sm:p-3.5 shadow-[0_4px_16px_rgba(0,0,0,0.06)] space-y-2">
          {/* Fotografía de la iglesia */}
          <div className="w-full h-28 sm:h-32 relative rounded-xl overflow-hidden shadow-sm border border-[#C8A569]/30">
            <Image
              src="/images/wedding/redesign/photos/church-venue.webp"
              alt="Iglesia Ceremonia"
              fill
              sizes="400px"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#08192D]/70 via-transparent to-transparent" />
            <div className="absolute bottom-1.5 left-3">
              <span className="font-cinzel text-[9px] tracking-widest text-[#E5C388] uppercase font-bold drop-shadow">
                CEREMONIA RELIGIOSA
              </span>
            </div>
          </div>

          {/* Horario flanqueado por laureles dorados */}
          <div className="flex items-center justify-center gap-2 pt-0.5">
            <span className="w-5 h-2.5 relative opacity-80">
              <Image
                src="/images/wedding/redesign/ornaments/branches-gold-symmetric.webp"
                alt="Laurel"
                fill
                className="object-contain"
              />
            </span>
            <p className="font-serif italic text-base sm:text-lg font-bold text-[#B8860B]">
              {settings.ceremony_time || "5:00 p. m."}
            </p>
            <span className="w-5 h-2.5 relative opacity-80 scale-x-[-1]">
              <Image
                src="/images/wedding/redesign/ornaments/branches-gold-symmetric.webp"
                alt="Laurel"
                fill
                className="object-contain"
              />
            </span>
          </div>

          <h3 className="font-serif italic font-bold text-base sm:text-lg text-[#0E1A29] leading-tight">
            {settings.ceremony_venue || "Iglesia Católica"}
          </h3>

          <p className="font-serif text-xs text-[#4A5568] max-w-xs mx-auto leading-relaxed">
            {settings.ceremony_description ||
              "Ante Dios y nuestros seres queridos, daremos el sí que unirá nuestras vidas."}
          </p>

          {/* Botón Google Maps */}
          {settings.ceremony_maps_url && (
            <div className="pt-1">
              <a
                href={settings.ceremony_maps_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 w-full max-w-[250px] py-2 px-4 rounded-full bg-[#08192D] border border-[#C8A569]/70 text-[#E5C388] text-[10px] sm:text-[10.5px] font-cinzel font-semibold tracking-wider hover:brightness-125 transition shadow-sm active:scale-95 cursor-pointer"
              >
                <MapPin className="w-3.5 h-3.5 text-[#C8A569]" />
                VER UBICACIÓN EN GOOGLE MAPS
              </a>
            </div>
          )}
        </div>

        {/* Separador con corazón entre ambas sedes */}
        <div className="flex items-center justify-center gap-2 my-1 w-32">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#C8A569]/50 to-[#C8A569]" />
          <span className="text-[#99763D] text-xs">♡</span>
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#C8A569]/50 to-[#C8A569]" />
        </div>

        {/* ============================================================================ */}
        {/* TARJETA 2: RECEPCIÓN & BRINDIS                                              */}
        {/* ============================================================================ */}
        <div className="w-full bg-[#FAF7F0]/90 border border-[#C8A569]/40 rounded-2xl p-3 sm:p-3.5 shadow-[0_4px_16px_rgba(0,0,0,0.06)] space-y-2">
          {/* Fotografía de la recepción */}
          <div className="w-full h-28 sm:h-32 relative rounded-xl overflow-hidden shadow-sm border border-[#C8A569]/30">
            <Image
              src="/images/wedding/redesign/photos/reception-venue.webp"
              alt="Salón de Recepción"
              fill
              sizes="400px"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#08192D]/70 via-transparent to-transparent" />
            <div className="absolute bottom-1.5 left-3">
              <span className="font-cinzel text-[9px] tracking-widest text-[#E5C388] uppercase font-bold drop-shadow">
                RECEPCIÓN & BRINDIS
              </span>
            </div>
          </div>

          {/* Horario flanqueado por laureles dorados */}
          <div className="flex items-center justify-center gap-2 pt-0.5">
            <span className="w-5 h-2.5 relative opacity-80">
              <Image
                src="/images/wedding/redesign/ornaments/branches-gold-symmetric.webp"
                alt="Laurel"
                fill
                className="object-contain"
              />
            </span>
            <p className="font-serif italic text-base sm:text-lg font-bold text-[#B8860B]">
              {settings.reception_time || "7:00 p. m."}
            </p>
            <span className="w-5 h-2.5 relative opacity-80 scale-x-[-1]">
              <Image
                src="/images/wedding/redesign/ornaments/branches-gold-symmetric.webp"
                alt="Laurel"
                fill
                className="object-contain"
              />
            </span>
          </div>

          <h3 className="font-serif italic font-bold text-base sm:text-lg text-[#0E1A29] leading-tight">
            {settings.reception_venue || "H&R Sta Martha 2"}
          </h3>

          <p className="font-serif text-xs text-[#4A5568] max-w-xs mx-auto leading-relaxed">
            {settings.reception_description ||
              "Te esperamos para compartir una velada en familia y llena de alegría."}
          </p>

          {/* Botón Google Maps */}
          {settings.reception_maps_url && (
            <div className="pt-1">
              <a
                href={settings.reception_maps_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 w-full max-w-[250px] py-2 px-4 rounded-full bg-[#08192D] border border-[#C8A569]/70 text-[#E5C388] text-[10px] sm:text-[10.5px] font-cinzel font-semibold tracking-wider hover:brightness-125 transition shadow-sm active:scale-95 cursor-pointer"
              >
                <MapPin className="w-3.5 h-3.5 text-[#C8A569]" />
                VER UBICACIÓN EN GOOGLE MAPS
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
