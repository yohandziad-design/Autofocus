"use client";

import { useState } from "react";
import { FORMULAS } from "@/lib/data";
import type { Booking, Formula } from "@/types/booking";

interface Step2Props {
  booking: Booking;
  onUpdate: (updates: Partial<Booking>) => void;
  goToNextStep?: () => void;
}

type FormulaData = {
  key: Formula;
  label: string;
  price: number;
  features: string[];
};

export default function Step2Formula({ booking, onUpdate, goToNextStep }: Step2Props) {
  const [activeFormula, setActiveFormula] = useState<FormulaData | null>(null);

  const handleSelectFormula = (formula: FormulaData) => {
    onUpdate({ formula: formula.key });
    if (goToNextStep) {
      goToNextStep();
    }
  };

  return (
    <div className="w-full max-w-4xl">
      <div className="mb-8 text-center">
        <h2 className="mb-3 text-2xl font-bold text-white">
          Choisissez votre formule
        </h2>
        <p className="text-white/70">
          Sélectionnez la formule qui correspond le mieux à vos besoins
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {FORMULAS.map((formula) => (
          <div
            key={formula.key}
            className={`card-premium cursor-pointer transition-all duration-300 ${
              booking.formula === formula.key
                ? "border-primary bg-primary/10 shadow-lg shadow-primary/20"
                : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
            }`}
            onClick={() => {
              onUpdate({ formula: formula.key });
              setActiveFormula(formula);
            }}
          >
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-white">{formula.label}</h3>
            </div>

            <div className="mb-4">
              <div className="text-2xl font-bold text-primary">{formula.price}€</div>
            </div>

            <ul className="space-y-2">
              {formula.features.map((item, idx) => (
                <li key={idx} className="flex items-center text-sm text-white/80">
                  <svg
                    className="mr-2 h-4 w-4 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>

            {booking.formula === formula.key && (
              <div className="mt-4 border-t border-white/10 pt-4">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveFormula(activeFormula?.key === formula.key ? null : formula);
                  }}
                  className="text-sm text-primary hover:text-primary/80"
                >
                  {activeFormula?.key === formula.key ? "Masquer les détails" : "Voir les détails"}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {activeFormula && (
        <div className="relative mt-4 max-w-2xl rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[.03] p-5 text-sm text-white shadow-2xl backdrop-blur-xl">
          <button
            onClick={() => setActiveFormula(null)}
            className="absolute right-4 top-4 text-white/60 hover:text-white"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <h4 className="mb-3 text-lg font-semibold">{activeFormula.label}</h4>
          
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h5 className="mb-2 font-medium">Inclus:</h5>
              <ul className="space-y-1">
                {activeFormula.features.map((item, idx) => (
                  <li key={idx} className="flex items-center text-white/70">
                    <span className="mr-2">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h5 className="mb-2 font-medium">Informations:</h5>
              <div className="space-y-1 text-white/70">
                <div>Prix: <span className="text-primary">{activeFormula.price}€</span></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {booking.formula && goToNextStep && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={goToNextStep}
            className="btn-primary px-8 py-3"
          >
            Continuer vers les informations
          </button>
        </div>
      )}
    </div>
  );
}
