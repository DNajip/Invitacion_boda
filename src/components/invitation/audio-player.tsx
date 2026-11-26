"use client";

import { useRef, useState, useImperativeHandle, forwardRef } from "react";
import { Volume2, VolumeX, Music } from "lucide-react";

export interface AudioPlayerRef {
  startAudioWithFade: () => void;
}

interface Props {
  audioSrc?: string;
}

const AudioPlayer = forwardRef<AudioPlayerRef, Props>(({ audioSrc = "/audio/ambient-romance.wav" }, ref) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const startAudioWithFade = () => {
    if (!audioRef.current) return;
    const audio = audioRef.current;

    audio.volume = 0;
    const playPromise = audio.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          // Fade-in gradual de volumen durante 3 segundos
          let currentVol = 0;
          const fadeInterval = setInterval(() => {
            currentVol = Math.min(1, currentVol + 0.05);
            if (audio) {
              audio.volume = currentVol;
            }
            if (currentVol >= 0.8) {
              clearInterval(fadeInterval);
            }
          }, 150);
        })
        .catch((err) => {
          console.warn("Autoplay bloqueado por el navegador:", err);
        });
    }
  };

  useImperativeHandle(ref, () => ({
    startAudioWithFade,
  }));

  const toggleMute = () => {
    if (!audioRef.current) return;
    if (audioRef.current.paused) {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(audioRef.current.muted);
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
          onClick={toggleMute}
          title={isMuted ? "Activar música" : "Silenciar música"}
          className="w-12 h-12 rounded-full bg-[#10243B]/90 border border-[#C8A569]/60 shadow-[0_4px_15px_rgba(0,0,0,0.5)] flex items-center justify-center text-[#E5C388] hover:scale-105 active:scale-95 transition backdrop-blur-md cursor-pointer group"
        >
          {isPlaying && !isMuted ? (
            <div className="relative">
              <Volume2 className="w-5 h-5 text-[#E5C388] group-hover:scale-110 transition" />
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </div>
          ) : isMuted ? (
            <VolumeX className="w-5 h-5 text-neutral-400" />
          ) : (
            <Music className="w-5 h-5 text-[#E5C388]" />
          )}
        </button>
      </div>
    </>
  );
});

AudioPlayer.displayName = "AudioPlayer";

export default AudioPlayer;
