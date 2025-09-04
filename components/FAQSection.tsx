export default function FAQSection() {
  const faqs = [
    {
      question: "Combien de temps dure une intervention ?",
      answer: "Selon la formule choisie : Essential (1h30), Premium (2h30), Prestige (4h). Nous nous adaptons à votre planning."
    },
    {
      question: "Vous vous déplacez vraiment partout ?",
      answer: "Oui, nous intervenons à votre domicile, bureau ou tout lieu de votre choix dans un rayon de 50km autour de la ville."
    },
    {
      question: "Quels produits utilisez-vous ?",
      answer: "Nous utilisons exclusivement des produits professionnels premium : Chemical Guys, Meguiar's, Sonax pour des résultats durables."
    },
    {
      question: "Que faire s'il pleut le jour du rendez-vous ?",
      answer: "Nous disposons d'un équipement mobile avec bâche de protection. En cas de forte intempérie, nous reportons sans frais."
    },
    {
      question: "Proposez-vous des forfaits réguliers ?",
      answer: "Oui ! Nous avons des abonnements mensuels avec -20% sur toutes nos formules. Contactez-nous pour plus d'infos."
    },
    {
      question: "Les photos sont-elles incluses ?",
      answer: "Les photos avant/après sont incluses à partir de la formule Premium. Pour Essential, c'est +15€."
    }
  ];

  return (
    <section id="faq" className="py-1 bg-slate-950">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Questions <span className="text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text">Fréquentes</span>
          </h2>
          <p className="text-xl text-slate-400">
            Tout ce que vous devez savoir sur nos services
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="card-premium p-6 group"
            >
              <summary className="flex items-center justify-between cursor-pointer list-none">
                <h3 className="text-lg font-semibold text-white pr-4">
                  {faq.question}
                </h3>
                <svg
                  className="w-5 h-5 text-cyan-400 transform transition-transform group-open:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="mt-4 pt-4 border-t border-slate-700">
                <p className="text-slate-300 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
