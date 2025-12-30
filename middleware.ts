import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ADMIN_PATH = "/bunker-smile-758";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 👻 RÈGLE FURTIVE : Si on tente d'accéder aux anciens chemins, on renvoie à l'accueil incognito.
  // Ni vu, ni connu. Pas d'erreur 404 qui donne des indices.
  if (pathname.startsWith("/admin") || pathname.startsWith("/login") || pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 🛡️ RÈGLE BUNKER : Protection de la vraie zone admin
  if (pathname.startsWith(ADMIN_PATH)) {
    // On laisse passer pour permettre l'affichage du login (Fix iOS)
    const res = NextResponse.next();
    
    // Casque blindé (Headers de sécurité)
    res.headers.set("X-Frame-Options", "DENY");
    res.headers.set("X-Content-Type-Options", "nosniff");
    res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
    res.headers.set("Content-Security-Policy", "default-src 'self'; img-src 'self' data: https:; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'");
    
    return res;
  }
  
  return NextResponse.next();
}

// On surveille tout : le bunker ET les leurres
export const config = { 
  matcher: [
    "/bunker-smile-758/:path*", 
    "/admin/:path*",
    "/login/:path*",
    "/dashboard/:path*"
  ] 
};