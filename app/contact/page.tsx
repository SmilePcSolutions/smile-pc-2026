import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function Contact() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Me Contacter 📩</h1>
        <p className="text-slate-600 dark:text-slate-400 text-lg">Une question ? Un dépannage ? Réponse rapide garantie.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Infos */}
        <div className="space-y-8">
          <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Coordonnées</h3>
            <div className="space-y-6">
              <a href="tel:0600000000" className="flex items-center gap-4 text-slate-600 dark:text-slate-300 hover:text-blue-600 transition">
                <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 text-blue-600 rounded-full flex items-center justify-center"><Phone size={24} /></div>
                <span className="font-medium">06 00 00 00 00 (À modifier)</span>
              </a>
              <a href="mailto:contact@smilepcsolutions.fr" className="flex items-center gap-4 text-slate-600 dark:text-slate-300 hover:text-blue-600 transition">
                <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 text-blue-600 rounded-full flex items-center justify-center"><Mail size={24} /></div>
                <span className="font-medium">contact@smilepcsolutions.fr</span>
              </a>
              <div className="flex items-center gap-4 text-slate-600 dark:text-slate-300">
                <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 text-blue-600 rounded-full flex items-center justify-center"><MapPin size={24} /></div>
                <span className="font-medium">Moyeuvre-Grande & Alentours</span>
              </div>
            </div>
          </div>
        </div>

        {/* Formulaire Simple */}
        <form className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700 space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Nom complet</label>
            <input type="text" className="w-full p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition" placeholder="Votre nom" />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Email</label>
            <input type="email" className="w-full p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition" placeholder="votre@email.com" />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Message</label>
            <textarea rows={4} className="w-full p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition" placeholder="Comment puis-je vous aider ?"></textarea>
          </div>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 transition">
            <Send size={18} /> Envoyer le message
          </button>
        </form>
      </div>
    </div>
  );
}