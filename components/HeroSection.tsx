"use client";

import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section id="accueil" className="relative overflow-hidden bg-slate-950 min-h-screen">
      {/* Image plein écran */}
      <div className="absolute inset-0">
        <Image
          src="/detailling-pro.png"
          alt="Car detailing professional"
          fill
          priority
          className="object-cover"
        />
        {/* Assombrir côté gauche pour la lisibilité */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/70 to-transparent" />
      </div>

      {/* DIAGONALE avec gradient vertical */}
      <div className="hero-diagonal diagonal-edge" />

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-32 pb-48 md:grid-cols-2 min-h-screen">
        {/* Bloc texte gauche */}
        <div className="max-w-xl">
          <h1 className="text-4xl font-extrabold leading-tight text-white md:text-5xl">
            Redonnez un <span className="text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text">éclat <br className="hidden md:block" />
            nouveau</span> à votre véhicule
          </h1>

          <p className="mt-4 text-slate-300">
            Detailing professionnel à domicile. Finitions haut de gamme & photos premium pour sublimer votre véhicule.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link href="/reservation" className="btn-primary">
              Réserver maintenant
            </Link>
            <Link href="/formules" className="btn-ghost">
              Voir nos formules
            </Link>
            <Link href="/galerie" className="btn-ghost">
              Galerie
            </Link>
          </div>
        </div>

        {/* "Vide" côté droit pour laisser l'image respirer */}
        <div className="h-[420px] md:h-[520px]" />
      </div>

      {/* FONDU bas pour supprimer la cassure */}
      <div className="hero-bottom-fade" />
    </section>
  );
}