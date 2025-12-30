import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/bunker-smile-758/', // ⛔ Zone Interdite
    },
    sitemap: 'https://smilepcsolutions.fr/sitemap.xml', // ✅ SEO Platinum
  };
}