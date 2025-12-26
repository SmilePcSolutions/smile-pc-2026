export default function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ComputerRepairService",
    "name": "Smile PC Solutions",
    "description": "Dépannage informatique à domicile sur Moyeuvre-Grande et alentours. Réparation PC, installation, maintenance, suppression de virus.",
    "url": "https://www.smilepcsolutions.fr",
    "telephone": "+33652351526",
    "priceRange": "€€",
    "image": "https://www.smilepcsolutions.fr/opengraph-image.png", // Image par défaut (si dispo)
    
    // --- 1. CONNEXION AU MONDE RÉEL (Trust) ---
    "sameAs": [
      "https://www.facebook.com/smilepcsolutions", // ⚠️ À modifier si ton lien est différent
      // Tu pourras ajouter ici ton lien Google Maps / Instagram plus tard
    ],

    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Moyeuvre-Grande",
      "addressRegion": "Grand Est",
      "postalCode": "57250",
      "addressCountry": "FR"
    },
    
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 49.2566,
      "longitude": 6.0531
    },

    // --- 2. ZONE D'INTERVENTION PRÉCISE ---
    "areaServed": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 49.2566,
        "longitude": 6.0531
      },
      "geoRadius": "20000"
    },
    "serviceArea": {
      "@type": "AdministrativeArea",
      "name": "Moselle"
    },

    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "08:00",
        "closes": "20:00"
      }
    ],

    // --- 3. CATALOGUE DE SERVICES SIGNÉ ---
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Services de Dépannage Informatique",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Dépannage PC à Domicile",
            "provider": { "@type": "LocalBusiness", "name": "Smile PC Solutions" }
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Suppression de Virus & Malwares",
            "provider": { "@type": "LocalBusiness", "name": "Smile PC Solutions" }
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Installation Windows & Logiciels",
            "provider": { "@type": "LocalBusiness", "name": "Smile PC Solutions" }
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Récupération de Données",
            "provider": { "@type": "LocalBusiness", "name": "Smile PC Solutions" }
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Assemblage PC Sur Mesure",
            "provider": { "@type": "LocalBusiness", "name": "Smile PC Solutions" }
          }
        }
      ]
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
