/** Engagement copy shared by the homepage and /our-approach, so the two cannot drift. Draft copy: V-24 (07 §11). */
export const ENGAGEMENT_MODELS = [
  {
    label: "Scoped project",
    title: "A defined piece of work",
    text: "A migration, a landing zone, a DevSecOps rollout or a compliance readiness program, with stated deliverables and an end.",
  },
  {
    label: "Managed service",
    title: "Ongoing operation",
    text: "We operate a platform within an agreed scope: what we watch, what we change and how we report.",
  },
] as const;

export const ENGAGEMENT_FAQ = [
  {
    q: "How does an engagement start?",
    a: "With a short call about your environment and what needs to change. We then send a proposal you can review with your team.",
  },
  {
    q: "Do you publish prices?",
    a: "No. Cloud work varies too much for a price list to be useful. Every proposal is priced for its scope.",
  },
  { q: "Can we start small?", a: "Yes. Many engagements start with an assessment or a single pilot workload." },
  { q: "Do you replace our team?", a: "No. We work with your engineers and hand over what we build." },
] as const;
