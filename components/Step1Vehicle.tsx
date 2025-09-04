"use client";

import React from "react";
import { VEHICLES } from "@/lib/data";
import type { Vehicle as VehicleKey } from "@/types/booking";

export default function Step1Vehicle({
  vehicle,
  setVehicle,
  goToNextStep,
}: {
  vehicle: VehicleKey | null;
  setVehicle: (v: VehicleKey) => void;
  goToNextStep: () => void;
}) {
  const canContinue = Boolean(vehicle);
  return (
    <div className="space-y-6">
      <h2 className="mb-6 text-xl sm:text-2xl font-semibold text-white text-center">🚗 Quel est votre type de véhicule ?</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {VEHICLES.map((v) => {
          const active = v.key === vehicle;
          return (
            <button
              key={v.key}
              onClick={() => setVehicle(v.key as VehicleKey)}
              className={[
                "lift rounded-2xl border p-5 text-left transition-all transform active:scale-95",
                active
                  ? "border-emerald-400 bg-emerald-400/10 scale-105 shadow-lg shadow-emerald-400/20"
                  : "border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20",
              ].join(" ")}
            >
              <div className="flex items-center justify-between">
                <p className="font-medium text-base sm:text-lg text-white">{v.label}</p>
                {active && (
                  <span className="rounded-full bg-emerald-500/90 px-3 py-1 text-xs font-bold text-emerald-950">
                    ✓ Choisi
                  </span>
                )}
              </div>
              {v.note && (
                <p className="mt-1 text-sm text-white/60">{v.note}</p>
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-8 flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
        <a href="/" className="btn-ghost w-full sm:w-auto text-center">
          ← Retour à l'accueil
        </a>
        <button
          onClick={goToNextStep}
          disabled={!canContinue}
          className={`btn-primary w-full sm:w-auto text-lg py-3 px-8 ${
            canContinue 
              ? 'opacity-100 transform hover:scale-105' 
              : 'opacity-50 cursor-not-allowed'
          }`}
        >
          {canContinue ? '🚀 Continuer' : '👆 Choisissez un véhicule'}
        </button>
      </div>
    </div>
  );
}
