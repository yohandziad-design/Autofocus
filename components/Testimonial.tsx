"use client";

import Image from "next/image";

export type TestimonialItem = {
  name: string;
  role?: string;
  company?: string;
  quote: string;
  rating?: number; // 0..5
  avatarUrl?: string; // /public path
};

type Props = {
  title?: string;
  subtitle?: string;
  items?: TestimonialItem[];
  className?: string;
};

const DEFAULT_ITEMS: TestimonialItem[] = [
  {
    name: "Clément D.",
    role: "Client",
    company: "Hauts-de-France",
    quote:
      "Service impeccable ! L’intérieur de ma voiture est ressorti comme neuf. Prise de RDV simple et pro.",
    rating: 5,
    avatarUrl: undefined,
  },
  {
    name: "Sarah L.",
    role: "Cliente",
    company: "Lille",
    quote:
      "Ponctuel, minutieux et super sympa. J’ai choisi la formule complète + photos — résultat superbe.",
    rating: 5,
    avatarUrl: undefined,
  },
  {
    name: "Mehdi B.",
    role: "Client",
    company: "Roubaix",
    quote:
      "Excellent rapport qualité/prix. Ils se déplacent chez vous, c’est ultra pratique. Je recommande !",
    rating: 5,
    avatarUrl: undefined,
  },
];

export default function Testimonial({
  title = "Ils nous font confiance",
  subtitle = "Avis récents de clients AutoFocus",
  items = DEFAULT_ITEMS,
  className = "",
}: Props) {
  return null; // Retired the Testimonial section
}

/* --- UI bits --- */

function Avatar({ name, src }: { name: string; src?: string }) {
  if (!src) {
    // Fallback avec initiales
    const initials = name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();

    return (
      <div className="size-12 rounded-full bg-white/10 border border-white/15 grid place-items-center text-white font-semibold">
        {initials}
      </div>
    );
  }
  return (
    <div className="relative size-12 rounded-full overflow-hidden border border-white/15">
      <Image src={src} alt={name} fill className="object-cover" sizes="48px" />
    </div>
  );
}

function Stars({ value = 5 }: { value?: number }) {
  const n = Math.max(0, Math.min(5, Math.round(value)));
  return (
    <div className="flex items-center gap-1" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} filled={i < n} />
      ))}
    </div>
  );
}

function Star({ filled }: { filled: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill={filled ? "currentColor" : "none"}
      className={`${
        filled ? "text-emerald-400" : "text-blue-200/40"
      } drop-shadow-[0_0_8px_rgba(16,185,129,0.45)]`}
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.46 4.73L5.82 21 12 17.27z" />
    </svg>
  );
}
