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
    <section className="relative w-full max-w-[440px] mx-auto min-h-[680px] sm:min-h-[710px] rounded-t-[140px] rounded-b-[36px] bg-gradient-to-b from-[#081729] via-[#0D2035] to-[#081729] p-6 sm:p-8 text-center shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-col justify-between overflow-hidden border border-[#C8A569]/40">
      {/* Filete interior dorado en forma de arco */}
      <div className="absolute inset-[8px] rounded-t-[132px] rounded-b-[28px] border border-[#C8A569]/30 pointer-events-none z-10" />
      <div className="absolute inset-[13px] rounded-t-[127px] rounded-b-[23px] border border-[#C8A569]/15 pointer-events-none z-10" />

      {/* Ramillete floral superior fotorrealista anclado a la esquina superior izquierda */}
      <div className="absolute -top-8 sm:-top-10 -left-9 sm:-left-11 w-44 sm:w-52 h-36 sm:h-44 pointer-events-none select-none z-20">
        <Image
          src="/assets/templates/romantic-garden/floral-composition.webp"
          alt="Flores blancas y hojas doradas"
          width={1774}
          height={887}
          className="w-full h-full object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.7)]"
        />
      </div>

      {/* Contenido principal con separación holgada respecto a la flor */}
      <div className="relative z-10 pt-24 sm:pt-28 pb-4 space-y-4">
        <p className="font-cinzel text-[10px] sm:text-[11px] tracking-[0.28em] text-[#C8A569] uppercase font-semibold">
          CUENTA REGRESIVA
        </p>

        <h2 className="font-serif italic font-normal text-4xl sm:text-5xl text-white tracking-wide drop-shadow-md">
          El Gran Día
        </h2>

        {/* Bloque de fecha en dorado con número 19 monumental */}
        <div className="py-2">
          <p className="font-cinzel text-xs tracking-[0.25em] text-[#E5C388] uppercase">
            SÁBADO
          </p>
          <div className="my-1">
            <span className="font-serif text-6xl sm:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-[#FFF2D6] via-[#E2C082] to-[#B38D48] drop-shadow-[0_4px_10px_rgba(200,165,105,0.4)]">
              19
            </span>
          </div>
          <p className="font-cinzel text-sm sm:text-base tracking-[0.22em] text-[#E5C388] uppercase font-medium">
            DICIEMBRE · 2026
          </p>
        </div>

        {/* Mensaje sutil */}
        <p className="font-serif italic text-[14px] text-[#E1D3BF] max-w-[300px] mx-auto leading-relaxed pt-1">
          Cada segundo nos acerca más al momento en que comenzaremos a escribir nuestra historia juntos.
        </p>

        {/* Cajas de cuenta regresiva en relieve dorado */}
        <div className="grid grid-cols-4 gap-2.5 pt-4 max-w-[340px] mx-auto">
          {boxes.map((b, i) => (
            <div
              key={i}
              className="bg-[#0A1D33]/80 border border-[#C8A569]/50 rounded-2xl p-2.5 backdrop-blur-md shadow-[0_6px_16px_rgba(0,0,0,0.5),inset_0_1px_2px_rgba(255,255,255,0.1)] flex flex-col items-center justify-center transition-transform hover:scale-105"
            >
              <span className="font-serif font-bold text-2xl sm:text-3xl text-white tracking-tight drop-shadow-sm">
                {b.value}
              </span>
              <span className="font-cinzel text-[8px] sm:text-[9px] text-[#C8A569] tracking-wider uppercase mt-0.5 font-semibold">
                {b.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Cinta dorada ondulante fotorrealista en la base */}
      <div className="relative w-full h-24 -mb-3 pointer-events-none select-none z-20 flex items-center justify-center">
        <Image
          src="/assets/templates/romantic-garden/gold-ribbon.webp"
          alt="Cinta de satén dorada"
          width={2172}
          height={724}
          className="w-full max-w-[380px] object-contain drop-shadow-[0_8px_20px_rgba(0,0,0,0.7)]"
        />
      </div>
    </section>
  );
}
