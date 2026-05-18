import { Meta } from "@once-ui-system/core";
import { baseURL } from "@/resources";
import Link from "next/link";

export async function generateMetadata() {
  return Meta.generate({
    title: "Services — AlgoCrew",
    description: "From staff augmentation to AI solutions — explore our full range of digital services.",
    baseURL,
    path: "/services",
    image: "/images/og/services.jpg",
  });
}

const services = [
  {
    id: "team-services",
    num: "01",
    title: "Strategic Staffing",
    desc: "Scale your technical capabilities instantly with dedicated managed teams. From staff augmentation to full turnkey delivery.",
    tags: ["Staff Augmentation", "Dedicated Teams", "Project Management"],
    color: "#00cccc",
  },
  {
    id: "web-app-development",
    num: "02",
    title: "Product Engineering",
    desc: "Bespoke digital solutions engineered for performance and market dominance. Web, mobile, SaaS — built to last.",
    tags: ["Web & Mobile", "SaaS Platforms", "E-commerce"],
    color: "#0077ff",
  },
  {
    id: "cloud-devops",
    num: "03",
    title: "Cloud & DevOps",
    desc: "Architecting the backbone of modern business with cloud-native transitions, CI/CD pipelines, and enterprise security.",
    tags: ["DevOps", "Cybersecurity", "Cloud Migration"],
    color: "#7c3aed",
  },
  {
    id: "data-automation",
    num: "04",
    title: "Data & AI Solutions",
    desc: "Leverage the next industrial revolution with Generative AI, machine learning, and intelligent automation workflows.",
    tags: ["Generative AI", "Blockchain", "AR/VR"],
    color: "#f59e0b",
  },
];

export default function ServicesPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#030609", paddingTop: "100px" }}>
      {/* Hero */}
      <section style={{ padding: "80px 60px 120px", maxWidth: "1200px", margin: "0 auto" }}>
        <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", display: "block", marginBottom: "20px" }}>
          WHAT WE DO
        </span>
        <h1 style={{ fontSize: "clamp(3rem, 7vw, 6rem)", fontWeight: 900, letterSpacing: "-0.04em", color: "white", margin: "0 0 24px", lineHeight: 1 }}>
          Our{" "}
          <span style={{ background: "linear-gradient(135deg, #00cccc, #0077ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            Capabilities
          </span>
        </h1>
        <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.45)", maxWidth: "480px", lineHeight: 1.7, margin: 0 }}>
          End-to-end digital solutions from a team of elite engineers. Pick a vertical or go all-in.
        </p>
      </section>

      {/* Services list */}
      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 60px 160px" }}>
        {services.map((s) => (
          <Link
            key={s.id}
            href={`/services/${s.id}`}
            style={{
              display: "grid",
              gridTemplateColumns: "80px 1fr auto",
              gap: "40px",
              padding: "48px 0",
              borderTop: "1px solid rgba(255,255,255,0.06)",
              textDecoration: "none",
              alignItems: "center",
              transition: "all 0.25s ease",
            }}
          >
            <span style={{ fontSize: "11px", fontWeight: 700, color: "rgba(255,255,255,0.2)", fontFamily: "monospace" }}>{s.num}</span>
            <div>
              <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)", fontWeight: 900, color: "white", letterSpacing: "-0.03em", margin: "0 0 12px" }}>
                {s.title}
              </h2>
              <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.4)", margin: "0 0 16px", lineHeight: 1.6, maxWidth: "500px" }}>{s.desc}</p>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {s.tags.map(t => (
                  <span key={t} style={{ fontSize: "11px", padding: "4px 10px", borderRadius: "100px", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.4)" }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <span style={{ fontSize: "24px", color: s.color, opacity: 0.7 }}>→</span>
          </Link>
        ))}
      </section>
    </main>
  );
}
