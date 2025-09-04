"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import ProgressBar from "@/components/ProgressBar";
import Step1Vehicle from "@/components/Step1Vehicle";
import Step2Formula from "@/components/Step2Formula";
import Step3Form from "@/components/Step3Form";
import PremiumNavbar from "@/components/PremiumNavbar";
import BackgroundFX from "@/components/BackgroundFX";
import { FORMULAS, VEHICLES, SLOTS } from "@/lib/data";
import type { Booking } from "@/types/booking";

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";

export default function ReservationPage() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const [booking, setBooking] = useState<Booking>({
    vehicle: null,
    formula: null,
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
    date: "",
    slot: SLOTS[0] ?? "",
    notes: "",
  });

  const selectedFormula = useMemo(
    () => FORMULAS.find((f) => f.key === booking.formula) || null,
    [booking.formula]
  );

  const total = useMemo(() => selectedFormula?.price ?? 0, [selectedFormula]);

  // Optional: preselect formula from query (?formula=interieur|exterieur|complete)
  useEffect(() => {
    const formulaParam = searchParams?.get("formula");
    if (!formulaParam) return;
    if (FORMULAS.some((f) => f.key === formulaParam)) {
      setBooking((prev) => ({ ...prev, formula: formulaParam as Booking["formula"] }));
      setStep(3); // jump to form to complete booking quickly
    }
  }, [searchParams]);

  function canSubmit() {
    return (
      !!booking.vehicle &&
      !!booking.formula &&
      booking.firstName.trim().length > 1 &&
      booking.lastName.trim().length > 1 &&
      booking.address.trim().length > 5 &&
      booking.city.trim().length > 1 &&
      booking.zip.trim().length >= 4 &&
      booking.phone.trim().length >= 8 &&
      booking.date.trim().length > 0
    );
  }

  function makeWhatsAppText() {
    const vehicleLabel = VEHICLES.find(v => v.key === booking.vehicle)?.label || booking.vehicle;
    const formulaLabel = FORMULAS.find(f => f.key === booking.formula)?.label || booking.formula;

    return `🚗 *Nouvelle réservation AutoFocus*

👤 *Client:* ${booking.firstName} ${booking.lastName}
📱 *Téléphone:* ${booking.phone}
📍 *Adresse:* ${booking.address}, ${booking.zip} ${booking.city}

🚗 *Véhicule:* ${vehicleLabel}
✨ *Formule:* ${formulaLabel}
💰 *Prix:* ${total}€

📅 *Date souhaitée:* ${booking.date}
⏰ *Créneau:* ${booking.slot}

${booking.notes ? `📝 *Notes:* ${booking.notes}` : ''}

Merci ! 🙏`;
  }

  function handleSubmit() {
    const text = makeWhatsAppText();
    const base = WA_NUMBER ? `https://wa.me/${WA_NUMBER}` : `https://wa.me/`;
    const url = `${base}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  }

  return (
    <main className="min-h-screen bg-slate-950">
      <BackgroundFX />
      <PremiumNavbar />
      
      <section className="relative z-10 pt-32 pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Réserver une <span className="text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text">Prestation</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Choisissez votre véhicule, votre formule et renseignez vos coordonnées. L'envoi se fait par WhatsApp — aucune carte bancaire n'est requise.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Wizard */}
            <div className="lg:col-span-2">
              <div className="card-premium p-8">
                <ProgressBar step={step} />

                {step === 1 && (
                  <Step1Vehicle
                    vehicle={booking.vehicle}
                    setVehicle={(vehicle: Booking["vehicle"]) =>
                      setBooking({ ...booking, vehicle })
                    }
                    goToNextStep={() => setStep(2)}
                  />
                )}

                {step === 2 && (
                  <Step2Formula
                    booking={booking}
                    onUpdate={(updates) => setBooking(prev => ({ ...prev, ...updates }))}
                  />
                )}

                {step === 3 && (
                  <Step3Form
                    formState={booking}
                    setFormState={setBooking}
                    goToPrevStep={() => setStep(2)}
                    canSubmit={canSubmit()}
                    handleSubmit={handleSubmit}
                  />
                )}
              </div>
            </div>

            {/* Récap */}
            <aside className="lg:col-span-1">
              <div className="card-premium p-8">
                <h3 className="text-lg font-semibold text-white mb-6">Récapitulatif</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Véhicule</span>
                    <span className="font-medium text-white">
                      {booking.vehicle
                        ? VEHICLES.find((v) => v.key === booking.vehicle)?.label
                        : "—"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Formule</span>
                    <span className="font-medium text-white">
                      {booking.formula
                        ? FORMULAS.find((f) => f.key === booking.formula)?.label
                        : "—"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Date</span>
                    <span className="font-medium text-white">
                      {booking.date || "—"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Créneau</span>
                    <span className="font-medium text-white">{booking.slot}</span>
                  </div>
                </div>

                <div className="border-t border-slate-700 my-6"></div>

                <div className="flex items-center justify-between text-lg font-semibold">
                  <span className="text-white">Total</span>
                  <span className="text-teal-400">{total}€</span>
                </div>

                <div className="mt-6">
                  <button
                    onClick={() => {
                      if (!canSubmit()) return;
                      handleSubmit();
                    }}
                    disabled={!canSubmit()}
                    className="w-full btn-primary disabled:opacity-50"
                  >
                    Envoyer via WhatsApp
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
