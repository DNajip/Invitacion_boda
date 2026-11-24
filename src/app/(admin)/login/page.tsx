"use client";

import { useState } from "react";
import { loginAdmin } from "@/app/actions/admin";
import { Heart, Lock, Mail, Loader2, Sparkles } from "lucide-react";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const result = await loginAdmin(formData);

    if (result && !result.success) {
      setError(result.error);
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0B1522] text-[#F3F4F6] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Luces y brillo ambiental */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#C8A569]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#10243B]/60 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-[#10243B]/90 border border-[#C8A569]/30 rounded-2xl p-8 backdrop-blur-xl shadow-2xl relative z-10">
        {/* Monograma y encabezado */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#C8A569] to-[#99793D] shadow-lg mb-4 p-[2px]">
            <div className="w-full h-full rounded-full bg-[#10243B] flex items-center justify-center">
              <span className="font-serif italic text-2xl font-bold tracking-widest text-[#E5C388]">
                D&F
              </span>
            </div>
          </div>
          <h1 className="text-2xl font-serif tracking-wider text-[#FFFFFF] flex items-center justify-center gap-2">
            Wedding Manager
          </h1>
          <p className="text-xs tracking-widest uppercase text-[#C8A569] mt-1 font-medium">
            Panel de Administración Exclusivo
          </p>
        </div>

        {/* Mensaje de error */}
        {error && (
          <div className="mb-6 p-3 bg-red-950/60 border border-red-500/50 rounded-lg text-red-200 text-sm text-center">
            {error}
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs uppercase tracking-wider text-neutral-300 mb-2 font-medium">
              Correo Electrónico
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C8A569]" />
              <input
                type="email"
                name="email"
                required
                placeholder="ejemplo@correo.com"
                defaultValue="dnajippineda@gmail.com"
                className="w-full bg-[#0A1726] border border-[#C8A569]/20 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#C8A569] focus:ring-1 focus:ring-[#C8A569] transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-neutral-300 mb-2 font-medium">
              Contraseña
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C8A569]" />
              <input
                type="password"
                name="password"
                required
                placeholder="••••••••"
                className="w-full bg-[#0A1726] border border-[#C8A569]/20 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#C8A569] focus:ring-1 focus:ring-[#C8A569] transition"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 bg-gradient-to-r from-[#C8A569] to-[#E5C388] hover:from-[#B89456] hover:to-[#D4B075] text-[#10243B] font-semibold py-3 px-4 rounded-xl shadow-lg transition duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Accediendo...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Iniciar Sesión
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center border-t border-[#C8A569]/10 pt-4">
          <p className="text-xs text-neutral-400 flex items-center justify-center gap-1.5">
            Daren & Fabiola <Heart className="w-3 h-3 text-[#C8A569] fill-[#C8A569]" /> 19.12.2026
          </p>
        </div>
      </div>
    </div>
  );
}
