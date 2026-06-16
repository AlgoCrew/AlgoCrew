import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Canonical host for the whole site is the bare apex (matches baseURL in
// once-ui.config). Everything else (www, *.vercel.app) is 301-redirected
// here in a single hop so Google indexes one host only.
const CANONICAL_HOST = "algocrew.io";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host")?.toLowerCase() ?? "";

  // Hostname (strip any :port for local/preview safety).
  const hostname = host.split(":")[0];

  const isNonCanonical =
    hostname === `www.${CANONICAL_HOST}` || hostname.endsWith(".vercel.app");

  if (isNonCanonical) {
    const url = request.nextUrl.clone();
    url.protocol = "https:";
    url.host = CANONICAL_HOST;
    url.port = "";
    // pathname + search are preserved by clone(); single hop, no chain.
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  // Run on everything except Next internals and static assets, so the redirect
  // applies to real pages but not _next chunks, images, or metadata files.
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|favicon.svg|icon.svg|manifest.json|robots.txt|sitemap.xml|images/).*)",
  ],
};
