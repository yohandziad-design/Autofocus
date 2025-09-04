import PremiumNavbar from "@/components/PremiumNavbar";
import GallerySection from "@/components/GallerySection";
import BackgroundFX from "@/components/BackgroundFX";
import Link from "next/link";

export const metadata = {
  title: "Galerie — AutoFocus Detailing",
  description:
    "Découvrez notre galerie de réalisations. Avant/après, finitions premium et transformations spectaculaires de nos clients.",
};

export default function GaleriePage() {
  return (
    <main className="min-h-screen bg-slate-950">
      <BackgroundFX />
      <PremiumNavbar />

      <GallerySection />
      
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
