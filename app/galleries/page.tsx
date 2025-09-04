"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

type Photo = {
  id: string;
  src: string;
  w: number;
  h: number;
  alt: string;
  tags: ("intérieur" | "extérieur" | "complet")[];
};

// ⚠️ Place ces images dans /public/galleries/... (tu peux renommer, garde le même shape)
const PHOTOS: Photo[] = [
  {
    id: "p1",
    src: "/galleries/interior-01.jpg",
    w: 1600,
    h: 1200,
    alt: "Nettoyage intérieur — sièges rénovés",
    tags: ["intérieur"],
  },
  {
    id: "p2",
    src: "/galleries/exterior-01.jpg",
    w: 1600,
    h: 1067,
    alt: "Lavage extérieur — carrosserie brillante",
    tags: ["extérieur"],
  },
  {
    id: "p3",
    src: "/galleries/full-01.jpg",
    w: 1600,
    h: 1067,
    alt: "Formule complète — avant / après",
    tags: ["complet"],
  },
  {
    id: "p4",
    src: "/galleries/interior-02.jpg",
    w: 1600,
    h: 1200,
    alt: "Détails tableau de bord",
    tags: ["intérieur"],
  },
  {
    id: "p5",
    src: "/galleries/exterior-02.jpg",
    w: 1600,
    h: 1000,
    alt: "Jantes et pneus — finition",
    tags: ["extérieur"],
  },
  {
    id: "p6",
    src: "/galleries/full-02.jpg",
    w: 1600,
    h: 1067,
    alt: "Rendu final formule complète",
    tags: ["complet"],
  },
];

const FILTERS = [
  { key: "tous", label: "Tous" },
  { key: "intérieur", label: "Intérieur" },
  { key: "extérieur", label: "Extérieur" },
  { key: "complet", label: "Complet + Photos" },
] as const;

type FilterKey = typeof FILTERS[number]["key"]; 

export default function GalleriesPage() {
  const [active, setActive] = useState<FilterKey>("tous");
  const [lightbox, setLightbox] = useState<Photo | null>(null);

  const items = useMemo(() => {
    if (active === "tous") return PHOTOS;
    return PHOTOS.filter((p) => p.tags.includes(active as any));
  }, [active]);

  return (
    <main className="relative min-h-screen">
      {/* Header */}
      <section className="border-b border-white/10 bg-white/[0.02]">
        <div className="mx-auto w-full max-w-7xl px-6 py-10 lg:px-8">
          <div className="mb-4 text-sm text-white/60">
            <Link href="/" className="hover:underline">Accueil</Link>
            <span className="mx-2">/</span>
            <span>Galeries</span>
          </div>

          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <h1 className="text-3xl font-semibold sm:text-4xl">Galeries</h1>
              <p className="mt-2 max-w-2xl text-white/70">
                Une sélection de nos prestations : intérieur, extérieur et formules complètes avec photos finalisées.
              </p>
            </div>

            <div className="tabs">
              {FILTERS.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setActive(f.key)}
                  className={`tab ${active === f.key ? "tab-active text-blue-950" : ""}`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-10">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          {items.length === 0 ? (
            <p className="text-white/60">Aucune photo dans cette catégorie pour le moment.</p>
          ) : (
            <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((p: Photo) => (
                <li key={p.id} className="card lift overflow-hidden">
                  <button
                    className="group block w-full text-left"
                    onClick={() => setLightbox(p)}
                  >
                    <div className="relative aspect-[4/3]">
                      <Image
                        src={p.src}
                        alt={p.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition will-change-transform group-hover:scale-[1.02]"
                        priority={true}
                      />
                    </div>
                    <div className="flex items-center justify-between px-4 py-3">
                      <div>
                        <p className="font-medium">{p.alt}</p>
                        <p className="tip mt-1 capitalize">{p.tags.join(" • ")}</p>
                      </div>
                      <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-white/80">
                        Voir
                      </span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* Lightbox */}
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
              <div>
                <p className="font-medium">{lightbox.alt}</p>
                <p className="tip mt-1 capitalize">{lightbox.tags.join(" • ")}</p>
              </div>
              <Link
                href="/reservation"
                className="btn btn-primary"
              >
                Réserver cette prestation
              </Link>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
