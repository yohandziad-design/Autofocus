import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
// lightweight local clsx replacement to avoid adding the dependency during repair
const clsx = (...parts: Array<string | false | null | undefined>) => parts.filter(Boolean).join(' ')

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://autofocus.example"), // ← à remplacer par votre domaine
  title: {
    default: "AutoFocus — Detailing mobile Hauts‑de‑France",
    template: "%s | AutoFocus",
  },
  description:
    "Redonnez un éclat neuf à votre véhicule. Nettoyage professionnel à domicile, retouches et photos de présentation.",
  keywords: [
    "detailing",
    "lavage auto",
    "nettoyage voiture",
    "Hauts-de-France",
    "à domicile",
  ],
  openGraph: {
    type: "website",
    url: "/",
    siteName: "AutoFocus",
    title: "AutoFocus — Detailing mobile Hauts‑de‑France",
    description:
      "Nettoyage professionnel à domicile : intérieur, extérieur et formule complète avec photos.",
    images: [
      {
        url: "/beforeafter/after.png",
        width: 1200,
        height: 630,
        alt: "AutoFocus — Avant / Après",
      },
    ],
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "AutoFocus — Detailing mobile Hauts‑de‑France",
    description:
      "Nettoyage professionnel à domicile : intérieur, extérieur et formule complète avec photos.",
    images: ["/beforeafter/after.png"],
  },
  icons: {
    icon: [
      { url: "/logo.png", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: [{ url: "/logo.png", type: "image/png" }],
    shortcut: ["/logo.png"],
  },
  alternates: {
    canonical: "/",
  },
};

export const viewport: Viewport = {
  themeColor: "#10b981", // emerald-500
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="h-full scroll-smooth">
      <body
        className={clsx(
          inter.className,
          "min-h-screen bg-slate-950 text-white antialiased selection:bg-emerald-400/30 selection:text-white"
        )}
      >
        {/*
          Root layout global wrapper. Les sections (Navbar, BackgroundFX, etc.)
          sont gérées par page.tsx pour rester spécifiques à la landing.
        */}
        {children}
      </body>
    </html>
  );
}
