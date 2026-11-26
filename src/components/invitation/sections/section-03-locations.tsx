"use client";

import Image from "next/image";
import { MapPin } from "lucide-react";
import { WeddingSettings } from "@/types/wedding";

interface Props {
  settings: WeddingSettings;
}

export default function Section03Locations({ settings }: Props) {
  return (
    <section className="relative w-full max-w-[440px] mx-auto rounded-[28px] bg-[#FAF8F5] text-[#122438] p-4 sm:p-6 text-center shadow-[0_20px_50px_rgba(0,0,0,0.6)] border border-[#C8A569]/40 overflow-hidden">
      {/* Filetes dorados dobles */}
      <div className="absolute inset-[7px] rounded-[22px] border border-[#C8A569]/30 pointer-events-none z-10" />
      <div className="absolute inset-[11px] rounded-[18px] border border-[#C8A569]/15 pointer-events-none z-10" />

      {/* Ramillete floral superior esquinero optimizado para no tapar el texto */}
      <div className="absolute -top-4 -right-4 w-28 sm:w-32 h-24 pointer-events-none select-none z-20 scale-x-[-1]">
        <Image
          src="/assets/templates/romantic-garden/floral-composition.webp"
          alt="Flores y hojas doradas"
          width={1774}
          height={887}
          className="w-full h-full object-contain drop-shadow-[0_4px_10px_rgba(0,0,0,0.2)]"
        />
      </div>

      <div className="relative z-10 space-y-3.5 pt-8 pb-2">
        {/* Encabezado sin choque floral y con 'Dónde y Cuándo' */}
        <div>
          <p className="font-cinzel text-[9.5px] sm:text-[10px] tracking-[0.2em] text-[#8C6D37] uppercase font-semibold">
            NUESTRO GRAN DÍA
          </p>
          <h2 className="font-serif italic font-normal text-3xl sm:text-4xl text-[#0E1A29] tracking-wide mt-0.5">
            Dónde y Cuándo
          </h2>
        </div>

        {/* ========================================= */}
        {/* CEREMONIA RELIGIOSA */}
        {/* ========================================= */}
        <div className="space-y-2 bg-white/75 border border-[#C8A569]/25 rounded-2xl p-3.5 sm:p-4 shadow-sm">
          <div className="w-full h-24 sm:h-28 relative rounded-xl overflow-hidden shadow-inner border border-[#C8A569]/20">
            <Image
              src="/images/assets/church-photo.webp"
              alt="Capilla Ceremonia"
              fill
              sizes="400px"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-1.5 left-2.5 right-2.5 text-left">
              <span className="font-cinzel text-[8.5px] tracking-widest text-[#E5C388] uppercase font-bold drop-shadow">
                CEREMONIA RELIGIOSA
              </span>
            </div>
          </div>

          <div className="space-y-0.5">
            <p className="font-serif text-lg sm:text-xl font-bold text-[#8C6D37]">
              {settings.ceremony_time || "17:00 HRS"}
            </p>
            <h3 className="font-serif font-bold text-sm sm:text-base text-[#10243B]">
              {settings.ceremony_venue || "Catedral San Pedro Apóstol"}
            </h3>
            <p className="font-serif text-[11.5px] sm:text-xs text-[#4A5568] max-w-xs mx-auto leading-relaxed">
              {settings.ceremony_description || "Acompáñanos a recibir la bendición nupcial en una ceremonia íntima y solemne."}
            </p>
          </div>

          {settings.ceremony_maps_url && (
            <div className="pt-0.5">
              <a
                href={settings.ceremony_maps_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#0E1A29] to-[#1A314D] text-[#E5C388] text-[10.5px] sm:text-[11px] font-cinzel font-semibold tracking-wider hover:brightness-125 transition shadow-sm active:scale-95 cursor-pointer"
              >
                <MapPin className="w-3 h-3 text-[#C8A569]" />
                VER UBICACIÓN EN GOOGLE MAPS
              </a>
            </div>
          )}
        </div>

        {/* Separador elegante con rombo dorado */}
        <div className="flex items-center justify-center gap-2 py-0.5">
          <div className="w-12 h-px bg-[#C8A569]/35" />
          <div className="w-1.5 h-1.5 rotate-45 border border-[#C8A569] bg-[#FAF8F5]" />
          <div className="w-12 h-px bg-[#C8A569]/35" />
        </div>

        {/* ========================================= */}
        {/* RECEPCIÓN Y FIESTA */}
        {/* ========================================= */}
        <div className="space-y-2 bg-white/75 border border-[#C8A569]/25 rounded-2xl p-3.5 sm:p-4 shadow-sm">
          <div className="w-full h-24 sm:h-28 relative rounded-xl overflow-hidden shadow-inner border border-[#C8A569]/20">
            <Image
              src="/images/assets/reception-photo.webp"
              alt="Salón de Recepción"
              fill
              sizes="400px"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-1.5 left-2.5 right-2.5 text-left">
              <span className="font-cinzel text-[8.5px] tracking-widest text-[#E5C388] uppercase font-bold drop-shadow">
                RECEPCIÓN & BRINDIS
              </span>
            </div>
          </div>

          <div className="space-y-0.5">
            <p className="font-serif text-lg sm:text-xl font-bold text-[#8C6D37]">
              {settings.reception_time || "19:30 HRS"}
            </p>
            <h3 className="font-serif font-bold text-sm sm:text-base text-[#10243B]">
              {settings.reception_venue || "Jardines Villa Real"}
            </h3>
            <p className="font-serif text-[11.5px] sm:text-xs text-[#4A5568] max-w-xs mx-auto leading-relaxed">
              {settings.reception_description || "Celebraremos con cóctel de bienvenida, cena gourmet y fiesta bajo las estrellas."}
            </p>
          </div>

          {settings.reception_maps_url && (
            <div className="pt-0.5">
              <a
                href={settings.reception_maps_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#0E1A29] to-[#1A314D] text-[#E5C388] text-[10.5px] sm:text-[11px] font-cinzel font-semibold tracking-wider hover:brightness-125 transition shadow-sm active:scale-95 cursor-pointer"
              >
                <MapPin className="w-3 h-3 text-[#C8A569]" />
                VER UBICACIÓN EN GOOGLE MAPS
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
