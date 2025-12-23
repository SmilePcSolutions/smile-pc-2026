/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. Active le mode strict (Meilleure détection des erreurs)
  reactStrictMode: true,

  // 2. Autorise les images venant de Supabase (Indispensable pour le futur)
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'xkfrctyllmyietkekqro.supabase.co', // Ton ID Supabase (récupéré de ton .env)
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

export default nextConfig;
