import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ADMIN_PATH = "/bunker-smile-758";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith(ADMIN_PATH)) {
    const auth = request.cookies.get("admin_session");
    if (!auth) return NextResponse.redirect(new URL("/", request.url));

    const res = NextResponse.next();
    res.headers.set("X-Frame-Options", "DENY");
    res.headers.set("X-Content-Type-Options", "nosniff");
    res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
    res.headers.set("Content-Security-Policy", "default-src 'self'; img-src 'self' data: https:; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'");
    return res;
  }
  return NextResponse.next();
}
export const config = { matcher: "/bunker-smile-758/:path*" };