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
    <div>
      <h2 className="mb-4 text-xl font-semibold">3) Coordonnées</h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="tip">Prénom</label>
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
            inputMode="email"
            placeholder="nom@email.fr"
            value={values.email ?? ''}
            onChange={(e) => update('email', e.target.value)}
            className={inputClass(errors.email)}
          />
          <FieldError>{errors.email}</FieldError>
        </div>

        {/* Adresse */}
        <div className="md:col-span-2">
          <label className="mb-1 block text-sm">Adresse *</label>
          <input
            type="text"
            placeholder="N°, rue"
            value={values.address}
            onChange={(e) => update('address', e.target.value)}
            className={inputClass(errors.address)}
            autoComplete="street-address"
            required
          />
          <FieldError>{errors.address}</FieldError>
        </div>
        <div>
          <label className="mb-1 block text-sm">Ville *</label>
          <input
            type="text"
            value={values.city}
            onChange={(e) => update('city', e.target.value)}
            className={inputClass(errors.city)}
            autoComplete="address-level2"
            required
          />
          <FieldError>{errors.city}</FieldError>
        </div>
        <div>
          <label className="mb-1 block text-sm">Code postal *</label>
          <input
            type="text"
            inputMode="numeric"
            placeholder="59000"
            value={values.postalCode}
            onChange={(e) => update('postalCode', e.target.value)}
            className={inputClass(errors.postalCode)}
            autoComplete="postal-code"
            required
          />
          <FieldError>{errors.postalCode}</FieldError>
        </div>

        {/* Date/heure */}
        <div>
          <label className="mb-1 block text-sm">Date & heure souhaitées *</label>
          <input
            type="datetime-local"
            value={values.dateTime}
            min={nowPlus()}
            onChange={(e) => update('dateTime', e.target.value)}
            className={inputClass(errors.dateTime)}
            required
          />
          <FieldError>{errors.dateTime}</FieldError>
        </div>

        {/* Notes */}
        <div className="md:col-span-2">
          <label className="mb-1 block text-sm">Infos complémentaires (optionnel)</label>
          <textarea
            rows={4}
            placeholder="Lieu de stationnement, état du véhicule, préférences…"
            value={values.notes ?? ''}
            onChange={(e) => update('notes', e.target.value)}
            className={inputClass()}
          />
        </div>

        {/* Consent */}
        <div className="md:col-span-2">
          <label className="flex items-start gap-3 text-sm">
            <input
              type="checkbox"
              checked={values.consent}
              onChange={(e) => update('consent', e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-white/20 bg-white/5 text-brand-green focus:ring-brand-green"
            />
            <span>
              J’autorise AutoFocus à me contacter par WhatsApp/SMS au sujet de ma réservation et j’accepte la politique de confidentialité.
            </span>
          </label>
          <FieldError>{errors.consent}</FieldError>
        </div>

        {/* Actions */}
        <div className="md:col-span-2 mt-2 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/0 px-4 py-2 text-sm font-medium text-white/90 transition hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/50"
          >
            ← Retour
          </button>

          <motion.button
            type="submit"
            whileTap={{ scale: 0.98 }}
            disabled={isSubmitting}
            className={clsx(
              'inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold text-black shadow-[0_8px_30px_rgba(30,217,137,.25)] transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/60',
              isSubmitting ? 'bg-brand-green/70' : 'bg-[rgb(30,217,137)] hover:brightness-110'
            )}
          >
            {isSubmitting ? 'Envoi…' : 'Continuer'}
          </motion.button>
        </div>
      </form>
    </section>
  )
}

// ————————————————————————————————————————————————
// UI helpers
// ————————————————————————————————————————————————
function inputClass(hasError?: string) {
  return clsx(
    'w-full rounded-xl border bg-white/5 px-3 py-2 text-sm text-white placeholder-white/40 outline-none transition',
    'border-white/10 focus:border-brand-green/50 focus:ring-2 focus:ring-brand-green/30',
    hasError && 'border-red-400/60 focus:ring-0 focus:border-red-400/60'
  )
}

function FieldError({ children }: { children?: string }) {
  if (!children) return null
  return <p className="mt-1 text-xs text-red-300">{children}</p>
}
