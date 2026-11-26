"use client";

import { useRef, useState, useImperativeHandle, forwardRef } from "react";
import { Music2 } from "lucide-react";

export interface AudioPlayerRef {
  startAudioWithFade: () => void;
}

interface Props {
  audioSrc?: string;
}

const AudioPlayer = forwardRef<AudioPlayerRef, Props>(
  ({ audioSrc = "/audio/a-thousand-years.mp3" }, ref) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const startAudioWithFade = () => {
      if (!audioRef.current) return;
      const audio = audioRef.current;

      audio.volume = 0;
      const playPromise = audio.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            // Fade-in gradual de volumen durante 2.5 segundos hasta 0.75
            let currentVol = 0;
            const fadeInterval = setInterval(() => {
              currentVol = Math.min(0.75, currentVol + 0.05);
              if (audio) {
                audio.volume = currentVol;
              }
              if (currentVol >= 0.75) {
                clearInterval(fadeInterval);
              }
            }, 120);
          })
          .catch((err) => {
            console.warn("Autoplay bloqueado por el navegador:", err);
          });
      }
    };

    useImperativeHandle(ref, () => ({
      startAudioWithFade,
    }));

    const togglePlay = () => {
      if (!audioRef.current) return;
      const audio = audioRef.current;

      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        audio.volume = 0.75;
        audio
          .play()
          .then(() => setIsPlaying(true))
          .catch((err) => {
            console.warn("Error al reproducir audio:", err);
          });
      }
    };

    return (
      <>
        <audio
          ref={audioRef}
          src={audioSrc}
          loop
          preload="auto"
        />

        {/* Botón flotante de control musical */}
        <div className="fixed bottom-6 right-6 z-50">
          <button
            type="button"
            onClick={togglePlay}
            aria-label={isPlaying ? "Silenciar música" : "Activar música"}
            title={isPlaying ? "Silenciar música" : "Activar música"}
            className="w-12 h-12 rounded-full bg-[#0A1726]/90 border border-[#C8A569]/80 shadow-[0_4px_20px_rgba(0,0,0,0.6)] flex items-center justify-center text-[#E5C388] hover:scale-105 active:scale-95 transition-all backdrop-blur-md cursor-pointer group"
          >
            {isPlaying ? (
              <div className="relative flex items-center justify-center">
                <Music2 className="w-5 h-5 text-[#E5C388] transition-transform duration-300 group-hover:scale-110" />
                {/* Sutil halo pulsante dorado */}
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#E5C388] animate-ping opacity-75" />
              </div>
            ) : (
              <div className="relative flex items-center justify-center">
                <Music2 className="w-5 h-5 text-[#E5C388]/40" />
                {/* Línea diagonal de silenciado */}
                <div className="absolute w-6 h-[1.5px] bg-[#E5C388]/80 transform rotate-45 pointer-events-none" />
              </div>
            )}
          </button>
        </div>
      </>
    );
  }
);

AudioPlayer.displayName = "AudioPlayer";

export default AudioPlayer;
