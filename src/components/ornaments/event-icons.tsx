import React from "react";

/**
 * Icono de Iglesia para la Ceremonia Religiosa
 */
export function ChurchIcon({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="#C8A569"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`mx-auto ${className}`}
    >
      {/* Cruz superior */}
      <line x1="32" y1="6" x2="32" y2="16" />
      <line x1="28" y1="10" x2="36" y2="10" />

      {/* Campanario / Techo triangular */}
      <polygon points="32,16 20,28 44,28" fill="none" />

      {/* Campanita */}
      <circle cx="32" cy="24" r="2" fill="#C8A569" />

      {/* Fachada principal */}
      <rect x="22" y="28" width="20" height="28" />

      {/* Puerta en arco */}
      <path d="M 28 56 V 42 A 4 4 0 0 1 36 42 V 56" />

      {/* Alas laterales */}
      <path d="M 22 36 H 14 V 56 H 22" />
      <path d="M 42 36 H 50 V 56 H 42" />
      <polygon points="14,36 18,30 22,36" fill="none" />
      <polygon points="42,36 46,30 50,36" fill="none" />
    </svg>
  );
}

/**
 * Icono de Copas Brindando para la Recepción y Solo Adultos
 */
export function ChampagneIcon({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="#C8A569"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`mx-auto ${className}`}
    >
      {/* Copa Izquierda */}
      <g transform="translate(18, 12)">
        <path d="M 4 2 L 18 2 L 15 18 C 14 24 8 24 7 18 Z" fill="#C8A569" fillOpacity="0.1" />
        <line x1="11" y1="23" x2="11" y2="38" />
        <line x1="5" y1="38" x2="17" y2="38" />
      </g>

      {/* Copa Derecha */}
      <g transform="translate(32, 12)">
        <path d="M 4 2 L 18 2 L 15 18 C 14 24 8 24 7 18 Z" fill="#C8A569" fillOpacity="0.1" />
        <line x1="11" y1="23" x2="11" y2="38" />
        <line x1="5" y1="38" x2="17" y2="38" />
      </g>

      {/* Burbujas / Chispas */}
      <circle cx="32" cy="10" r="1.5" fill="#E5C388" stroke="none" />
      <circle cx="28" cy="6" r="1" fill="#E5C388" stroke="none" />
      <circle cx="36" cy="6" r="1" fill="#E5C388" stroke="none" />
    </svg>
  );
}

/**
 * Icono de Buzón y Lluvia de Sobres
 */
export function MailboxIcon({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="#C8A569"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`mx-auto ${className}`}
    >
      {/* Caja de correos / buzón */}
      <rect x="14" y="28" width="36" height="28" rx="3" fill="#C8A569" fillOpacity="0.1" />
      {/* Tapa del buzón */}
      <path d="M 12 28 H 52" />

      {/* Corazón en el frente del buzón */}
      <path
        d="M 32 44 C 30 40 26 40 26 43 C 26 46 32 50 32 50 C 32 50 38 46 38 43 C 38 40 34 40 32 44 Z"
        fill="#C8A569"
        stroke="none"
      />

      {/* Sobre introduciéndose */}
      <g transform="translate(19, 10)">
        <rect x="2" y="2" width="22" height="15" rx="1.5" fill="#FFFFFF" fillOpacity="0.9" stroke="#C8A569" strokeWidth="1.5" />
        {/* Solapa del sobre */}
        <polyline points="2,2 13,10 24,2" stroke="#C8A569" strokeWidth="1.5" />
      </g>
    </svg>
  );
}

/**
 * Ilustración de Traje y Vestido para el Código de Vestimenta
 * Fiel a media_1795501916629.png
 */
export function SuitAndDressIllustration({ className = "w-full max-w-sm" }: { className?: string }) {
  return (
    <div className={`mx-auto flex items-center justify-center gap-6 py-4 ${className}`}>
      {/* Traje Masculino */}
      <svg viewBox="0 0 140 180" className="w-32 sm:w-40 h-44 sm:h-52 drop-shadow-lg">
        {/* Saco azul oscuro con borde dorado */}
        <path
          d="M 35 15 L 70 55 L 105 15 L 130 55 L 110 75 L 115 160 L 25 160 L 30 75 L 10 55 Z"
          fill="#1C3857"
          stroke="#C8A569"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        {/* Camisa blanca */}
        <polygon points="48,15 70,60 92,15" fill="#FFFFFF" stroke="#C8A569" strokeWidth="1.5" />
        {/* Corbata lila / púrpura */}
        <polygon points="66,22 74,22 75,55 70,68 65,55" fill="#7C6885" stroke="#C8A569" strokeWidth="1" />
        {/* Chaleco con borde dorado */}
        <path d="M 48 38 L 70 65 L 92 38 L 85 85 L 55 85 Z" fill="none" stroke="#C8A569" strokeWidth="1.5" />
        {/* Botones dorados */}
        <circle cx="70" cy="95" r="3" fill="#C8A569" />
        <circle cx="70" cy="115" r="3" fill="#C8A569" />
        {/* Línea central del saco */}
        <line x1="70" y1="55" x2="70" y2="160" stroke="#C8A569" strokeWidth="1.5" />
        {/* Solapas */}
        <path d="M 35 15 L 50 65 L 70 55" fill="none" stroke="#C8A569" strokeWidth="2" />
        <path d="M 105 15 L 90 65 L 70 55" fill="none" stroke="#C8A569" strokeWidth="2" />
      </svg>

      {/* Vestido Femenino */}
      <svg viewBox="0 0 140 180" className="w-32 sm:w-40 h-44 sm:h-52 drop-shadow-lg">
        {/* Vestido largo color lila / ciruela elegante con ribetes dorados */}
        <path
          d="M 50 15 L 42 55 L 70 30 L 98 55 L 90 15 L 78 50 L 62 50 Z"
          fill="#85688E"
          stroke="#C8A569"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        {/* Cinturón dorado */}
        <rect x="44" y="55" width="52" height="6" rx="2" fill="#C8A569" stroke="#E5C388" strokeWidth="1" />
        {/* Falda acampanada con pliegues dorados */}
        <path
          d="M 44 61 L 18 160 L 122 160 L 96 61 Z"
          fill="#85688E"
          stroke="#C8A569"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        {/* Pliegues de la falda */}
        <line x1="56" y1="61" x2="48" y2="160" stroke="#C8A569" strokeWidth="1.5" />
        <line x1="84" y1="61" x2="92" y2="160" stroke="#C8A569" strokeWidth="1.5" />
      </svg>
    </div>
  );
}
