import React from "react";

interface Props {
  monogram?: string;
  className?: string;
  size?: number;
}

export default function WaxSeal({ monogram = "D&F", className = "", size = 90 }: Props) {
  return (
    <div
      style={{ width: size, height: size }}
      className={`relative rounded-full flex items-center justify-center select-none shadow-[0_8px_20px_rgba(0,0,0,0.5),inset_0_2px_4px_rgba(255,255,255,0.6),inset_0_-3px_6px_rgba(100,70,20,0.8)] border border-[#E5C388] bg-gradient-to-br from-[#E8CA94] via-[#C8A569] to-[#96743B] cursor-pointer ${className}`}
    >
      {/* Anillo interior grabado en cera */}
      <div className="w-[82%] h-[82%] rounded-full border border-[#8C6D37]/40 flex items-center justify-center shadow-[inset_0_2px_5px_rgba(0,0,0,0.35)]">
        {/* Monograma en relieve */}
        <span
          className="font-serif italic font-bold tracking-wider text-[#63491E] drop-shadow-[0_1px_1px_rgba(255,255,255,0.6)]"
          style={{ fontSize: size * 0.28 }}
        >
          {monogram}
        </span>
      </div>

      {/* Brillo especular superior */}
      <div className="absolute top-1 left-1/4 w-1/2 h-2.5 bg-white/30 rounded-full blur-[1px] pointer-events-none" />
    </div>
  );
}
