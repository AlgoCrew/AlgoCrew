import { Meta } from "@once-ui-system/core";
import { baseURL } from "@/resources";

export async function generateMetadata() {
  return Meta.generate({
    title: "About — AlgoCrew",
    description: "AlgoCrew is a software company headquartered in Canada, delivering elite engineering solutions globally.",
    baseURL,
    path: "/about",
    image: "/images/og/about.jpg",
  });
}

function StatCard({ num, label, desc }: { num: string; label: string; desc: string }) {
  return (
    <div style={{
      padding: "40px",
      border: "1px solid rgba(255,255,255,0.06)",
      borderRadius: "20px",
      background: "rgba(255,255,255,0.02)",
    }}>
      <div style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 900, letterSpacing: "-0.04em", background: "linear-gradient(135deg, white, rgba(255,255,255,0.5))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", marginBottom: "8px" }}>
        {num}
      </div>
      <p style={{ fontSize: "14px", fontWeight: 700, color: "white", margin: "0 0 6px" }}>{label}</p>
      <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.35)", margin: 0, lineHeight: 1.5 }}>{desc}</p>
    </div>
  );
}

export default function AboutPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#030609", paddingTop: "100px" }}>
      {/* Hero */}
      <section style={{ padding: "80px 60px 120px", maxWidth: "1200px", margin: "0 auto" }}>
        <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.25)", display: "block", marginBottom: "20px" }}>
          ABOUT ALGOCREW
        </span>
        <h1 style={{ fontSize: "clamp(3rem, 8vw, 7rem)", fontWeight: 900, letterSpacing: "-0.04em", color: "white", margin: "0 0 32px", lineHeight: 0.95 }}>
          We are<br />
          <span style={{ background: "linear-gradient(135deg, #00cccc, #0077ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            AlgoCrew.
          </span>
        </h1>
        <p style={{ fontSize: "1.15rem", color: "rgba(255,255,255,0.45)", maxWidth: "560px", lineHeight: 1.7, margin: 0 }}>
          A software company headquartered in Canada, delivering elite engineering solutions for startups and enterprises across North America and Europe.
        </p>
      </section>

      {/* Mission */}
      <section style={{ padding: "80px 60px", borderTop: "1px solid rgba(255,255,255,0.04)", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "start" }}>
          <div>
            <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase" as const, color: "#00cccc", display: "block", marginBottom: "20px" }}>OUR MISSION</span>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 900, letterSpacing: "-0.04em", color: "white", margin: "0 0 24px", lineHeight: 1 }}>
              Engineering digital products that change industries.
            </h2>
            <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.75, margin: 0 }}>
              At AlgoCrew, we&apos;re not just developers — we&apos;re architects of the digital future. We specialize in delivering top-tier solutions tailored to the high-stakes needs of modern enterprise. Our approach combines deep technical expertise with strategic business thinking to create products that don&apos;t just work — they win.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column" as const, gap: "16px", paddingTop: "40px" }}>
            {[
              "AI-first engineering approach",
              "Transparent communication at every step",
              "Security and performance by default",
              "Long-term partnerships, not one-off projects",
            ].map(v => (
              <div key={v} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "16px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                <span style={{ color: "#00cccc", fontSize: "12px" }}>→</span>
                <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)", fontWeight: 500 }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ padding: "80px 60px", borderTop: "1px solid rgba(255,255,255,0.04)", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px" }}>
          <StatCard num="50+" label="Projects Delivered" desc="Across 12+ industry verticals" />
          <StatCard num="30+" label="Happy Clients" desc="From startups to global enterprises" />
          <StatCard num="5+" label="Years of Mastery" desc="Deep technical expertise" />
          <StatCard num="98%" label="Satisfaction Rate" desc="Measured by NPS and retention" />
        </div>
      </section>
    </main>
  );
}
