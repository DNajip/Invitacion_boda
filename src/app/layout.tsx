import type { Metadata } from "next";
import { Cormorant_Garamond, Cinzel, Montserrat, Great_Vibes } from "next/font/google";
import "./globals.css";

const greatVibes = Great_Vibes({
  variable: "--font-script",
  subsets: ["latin"],
  weight: ["400"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const montserrat = Montserrat({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://invitacion-boda-bice.vercel.app");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Wedding Invitation Manager · Daren & Fabiola",
  description: "Invitación de boda digital exclusiva y personalizada.",
  openGraph: {
    title: "Daren & Fabiola - Nuestra Boda",
    description: "Invitación de boda digital exclusiva y personalizada.",
    url: siteUrl,
    siteName: "Boda Daren & Fabiola",
    images: [
      {
        url: "/images/og-wax-seal.png",
        width: 600,
        height: 600,
        alt: "Sello de Cera D&F · Boda Daren & Fabiola",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Daren & Fabiola - Nuestra Boda",
    description: "Invitación de boda digital exclusiva y personalizada.",
    images: ["/images/og-wax-seal.png"],
  },
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${greatVibes.variable} ${cormorant.variable} ${cinzel.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
