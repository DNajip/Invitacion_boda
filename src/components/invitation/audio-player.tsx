"use client";

import { useRef, useState, useEffect, useImperativeHandle, forwardRef, useCallback } from "react";
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

    // Función para reproducir con aumento progresivo de volumen (fade-in)
    const startAudioWithFade = useCallback(() => {
      if (!audioRef.current) return;
      const audio = audioRef.current;

      if (!audio.paused) {
        setIsPlaying(true);
        return;
      }

      audio.volume = 0;
      const playPromise = audio.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
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
            console.warn("Autoplay bloqueado por políticas del navegador:", err);
          });
      }
    }, []);

    useImperativeHandle(ref, () => ({
      startAudioWithFade,
    }));

    // Auto-activación inmediata al entrar al enlace
    useEffect(() => {
      const audio = audioRef.current;
      if (!audio) return;

      // 1. Intentar reproducir de inmediato al montar el componente
      audio.volume = 0;
      const initialPromise = audio.play();

      if (initialPromise !== undefined) {
        initialPromise
          .then(() => {
            setIsPlaying(true);
            let currentVol = 0;
            const fadeInterval = setInterval(() => {
              currentVol = Math.min(0.75, currentVol + 0.05);
              if (audio) audio.volume = currentVol;
              if (currentVol >= 0.75) clearInterval(fadeInterval);
            }, 120);
          })
          .catch(() => {
            // 2. Si el navegador (móviles/iOS/Safari/Chrome) bloquea el audio sin interacción previa,
            // activarlo automáticamente al primer toque, clic o scroll en cualquier parte de la pantalla.
            const handleFirstGesture = () => {
              if (audioRef.current && audioRef.current.paused) {
                audioRef.current.volume = 0;
                audioRef.current
                  .play()
                  .then(() => {
                    setIsPlaying(true);
                    let currentVol = 0;
                    const fadeInterval = setInterval(() => {
                      currentVol = Math.min(0.75, currentVol + 0.05);
                      if (audioRef.current) audioRef.current.volume = currentVol;
                      if (currentVol >= 0.75) clearInterval(fadeInterval);
                    }, 120);
                  })
                  .catch(console.warn);
              }
              cleanup();
            };

            const events = ["click", "touchstart", "pointerdown", "scroll", "keydown"];
            const cleanup = () => {
              events.forEach((ev) => window.removeEventListener(ev, handleFirstGesture));
            };

            events.forEach((ev) =>
              window.addEventListener(ev, handleFirstGesture, { once: true, passive: true })
            );

            return cleanup;
          });
      }
    }, []);

    // Alternar silencio / reanudación al presionar el botón flotante
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
          autoPlay
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
