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
              type="text"
              autoComplete="given-name"
              value={formState.firstName}
              onChange={handleChange}
              className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-400 outline-none focus:border-emerald-400 transition-colors"
              placeholder="Votre prénom"
            />
          </div>
          <div>
            <label className="tip">Nom *</label>
            <input
              name="lastName"
              type="text"
              autoComplete="family-name"
              value={formState.lastName}
              onChange={handleChange}
              className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-400 outline-none focus:border-emerald-400 transition-colors"
              placeholder="Votre nom"
            />
          </div>
        </div>

        {/* Contact */}
        <div>
          <label className="tip">Téléphone</label>
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            value={formState.phone}
            onChange={handleChange}
            className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-400 outline-none focus:border-emerald-400 transition-colors"
            placeholder="06 12 34 56 78"
          />
        </div>

        {/* Adresse */}
        <div>
          <label className="tip">Adresse *</label>
          <input
            name="address"
            type="text"
            autoComplete="street-address"
            value={formState.address}
            onChange={handleChange}
            className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-400 outline-none focus:border-emerald-400 transition-colors"
            placeholder="123 rue de la Paix"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="tip">Code postal *</label>
            <input
              name="zip"
              type="text"
              autoComplete="postal-code"
              value={formState.zip}
              onChange={handleChange}
              className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-400 outline-none focus:border-emerald-400 transition-colors"
              placeholder="75001"
            />
          </div>
          <div>
            <label className="tip">Ville *</label>
            <input
              name="city"
              type="text"
              autoComplete="locality"
              value={formState.city}
              onChange={handleChange}
              className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-400 outline-none focus:border-emerald-400 transition-colors"
              placeholder="Paris"
            />
          </div>
        </div>

        {/* Rendez-vous */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="tip">Date souhaitée *</label>
            <input
              name="date"
              type="date"
              value={formState.date}
              onChange={handleChange}
              className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-emerald-400 transition-colors"
              min={todayIso}
            />
          </div>
          <div>
            <label className="tip">Créneau *</label>
            <select
              name="slot"
              value={formState.slot}
              onChange={handleChange}
              className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-emerald-400 transition-colors"
            >
              {SLOTS.map((slot) => (
                <option key={slot} value={slot} className="bg-slate-800">
                  {slot}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="tip">Notes (optionnel)</label>
          <textarea
            name="notes"
            value={formState.notes}
            onChange={handleChange}
            className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-400 outline-none focus:border-emerald-400 transition-colors resize-none"
            rows={3}
            placeholder="Instructions particulières, demandes spéciales..."
          />
        </div>
      </div>

      {/* Navigation */}
      <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10">
        <button
          onClick={goToPrevStep}
          className="btn-ghost w-full sm:w-auto"
        >
          ← Retour
        </button>

        <button
          onClick={handleSubmit}
          disabled={!canSubmit}
          className={`relative overflow-hidden btn-primary w-full sm:w-auto text-lg py-4 px-8 ${
            canSubmit 
              ? 'opacity-100 transform hover:scale-105' 
              : 'opacity-50 cursor-not-allowed'
          }`}
        >
          {canSubmit ? (
            <span className="relative z-10">
              📱 Envoyer via WhatsApp
              {WA_NUMBER && (
                <span className="block text-xs opacity-80 mt-1">
                  {WA_NUMBER}
                </span>
              )}
            </span>
          ) : (
            <span className="relative z-10">
              ⚠️ Champs obligatoires manquants
            </span>
          )}
          
          {canSubmit && (
            <div
              className="absolute inset-0 rounded-full ring-2 ring-emerald-400/40"
              style={{ filter: "blur(2px)" }}
            />
          )}
        </button>
      </div>
    </div>
  );
}
