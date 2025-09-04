"use client";

export default function ProgressBar({ step }: { step: number }) {
  const pct = ((step - 1) / 2) * 100; // 3 étapes => 0, 50, 100
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between text-sm text-white/70">
        <span className={step >= 1 ? "text-white" : ""}>1. Véhicule</span>
        <span className={step >= 2 ? "text-white" : ""}>2. Formule</span>
        <span className={step >= 3 ? "text-white" : ""}>3. Coordonnées</span>
      </div>
      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-emerald-500 transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
