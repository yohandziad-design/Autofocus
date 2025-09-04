import Link from "next/link";
import { FORMULAS } from "@/lib/data";

export default function FormulasSection() {
  // Mapping des formules avec informations d'affichage
  const formulasDisplay = [
    {
      key: "interieur",
      name: "Intérieur",
      price: "50€",
      duration: "1h30",
      features: [
        "Aspiration complète",
        "Textiles & plastiques nettoyés", 
        "Vitres intérieures",
        "Traitement anti-bactérien"
      ]
    },
    {
      key: "exterieur", 
      name: "Extérieur",
      price: "50€",
      duration: "1h30",
      features: [
        "Pré-lavage + lavage mains",
        "Jantes & pneus",
        "Vitres extérieures",
        "Séchage microfibre"
      ]
    },
    {
      key: "complet",
      name: "Complet + Photos",
      price: "130€",
      duration: "3h",
      features: [
        "Formule intérieure + extérieure",
        "Finition & protection légère",
        "Photos pro du véhicule",
        "Résultat garantie"
      ],
      popular: true
    }
  ];

  return (
    <section id="formules" className="relative z-10 pt-32 pb-24 bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Nos <span className="text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text">Formules</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Choisissez la formule qui correspond à vos besoins et à votre véhicule
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {formulasDisplay.map((formula, index) => (
            <div
              key={formula.key}
              className={`card-premium p-8 relative ${
                formula.popular ? "scale-105 ring-2 ring-cyan-400/50" : ""
              }`}
            >
              {formula.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-cyan-400 to-blue-500 text-black px-6 py-2 rounded-full text-sm font-bold">
                    Plus populaire
                  </span>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">{formula.name}</h3>
                <div className="text-4xl font-bold text-cyan-400 mb-2">{formula.price}</div>
                <p className="text-slate-400">{formula.duration}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {formula.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-cyan-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-slate-200">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link 
                href={`/reservation?formula=${formula.key}`}
                className={formula.popular ? "btn-neon w-full justify-center" : "btn-ghost w-full justify-center"}
              >
                Choisir cette formule
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
