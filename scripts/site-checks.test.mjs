// Run with: npm run test:checks   (node --test, no dependencies)
import assert from "node:assert/strict";
import { test } from "node:test";
import { compareSitemap, findBrokenLinks, rawColors, routeOf, sitemapPathsOf } from "./site-checks.mjs";

const page = (body, head = "") => `<html><head>${head}</head><body>${body}</body></html>`;

test("routeOf maps build files to routes", () => {
  assert.equal(routeOf("index.html"), "/");
  assert.equal(routeOf("services/devsecops.html"), "/services/devsecops");
});

test("a link to a missing route is reported", () => {
  const pages = new Map([["/", page('<a href="/compliance/hipaa">HIPAA</a>')]]);
  assert.deepEqual(findBrokenLinks(pages), [{ from: "/", href: "/compliance/hipaa", reason: "no such route" }]);
});

test("a link to a missing anchor is reported, an existing anchor is not", () => {
  const pages = new Map([
    ["/", page('<a href="/compliance#boundaries">a</a><a href="/compliance#nope">b</a><a href="#top">c</a>')],
    ["/compliance", page('<p id="boundaries">x</p>')],
  ]);
  const broken = findBrokenLinks(pages);
  assert.equal(broken.length, 2);
  assert.match(broken[0].reason, /id "nope"/);
  assert.equal(broken[1].href, "#top"); // same-page anchor with no target
});

test("redirect sources, public files, query strings and external links are not broken links", () => {
  const pages = new Map([
    ["/", page('<a href="/pricing">old</a><a href="/images/a.png">img</a><a href="/contact?topic=hipaa">c</a><a href="https://x.test/y">ext</a>')],
    ["/contact", page("")],
  ]);
  assert.deepEqual(findBrokenLinks(pages, new Set(["/pricing", "/images/a.png"])), []);
});

test("sitemap must equal the indexable pages: a leaked gated page and a missing live page both fail", () => {
  const pages = new Map([
    ["/", page("")],
    ["/services", page("")],
    ["/hire", page("", '<meta name="robots" content="noindex,follow"/>')],
  ]);
  const xml = "<urlset><url><loc>https://algocrew.io</loc></url><url><loc>https://algocrew.io/compliance/hipaa</loc></url><url><loc>https://algocrew.io/hire</loc></url></urlset>";
  assert.deepEqual(compareSitemap(pages, sitemapPathsOf(xml)), {
    missing: ["/services"],
    extra: ["/compliance/hipaa", "/hire"],
  });
});

test("raw colour values are found; tokens, comments and Sass interpolation are not", () => {
  const scss = [".a { color: var(--ink); }", "// was #fff", ".b { font: 500 #{$size}/1.4 x; }", ".c { color: #1d4ed8; }", ".d { background: rgba(0, 0, 0, .5); }"].join("\n");
  assert.deepEqual(rawColors(scss).map((h) => h.line), [4, 5]);
});
