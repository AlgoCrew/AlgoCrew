// Run with: npm run test:checks
import assert from "node:assert/strict";
import { test } from "node:test";
import { GONE, REDIRECTS, decideRoute } from "../src/resources/routeMigration.ts";

test("05 lists 12 redirects and 32 gone pages; this file adds /projects and nothing else", () => {
  assert.equal(Object.keys(REDIRECTS).length, 13);
  assert.equal(GONE.size, 32);
});

test("decisions match 05", () => {
  assert.deepEqual(decideRoute("/pricing"), { type: "redirect", to: "/our-approach#engagement-models" });
  assert.deepEqual(decideRoute("/services/cloud-devops/"), { type: "redirect", to: "/services/devops" });
  assert.deepEqual(decideRoute("/services/healthcare-software-development"), { type: "redirect", to: "/compliance" });
  assert.deepEqual(decideRoute("/services/gaming"), { type: "gone" });
  assert.deepEqual(decideRoute("/work/anything-new"), { type: "gone" });
  assert.deepEqual(decideRoute("/blog/graphql-vs-rest-2025"), { type: "gone" });
  assert.deepEqual(decideRoute("/blog/why-senior-only-teams-ship-faster"), { type: "keep" });
  assert.deepEqual(decideRoute("/services/devops"), { type: "keep" });
  assert.deepEqual(decideRoute("/"), { type: "keep" });
});

test("no redirect points at another redirect or a gone page (no chains)", () => {
  for (const [from, to] of Object.entries(REDIRECTS)) {
    const target = to().split("#")[0];
    assert.equal(decideRoute(target).type, "keep", `${from} -> ${target}`);
  }
});
