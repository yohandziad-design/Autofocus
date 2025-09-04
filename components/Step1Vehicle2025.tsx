"use client";
import { useState } from "react";

const VEHICLE_TYPES = [
  { label: "Citadine", icon: "🚗" },
  { label: "SUV", icon: "🚙" },
  { label: "Berline", icon: "🚘" },
  { label: "Utilitaire", icon: "🚐" },
];

function Stepper({ current = 0, steps = ["Véhicule", "Formule", "Coordonnées", "Récapitulatif"] }) {
  const pct = ((current + 1) / steps.length) * 100;
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between text-sm text-white/70">
        {steps.map((s, i) => (
          <span key={s} className={i <= current ? "text-white" : ""}>{s}</span>
        ))}
      </div>
      <div className="mt-3 h-2 rounded-full bg-white/10">
        <div className="h-2 rounded-full bg-gradient-to-r from-emerald-400 to-sky-400" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

type OptionCardProps = {
  label: string;
  icon: string;
  selected?: boolean;
  onClick?: () => void;
}

function OptionCard({ label, icon, selected, onClick }: OptionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        "group relative w-full card p-6 sm:p-7 text-left transition duration-300" +
        (selected ? " ring-emerald-400/60 shadow-[0_0_0_2px_rgba(52,211,153,.35)]" : "")
      }
    >
      <div className="text-3xl">{icon}</div>
      <div className="mt-4 text-lg font-medium">{label}</div>
      <span className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition [background:conic-gradient(from_180deg_at_50%_50%,#22c55e_0deg,#38bdf8_120deg,#a78bfa_240deg,#22c55e_360deg)] blur-[18px]" />
    </button>
  );
}

type Step1Vehicle2025Props = {
  onNext?: (vehicle: string) => void;
}

export default function Step1Vehicle2025({ onNext }: Step1Vehicle2025Props) {
  const [selected, setSelected] = useState<number>(0);
  return (
    <div className="min-h-screen page-gradient text-white relative overflow-hidden">
      <header className="py-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Réservation en ligne</h1>
      </header>
      <main className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="glass rounded-3xl p-8 sm:p-10 shadow-2xl">
          <Stepper current={0} />
          <div className="mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {VEHICLE_TYPES.map((v, i) => (
                <OptionCard
                  key={v.label}
                  label={v.label}
                  icon={v.icon}
                  selected={selected === i}
                  onClick={() => setSelected(i)}
                />
              ))}
            </div>
          </div>
          <button
            className="glow-button mt-8 inline-flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-3 font-semibold text-white shadow-lg hover:shadow-xl active:scale-95 transition"
            onClick={() => {
              if (onNext) {
                const chosen = VEHICLE_TYPES[selected]
                const label = chosen ? chosen.label : ""
                onNext(label)
              }
            }}
          >
            <span>Continuer</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </main>
    </div>
  );
}
