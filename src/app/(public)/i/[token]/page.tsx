import { Metadata } from "next";
import { getInvitationData } from "@/app/actions/invitation";
import WeddingCard from "@/components/invitation/wedding-card";
import { AlertCircle, Heart } from "lucide-react";

interface Props {
  params: Promise<{ token: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { token } = await params;
  const data = await getInvitationData(token);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://invitacion-boda-bice.vercel.app";

  if (!data.success) {
    return {
      metadataBase: new URL(siteUrl),
      title: "Invitación de Boda",
      description: "Invitación digital interactiva",
      openGraph: {
        images: [
          {
            url: "/images/og-wax-seal.png",
            width: 600,
            height: 600,
            alt: "Sello de Cera D&F",
          },
        ],
      },
    };
  }

  const groom = data.wedding.groom_name;
  const bride = data.wedding.bride_name;
  const recipient = data.invitation.recipient_name;

  return {
    metadataBase: new URL(siteUrl),
    title: `Invitación de Boda · ${groom} & ${bride} para ${recipient}`,
    description: `Con alegría te invitamos a celebrar el matrimonio de ${groom} & ${bride}.`,
    openGraph: {
      title: `${groom} & ${bride} - Nuestra Boda`,
      description: `Invitación especial para ${recipient}`,
      url: `${siteUrl}/i/${token}`,
      siteName: `Boda ${groom} & ${bride}`,
      images: [
        {
          url: "/images/og-wax-seal.png",
          width: 600,
          height: 600,
          alt: `Sello de Cera ${groom} & ${bride}`,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary",
      title: `${groom} & ${bride} - Nuestra Boda`,
      description: `Invitación especial para ${recipient}`,
      images: ["/images/og-wax-seal.png"],
    },
    icons: {
      icon: "/icon.png",
      apple: "/apple-icon.png",
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

  return <WeddingCard data={data} />;
}
