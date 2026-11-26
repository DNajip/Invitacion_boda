"use client";

import Image from "next/image";
import { useState, useEffect, useSyncExternalStore } from "react";

interface Props {
  targetDateString: string;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeRemaining(targetDateString: string): TimeRemaining {
  const target = new Date(targetDateString).getTime();
  const now = new Date().getTime();
  const diff = target - now;
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  };
}

const emptySubscribe = () => () => {};

export default function Section02Countdown({ targetDateString }: Props) {
  const isMounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const [timeLeft, setTimeLeft] = useState<TimeRemaining>(() => calculateTimeRemaining(targetDateString));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeRemaining(targetDateString));
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDateString]);

  const boxes = [
    { label: "DÍAS", value: isMounted ? timeLeft.days : "--" },
    { label: "HORAS", value: isMounted ? timeLeft.hours : "--" },
    { label: "MIN", value: isMounted ? timeLeft.minutes : "--" },
    { label: "SEG", value: isMounted ? timeLeft.seconds : "--" },
  ];

  return (
    <section className="relative w-full max-w-[430px] mx-auto rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)] bg-[#08192D] text-center isolate">
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
      {/* CAPA 3: COMPOSICIONES FLORALES FOTORREALISTAS INDEPENDIENTES                   */}
      {/* ============================================================================== */}
      {/* Esquina Superior Izquierda: Rosas azules, lirios y hojas de oro */}
      <div className="absolute -top-3 -left-3 w-36 sm:w-42 h-36 sm:h-42 pointer-events-none select-none z-20">
        <Image
          src="/images/wedding/redesign/floral/floral-corner-tl.webp"
          alt="Flores y hojas doradas superiores"
          width={1284}
          height={1225}
          className="w-full h-full object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.7)]"
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
          className="w-full h-full object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.7)]"
        />
      </div>

      {/* ============================================================================== */}
      {/* CAPA 4: CONTENIDO DE LA CUENTA REGRESIVA Y FECHA MONUMENTAL                   */}
      {/* ============================================================================== */}
      <div className="relative z-30 flex flex-col items-center px-6 sm:px-8 pt-20 sm:pt-24 pb-16 sm:pb-20 text-center space-y-3.5 max-w-[320px] mx-auto">
        <p className="font-cinzel text-[10px] sm:text-[10.5px] tracking-[0.3em] text-[#C8A569] uppercase font-bold">
          CUENTA REGRESIVA
        </p>

        <h2 className="font-serif italic font-normal text-4xl sm:text-5xl text-white tracking-wide leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]">
          El Gran Día
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

        {/* Bloque de fecha en dorado con número 19 monumental */}
        <div className="py-1">
          <p className="font-cinzel text-xs tracking-[0.3em] text-[#E5C388] uppercase font-medium">
            SÁBADO
          </p>

          <div className="my-1">
            <span className="font-serif text-6xl sm:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-[#FFF2D6] via-[#E2C082] to-[#B38D48] drop-shadow-[0_4px_12px_rgba(200,165,105,0.4)]">
              19
            </span>
          </div>

          <p className="font-cinzel text-xs sm:text-sm tracking-[0.22em] text-[#E5C388] uppercase font-semibold whitespace-nowrap">
            DICIEMBRE &nbsp;·&nbsp; 2026
          </p>
        </div>

        {/* Separador con corazón */}
        <div className="flex items-center justify-center gap-2 my-1 w-32">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#C8A569]/60 to-[#C8A569]" />
          <span className="text-[#E5C388] text-xs">♡</span>
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#C8A569]/60 to-[#C8A569]" />
        </div>

        {/* Mensaje romántico */}
        <p className="font-serif italic text-xs sm:text-[12.5px] text-[#E1D3BF] max-w-[280px] mx-auto leading-relaxed">
          Cada segundo nos acerca más al momento en que comenzaremos a escribir nuestra historia juntos.
        </p>

        {/* Cajas de cuenta regresiva en relieve dorado */}
        <div className="grid grid-cols-4 gap-2 pt-2 max-w-[320px] mx-auto w-full">
          {boxes.map((b, i) => (
            <div
              key={i}
              className="bg-[#0A1D33]/90 border border-[#C8A569]/60 rounded-2xl p-2.5 sm:p-3 shadow-[inset_0_1px_3px_rgba(255,255,255,0.1),0_4px_12px_rgba(0,0,0,0.6)] flex flex-col items-center justify-center"
            >
              <span className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight drop-shadow-sm">
                {b.value}
              </span>
              <span className="font-cinzel text-[8.5px] sm:text-[9px] tracking-widest text-[#E5C388] font-bold mt-0.5">
                {b.label}
              </span>
            </div>
          ))}
        </div>

        {/* Lazo de satén dorado suntuoso de la maqueta */}
        <div className="w-48 sm:w-56 h-14 sm:h-16 relative pt-2">
          <Image
            src="/assets/templates/romantic-garden/gold-ribbon.webp"
            alt="Lazo dorado de satén"
            fill
            className="object-contain drop-shadow-[0_6px_14px_rgba(0,0,0,0.7)]"
          />
        </div>
      </div>
    </section>
  );
}
