import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log("🌱 Mise à jour du catalogue services...")

  // 1. On nettoie tout pour repartir propre
  try {
    await prisma.service.deleteMany()
  } catch (e) {
    // Rien à faire si c'est vide
  }

  // 2. On insère TES vrais services (Prix masqué en "Sur Devis")
  await prisma.service.createMany({
    data: [
      {
        title: "Cours d'informatique",
        description: "Initiation et perfectionnement (Débutant à Expert).",
        price: "Sur Devis", 
        icon: "GraduationCap", 
        category: "Formation"
      },
      {
        title: "Formatage & Réinstallation",
        description: "Remise à zéro complète pour un PC comme neuf.",
        price: "Sur Devis",
        icon: "HardDrive",
        category: "Maintenance"
      },
      {
        title: "Récupération Windows (Recovery)",
        description: "Restauration du système en cas de plantage.",
        price: "Sur Devis",
        icon: "RefreshCw",
        category: "Maintenance"
      },
      {
        title: "Optimisation Performances",
        description: "Nettoyage pour booster la vitesse de votre PC.",
        price: "Sur Devis",
        icon: "Zap",
        category: "Optimisation"
      },
      {
        title: "Résolution problèmes Internet/Wi-Fi",
        description: "Dépannage de connexion et configuration box.",
        price: "Sur Devis",
        icon: "Wifi",
        category: "Réseau"
      },
      {
        title: "Installation Logiciels & Périphériques",
        description: "Imprimantes, Office, Antivirus, etc.",
        price: "Sur Devis",
        icon: "Settings",
        category: "Installation"
      },
      {
        title: "Sauvegarde & Récupération de données",
        description: "Sécurisation de vos photos et documents importants.",
        price: "Sur Devis",
        icon: "Database",
        category: "Données"
      },
      {
        title: "Conseils & Maintenance",
        description: "Accompagnement personnalisé pour votre matériel.",
        price: "Sur Devis",
        icon: "MessageCircle",
        category: "Conseil"
      },
      {
        title: "Dépannage Smartphones/Tablettes",
        description: "Assistance logicielle pour vos appareils mobiles.",
        price: "Sur Devis",
        icon: "Smartphone",
        category: "Mobile"
      },
      {
        title: "Aide Administrative",
        description: "Gestion des comptes en ligne, impôts, opérateurs...",
        price: "Sur Devis",
        icon: "FileText",
        category: "Administratif"
      }
    ]
  })

  console.log("✅ Catalogue mis à jour avec succès !")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })