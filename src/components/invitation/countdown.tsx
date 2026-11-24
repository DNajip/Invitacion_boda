"use client";

import { useState, useEffect } from "react";

interface Props {
  targetDateString: string; // e.g. "2026-12-19T17:00:00-06:00"
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Countdown({ targetDateString }: Props) {
  const [timeLeft, setTimeLeft] = useState<TimeRemaining>(() => {
    const target = new Date(targetDateString).getTime();
    const now = new Date().getTime();
    const difference = target - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000),
    };
  });

  useEffect(() => {
    const target = new Date(targetDateString).getTime();

    function calculateTime() {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      });
    }

    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDateString]);

  const items = [
    { label: "DÍAS", value: timeLeft.days },
    { label: "HORAS", value: timeLeft.hours },
    { label: "MIN", value: timeLeft.minutes },
    { label: "SEG", value: timeLeft.seconds },
  ];

  return (
    <div className="flex items-center justify-center gap-5 sm:gap-8 py-2">
      {items.map((item, idx) => (
        <div key={idx} className="flex flex-col items-center">
          <span className="font-serif italic text-2xl sm:text-3xl md:text-4xl font-bold text-[#E5C388] tracking-tight">
            {String(item.value).padStart(2, "0")}
          </span>
          <span className="text-[10px] sm:text-xs tracking-widest text-[#C8A569] font-medium mt-1 uppercase">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}
