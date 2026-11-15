// Run with: npm run test:checks. Imports the TypeScript module through Node's type stripping.
import assert from "node:assert/strict";
import { test } from "node:test";
import { topicFromQuery, validateContact } from "../src/resources/contact.ts";

const good = { name: "Sam", email: "sam@example.com", company: "Example Ltd", topic: "security", clouds: [], message: "We need help with our AWS posture.", consent: true };

test("a complete enquiry passes", () => {
  assert.deepEqual(validateContact(good), {});
});

test("each missing or wrong field is named", () => {
  const errors = validateContact({ ...good, email: "sam@", topic: "staffing", message: "hi", consent: false, name: " " });
  assert.deepEqual(Object.keys(errors).sort(), ["consent", "email", "message", "name", "topic"]);
});

test("?topic= values map to form topics; unknown values select nothing", () => {
  assert.equal(topicFromQuery("hipaa"), "compliance");
  assert.equal(topicFromQuery("azure"), "cloud");
  assert.equal(topicFromQuery("gaming"), "");
  assert.equal(topicFromQuery(null), "");
});
