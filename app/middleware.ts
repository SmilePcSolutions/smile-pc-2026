import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// 🛡️ ADRESSE DU BUNKER (Doit correspondre au nom de ton dossier admin)
const ADMIN_PATH = "/bunker-smile-758";

export function middleware(request: NextRequest) {
  // 1. Protection de l'accès Admin
  if (request.nextUrl.pathname.startsWith(ADMIN_PATH)) {
    const auth = request.cookies.get("admin_session");

    // Si pas connecté -> retour accueil
    if (!auth) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    const res = NextResponse.next();
    
    // 2. HEADERS DE SÉCURITÉ (Expert Level)
    res.headers.set("X-Frame-Options", "DENY"); // Bloque les iframes
    res.headers.set("X-Content-Type-Options", "nosniff");
    res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
    
    // CSP : On autorise 'unsafe-inline' car Next.js en a besoin pour fonctionner
    res.headers.set(
      "Content-Security-Policy",
      "default-src 'self'; img-src 'self' data: https:; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'"
    );

    return res;
  }

  return NextResponse.next();
}

// Applique le middleware uniquement sur le dossier caché
export const config = {
  matcher: "/bunker-smile-758/:path*",
};