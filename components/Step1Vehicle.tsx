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
    <div>
      <h2 className="mb-4 text-xl font-semibold">1) Type de véhicule</h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {VEHICLES.map((v) => {
          const active = v.key === vehicle;
          return (
            <button
              key={v.key}
              onClick={() => setVehicle(v.key as VehicleKey)}
              className={[
                "lift rounded-2xl border p-4 text-left transition",
                active
                  ? "border-emerald-400 bg-emerald-400/10"
                  : "border-white/10 bg-white/5 hover:bg-white/10",
              ].join(" ")}
            >
              <div className="flex items-center justify-between">
                <p className="font-medium">{v.label}</p>
                {active && (
                  <span className="rounded-full bg-emerald-500/90 px-2 py-0.5 text-xs text-blue-950">
                    Choisi
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

      <div className="mt-6 flex items-center justify-between">
        <a href="/" className="btn btn-outline">
          Retour
        </a>
        <button
          onClick={goToNextStep}
          disabled={!canContinue}
          className="btn btn-primary disabled:opacity-50"
        >
          Continuer
        </button>
      </div>
    </div>
  );
}
