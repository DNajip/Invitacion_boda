"use client";

import React from "react";
import Image from "next/image";
import { Sparkles } from "lucide-react";

interface Props {
  assignedTable?: {
    table_id: string;
    table_name: string;
    capacity: number;
    position_x: number;
    position_y: number;
  } | null;
  guestNames: string[];
}

export default function TableAssignedSection({ assignedTable, guestNames }: Props) {
  const sampleTables = [
    { id: "honor", name: "Mesa de Honor", x: 200, y: 55, r: 35, isHonor: true },
    { id: "tbl1", name: "Mesa 1", x: 90, y: 160, r: 32 },
    { id: "tbl2", name: "Mesa 2", x: 310, y: 160, r: 32 },
    { id: "tbl3", name: "Mesa 3", x: 200, y: 240, r: 32 },
  ];

  const tableName = assignedTable?.table_name || "Mesa asignada pendiente";

  return (
    <section className="relative w-full max-w-[440px] mx-auto rounded-[32px] bg-[#FAF8F5] p-6 sm:p-8 text-center shadow-[0_20px_50px_rgba(0,0,0,0.6)] border border-[#C8A569]/40 overflow-hidden text-[#10243B]">
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

      <div className="relative z-10 space-y-4 pt-10 pb-4">
        <p className="font-cinzel text-[10px] sm:text-[11px] tracking-[0.28em] text-[#8C6D37] uppercase font-semibold">
          DISTRIBUCIÓN DE LA RECEPCIÓN
        </p>

        <h2 className="font-serif italic font-normal text-3xl sm:text-4xl text-[#0E1A29] tracking-wide leading-tight">
          Tu Lugar en Nuestra Boda
        </h2>

        <p className="font-serif italic text-xs sm:text-[13px] text-[#2D3A4B] max-w-xs mx-auto leading-relaxed">
          Hemos preparado un espacio muy especial para ti para celebrar juntos una noche inolvidable.
        </p>

        {/* Tarjeta de la mesa asignada en relieve dorado */}
        <div className="my-5 p-5 rounded-2xl bg-white/85 border border-[#C8A569]/40 shadow-sm space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C8A569]/15 border border-[#C8A569]/40 text-[#8C6D37] font-cinzel text-[10px] font-bold tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#C8A569]" /> MESA RESERVADA
          </div>
          <p className="font-serif text-2xl sm:text-3xl font-bold text-[#0E1A29] tracking-wide pt-1">
            {tableName}
          </p>
          <div className="mt-3 flex flex-wrap justify-center gap-1.5 pt-1">
            {guestNames.map((name, idx) => (
              <span
                key={idx}
                className="font-serif text-xs text-[#8C6D37] bg-[#FAF8F5] px-3 py-1 rounded-full border border-[#C8A569]/30"
              >
                {name}
              </span>
            ))}
          </div>
        </div>

        {/* Plano del salón */}
        <div className="relative bg-white/85 border border-[#C8A569]/30 rounded-2xl p-4 shadow-sm">
          <p className="font-cinzel text-[10px] uppercase tracking-wider text-[#8C6D37] mb-2 font-bold">
            PLANO DEL SALÓN DE RECEPCIÓN
          </p>

          <svg viewBox="0 0 400 300" className="w-full h-48 select-none">
            {/* Pista de baile central */}
            <rect
              x="140"
              y="110"
              width="120"
              height="80"
              rx="12"
              fill="#FAF8F5"
              stroke="#C8A569"
              strokeWidth="1"
              strokeDasharray="4 3"
              opacity="0.9"
            />
            <text
              x="200"
              y="155"
              textAnchor="middle"
              fill="#8C6D37"
              fontSize="10"
              fontFamily="var(--font-cinzel)"
              letterSpacing="2"
              fontWeight="bold"
            >
              PISTA DE BAILE
            </text>

            {/* Mesas del salón */}
            {sampleTables.map((tbl) => {
              const isAssigned =
                assignedTable?.table_name?.toLowerCase().includes(tbl.name.toLowerCase()) ||
                (tbl.isHonor && assignedTable?.table_name?.toLowerCase().includes("honor"));

              return (
                <g key={tbl.id} className="cursor-pointer transition">
                  {/* Círculo de sillas */}
                  <circle
                    cx={tbl.x}
                    cy={tbl.y}
                    r={tbl.r + 8}
                    fill="none"
                    stroke={isAssigned ? "#C8A569" : "#C8A569"}
                    strokeWidth="1.5"
                    strokeDasharray="3 4"
                    opacity={isAssigned ? 0.9 : 0.35}
                  />

                  {/* Mesa principal */}
                  <circle
                    cx={tbl.x}
                    cy={tbl.y}
                    r={tbl.r}
                    fill={isAssigned ? "url(#goldTableGradLight)" : "#FAF8F5"}
                    stroke={isAssigned ? "#8C6D37" : "#C8A569"}
                    strokeWidth={isAssigned ? "2.5" : "1"}
                    filter={isAssigned ? "url(#glowFilterLight)" : undefined}
                  />

                  {/* Nombre de la mesa */}
                  <text
                    x={tbl.x}
                    y={tbl.y + 4}
                    textAnchor="middle"
                    fill={isAssigned ? "#10243B" : "#8C6D37"}
                    fontSize={tbl.isHonor ? "9" : "10"}
                    fontWeight={isAssigned ? "bold" : "normal"}
                    fontFamily="var(--font-cinzel)"
                  >
                    {tbl.name}
                  </text>
                </g>
              );
            })}

            <defs>
              <linearGradient id="goldTableGradLight" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FFF1D6" />
                <stop offset="50%" stopColor="#E5C388" />
                <stop offset="100%" stopColor="#C8A569" />
              </linearGradient>
              <filter id="glowFilterLight" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
          </svg>

          <p className="font-serif italic text-[11px] text-[#718096] mt-2">
            Tu mesa está resaltada en resplandor dorado brillante.
          </p>
        </div>
      </div>
    </section>
  );
}
