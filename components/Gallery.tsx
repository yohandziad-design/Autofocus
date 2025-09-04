"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

/**
 * Petite galerie d'aperçu pour la landing.
 * Utilise des vignettes depuis /public/galleries/... (mêmes noms que la page /galleries)
 */

type Item = {
  id: string;
  src: string;
  alt: string;
};

const ITEMS: Item[] = [
  { id: "g1", src: "/galleries/interior-01.jpg", alt: "Intérieur — sièges rénovés" },
  { id: "g2", src: "/galleries/exterior-01.jpg", alt: "Extérieur — carrosserie brillante" },
  { id: "g3", src: "/galleries/full-01.jpg", alt: "Formule complète — avant / après" },
  { id: "g4", src: "/galleries/interior-02.jpg", alt: "Détails tableau de bord" },
  { id: "g5", src: "/galleries/exterior-02.jpg", alt: "Jantes et pneus — finition" },
  { id: "g6", src: "/galleries/full-02.jpg", alt: "Rendu final — shooting photos" },
];

export default function Gallery() {
  const [lightbox, setLightbox] = useState<Item | null>(null);

  return (
    <div>
      {/* Grid 2→3 colonnes selon viewport */}
      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {ITEMS.map((it) => (
          <li key={it.id} className="relative overflow-hidden rounded-2xl">
            <button
              onClick={() => setLightbox(it)}
              className="group block w-full"
              title={it.alt}
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={it.src}
                  alt={it.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition will-change-transform group-hover:scale-[1.02]"
                  priority
                />
              </div>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
              <span className="pointer-events-none absolute left-3 top-3 rounded-full border border-white/15 bg-black/40 px-2 py-0.5 text-xs text-white/80">
                Aperçu
              </span>
            </button>
          </li>
        ))}
      </ul>

      {/* Lightbox minimaliste */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4"
          onClick={() => setLightbox(null)}
        >
          <div
            className="relative w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-black/70 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute right-3 top-3 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-sm text-white/80 hover:bg-white/15"
              onClick={() => setLightbox(null)}
            >
              Fermer
            </button>
            <div className="relative aspect-[16/9]">
              <Image
                src={lightbox.src}
                alt={lightbox.alt}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>
            <div className="flex items-center justify-between gap-4 border-t border-white/10 px-5 py-3">
              <p className="font-medium">{lightbox.alt}</p>
              <Link href="/galleries" className="btn btn-primary">
                Ouvrir la galerie
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
