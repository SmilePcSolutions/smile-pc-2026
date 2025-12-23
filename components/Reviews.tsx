export default function Reviews() {
  return (
    <section className="py-20 bg-white px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-slate-900 mb-12">Ils ont retrouvé le sourire</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-slate-50 p-6 rounded-lg italic text-slate-700">
            "Mon PC était devenu inutilisable. Après l''intervention, c''est le jour et la nuit ! Super explications en plus."
            <div className="mt-4 font-bold text-blue-600 not-italic">- Martine D.</div>
          </div>
          <div className="bg-slate-50 p-6 rounded-lg italic text-slate-700">
            "Réactif et très pro. J''ai pu récupérer toutes mes photos de vacances que je croyais perdues."
            <div className="mt-4 font-bold text-blue-600 not-italic">- Pierre L.</div>
          </div>
        </div>
      </div>
    </section>
  );
}
