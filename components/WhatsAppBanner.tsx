"use client";

import { useMemo } from "react";
import Link from "next/link";

// Si tu as déjà exporté VehicleType ailleurs, importe-le.
// Ici je le redéclare pour que le fichier soit autonome.
export type VehicleType =
  | "citadine"
  | "berline"
  | "suv"
  | "break"
  | "utilitaire"
  | "moto";

export type BookingSummary = {
  name?: string;          // Nom du client
  vehicle?: VehicleType | string;
  formula?: string;       // "Intérieur", "Extérieur", "Complète + Photos", etc.
  price?: number;         // 50, 130, ...
  dateISO?: string;       // "2025-09-01T10:00"
  address?: string;       // Adresse d'intervention
  notes?: string;         // Infos complémentaires
};

type Props = {
  /** Numéro WhatsApp au format international (ex: "33612345678" pour +33 6...) — ne sera pas affiché */
  phone: string;
  /** Récapitulatif de la réservation pour préremplir le message */
  summary?: BookingSummary;
  /** Texte du bouton */
  label?: string;
  /** Afficher un aperçu du message dans la bannière (utile sur la page récap) */
  showPreview?: boolean;
  /** Afficher en bannière flottante sticky en bas de l’écran */
  floating?: boolean;
  className?: string;
};

export default function WhatsAppBanner({
  phone,
  summary,
  label = "Réserver via WhatsApp",
  showPreview = false,
  floating = false,
  className = "",
}: Props) {
  const waNumber = toWaNumber(phone);
  const message = useMemo(() => buildWaMessage(summary), [summary]);
  const waHref = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;

  return (
    <aside
      className={[
        "card",
        floating
          ? "fixed inset-x-4 bottom-4 z-50"
          : "mx-auto max-w-3xl",
        "p-4 sm:p-5 lg:p-6",
        className,
      ].join(" ")}
      aria-label="Réservation WhatsApp"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="chip">WhatsApp</span>
            <p className="text-sm text-blue-200/80">
              Conversation rapide — pas d’appel, pas d’email
            </p>
          </div>

          {showPreview && (
            <Preview message={message} />
          )}
        </div>

        <div className="sm:ml-auto">
          <Link
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cta justify-center w-full sm:w-auto"
            aria-label="Ouvrir WhatsApp pour confirmer la réservation"
          >
            {label} →
          </Link>
        </div>
      </div>
    </aside>
  );
}

/* -------------------- Helpers -------------------- */

function toWaNumber(input: string): string {
  // wa.me accepte uniquement les chiffres (E.164 sans le +)
  // On garde les chiffres et on retire tout le reste.
  const digits = input.replace(/[^\d]/g, "");
  return digits;
}

function formatDateFR(iso?: string): string | undefined {
  if (!iso) return undefined;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return undefined;
  return new Intl.DateTimeFormat("fr-FR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
}

function formatPriceEUR(price?: number): string | undefined {
  if (price == null) return undefined;
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(price);
}

/** Construit le message WhatsApp à partir du récapitulatif */
export function buildWaMessage(s?: BookingSummary): string {
  const parts: string[] = [];
  parts.push("Bonjour AutoFocus 👋");

  if (s?.name) parts.push(`Je m'appelle ${s.name}.`);

  const details: string[] = [];
  if (s?.vehicle) details.push(`Véhicule : ${labelVehicle(s.vehicle)}`);
  if (s?.formula) details.push(`Formule : ${s.formula}`);
  if (s?.price != null) details.push(`Prix : ${formatPriceEUR(s.price)}`);
  if (s?.dateISO) details.push(`Créneau souhaité : ${formatDateFR(s.dateISO)}`);
  if (s?.address) details.push(`Adresse : ${s.address}`);
  if (s?.notes) details.push(`Infos : ${s.notes}`);

  if (details.length) {
    parts.push("");
    parts.push("Détails de ma demande :");
    parts.push(details.map((d) => `• ${d}`).join("\n"));
  }

  parts.push("");
  parts.push("Pouvez-vous me confirmer la disponibilité et la marche à suivre pour la réservation ? Merci !");
  return parts.join("\n");
}

function labelVehicle(v: VehicleType | string): string {
  switch (v) {
    case "citadine":
      return "Citadine / Compacte";
    case "berline":
      return "Berline";
    case "suv":
      return "SUV / Monospace";
    case "break":
      return "Break";
    case "utilitaire":
      return "Utilitaire";
    case "moto":
      return "Moto / Scooter";
    default:
      return String(v);
  }
}

/* --------- Aperçu message (optionnel) --------- */

function Preview({ message }: { message: string }) {
  return (
    <div className="mt-3 rounded-xl border border-white/10 bg-white/5 p-3">
      <p className="text-xs uppercase tracking-wide text-blue-200/60 mb-1">
        Aperçu du message
      </p>
      <pre className="whitespace-pre-wrap text-blue-50/90 text-sm leading-relaxed">
        {message}
      </pre>
    </div>
  );
}
