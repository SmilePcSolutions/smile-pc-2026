export default function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ComputerRepairService",
    "name": "Smile PC Solutions",
    "image": "https://www.smilepcsolutions.fr/opengraph-image.png",
    "description":
      "Dépannage informatique convivial à Moyeuvre-Grande et alentours. PC, Mac, TV, Apple TV, box Internet, imprimantes, montres connectées (logiciel). Réinstallation Windows, récupération de données, assistance opérateurs et création de sites web. Tarifs attractifs, sans jargon.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Moyeuvre-Grande",
      "postalCode": "57250",
      "addressRegion": "Grand Est",
      "addressCountry": "FR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "49.2546",
      "longitude": "6.0446"
    },
    "url": "https://www.smilepcsolutions.fr",
    "telephone": "+33600000000",
    "priceRange": "€",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ],
        "opens": "09:00",
        "closes": "19:00"
      }
    ],
    "areaServed": [
      { "@type": "City", "name": "Moyeuvre-Grande" },
      { "@type": "City", "name": "Moyeuvre-Petite" },
      { "@type": "City", "name": "Froidcul" },
      { "@type": "City", "name": "Rosselange" },
      { "@type": "City", "name": "Rombas" },
      { "@type": "City", "name": "Amnéville" }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
