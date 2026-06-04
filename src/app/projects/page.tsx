import { baseURL, about, person } from "@/resources";
import { WorkHero } from "@/components/work/WorkHero";
import { WorkGrid } from "@/components/work/WorkGrid";
import { SendUsEmail } from "@/components/home/SendUsEmail";

export const metadata = {
  title: "Projects | AlgoCrew",
  description:
    "Browse AlgoCrew's portfolio of shipped products — fintech platforms, SaaS tools, AI-driven apps, and more built by senior engineers.",
  alternates: { canonical: `${baseURL}/projects` },
};

export default function Projects() {
  return (
    <main style={{ width: "100%", overflowX: "clip" }}>
      <WorkHero />
      <WorkGrid />
      <SendUsEmail />
    </main>
  );
}
