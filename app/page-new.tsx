import PremiumNavbar from "@/components/PremiumNavbar";
import HeroSection from "@/components/HeroSection";
import FormulasSection from "@/components/FormulasSection";
import GallerySection from "@/components/GallerySection";
import FAQSection from "@/components/FAQSection";

export const metadata = {
  title: "AutoFocus — Detailing mobile premium",
  description:
    "Redonnez un éclat nouveau à votre véhicule. Detailing professionnel à domicile avec finitions haut de gamme et photos premium.",
};

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
