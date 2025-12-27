export default function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ComputerRepairService",
    "name": "Smile PC Solutions",
    "image": "https://www.smilepcsolutions.fr/opengraph-image.png",
    "description": "Dépannage informatique à domicile, assistance et formation sur Moyeuvre-Grande et alentours. PC, Mac, Réseau, Smartphone.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "",
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
    "telephone": "+33600000000", // ⚠️ METS TON VRAI NUMÉRO ICI
    "priceRange": "€€",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "09:00",
        "closes": "19:00"
      }
    ],
    "areaServed": [
      { "@type": "City", "name": "Moyeuvre-Grande" },
      { "@type": "City", "name": "Thionville" },
      { "@type": "City", "name": "Amnéville" },
      { "@type": "City", "name": "Metz" }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}