export default function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ComputerRepairService",
    "name": "Smile PC Solutions",
    "image": "https://www.smilepcsolutions.fr/logo.png",
    "description": "Réparation PC, assistance informatique et dépannage à domicile à Rosselange et alentours.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Votre Rue",
      "addressLocality": "Rosselange",
      "postalCode": "57780",
      "addressCountry": "FR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "49.2566",
      "longitude": "6.0667"
    },
    "url": "https://www.smilepcsolutions.fr",
    "telephone": "+33600000000",
    "priceRange": "€€",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "09:00",
        "closes": "19:00"
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
