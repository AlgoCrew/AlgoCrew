import Link from "next/link";
import { baseURL } from "@/resources";
import { locations } from "@/resources/locations";
import { SendUsEmail } from "@/components/home/SendUsEmail";

export async function generateMetadata() {
  return {
    title: "Locations — AlgoCrew Software Agency",
    description: "AlgoCrew serves clients in Canada, United States, United Kingdom, Australia, and Europe. Senior-only software development agency with no lock-in.",
    alternates: { canonical: baseURL + "/locations" },
  };
}

export default function LocationsPage() {
  return (
    <main style={{ width: "100%", overflowX: "clip", background: "var(--bg-page)" }}>
      {/* Hero */}
      <section style={{ padding: "140px 60px 80px", maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.25em", color: "#06c8e8", display: "block", marginBottom: 20 }}>
          WHERE WE WORK
        </span>
        <h1 style={{ fontSize: "clamp(2.4rem,6vw,5rem)", fontWeight: 900, letterSpacing: "-0.04em", color: "var(--text-primary)", margin: "0 0 20px", lineHeight: 1 }}>
          We build software<br />across the globe.
        </h1>
        <p style={{ fontSize: "1.05rem", color: "var(--text-muted)", lineHeight: 1.7, maxWidth: 540, margin: "0 auto" }}>
          Headquartered in Canada, serving clients across North America, Europe, and Australia.
          Senior-only engineers. Async-first. No lock-in.
        </p>
      </section>

      {/* Location cards */}
      <section style={{ padding: "60px 60px 120px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
          {locations.map((loc) => (
            <Link
              key={loc.slug}
              href={"/locations/" + loc.slug}
              style={{
                display: "flex", flexDirection: "column", gap: 16,
                padding: "32px", borderRadius: 20,
                border: "1px solid var(--border-subtle)",
                background: "var(--bg-card)",
                textDecoration: "none",
                transition: "border-color 0.2s, transform 0.2s",
              }}
            >
              <span style={{ fontSize: 36 }}>{loc.flag}</span>
              <div>
                <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", color: "var(--text-muted)", margin: "0 0 8px" }}>
                  {loc.country.toUpperCase()}
                </p>
                <h2 style={{ fontSize: "1.15rem", fontWeight: 800, color: "var(--text-primary)", margin: "0 0 10px", letterSpacing: "-0.02em" }}>
                  {loc.headline}
                </h2>
                <p style={{ fontSize: 13, color: "var(--text-muted)", margin: 0, lineHeight: 1.6, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical" as const, overflow: "hidden" }}>
                  {loc.description}
                </p>
              </div>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#06c8e8", marginTop: "auto" }}>
                Learn more &rarr;
              </span>
            </Link>
          ))}
        </div>
      </section>

      <SendUsEmail />
    </main>
  );
}
