export const metadata = {
  title: "Design Preview",
};

export default function DesignPreview() {
  return (
    <main className="min-h-screen bg-black text-white p-6">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-2xl font-semibold mb-4">Maquette</h1>
        <p className="text-slate-400 mb-6">Aperçu statique pour guider l'implémentation de la landing page.</p>
        <div className="rounded-lg overflow-auto border border-white/10 bg-white/5 p-2">
          <img src="/maquette.png" alt="Maquette" className="w-full h-auto rounded" />
        </div>
      </div>
    </main>
  );
}
