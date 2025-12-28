import { Phone, Mail, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <section className="py-20 bg-slate-50 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12">
        <h2 className="text-3xl font-bold text-center text-slate-900 mb-8">Besoin d'aide ?</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
              <Phone size={24} />
            </div>
            <h3 className="font-semibold text-slate-900">Téléphone</h3>
            <p className="text-slate-600">06 XX XX XX XX</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
              <Mail size={24} />
            </div>
            <h3 className="font-semibold text-slate-900">Email</h3>
            <p className="text-slate-600">contact@smilepc.fr</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
              <MapPin size={24} />
            </div>
            <h3 className="font-semibold text-slate-900">Zone</h3>
            <p className="text-slate-600">Moyeuvre-Grande + 20km</p>
          </div>
        </div>
        
        {/* Bouton supprimé car inutile sur la page contact */}
        
      </div>
    </section>
  );
}