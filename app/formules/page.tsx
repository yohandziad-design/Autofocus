import PremiumNavbar from "@/components/PremiumNavbar";
import FormulasSection from "@/components/FormulasSection";
import FAQSection from "@/components/FAQSection";
import BackgroundFX from "@/components/BackgroundFX";
import Link from "next/link";

export const metadata = {
  title: "Nos Formules — AutoFocus Detailing",
  description:
    "Découvrez nos formules de detailing professionnel : Essential, Premium et Prestige. Choisissez la formule qui correspond à vos besoins.",
};

export default function FormulesPage() {
  return (
    <main className="min-h-screen bg-slate-950">
      <BackgroundFX />
      <PremiumNavbar />

      <FormulasSection />
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
