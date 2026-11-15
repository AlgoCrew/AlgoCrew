#!/usr/bin/env node
/**
 * Build-output checks for the site migration (docs/website-transformation/09 §10, roadmap T1.09, T1.10).
 *
 *   node scripts/site-checks.mjs links     every internal href resolves to a built route (and its #anchor exists)
 *   node scripts/site-checks.mjs sitemap   sitemap.xml lists exactly the indexable built pages
 *   node scripts/site-checks.mjs tokens    site-v2 stylesheets contain no raw colour values (no build needed)
 *
 * Both read the output of `next build` in .next/server/app, so they check what actually ships:
 * a gated page that leaks into a menu or the sitemap fails here, whatever the source says.
 * Pure functions are exported for scripts/site-checks.test.mjs.
 */
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const APP_DIR = ".next/server/app";

/**
 * Pages whose outgoing links are not checked: the internal review section. It shows the full
 * approved menu and template previews with every gate ignored, so it links on purpose to pages
 * that are not built or not verified yet. It is noindex and returns not-found in production.
 */
const isUncheckedSource = (route) => route === "/design-system" || route.startsWith("/design-system/");

/** .next/server/app/services/gaming.html -> /services/gaming ; index.html -> / */
export const routeOf = (file) => {
  const r = "/" + file.replace(/\\/g, "/").replace(/\.html$/, "");
  return r === "/index" ? "/" : r.replace(/\/index$/, "");
};

export const idsIn = (html) => new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));

/** Internal hrefs only: "/path", "/path#a", "#a". Protocol-relative and external links are ignored. */
export const internalHrefs = (html) =>
  [...html.matchAll(/<a\b[^>]*?\shref="([^"]+)"/g)]
    .map((m) => m[1].replace(/&amp;/g, "&"))
    .filter((h) => (h.startsWith("/") && !h.startsWith("//")) || h.startsWith("#"));

export const isNoindex = (html) => /<meta[^>]+name="robots"[^>]+content="[^"]*noindex/i.test(html);

/**
 * @param pages   Map<route, html> of built pages
 * @param known   extra valid paths: redirect sources, API routes, files in public/
 * @returns list of { from, href, reason }
 */
export function findBrokenLinks(pages, known = new Set()) {
  const ids = new Map([...pages].map(([route, html]) => [route, idsIn(html)]));
  const broken = [];
  for (const [from, html] of pages) {
    for (const href of new Set(internalHrefs(html))) {
      const [rawPath, hash] = href.split("#");
      const path = (rawPath.split("?")[0] || from).replace(/(.)\/$/, "$1");
      if (!pages.has(path)) {
        if (!known.has(path)) broken.push({ from, href, reason: "no such route" });
        continue; // anchors on redirects and files cannot be checked
      }
      if (hash && !ids.get(path).has(decodeURIComponent(hash))) {
        broken.push({ from, href, reason: `no element with id "${hash}" on ${path}` });
      }
    }
  }
  return broken;
}

/** @returns { missing: indexable pages not in the sitemap, extra: sitemap URLs that are not indexable pages } */
export function compareSitemap(pages, sitemapPaths) {
  const indexable = new Set([...pages].filter(([, html]) => !isNoindex(html)).map(([route]) => route));
  const listed = new Set(sitemapPaths);
  return {
    missing: [...indexable].filter((r) => !listed.has(r)).sort(),
    extra: [...listed].filter((r) => !indexable.has(r)).sort(),
  };
}

export const sitemapPathsOf = (xml) =>
  [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname.replace(/(.)\/$/, "$1"));

/** Raw colour values in a stylesheet: hex or rgb()/rgba(). Sass interpolation (#{...}) is not a colour. */
export const rawColors = (scss) =>
  scss
    .split("\n")
    .map((text, i) => ({ line: i + 1, text: text.trim() }))
    .filter(({ text }) => !text.startsWith("//") && /#[0-9a-fA-F]{3,8}\b|\brgba?\(/.test(text));

/** site-v2 style modules must use tokens only (08 §3). Legacy modules are not checked. */
const TOKEN_ONLY = ["src/components/ui/ui.module.scss", "src/components/layout", "src/components/sections", "src/components/diagrams"];

// ---------- reading the build ----------

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

function loadPages() {
  if (!existsSync(APP_DIR)) {
    console.error(`${APP_DIR} not found. Run "npm run build" first.`);
    process.exit(2);
  }
  const pages = new Map();
  for (const file of walk(APP_DIR)) {
    if (!file.endsWith(".html")) continue;
    const route = routeOf(relative(APP_DIR, file));
    if (route.startsWith("/_")) continue; // _not-found and other framework pages
    pages.set(route, readFileSync(file, "utf8"));
  }
  return pages;
}

/** Paths that are valid link targets without being built HTML pages. */
function loadKnownPaths() {
  const known = new Set();
  const manifest = ".next/routes-manifest.json";
  if (existsSync(manifest)) {
    const m = JSON.parse(readFileSync(manifest, "utf8"));
    for (const r of m.redirects ?? []) if (!/[:(*]/.test(r.source)) known.add(r.source);
    for (const r of [...(m.staticRoutes ?? []), ...(m.dynamicRoutes ?? [])]) if (!/[\[:]/.test(r.page)) known.add(r.page);
  }
  if (existsSync("public")) for (const f of walk("public")) known.add("/" + relative("public", f).replace(/\\/g, "/"));
  return known;
}

function main(cmd) {
  if (cmd === "tokens") {
    const files = TOKEN_ONLY.filter(existsSync).flatMap((p) => (statSync(p).isDirectory() ? walk(p) : [p])).filter((f) => f.endsWith(".scss"));
    let count = 0;
    for (const file of files) for (const hit of rawColors(readFileSync(file, "utf8"))) { count++; console.error(`RAW COLOUR  ${file}:${hit.line}  ${hit.text}`); }
    console.log(`${files.length} site-v2 stylesheet(s) checked, ${count} raw colour value(s).`);
    process.exit(count ? 1 : 0);
  }
  const pages = loadPages();
  if (cmd === "links") {
    const broken = findBrokenLinks(pages, loadKnownPaths()).filter((b) => !isUncheckedSource(b.from));
    for (const b of broken) console.error(`BROKEN  ${b.from}  ->  ${b.href}  (${b.reason})`);
    console.log(`${pages.size} pages checked, ${broken.length} broken internal link(s).`);
    process.exit(broken.length ? 1 : 0);
  }
  if (cmd === "sitemap") {
    const body = [`${APP_DIR}/sitemap.xml.body`, `${APP_DIR}/sitemap.xml`].find(existsSync);
    if (!body) {
      console.error("Built sitemap.xml not found in the build output.");
      process.exit(2);
    }
    const { missing, extra } = compareSitemap(pages, sitemapPathsOf(readFileSync(body, "utf8")));
    for (const r of missing) console.error(`MISSING from sitemap (indexable page):  ${r}`);
    for (const r of extra) console.error(`IN SITEMAP but not an indexable page:   ${r}`);
    console.log(`${pages.size} pages built, ${missing.length} missing from the sitemap, ${extra.length} extra in it.`);
    process.exit(missing.length || extra.length ? 1 : 0);
  }
  console.error("Usage: node scripts/site-checks.mjs <links|sitemap|tokens>");
  process.exit(2);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) main(process.argv[2]);
