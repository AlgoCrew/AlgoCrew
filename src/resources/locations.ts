export interface Location {
  slug: string;
  city: string;
  region: string;
  country: string;
  flag: string;
  headline: string;
  description: string;
  metaDescription: string;
  services: string[];
  stats: { metric: string; label: string }[];
  faqs: { q: string; a: string }[];
}

export const locations: Location[] = [
  {
    slug: "software-agency-canada",
    city: "Brampton",
    region: "Ontario",
    country: "Canada",
    flag: "🇨🇦",
    headline: "Canada's Senior-Only Software Agency",
    description: "AlgoCrew is headquartered in Brampton, Ontario. We build custom software for Canadian startups, scale-ups, and enterprises, from Vancouver to Toronto to Montreal. Senior engineers only, async-first, no lock-in.",
    metaDescription: "AlgoCrew is a Canadian software development agency based in Brampton, Ontario. Senior-only engineers, custom web & mobile apps, cloud infrastructure, and AI solutions across Canada.",
    services: ["Custom Web Apps", "Mobile Development", "Cloud & DevOps", "AI/ML Engineering", "SaaS Development", "Fintech Software"],
    stats: [
      { metric: "Canada", label: "Headquartered in Brampton, ON" },
      { metric: "50+", label: "Projects delivered for Canadian clients" },
      { metric: "48h", label: "Response guarantee, same timezone" },
      { metric: "100%", label: "IP ownership transferred to you" },
    ],
    faqs: [
      { q: "Where is AlgoCrew based in Canada?", a: "AlgoCrew is headquartered at 35 Herkley Dr, Brampton, Ontario, L6V 2E7. We serve clients across Canada including Toronto, Vancouver, Calgary, Montreal, and Ottawa." },
      { q: "Do you work with Canadian startups?", a: "Yes, we love working with Canadian startups at all stages, from pre-seed MVPs to Series B scale-ups. We offer flexible billing and can work with SR&ED tax credit timelines." },
      { q: "Can you sign Canadian NDAs and contracts?", a: "Absolutely. All our agreements are governed by Ontario law and we sign NDAs before every engagement, including government-grade confidentiality where required." },
      { q: "Do you have experience with Canadian fintech regulations?", a: "Yes. We have experience with OSFI guidelines, PIPEDA data privacy requirements, and have worked with clients in regulated Canadian financial services." },
    ],
  },
  {
    slug: "software-agency-toronto",
    city: "Toronto",
    region: "Ontario",
    country: "Canada",
    flag: "🇨🇦",
    headline: "Toronto Software Development Agency",
    description: "Serving Toronto's tech ecosystem with senior-only engineering talent. From the Financial District to Waterloo's tech corridor, AlgoCrew delivers custom software for Ontario's fastest-growing companies.",
    metaDescription: "AlgoCrew is a Toronto software development agency delivering custom web apps, mobile apps, and cloud solutions for Toronto startups and enterprises. Senior engineers, no lock-in.",
    services: ["Web App Development", "Mobile Apps", "Cloud Infrastructure", "SaaS Platforms", "AI Integration", "Tech Due Diligence"],
    stats: [
      { metric: "GTA", label: "Serving Greater Toronto Area clients" },
      { metric: "Senior", label: "Engineers only, no juniors on your project" },
      { metric: "EST", label: "Same timezone as Toronto clients" },
      { metric: "30-day", label: "Rolling exit, no long-term lock-in" },
    ],
    faqs: [
      { q: "Do you have offices in Toronto?", a: "Our HQ is in Brampton (Greater Toronto Area), 30 minutes from downtown Toronto. We meet clients in person across the GTA and work remotely with teams across Ontario." },
      { q: "What Toronto industries do you serve?", a: "We work with Toronto clients in fintech, real estate tech, healthcare, e-commerce, SaaS, and enterprise software. Toronto's diverse tech ecosystem is very well aligned with our services." },
      { q: "Can you help Toronto companies with government grants?", a: "Yes, we can provide documentation to support NRC IRAP applications and have helped clients structure projects that qualify for SR&ED tax credits." },
    ],
  },
  {
    slug: "software-agency-united-states",
    city: "United States",
    region: "",
    country: "United States",
    flag: "🇺🇸",
    headline: "US-Ready Software Development Agency",
    description: "AlgoCrew serves American startups and enterprises across all 50 states. Based in Canada, we offer US-comparable engineering quality at competitive rates, with full IP transfer, US-friendly contract terms, and engineers who work in your timezone.",
    metaDescription: "AlgoCrew is a software development agency serving US companies with custom web apps, mobile apps, cloud, and AI solutions. Senior-only engineers, competitive rates, US-friendly contracts.",
    services: ["Custom Software", "SaaS Development", "Fintech Engineering", "Healthcare Software", "E-commerce Platforms", "Cloud & DevOps"],
    stats: [
      { metric: "EST/PST", label: "Engineers available in US timezones" },
      { metric: "US contracts", label: "Delaware-friendly contract terms available" },
      { metric: "30+", label: "US clients served across 12 states" },
      { metric: "USD", label: "Billing in USD, no FX surprises" },
    ],
    faqs: [
      { q: "Can a Canadian agency build software for US companies?", a: "Absolutely, and many US companies prefer it. You get North American timezone alignment, English-first communication, and senior talent at rates 20-40% below equivalent US agencies, without the offshore communication gaps." },
      { q: "How do contracts and IP ownership work for US clients?", a: "We offer US-law governed agreements (Delaware or your preferred state). All IP is 100% transferred to you at project completion, fully documented and assignment-ready." },
      { q: "Do you have experience with US compliance requirements?", a: "Yes, SOC 2, HIPAA, PCI-DSS, CCPA, and SEC reporting requirements. We've built compliant systems for US fintech, healthcare, and SaaS companies." },
      { q: "What US timezones do you cover?", a: "Our core team covers ET and CT. We also have engineers in PT for West Coast clients. We work async-first which means your team gets progress updates every morning regardless of timezone." },
    ],
  },
  {
    slug: "software-agency-united-kingdom",
    city: "United Kingdom",
    region: "",
    country: "United Kingdom",
    flag: "🇬🇧",
    headline: "UK Software Development Partner",
    description: "AlgoCrew partners with British startups and enterprises to build world-class software. From London fintechs to Edinburgh SaaS companies, we deliver senior engineering with UK-friendly contracts, GDPR-compliant architecture, and GMT-adjacent timezone overlap.",
    metaDescription: "AlgoCrew is a software development agency serving UK companies. Custom web, mobile, cloud, and AI solutions. GDPR-compliant, senior-only engineers, UK contract terms available.",
    services: ["Web & Mobile Apps", "Fintech Development", "Cloud Engineering", "GDPR-Compliant Systems", "SaaS Platforms", "AI Solutions"],
    stats: [
      { metric: "GMT-5", label: "4-5 hour daily timezone overlap" },
      { metric: "GDPR", label: "Compliant architecture by default" },
      { metric: "GBP", label: "Billing in GBP available" },
      { metric: "UK NDAs", label: "English law contracts available" },
    ],
    faqs: [
      { q: "How does working with a non-UK agency affect GDPR compliance?", a: "All our systems are designed GDPR-compliant by default. We use EU/UK data residency options, sign DPAs, and can ensure all data stays within the UK or EEA as required by your compliance team." },
      { q: "What UK timezone hours do you work?", a: "Our core hours are 9am-6pm ET (2pm-11pm GMT), giving us 4-5 hours of real-time overlap with UK business hours. We also have engineers who start earlier for UK clients." },
      { q: "Can you work with UK-regulated financial services firms?", a: "Yes, we have experience with FCA-regulated clients and understand the documentation, audit trail, and security requirements that come with UK financial services work." },
    ],
  },
  {
    slug: "software-agency-australia",
    city: "Australia",
    region: "",
    country: "Australia",
    flag: "🇦🇺",
    headline: "Australian Software Development Partner",
    description: "AlgoCrew delivers custom software for Australian businesses, from Sydney fintechs to Melbourne SaaS companies. We offer async-first delivery that works around the AEST/AEDT timezone, with Australian-friendly contracts and Privacy Act compliant architecture.",
    metaDescription: "AlgoCrew is a software development agency serving Australian companies. Custom web apps, mobile, cloud, and AI solutions. Privacy Act compliant, senior engineers, AUD billing available.",
    services: ["Custom Software", "Mobile Apps", "Cloud & DevOps", "SaaS Development", "AI/ML Engineering", "E-Commerce"],
    stats: [
      { metric: "Async-first", label: "Delivery model designed for AU timezone" },
      { metric: "AUD", label: "Billing in Australian dollars available" },
      { metric: "Privacy Act", label: "Australian Privacy Act compliant" },
      { metric: "Daily updates", label: "Morning standups ready when you wake up" },
    ],
    faqs: [
      { q: "How does working across a 14-16 hour timezone gap work?", a: "We're async-first by design. Your team gets a detailed progress update every morning (your morning). For critical discussions, we offer early morning or evening calls that overlap with Australian business hours." },
      { q: "Are you familiar with Australian Privacy Act requirements?", a: "Yes, we design systems compliant with the Australian Privacy Act 1988 and the Privacy Amendment (Notifiable Data Breaches) Act. We can also assist with data sovereignty requirements." },
      { q: "Can you work with Australian government clients?", a: "We have experience working with clients who serve Australian government entities and understand the documentation and security requirements involved. Contact us to discuss your specific needs." },
    ],
  },
];

export function getLocation(slug: string): Location | undefined {
  return locations.find((l) => l.slug === slug);
}
