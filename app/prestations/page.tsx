import { prisma } from '../../lib/prisma'
import { 
  GraduationCap, HardDrive, RefreshCw, Zap, Wifi, 
  Settings, Database, MessageCircle, Smartphone, FileText, Wrench 
} from 'lucide-react'
import Link from 'next/link'

const getIcon = (iconName: string) => {
  const style = "w-6 h-6 text-blue-600" // Icônes plus petites (taille 6)
  switch (iconName) {
    case 'GraduationCap': return <GraduationCap className={style} />
    case 'HardDrive': return <HardDrive className={style} />
    case 'RefreshCw': return <RefreshCw className={style} />
    case 'Zap': return <Zap className={style} />
    case 'Wifi': return <Wifi className={style} />
    case 'Settings': return <Settings className={style} />
    case 'Database': return <Database className={style} />
    case 'MessageCircle': return <MessageCircle className={style} />
    case 'Smartphone': return <Smartphone className={style} />
    case 'FileText': return <FileText className={style} />
    default: return <Wrench className={style} />
  }
}

export default async function ServicesPage() {
  const services = await prisma.service.findMany({
    orderBy: { title: 'asc' }
  })

  return (
    // Padding réduit et centrage vertical pour éviter le scroll inutile
    <div className="min-h-screen bg-gray-50/50 py-8 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
      
      {/* En-tête Compact */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Mes Prestations
        </h1>
        <p className="text-sm text-gray-500 mt-2">
          Intervention rapide sur Moyeuvre-Grande et alentours.
        </p>
      </div>

      {/* Grille Dense : 1 col (mobile), 2 cols (tablette), 3 cols (PC) */}
      <div className="max-w-6xl mx-auto grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full">
        {services.map((service) => (
          <div 
            key={service.id} 
            className="group flex items-center p-3 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-200"
          >
            {/* Icône compacte */}
            <div className="shrink-0 mr-4 bg-blue-50 p-2 rounded-md group-hover:bg-blue-100 transition-colors">
              {getIcon(service.icon)}
            </div>
            
            {/* Texte optimisé */}
            <div className="min-w-0">
              <h3 className="text-sm font-bold text-gray-800 truncate group-hover:text-blue-700">
                {service.title}
              </h3>
              <p className="text-xs text-gray-500 truncate">
                {service.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Bouton d'action discret en bas */}
      <div className="mt-10 text-center">
        <Link 
          href="/contact"
          className="inline-flex items-center justify-center px-6 py-2.5 border border-transparent text-sm font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 shadow-sm hover:shadow transition-all"
        >
          Besoin d'un devis ? Contactez-moi
        </Link>
      </div>
    </div>
  )
}