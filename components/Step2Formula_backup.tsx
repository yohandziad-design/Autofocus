import { FORMULAS } from "@/lib/data";
import type { Booking, Formula } from "@/types/booking";

interface Step2Props {
  formula: Formula | null;
  setFormula: (formula: Formula | null) => void;
  goToPrevStep: () => void;
  goToNextStep: () => void;
}

export default function Step2Formula({ formula, setFormula, goToPrevStep, goToNextStep }: Step2Props) {
  return (
    <div className="w-full max-w-4xl">
      <div className="mb-8 text-center">
        <h2 className="mb-3 text-2xl font-bold text-white">
          Choisissez votre formule
        </h2>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {FORMULAS.map((formulaData) => (
          <div
            key={formulaData.key}
            className={`cursor-pointer rounded-xl border p-6 transition-all duration-200 ${
              formula === formulaData.key
                ? "border-primary bg-primary/10"
                : "border-white/10 bg-white/5 hover:bg-white/10"
            }`}
            onClick={() => setFormula(formulaData.key)}
          >
            <h3 className="text-lg font-semibold text-white">{formulaData.label}</h3>
            <div className="text-2xl font-bold text-primary">{formulaData.price}€</div>
            <ul className="mt-4 space-y-1">
              {formulaData.features.map((feature, idx) => (
                <li key={idx} className="text-sm text-white/80">• {feature}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-between">
        <button
          onClick={goToPrevStep}
          className="rounded-lg bg-white/10 px-6 py-2 text-white hover:bg-white/20"
        >
          Précédent
        </button>
        <button
          onClick={goToNextStep}
          disabled={!formula}
          className="rounded-lg bg-primary px-6 py-2 text-white hover:bg-primary/80 disabled:opacity-50"
        >
          Suivant
        </button>
      </div>
    </div>
  );
}
