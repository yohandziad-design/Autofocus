import Navbar from "@/components/Navbar";

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-950 pt-20">
        <div className="mx-auto max-w-4xl px-4 py-20">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">
              Contactez-nous
            </h1>
            <p className="text-slate-300 text-lg">
              Prêt à redonner un éclat nouveau à votre véhicule ?
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Informations de contact */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-semibold text-white mb-6">
                  Nos coordonnées
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-slate-300">
                    <svg className="w-5 h-5 text-teal-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    <span>+33 1 23 45 67 89</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-300">
                    <svg className="w-5 h-5 text-teal-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    <span>contact@autofocusv2.fr</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-300">
                    <svg className="w-5 h-5 text-teal-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <span>Service à domicile - Région parisienne</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  Horaires d'intervention
                </h3>
                <div className="space-y-2 text-slate-300">
                  <p>Lundi - Vendredi : 8h - 18h</p>
                  <p>Samedi : 9h - 17h</p>
                  <p>Dimanche : Sur rendez-vous</p>
                </div>
              </div>
            </div>

            {/* Formulaire de contact */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <h2 className="text-2xl font-semibold text-white mb-6">
                Demande de devis
              </h2>
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Nom complet
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Votre nom"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="votre@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Type de véhicule
                  </label>
                  <select className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500">
                    <option value="">Sélectionnez votre véhicule</option>
                    <option value="berline">Berline</option>
                    <option value="suv">SUV</option>
                    <option value="sport">Voiture de sport</option>
                    <option value="utilitaire">Utilitaire</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Décrivez vos besoins..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="btn-primary w-full"
                >
                  Envoyer la demande
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
