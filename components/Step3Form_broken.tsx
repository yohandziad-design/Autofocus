"use client";

import React, { useMemo } from "react";
import { SLOTS } from "@/lib/data";
import type { Booking } from "@/types/booking";

export default function Step3Form({
  formState,
  setFormState,
  goToPrevStep,
  canSubmit,
  handleSubmit,
}: {
  formState: Booking;
  setFormState: (state: Booking) => void;
  goToPrevStep: () => void;
  canSubmit: boolean;
  handleSubmit: () => void;
}) {
  const todayIso = useMemo(() => new Date().toISOString().split("T")[0], []);
  const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  return (
    <div className="space-y-6">
      <h2 className="mb-6 text-xl sm:text-2xl font-semibold text-white text-center">📝 Vos coordonnées</h2>

      <div className="space-y-6">
        {/* Nom et Prénom */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="tip">Prénom *</label>
            <input
              name="firstName"
            value={formState.firstName}
            onChange={handleChange}
            className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-emerald-400"
            placeholder="Jean"
          />
        </div>
        <div>
          <label className="tip">Nom</label>
          <input
            name="lastName"
            value={formState.lastName}
            onChange={handleChange}
            className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-emerald-400"
            placeholder="Dupont"
          />
        </div>

        <div>
          <label className="tip">Téléphone (optionnel)</label>
          <input
            name="phone"
            value={formState.phone}
            onChange={handleChange}
            className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-emerald-400"
            placeholder="06 12 34 56 78"
            inputMode="tel"
          />
        </div>

        <div>
          <label className="tip">Code postal</label>
          <input
            name="zip"
            value={formState.zip}
            onChange={handleChange}
            className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-emerald-400"
            placeholder="59000"
            inputMode="numeric"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="tip">Adresse</label>
          <input
            name="address"
            value={formState.address}
            onChange={handleChange}
            className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-emerald-400"
            placeholder="12 rue Exemple"
          />
        </div>

        <div>
          <label className="tip">Ville</label>
          <input
            name="city"
            value={formState.city}
            onChange={handleChange}
            className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-emerald-400"
            placeholder="Lille"
          />
        </div>

        <div>
          <label className="tip">Date souhaitée</label>
          <input
            type="date"
            name="date"
            min={todayIso}
            value={formState.date}
            onChange={handleChange}
            className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-emerald-400"
          />
        </div>

        <div>
          <label className="tip">Créneau</label>
          <select
            name="slot"
            value={formState.slot}
            onChange={handleChange}
            className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-emerald-400"
          >
            {SLOTS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className="tip">Infos complémentaires (optionnel)</label>
          <textarea
            name="notes"
            value={formState.notes}
            onChange={handleChange}
            rows={4}
            className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-emerald-400"
            placeholder="Couleur, état, lieu exact (parking, portail, etc.)"
          />
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <button className="btn btn-outline" onClick={goToPrevStep}>
          Retour
        </button>
        <button
          onClick={handleSubmit}
          disabled={!canSubmit}
          className="relative inline-flex items-center gap-2 rounded-full px-6 py-3 font-medium text-blue-950 disabled:opacity-50"
          style={{
            background:
              "radial-gradient(120% 120% at 50% 0%, rgba(16,185,129,0.9) 0%, rgba(16,185,129,0.8) 45%, rgba(16,185,129,0.75) 60%, rgba(16,185,129,0.65) 100%)",
            boxShadow:
              "0 0 20px rgba(16,185,129,.45), 0 0 40px rgba(16,185,129,.25)",
          }}
          title={
            WA_NUMBER
              ? "Ouvrir WhatsApp"
              : "Ouvrir WhatsApp (numéro non configuré)"
          }
        >
          <span className="relative z-10">Envoyer la demande via WhatsApp</span>
          <span
            aria-hidden
            className="absolute inset-0 rounded-full ring-2 ring-emerald-400/40"
            style={{ filter: "blur(2px)" }}
          />
        </button>
      </div>
    </div>
  );
}
