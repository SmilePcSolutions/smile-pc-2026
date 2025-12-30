import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/bunker-smile-758/', // ⛔ Zone interdite aux robots
    },
    sitemap: 'https://smilepcsolutions.fr/sitemap.xml', // ✅ Bonnes pratiques SEO
  };
}