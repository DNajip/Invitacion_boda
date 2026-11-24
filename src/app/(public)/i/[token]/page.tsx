import { Metadata } from "next";
import { getInvitationData } from "@/app/actions/invitation";
import { Sparkles, AlertCircle, Heart } from "lucide-react";

interface Props {
  params: Promise<{ token: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { token } = await params;
  const data = await getInvitationData(token);

  if (!data.success) {
    return {
      title: "Invitación de Boda",
      description: "Invitación digital interactiva",
    };
  }

  const groom = data.wedding.groom_name;
  const bride = data.wedding.bride_name;
  const recipient = data.invitation.recipient_name;

  return {
    title: `Invitación de Boda · ${groom} & ${bride} para ${recipient}`,
    description: `Con alegría te invitamos a celebrar el matrimonio de ${groom} & ${bride}.`,
    openGraph: {
      title: `${groom} & ${bride} - Nuestra Boda`,
      description: `Invitación especial para ${recipient}`,
    },
  };
}

export default async function InvitationPage({ params }: Props) {
  const { token } = await params;
  const data = await getInvitationData(token);

  // Caso: Token inválido o invitación desactivada
  if (!data.success) {
    return (
      <div className="min-h-screen bg-[#0A121E] text-white flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-[#10243B]/90 border border-[#C8A569]/30 rounded-2xl p-8 text-center backdrop-blur-md shadow-2xl relative">
          <div className="w-16 h-16 rounded-full bg-[#0A1726] border border-[#C8A569]/40 flex items-center justify-center mx-auto mb-4 text-[#C8A569]">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h1 className="text-xl font-serif text-[#FFFFFF] tracking-wider mb-2">
            Invitación no disponible
          </h1>
          <p className="text-xs text-neutral-300 leading-relaxed mb-6">
            El enlace al que intentas acceder no es válido o ha sido desactivado por los novios.
            Por favor comunícate con ellos para recibir tu enlace actualizado.
          </p>
          <div className="border-t border-[#C8A569]/10 pt-4 flex items-center justify-center gap-1.5 text-xs text-[#C8A569]">
            <span>Daren & Fabiola</span>
            <Heart className="w-3 h-3 fill-[#C8A569]" />
            <span>19.12.2026</span>
          </div>
        </div>
      </div>
    );
  }

  const { invitation, wedding, settings, guests } = data;

  return (
    <div className="min-h-screen bg-[#070D16] text-[#FFFFFF] flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Luces y partículas de fondo */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#C8A569]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Contenedor temporal de verificación de Fase 03 */}
      <div className="max-w-md w-full bg-[#10243B] border-2 border-[#C8A569]/40 rounded-3xl p-8 text-center shadow-2xl relative z-10">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#E5C388] to-[#C8A569] shadow-lg mb-6 p-[2px]">
          <div className="w-full h-full rounded-full bg-[#10243B] flex items-center justify-center">
            <span className="font-serif italic text-2xl font-bold tracking-widest text-[#E5C388]">
              {wedding.monogram}
            </span>
          </div>
        </div>

        <p className="text-xs tracking-widest uppercase text-[#C8A569] font-medium mb-1">
          Nuestra Boda
        </p>
        <h1 className="text-3xl font-serif italic text-[#FFFFFF] mb-4">
          {wedding.groom_name} & {wedding.bride_name}
        </h1>

        <div className="my-6 p-4 rounded-2xl bg-[#0A1726]/80 border border-[#C8A569]/20">
          <p className="text-xs text-neutral-400 font-medium mb-1">Invitación especial para:</p>
          <p className="text-xl font-serif font-bold text-[#E5C388]">
            {invitation.recipient_name}
          </p>
          <p className="text-xs text-emerald-400 mt-1 font-medium">
            {invitation.authorized_count} {invitation.authorized_count === 1 ? "lugar reservado" : "lugares reservados"}
          </p>
        </div>

        <div className="text-xs text-neutral-300 space-y-1.5 mb-6">
          <p>📅 Sábado, 19 de Diciembre de 2026</p>
          <p>⛪ Ceremonia: {settings.ceremony_time}</p>
          <p>🥂 Recepción: {settings.reception_time}</p>
        </div>

        <div className="p-3 bg-[#070D16]/60 rounded-xl border border-neutral-700/60 text-[11px] text-neutral-400">
          🔒 Enlace seguro y exclusivo verificado vía token criptográfico de 128 bits.
        </div>
      </div>
    </div>
  );
}
