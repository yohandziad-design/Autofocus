export default function GallerySection() {
  const images = [
    { src: "/gallery-1.jpg", alt: "Avant/Après BMW Serie 3" },
    { src: "/gallery-2.jpg", alt: "Détail polish Mercedes" },
    { src: "/gallery-3.jpg", alt: "Intérieur Audi nettoyé" },
    { src: "/gallery-4.jpg", alt: "Carrosserie Tesla brillante" },
    { src: "/gallery-5.jpg", alt: "Jantes Porsche détaillées" },
    { src: "/gallery-6.jpg", alt: "Cuir Range Rover traité" }
  ];

  return (
    <section id="galerie" className="relative z-10 pt-32 pb-24 bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Notre <span className="text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text">Galerie</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Découvrez quelques-unes de nos plus belles réalisations
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative group overflow-hidden rounded-2xl aspect-square card-premium"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
              <div className="absolute inset-0 bg-slate-800 animate-pulse" />
              <div className="absolute bottom-4 left-4 right-4 z-20">
                <p className="text-white text-sm font-medium">{image.alt}</p>
              </div>
              <div className="absolute inset-0 bg-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="btn-ghost">
            Voir toutes nos réalisations
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
