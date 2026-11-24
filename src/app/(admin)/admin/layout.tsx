import Link from "next/link";
import { logoutAdmin, getActiveWedding } from "@/app/actions/admin";
import { Settings, Users, LogOut } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { wedding } = await getActiveWedding();

  const groom = wedding?.groom_name || "Daren";
  const bride = wedding?.bride_name || "Fabiola";
  const monogram = wedding?.monogram || "D&F";
  const dateFormatted = wedding?.wedding_date
    ? new Date(wedding.wedding_date).toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : "19.12.2026";

  return (
    <div className="min-h-screen bg-[#0A121E] text-neutral-100 flex flex-col font-sans">
      {/* Barra Superior con la identidad visual exacta a la maqueta */}
      <header className="sticky top-0 z-40 bg-[#10243B]/95 backdrop-blur-md border-b border-[#C8A569]/20 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border border-[#C8A569]/60 bg-[#0B1522] flex items-center justify-center shadow-inner">
            <span className="font-serif italic text-xs font-bold text-[#E5C388] tracking-wider">
              {monogram}
            </span>
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-serif font-bold text-white tracking-wide leading-tight">
              Wedding Manager
            </h1>
            <p className="text-xs text-[#C8A569] font-medium">
              {groom} & {bride} · {dateFormatted}
            </p>
          </div>
        </div>

        {/* Navegación y acciones */}
        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            href="/admin"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-neutral-300 hover:text-white hover:bg-white/5 transition"
          >
            <Users className="w-4 h-4 text-[#C8A569]" />
            <span className="hidden sm:inline">Invitaciones</span>
          </Link>
          <Link
            href="/admin/settings"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-neutral-300 hover:text-white hover:bg-white/5 transition"
            title="Configuración de la Boda"
          >
            <Settings className="w-4 h-4 text-[#C8A569]" />
            <span className="hidden sm:inline">Configuración</span>
          </Link>

          <form action={logoutAdmin}>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition cursor-pointer"
              title="Cerrar Sesión"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Salir</span>
            </button>
          </form>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6 md:p-8">
        {children}
      </main>

      {/* Pie de página discreto */}
      <footer className="border-t border-[#C8A569]/10 py-4 text-center text-xs text-neutral-500">
        Wedding Invitation Manager · Daren & Fabiola 2026
      </footer>
    </div>
  );
}
