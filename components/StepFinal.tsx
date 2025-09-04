"use client";

import React, { useMemo } from "react";

export type VehicleKey = string & {};
export type FormulaKey = string & {};

export type VehicleItem = { key: VehicleKey; label: string };
export type FormulaItem = { key: FormulaKey; label: string; price: number };

export type StepFinalProps = {
  // Selections
  vehicle: VehicleKey | null;
  vehicles: VehicleItem[];
  formula: FormulaKey | null;
  formulas: FormulaItem[];

  // Customer data
  firstName: string;
  lastName: string;
  phone?: string;
  address: string;
  city: string;
  zip: string;
  date: string; // yyyy-mm-dd
  slot: string; // e.g., "09:00 – 11:00"
  notes?: string;

  // Actions
  onBack?: () => void;

  // WhatsApp number (E.164 sans +). Si non fourni, ouvre WhatsApp avec sélection du contact.
  waNumber?: string;
};

export function makeWhatsAppText(opts: Omit<StepFinalProps, "vehicles" | "formulas" | "onBack" | "waNumber"> & {
  vehicleLabel: string;
  formulaLabel: string;
  price: number;
}) {
  const {
    vehicleLabel,
    formulaLabel,
    price,
    firstName,
    lastName,
    phone,
    address,
    city,
    zip,
    date,
    slot,
    notes,
  } = opts;

  const lines = [
    "Bonjour, je souhaite réserver :",
    `• Véhicule : ${vehicleLabel}`,
    `• Formule : ${formulaLabel} (${price}€)`,
    "",
    "Coordonnées :",
    `• Nom : ${lastName.toUpperCase()} ${firstName}`,
    `• Téléphone : ${phone || "(non renseigné)"}`,
    `• Adresse : ${address}, ${zip} ${city}`,
    `• Date souhaitée : ${date} (${slot})`,
    notes ? `• Notes : ${notes}` : "",
    "",
    `Total estimé : ${price}€`,
    "Envoyé depuis le site AutoFocus",
  ].filter(Boolean);
  return lines.join("\n");
}

export default function StepFinal(props: StepFinalProps) {
  const {
    vehicle,
    vehicles,
    formula,
    formulas,
    firstName,
    lastName,
    phone,
    address,
    city,
    zip,
    date,
    slot,
    notes,
    onBack,
    waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "",
  } = props;

  const v = useMemo(() => vehicles.find((x) => x.key === vehicle) || null, [vehicles, vehicle]);
  const f = useMemo(() => formulas.find((x) => x.key === formula) || null, [formulas, formula]);

  const canSubmit = Boolean(
    v &&
      f &&
      firstName.trim().length > 1 &&
      lastName.trim().length > 1 &&
      address.trim().length > 5 &&
      city.trim().length > 1 &&
      zip.trim().length >= 4 &&
      date
  );

  function openWhatsApp() {
    if (!canSubmit || !v || !f) return;
    const text = makeWhatsAppText({
      vehicleLabel: v.label,
      formulaLabel: f.label,
      price: f.price,
      firstName,
      lastName,
      phone,
      address,
      city,
      zip,
      date,
      slot,
      notes,
      vehicle: (vehicle as VehicleKey) || "",
      formula: (formula as FormulaKey) || "",
    });

    const base = waNumber ? `https://wa.me/${waNumber}` : `https://wa.me/`;
    const url = `${base}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  }

  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold">3) Coordonnées & envoi</h2>

      {/* Récap compact */}
      <div className="card p-4">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-white/70">Véhicule</span>
              <span className="font-medium">{v ? v.label : "—"}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/70">Formule</span>
              <span className="font-medium">{f ? `${f.label} — ${f.price}€` : "—"}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/70">Date</span>
              <span className="font-medium">{date || "—"}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/70">Créneau</span>
              <span className="font-medium">{slot || "—"}</span>
            </div>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-white/70">Nom</span>
              <span className="font-medium">{lastName.toUpperCase()} {firstName}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/70">Téléphone</span>
              <span className="font-medium">{phone || "—"}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/70">Adresse</span>
              <span className="font-medium text-right">{address}, {zip} {city}</span>
            </div>
          </div>
        </div>
        {notes && (
          <p className="tip mt-3">Notes : {notes}</p>
        )}
        <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
          <span>Total estimé</span>
          <span className="text-emerald-400">{f?.price ?? 0}€</span>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        {onBack ? (
          <button className="btn btn-outline" onClick={onBack}>Retour</button>
        ) : (
          <span />
        )}
        <button
          onClick={openWhatsApp}
          disabled={!canSubmit}
          className="relative inline-flex items-center gap-2 rounded-full px-6 py-3 font-medium text-blue-950 disabled:opacity-50"
          title={waNumber ? "Ouvrir WhatsApp" : "Ouvrir WhatsApp (numéro non configuré)"}
          style={{
            background:
              "radial-gradient(120% 120% at 50% 0%, rgba(16,185,129,0.9) 0%, rgba(16,185,129,0.8) 45%, rgba(16,185,129,0.75) 60%, rgba(16,185,129,0.65) 100%)",
            boxShadow:
              "0 0 20px rgba(16,185,129,.45), 0 0 40px rgba(16,185,129,.25)",
          }}
        >
          <span className="relative z-10">Envoyer la demande via WhatsApp</span>
          <span aria-hidden className="absolute inset-0 rounded-full ring-2 ring-emerald-400/40" style={{ filter: "blur(2px)" }} />
        </button>
      </div>
    </div>
  );
}
