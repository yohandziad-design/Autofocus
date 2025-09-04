"use client";

import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section id="accueil" className="relative overflow-hidden bg-slate-950 min-h-[70vh] md:min-h-screen">
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

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-6 px-4 py-12 pb-20 md:py-32 md:pb-48 md:grid-cols-2 md:min-h-screen">
        {/* Bloc texte gauche */}
        <div className="max-w-xl text-center md:text-left">
          <h1 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl">
            Redonnez un <span className="text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text">éclat <br className="hidden md:block" />
            nouveau</span> à votre véhicule
          </h1>

          <p className="mt-4 md:mt-6 text-base md:text-lg text-slate-300 leading-relaxed">
            Detailing professionnel à domicile. Finitions haut de gamme & photos premium pour sublimer votre véhicule.
          </p>

          <div className="mt-6 md:mt-8 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3 md:gap-4">
            <Link href="/reservation" className="btn-primary w-full sm:w-auto text-base md:text-lg px-6 md:px-8 py-3 md:py-4">
              🚀 Réserver maintenant
            </Link>
            <div className="flex gap-2 md:gap-3 w-full sm:w-auto">
              <Link href="/formules" className="btn-ghost flex-1 sm:flex-none text-sm md:text-base px-4 md:px-6 py-2 md:py-3">
                💰 Formules
              </Link>
              <Link href="/galerie" className="btn-ghost flex-1 sm:flex-none text-sm md:text-base px-4 md:px-6 py-2 md:py-3">
                📸 Galerie
              </Link>
            </div>
          </div>
        </div>

        {/* "Vide" côté droit pour laisser l'image respirer */}
        <div className="h-[280px] md:h-[520px]" />
      </div>

      {/* FONDU bas pour supprimer la cassure */}
      <div className="hero-bottom-fade" />
    </section>
  );
}