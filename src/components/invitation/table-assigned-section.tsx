"use client";

import React from "react";
import FloralCorner from "@/components/ornaments/floral-corner";
import GoldenGlyph from "@/components/ornaments/golden-glyph";
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
  // Lista de mesas de la sala para el plano interactivo SVG
  const sampleTables = [
    { id: "honor", name: "Mesa de Honor", x: 200, y: 55, r: 35, isHonor: true },
    { id: "tbl1", name: "Mesa 1", x: 90, y: 160, r: 32 },
    { id: "tbl2", name: "Mesa 2", x: 310, y: 160, r: 32 },
    { id: "tbl3", name: "Mesa 3", x: 200, y: 240, r: 32 },
  ];

  const tableName = assignedTable?.table_name || "Mesa asignada pendiente";

  return (
    <section className="relative w-full max-w-md mx-auto my-6 bg-[#0E1A29] border border-[#C8A569]/30 rounded-3xl p-6 sm:p-8 text-center shadow-2xl overflow-hidden ornamental-card">
      <FloralCorner position="top-left" className="absolute top-0 left-0" />
      <FloralCorner position="bottom-right" className="absolute bottom-0 right-0" />

      <div className="relative z-10 space-y-4">
        <p className="text-[11px] uppercase tracking-widest text-[#C8A569] font-medium">
          DISTRIBUCIÓN DE LA RECEPCIÓN
        </p>
        <GoldenGlyph />

        <h2 className="text-2xl sm:text-3xl font-serif italic text-white leading-tight">
          Tu Lugar en Nuestra Boda
        </h2>

        <p className="text-xs text-neutral-300 max-w-xs mx-auto leading-relaxed">
          Hemos preparado un espacio muy especial para ti para celebrar juntos una noche inolvidable.
        </p>

        {/* Tarjeta de la mesa asignada */}
        <div className="my-5 p-4 rounded-2xl bg-gradient-to-b from-[#10243B] to-[#0A1726] border border-[#C8A569]/40 shadow-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C8A569]/15 border border-[#C8A569]/40 text-[#E5C388] text-xs font-medium mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Mesa Reservada
          </div>
          <p className="text-xl sm:text-2xl font-serif font-bold text-[#E5C388] tracking-wide">
            {tableName}
          </p>
          <div className="mt-2 flex flex-wrap justify-center gap-1.5">
            {guestNames.map((name, idx) => (
              <span
                key={idx}
                className="text-xs text-neutral-300 bg-[#070D16] px-2.5 py-0.5 rounded-full border border-neutral-700/60"
              >
                {name}
              </span>
            ))}
          </div>
        </div>

        {/* Plano interactivo SVG del salón */}
        <div className="relative bg-[#070D16]/90 border border-[#C8A569]/20 rounded-2xl p-4 shadow-inner">
          <p className="text-[10px] uppercase tracking-wider text-[#C8A569] mb-2 font-medium">
            Plano del Salón de Recepción
          </p>

          <svg viewBox="0 0 400 300" className="w-full h-48 select-none">
            {/* Pista de baile central */}
            <rect
              x="140"
              y="110"
              width="120"
              height="80"
              rx="12"
              fill="#10243B"
              stroke="#C8A569"
              strokeWidth="1"
              strokeDasharray="4 3"
              opacity="0.6"
            />
            <text
              x="200"
              y="155"
              textAnchor="middle"
              fill="#C8A569"
              fontSize="10"
              opacity="0.8"
              fontFamily="var(--font-cinzel)"
              letterSpacing="2"
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
                    stroke={isAssigned ? "#E5C388" : "#4A5D73"}
                    strokeWidth="1.5"
                    strokeDasharray="3 4"
                    opacity={isAssigned ? 0.9 : 0.4}
                  />

                  {/* Mesa principal */}
                  <circle
                    cx={tbl.x}
                    cy={tbl.y}
                    r={tbl.r}
                    fill={isAssigned ? "url(#goldTableGrad)" : "#13253B"}
                    stroke={isAssigned ? "#FFFFFF" : "#C8A569"}
                    strokeWidth={isAssigned ? "2.5" : "1"}
                    filter={isAssigned ? "url(#glowFilter)" : undefined}
                  />

                  {/* Nombre de la mesa */}
                  <text
                    x={tbl.x}
                    y={tbl.y + 4}
                    textAnchor="middle"
                    fill={isAssigned ? "#10243B" : "#C8A569"}
                    fontSize={tbl.isHonor ? "9" : "10"}
                    fontWeight={isAssigned ? "bold" : "normal"}
                    fontFamily="sans-serif"
                  >
                    {tbl.name}
                  </text>
                </g>
              );
            })}

            <defs>
              <linearGradient id="goldTableGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FFF1D6" />
                <stop offset="50%" stopColor="#E5C388" />
                <stop offset="100%" stopColor="#C8A569" />
              </linearGradient>
              <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
          </svg>

          <p className="text-[10px] text-neutral-400 mt-2 italic">
            Tu mesa está resaltada en dorado brillante.
          </p>
        </div>
      </div>
    </section>
  );
}
