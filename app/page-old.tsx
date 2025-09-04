import Link from "next/link";
import Image from "next/image";
import { FORMULAS } from "@/lib/data";

// Client components already exist in your repo under app/components
// (Navbar, BackgroundFX, BeforeAfter, FormulesUI, Gallery, Partners, Testimonial)
// You can safely remove any imports for components you haven't created yet.
// import Navbar from "@/app/components/Navbar";
import Navbar from "../components/Navbar";
import BackgroundFX from "../components/BackgroundFX";
import BeforeAfter from "../components/BeforeAfter"; // uses /public/beforeafter/before.png & after.png
// Removed FormulesUI to avoid framer-motion typing issues; replaced by inline pricing section
import Gallery from "../components/Gallery";
// Partners removed per request

export const metadata = {
  title: "AutoFocus — Detailing mobile Hauts‑de‑France",
  description:
    "Redonnez un éclat neuf à votre véhicule. Nettoyage professionnel à domicile avec retouches et photos de présentation.",
};

export default function Page() {
  return (
  import PremiumNavbar from "@/components/PremiumNavbar";
import HeroSection from "@/components/HeroSection";
import FormulasSection from "@/components/FormulasSection";
import GallerySection from "@/components/GallerySection";
import FAQSection from "@/components/FAQSection";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950">
      <PremiumNavbar />
      <HeroSection />
      <FormulasSection />
      <GallerySection />
      <FAQSection />
      
      {/* Footer Simple */}
      <footer className="bg-black py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-slate-400">
              © 2024 AutoFocus. Detailing professionnel à domicile.
            </p>
            <p className="text-slate-500 text-sm mt-2">
              Redonnez un éclat nouveau à votre véhicule
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
  );
}
