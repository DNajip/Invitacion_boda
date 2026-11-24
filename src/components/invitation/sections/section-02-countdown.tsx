"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

interface Props {
  targetDateString: string;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Section02Countdown({ targetDateString }: Props) {
  const [timeLeft, setTimeLeft] = useState<TimeRemaining>(() => {
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
  });

  useEffect(() => {
    const target = new Date(targetDateString).getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = target - now;
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000),
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDateString]);

  const boxes = [
    { label: "Días", value: timeLeft.days },
    { label: "Horas", value: timeLeft.hours },
    { label: "Minutos", value: timeLeft.minutes },
    { label: "Segundos", value: timeLeft.seconds },
  ];

  return (
    <section className="relative w-full max-w-[420px] mx-auto min-h-[720px] rounded-t-[140px] rounded-b-[36px] bg-gradient-to-b from-[#081729] via-[#0E2238] to-[#081729] p-6 sm:p-8 text-center shadow-2xl flex flex-col justify-between overflow-hidden border border-[#C8A569]/40">
      {/* Filete interior dorado en forma de arco */}
      <div className="absolute inset-[7px] rounded-t-[133px] rounded-b-[29px] border border-[#C8A569]/25 pointer-events-none" />

      {/* Farol colgante nocturno cálido (Superior Derecha) */}
      <div className="absolute top-2 right-4 w-12 h-24 pointer-events-none select-none z-20">
        <Image
          src="/images/assets/hanging-lantern.png"
          alt="Farol de jardín cálido"
          width={44}
          height={95}
          className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(240,213,165,0.7)]"
        />
      </div>

      {/* Flores blancas superiores izquierdas */}
      <div className="absolute -top-2 -left-2 w-32 h-28 pointer-events-none select-none z-20">
        <Image
          src="/images/assets/floral-small.png"
          alt="Flores blancas"
          width={160}
          height={155}
          className="w-full h-full object-contain drop-shadow-[0_4px_10px_rgba(0,0,0,0.6)]"
        />
      </div>

      {/* Cinta dorada ondulante y flores en la base */}
      <div className="absolute -bottom-2 left-0 right-0 h-28 pointer-events-none select-none z-20 flex items-center justify-center">
        <Image
          src="/images/assets/gold-ribbon.png"
          alt="Cinta de satén dorada"
          width={325}
          height={100}
          className="w-full max-w-[340px] object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
        />
      </div>

      {/* Flores pequeñas en la base derecha */}
      <div className="absolute bottom-2 -right-3 w-28 h-24 pointer-events-none select-none z-30">
        <Image
          src="/images/assets/floral-small.png"
          alt="Flores"
          width={160}
          height={155}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 pt-10 pb-16 space-y-3">
        {/* Encabezado */}
        <p className="font-cinzel text-[11px] tracking-[0.25em] text-[#C8A569] uppercase font-semibold">
          RESERVA ESTA FECHA
        </p>

        {/* Glifo filigrana dorado */}
        <div className="w-16 h-4 mx-auto opacity-80">
          <svg viewBox="0 0 60 16" fill="none" className="w-full h-full text-[#C8A569]">
            <path d="M 0 8 Q 15 2 30 8 Q 45 14 60 8" stroke="currentColor" strokeWidth="1" />
            <circle cx="30" cy="8" r="2.5" fill="currentColor" />
          </svg>
        </div>

        {/* Bloque de fecha */}
        <div className="space-y-0.5 pt-1">
          <p className="font-serif italic text-2xl sm:text-3xl text-neutral-200 font-light">
            Sábado
          </p>

          {/* Gran número 19 en relieve 3D dorado */}
          <div className="relative inline-block my-1">
            <span className="font-serif font-bold text-7xl sm:text-8xl text-transparent bg-clip-text bg-gradient-to-b from-[#FFF5DC] via-[#E5C388] to-[#99763D] tracking-tight leading-none drop-shadow-[0_4px_10px_rgba(0,0,0,0.7)]">
              19
            </span>
          </div>

          <p className="font-serif italic text-2xl sm:text-3xl text-neutral-200 font-light">
            Diciembre
          </p>

          <p className="font-cinzel text-sm tracking-[0.3em] text-[#C8A569] pt-1">
            2026
          </p>
        </div>

        {/* Separador sutil */}
        <div className="w-32 h-px bg-gradient-to-r from-transparent via-[#C8A569]/50 to-transparent mx-auto my-3" />

        <p className="font-serif italic text-xs text-neutral-300 max-w-[260px] mx-auto font-light">
          Cada día estamos más cerca de nuestro para siempre.
        </p>

        <p className="font-cinzel text-[11px] tracking-[0.25em] text-[#C8A569] font-bold pt-3 uppercase">
          FALTAN
        </p>

        {/* 4 Cajas de cuenta regresiva con marco dorado y fondo traslúcido */}
        <div className="grid grid-cols-4 gap-2 max-w-[320px] mx-auto pt-2">
          {boxes.map((b, idx) => (
            <div
              key={idx}
              className="bg-[#081729]/80 border border-[#C8A569]/40 rounded-xl p-2.5 backdrop-blur-sm shadow-[inset_0_1px_4px_rgba(0,0,0,0.4)] flex flex-col items-center justify-center"
            >
              <span className="font-serif font-bold text-xl sm:text-2xl text-white tracking-tight">
                {b.value}
              </span>
              <span className="font-cinzel text-[9px] text-[#E5C388] tracking-wider uppercase mt-0.5">
                {b.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
