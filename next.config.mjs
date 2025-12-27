/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Autorise les images Supabase (si tu en utilises)
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "xkfrctyllmyietkekqro.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },

  // Headers de sécurité "Niveau Banque"
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "DENY" }, // Empêche d'afficher ton site dans une iframe (anti-vol de clic)
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" }, // Bloque l'accès micro/caméra par défaut
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" }, // Force le HTTPS
        ],
      },
    ];
  },
};

export default nextConfig;