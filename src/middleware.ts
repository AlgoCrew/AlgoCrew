import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decideRoute } from "@/resources/routeMigration";

/**
 * One place for every URL rule, so no request is redirected twice (docs/website-transformation/05 §3):
 * - non-canonical host (www, and *.vercel.app on production only) -> apex;
 * - old paths -> their new page (301) or "410 Gone", from src/resources/routeMigration.ts;
 * - previews and localhost answer with X-Robots-Tag: noindex.
 * A www request for an old path goes straight to the final apex URL in a single hop.
 */
const CANONICAL_HOST = "algocrew.io";

const GONE_HTML = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex"><title>This page has been removed | AlgoCrew</title>
<style>body{margin:0;font:17px/1.6 system-ui,-apple-system,"Segoe UI",sans-serif;color:#0b1220;background:#fff}main{max-width:640px;margin:0 auto;padding:96px 24px}h1{font-size:2.25rem;line-height:1.1;letter-spacing:-.02em;margin:0 0 16px}p{color:#414b5d}a{color:#1d4ed8;font-weight:600}ul{padding:0;list-style:none;display:grid;gap:10px}</style></head>
<body><main><h1>This page has been removed.</h1><p>AlgoCrew now focuses on cloud engineering, DevOps and DevSecOps, cloud security, and compliance. The page you asked for is no longer part of the site.</p>
<ul><li><a href="/">Home</a></li><li><a href="/services">Services</a></li><li><a href="/contact">Contact</a></li></ul></main></body></html>`;

export function middleware(request: NextRequest) {
  const hostname = (request.headers.get("host")?.toLowerCase() ?? "").split(":")[0];
  const isProduction = process.env.VERCEL_ENV === "production";
  const wrongHost = hostname === `www.${CANONICAL_HOST}` || (isProduction && hostname.endsWith(".vercel.app"));

  const decision = decideRoute(request.nextUrl.pathname);

  if (decision.type === "gone") {
    return new NextResponse(GONE_HTML, {
      status: 410,
      headers: { "Content-Type": "text/html; charset=utf-8", "X-Robots-Tag": "noindex" },
    });
  }

  if (decision.type === "redirect" || wrongHost) {
    const url = request.nextUrl.clone();
    if (decision.type === "redirect") {
      const [path, hash] = decision.to.split("#");
      url.pathname = path;
      url.hash = hash ? `#${hash}` : "";
    }
    if (wrongHost) {
      url.protocol = "https:";
      url.host = CANONICAL_HOST;
      url.port = "";
    }
    return NextResponse.redirect(url, 301);
  }

  const response = NextResponse.next();
  // Anything that is not the canonical host (previews, localhost) must not be indexed.
  if (hostname !== CANONICAL_HOST) response.headers.set("X-Robots-Tag", "noindex");
  return response;
}

export const config = {
  // Everything except Next internals and static files, so redirects apply to real pages only.
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|favicon.svg|icon.svg|manifest.json|robots.txt|sitemap.xml|images/).*)",
  ],
};
