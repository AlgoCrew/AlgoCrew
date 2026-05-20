export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  date: string;
  readTime: number;
  author: { name: string; role: string; initials: string; color: string };
  featured?: boolean;
  coverGradient: string;
  accent: string;
  body: string; // HTML string for the post body
};

export const blogPosts: BlogPost[] = [
  {
    slug: "why-senior-only-teams-ship-faster",
    title: "Why Senior-Only Teams Ship 3× Faster Than Mixed Teams",
    excerpt:
      "Most agencies hide juniors behind senior faces. We don't hire juniors at all — here's the compounding effect that creates on delivery speed, code quality, and client trust.",
    category: "Engineering Culture",
    tags: ["Team", "Hiring", "Senior Engineers", "Delivery"],
    date: "2025-05-12",
    readTime: 7,
    featured: true,
    author: { name: "Arqam Malik", role: "Founder & CTO", initials: "AM", color: "#06c8e8" },
    coverGradient: "linear-gradient(135deg, #0a1628 0%, #06c8e8 100%)",
    accent: "#06c8e8",
    body: `
      <p>When we started AlgoCrew, we made one non-negotiable rule: no junior engineers. Every hire had to have at least 5 years of production experience. People told us we'd never scale. They were wrong.</p>

      <h2>The hidden cost of mixed teams</h2>
      <p>A typical agency team has 1 senior for every 3–4 juniors. The math looks attractive — lower blended rate. But what you don't see in the invoice is the tax the senior pays: code reviews, unblocking, context-switching, and rework. A senior on a mixed team spends 40–60% of their week on overhead, not output.</p>
      <p>On a senior-only team, that overhead collapses to near zero. Everyone can take a ticket end-to-end. No one needs hand-holding on architecture decisions. PRs get merged in hours, not days.</p>

      <h2>Compounding quality</h2>
      <p>Senior engineers don't just write better code — they write less code. They reach for the boring, proven solution instead of the shiny new one. They see the edge case on the first pass. Every decision they make compounds: cleaner architecture means the next feature is cheaper to ship, not more expensive.</p>
      <blockquote>The best code is the code you don't have to write twice.</blockquote>
      <p>On AlgoCrew projects, we consistently see clients come to us after working with mixed-model agencies and being surprised that their codebase is actually readable. That shouldn't be a differentiator — but it is.</p>

      <h2>The 48-hour first commit</h2>
      <p>We promise clients a first commit within 48 hours of project kickoff. That's only possible because every engineer on the team can hit the ground running. No ramp-up week, no architecture overview sessions that take 3 days. Senior engineers read the codebase, ask three sharp questions, and ship.</p>

      <h2>What this means for you</h2>
      <p>If you're evaluating engineering partners, ask them one question: <em>what's your ratio of senior to junior engineers on my project?</em> If they can't answer cleanly, that's your answer.</p>
      <p>Senior-only isn't a luxury. It's the only way to get predictable, fast, high-quality delivery — especially on complex products where technical debt compounds quickly.</p>
    `,
  },
  {
    slug: "async-first-engineering-culture",
    title: "Async-First Engineering: How We Work Across 8 Time Zones Without Meetings",
    excerpt:
      "Daily standups are a 1970s management invention. We run an async-first engineering culture across 8 countries — and ship faster because of it.",
    category: "Engineering Culture",
    tags: ["Async", "Remote", "Culture", "Productivity"],
    date: "2025-04-28",
    readTime: 6,
    author: { name: "Arqam Malik", role: "Founder & CTO", initials: "AM", color: "#06c8e8" },
    coverGradient: "linear-gradient(135deg, #0d0d1a 0%, #2563eb 100%)",
    accent: "#2563eb",
    body: `
      <p>We have engineers in Canada, Pakistan, Ukraine, Nigeria, Brazil, India, the Philippines, and Germany. Our timezone spread is 13 hours. We ship every week. Here's how.</p>

      <h2>The meeting tax</h2>
      <p>Every 60-minute meeting with 5 people costs 5 engineer-hours. That's half a day of productivity gone. Now multiply that by daily standups, weekly syncs, and ad-hoc calls — and most "agile" teams are spending 20–30% of their working hours in meetings.</p>
      <p>Async-first doesn't mean no communication. It means defaulting to written, recorded, and permanent communication over synchronous calls. It means trusting engineers to manage their own time.</p>

      <h2>Our stack</h2>
      <p><strong>Notion</strong> — every project has a living spec. Not a PDF that's out of date by Tuesday. A real document that engineers update as they discover things.</p>
      <p><strong>Linear</strong> — all tasks, priorities, and status in one place. No Slack threads asking "what's the status on X?"</p>
      <p><strong>Loom</strong> — async video for anything that would take 20 minutes to write but 3 minutes to show. PR walkthroughs, bug reproductions, architecture reviews.</p>
      <p><strong>GitHub</strong> — PR descriptions are first-class documents. Every PR has a summary, screenshots, test coverage, and a deployment checklist.</p>

      <h2>The rule we live by</h2>
      <p>If a question can be answered by reading existing documentation, it shouldn't be asked in Slack. If it can't be — that's a documentation gap, not a meeting opportunity. Write the answer down and update the docs.</p>

      <h2>When we do meet</h2>
      <p>We have exactly two recurring meetings: a weekly 30-minute demo with the client (recorded), and a fortnightly retrospective. Everything else is async. If a call needs to happen, it's recorded and transcribed automatically.</p>
    `,
  },
  {
    slug: "milestone-billing-vs-hourly",
    title: "Milestone Billing vs. Hourly: Why We Never Bill by the Hour",
    excerpt:
      "Hourly billing creates misaligned incentives. The longer a project takes, the more the agency earns. We fixed this by tying every invoice to a shipped deliverable.",
    category: "Business",
    tags: ["Pricing", "Billing", "Transparency", "Client"],
    date: "2025-04-14",
    readTime: 5,
    author: { name: "Arqam Malik", role: "Founder & CTO", initials: "AM", color: "#06c8e8" },
    coverGradient: "linear-gradient(135deg, #0a0a0a 0%, #a78bfa 100%)",
    accent: "#a78bfa",
    body: `
      <p>Hourly billing is the original misaligned incentive in software services. When you pay by the hour, you're rewarding time spent — not outcomes delivered. We built AlgoCrew on a different model.</p>

      <h2>The hourly trap</h2>
      <p>Imagine hiring a plumber who charges by the hour. Would they rush to fix your pipe, or take their time? Hourly billing makes slowness profitable. It penalises efficiency. And it creates a dynamic where the client is always watching the clock instead of focusing on the product.</p>
      <p>In software, this is especially damaging. A senior engineer who solves a problem in 2 hours earns half as much as a junior who takes 4 hours. That's backwards.</p>

      <h2>How milestone billing works</h2>
      <p>Every engagement is broken into 2–4 milestones tied to concrete, verifiable deliverables. You pay when we ship the milestone — not before. If we miss a milestone, you don't pay until we deliver.</p>
      <p>This means our incentives are perfectly aligned with yours: we want to ship fast, ship well, and move to the next milestone. Speed and quality are how we earn.</p>

      <h2>What a milestone looks like</h2>
      <ul>
        <li>Milestone 1 — Authentication, database schema, core API endpoints. Deployed to staging.</li>
        <li>Milestone 2 — Core user flows complete, tested, deployed to staging with QA sign-off.</li>
        <li>Milestone 3 — Production deployment, monitoring setup, handover documentation.</li>
      </ul>

      <h2>The 30-day exit clause</h2>
      <p>For ongoing Studio engagements, we add a 30-day rolling exit. Either party can end the engagement with 30 days notice. No lock-in, no penalties. This keeps us accountable every single month.</p>
    `,
  },
  {
    slug: "nextjs-15-app-router-production-lessons",
    title: "Next.js 15 App Router: 6 Lessons From 12 Months in Production",
    excerpt:
      "We've shipped Next.js 15 App Router across 8 production projects. Here's what the docs don't tell you about caching, streaming, and server components at scale.",
    category: "Engineering",
    tags: ["Next.js", "React", "Performance", "Production"],
    date: "2025-03-30",
    readTime: 10,
    author: { name: "Dev Team", role: "Engineering", initials: "DT", color: "#34d399" },
    coverGradient: "linear-gradient(135deg, #000 0%, #34d399 100%)",
    accent: "#34d399",
    body: `
      <p>Next.js 15 with the App Router is a genuinely great framework — but it has sharp edges that only show up in production. After shipping 8 projects on it, here's what we know.</p>

      <h2>1. Cache invalidation is still the hardest problem</h2>
      <p>The App Router's caching is powerful but opaque. <code>revalidatePath</code> doesn't do what most developers think — it invalidates the full route cache, not just the data cache. We've had multiple instances of stale UI persisting after data mutations because of incorrect cache assumptions.</p>
      <p>Rule: be explicit about every cache boundary. Use <code>no-store</code> by default on fetch calls that involve user-specific data. Add cache tags to everything you might want to invalidate selectively.</p>

      <h2>2. Server components don't eliminate client bundle bloat</h2>
      <p>One of the App Router's promises is smaller client bundles. This is true — but only if you're disciplined about the client/server boundary. A single <code>"use client"</code> directive on a parent component pulls all its children into the client bundle. We use a pattern of wrapping interactive leaves in client components rather than marking entire sections.</p>

      <h2>3. Streaming + Suspense is production-ready</h2>
      <p>We were cautious about <code>loading.tsx</code> and Suspense boundaries in the first few months. Now we use them everywhere. The TTFB improvements on data-heavy pages are significant — users see layout immediately while data loads, which feels dramatically faster even if the total load time is similar.</p>

      <h2>4. Parallel routes are underused</h2>
      <p>Parallel routes (<code>@slot</code> convention) are one of the most powerful App Router features and almost nobody uses them. We use them for dashboard layouts where multiple independent data sections should load in parallel without a shared loading state.</p>

      <h2>5. Edge runtime has real limitations</h2>
      <p>Edge functions are fast, but the limited runtime means no native Node.js modules. We've hit this with PDF generation, image processing, and certain database drivers. Know your runtime requirements before going edge.</p>

      <h2>6. Type safety across the server/client boundary</h2>
      <p>Props passed from server to client components must be serialisable. We've added a lint rule to catch non-serialisable types (like Date objects, class instances) being passed across the boundary. Use plain objects and ISO strings.</p>
    `,
  },
  {
    slug: "building-ai-features-that-actually-work",
    title: "Building AI Features That Actually Work in Production",
    excerpt:
      "LLMs are non-deterministic, expensive, and slow. Here's how we architect AI features that are reliable, cost-controlled, and fast enough for real users.",
    category: "AI / ML",
    tags: ["AI", "LLM", "Architecture", "Production", "OpenAI"],
    date: "2025-03-15",
    readTime: 9,
    author: { name: "Dev Team", role: "Engineering", initials: "DT", color: "#c084fc" },
    coverGradient: "linear-gradient(135deg, #0d0020 0%, #c084fc 100%)",
    accent: "#c084fc",
    body: `
      <p>Everyone wants AI features. Most of them shipped in the last two years are slow, unreliable, and expensive. Here's how we build them so they're none of those things.</p>

      <h2>Non-determinism is a feature, not a bug — if you design for it</h2>
      <p>LLMs are not functions. The same input won't always produce the same output. Applications that treat them like functions fail in production. Design for variance: validate outputs against a schema, retry on failure, and have graceful fallbacks for when the model produces garbage.</p>
      <p>We use Zod schemas with structured output mode on every OpenAI call. If the output doesn't match the schema, we retry once, then fall back to a cached or default response.</p>

      <h2>Cost control</h2>
      <p>LLM costs compound fast. On a B2C product at scale, uncached GPT-4 calls will bankrupt you. Our approach:</p>
      <ul>
        <li><strong>Semantic caching</strong> — cache responses by embedding similarity, not exact string match. Semantically similar prompts return cached responses without a new LLM call.</li>
        <li><strong>Model tiering</strong> — use GPT-4 for complex reasoning, GPT-4o-mini for simple classification. Most tasks don't need the expensive model.</li>
        <li><strong>Prompt budgets</strong> — every prompt has a max token budget. We prune context aggressively and summarise long histories.</li>
      </ul>

      <h2>Latency</h2>
      <p>Users abandon if a feature takes more than 2 seconds. LLM calls average 3–8 seconds. Streaming is the answer — show tokens as they arrive, not after the full response completes. With streaming, perceived latency drops to near-zero.</p>

      <h2>Evals before you ship</h2>
      <p>You wouldn't ship a feature without tests. Don't ship AI features without evals. We build a golden dataset of input/expected output pairs and run evals on every model change and every prompt change. Regression is how AI features silently break.</p>
    `,
  },
  {
    slug: "kubernetes-vs-ecs-2025",
    title: "Kubernetes vs ECS in 2025: What We Actually Recommend",
    excerpt:
      "After running both in production across dozens of client projects, here's our honest take on when to use Kubernetes, when ECS wins, and when neither is the right answer.",
    category: "DevOps",
    tags: ["Kubernetes", "AWS", "ECS", "DevOps", "Infrastructure"],
    date: "2025-02-28",
    readTime: 8,
    author: { name: "Dev Team", role: "Engineering", initials: "DT", color: "#38bdf8" },
    coverGradient: "linear-gradient(135deg, #001122 0%, #38bdf8 100%)",
    accent: "#38bdf8",
    body: `
      <p>This question comes up in almost every infrastructure conversation we have. Here's our actual opinion, not the vendor-neutral non-answer you usually get.</p>

      <h2>Start with ECS unless you have a reason not to</h2>
      <p>For 80% of workloads, ECS on Fargate is the right answer. It's simpler to operate, cheaper at small to medium scale, and deeply integrated with AWS services. If your team doesn't have a dedicated platform engineer, ECS will serve you well for years.</p>
      <p>Kubernetes is an operations commitment. It gives you power and flexibility, but it extracts a significant operational tax. Cluster upgrades, node management, networking complexity, RBAC, custom resource definitions — it's a full-time job to do properly.</p>

      <h2>When Kubernetes wins</h2>
      <ul>
        <li>Multi-cloud or cloud-agnostic requirements</li>
        <li>Complex workload scheduling (GPUs, spot instances, bin packing)</li>
        <li>Large teams with dedicated platform engineering capacity</li>
        <li>Custom operators for domain-specific automation</li>
        <li>Existing Helm chart ecosystem you need to consume</li>
      </ul>

      <h2>When ECS wins</h2>
      <ul>
        <li>AWS-only deployment (which is most startups)</li>
        <li>Serverless containers via Fargate with no cluster management</li>
        <li>Deep integration with ALB, IAM, Secrets Manager, CloudWatch</li>
        <li>Small-to-medium teams without platform engineering headcount</li>
        <li>Faster time to production on a new project</li>
      </ul>

      <h2>The honest answer</h2>
      <p>Choose the option your team can actually operate well. A poorly-run Kubernetes cluster is worse than a well-run ECS cluster in every measurable dimension. Complexity is a debt that compounds.</p>
    `,
  },
  {
    slug: "react-native-vs-flutter-2025",
    title: "React Native vs Flutter in 2025: A Pragmatic Comparison",
    excerpt:
      "We've shipped production apps in both. Here's the framework comparison that skips the benchmarks and focuses on what actually matters: developer experience, hiring, and long-term maintainability.",
    category: "Mobile",
    tags: ["React Native", "Flutter", "Mobile", "Cross-platform"],
    date: "2025-02-10",
    readTime: 7,
    author: { name: "Dev Team", role: "Engineering", initials: "DT", color: "#fb923c" },
    coverGradient: "linear-gradient(135deg, #1a0800 0%, #fb923c 100%)",
    accent: "#fb923c",
    body: `
      <p>Both React Native and Flutter are mature, production-ready frameworks. The right choice depends on your team, your product, and your long-term roadmap — not on benchmark scores.</p>

      <h2>Team composition is the biggest factor</h2>
      <p>If you have React/TypeScript engineers, React Native is the lower-friction choice. The mental models transfer almost entirely. Your web engineers can contribute to the mobile codebase without learning a new language.</p>
      <p>If you're hiring a dedicated mobile team or already have Dart experience (unlikely but possible), Flutter's consistent rendering and performance are genuine advantages.</p>

      <h2>Where Flutter wins</h2>
      <p>Flutter's rendering engine is independent of the platform's native UI components. This means pixel-perfect consistency across iOS and Android — you're not fighting platform-specific rendering quirks. For highly designed apps where every pixel matters, Flutter is the better choice.</p>
      <p>Flutter's performance is also genuinely excellent. The Skia/Impeller renderer is fast, and you're less likely to hit the bridge bottleneck that can affect React Native in complex animations.</p>

      <h2>Where React Native wins</h2>
      <p>The JavaScript ecosystem. React Native apps can share code with web, use any npm package (with caveats), and leverage the largest developer community in the world. For content-driven apps, e-commerce, or anything needing rapid iteration, React Native's ecosystem advantages are real.</p>
      <p>The New Architecture (JSI, Fabric, TurboModules) has solved most of the performance criticisms React Native faced. For the majority of apps, performance is now on par.</p>

      <h2>Our default recommendation</h2>
      <p>React Native for teams with web background, tight deadlines, or significant code-sharing requirements. Flutter for pixel-perfect design systems, dedicated mobile teams, or performance-critical experiences.</p>
    `,
  },
  {
    slug: "technical-debt-is-not-always-bad",
    title: "Technical Debt Is Not Always Bad — Here's When to Embrace It",
    excerpt:
      "The phrase 'technical debt' is used to justify both legitimate shortcuts and inexcusable laziness. Here's how to tell the difference and make intentional tradeoffs.",
    category: "Engineering",
    tags: ["Technical Debt", "Architecture", "Engineering", "Product"],
    date: "2025-01-25",
    readTime: 6,
    author: { name: "Arqam Malik", role: "Founder & CTO", initials: "AM", color: "#06c8e8" },
    coverGradient: "linear-gradient(135deg, #0a0a00 0%, #fbbf24 100%)",
    accent: "#fbbf24",
    body: `
      <p>Every senior engineer I've ever worked with has strong opinions about technical debt. Most of those opinions are wrong — or at least incomplete. Technical debt, like financial debt, is a tool. The question is whether you're using it intentionally.</p>

      <h2>Intentional vs. accidental debt</h2>
      <p>Martin Fowler's technical debt quadrant is still the best framework: debt can be reckless or prudent, and deliberate or inadvertent. The only acceptable technical debt is prudent and deliberate — a conscious tradeoff with a known repayment plan.</p>
      <p>Accidental debt is just bad engineering. You didn't choose to accrue it; you accrued it through ignorance, haste, or poor craftsmanship. That's not debt — that's damage.</p>

      <h2>When deliberate debt makes sense</h2>
      <p><strong>Early-stage products:</strong> If you don't know whether the feature will survive the next quarter, over-engineering it is wasteful. Write the simplest thing that works. If it survives and scales, refactor then.</p>
      <p><strong>Time-to-market pressure:</strong> Getting to market two weeks earlier can be worth significant architectural debt — if the market opportunity is real and the debt is tracked and paid.</p>
      <p><strong>Validated assumptions:</strong> Build the hardcoded, manual version first. Automate when you've validated the assumption. Premature automation is one of the most expensive forms of technical debt.</p>

      <h2>The debt register</h2>
      <p>Every intentional debt decision should be recorded: what was the tradeoff, what's the cost of carrying it, and what's the trigger for repayment. We keep a debt register in Notion for every client project. When the trigger is hit — traffic threshold, team size, feature complexity — we plan the refactor.</p>

      <h2>The rule</h2>
      <p>Technical debt is fine. Untracked technical debt is not. Know what you owe.</p>
    `,
  },
  {
    slug: "how-to-scope-an-mvp-correctly",
    title: "How to Scope an MVP That Actually Ships",
    excerpt:
      "Most MVPs fail before they launch — not because of bad code, but because of bad scoping. Here's the framework we use to define an MVP that ships in 6 weeks, not 6 months.",
    category: "Product",
    tags: ["MVP", "Product", "Scoping", "Startups"],
    date: "2025-01-12",
    readTime: 7,
    author: { name: "Arqam Malik", role: "Founder & CTO", initials: "AM", color: "#06c8e8" },
    coverGradient: "linear-gradient(135deg, #001a00 0%, #4ade80 100%)",
    accent: "#4ade80",
    body: `
      <p>We've scoped and built dozens of MVPs. The ones that fail almost never fail because of technical problems. They fail because the scope was wrong from the start.</p>

      <h2>The MVP trap</h2>
      <p>A client comes with a 48-page requirements document and calls it an MVP. Everything is "must-have." The authentication system needs to support SSO, OAuth, passwordless, and two-factor. The dashboard needs 14 chart types. The notifications system needs email, SMS, push, and in-app.</p>
      <p>That's not an MVP. That's a full product. And it will take 12 months and probably never ship.</p>

      <h2>The one-sentence test</h2>
      <p>A valid MVP can be described in one sentence: "A tool that lets [specific user] do [one core action] so that [one measurable outcome]." If you can't describe it in one sentence, the scope isn't minimal enough.</p>

      <h2>The three-column exercise</h2>
      <p>We run every client through three columns: Must Have (MVP fails without it), Should Have (makes the MVP significantly better), Nice to Have (everything else). The rule: the Must Have column should feel uncomfortably small. If it doesn't, you haven't cut enough.</p>

      <h2>Feature dependencies are scope creep in disguise</h2>
      <p>"We need the API to support pagination before we can build the list view." Do you? Can the list view load all 20 items for now? Almost every technical dependency in an MVP is a future-proofing decision masquerading as a requirement. Challenge every one.</p>

      <h2>Ship ugly</h2>
      <p>The first version doesn't need to be beautiful. It needs to prove the hypothesis. We've shipped MVPs with hardcoded data, manual processes behind the scenes, and placeholder UI. Users don't care — they care about whether the core value proposition works.</p>
    `,
  },
  {
    slug: "postgres-vs-mongodb-choose-right",
    title: "PostgreSQL vs MongoDB: How to Choose Without Starting a Religion War",
    excerpt:
      "The database debate is one of the most opinionated in engineering. Here's a framework based on actual project requirements rather than tribal loyalty.",
    category: "Engineering",
    tags: ["PostgreSQL", "MongoDB", "Database", "Architecture"],
    date: "2024-12-20",
    readTime: 8,
    author: { name: "Dev Team", role: "Engineering", initials: "DT", color: "#34d399" },
    coverGradient: "linear-gradient(135deg, #000a08 0%, #34d399 100%)",
    accent: "#34d399",
    body: `
      <p>I've seen engineers get genuinely angry about database choices. It's a religion for some people. Here's the pragmatic version: both are excellent databases and the choice usually comes down to data shape, not ideology.</p>

      <h2>Start with your data shape</h2>
      <p>PostgreSQL is a relational database. If your data is naturally relational — users have orders, orders have line items, line items have products — Postgres is the obvious choice. The relational model gives you referential integrity, joins, transactions, and 50 years of battle-tested reliability.</p>
      <p>MongoDB stores documents. If your data is naturally document-shaped — each entity is a self-contained JSON blob with variable structure — MongoDB's query model fits better. Think content management, event logs, product catalogs with variable attributes.</p>

      <h2>The JSONB argument</h2>
      <p>Postgres has native JSONB support that covers most "I need flexible schema" use cases. Before reaching for MongoDB, ask whether Postgres with a JSONB column would solve the problem. It usually does, and you keep the benefits of a relational database for the rest of your data.</p>

      <h2>Transactions</h2>
      <p>If your application requires multi-document ACID transactions, Postgres wins on simplicity. MongoDB supports multi-document transactions since version 4.0, but the mental model is more complex and the performance overhead is real.</p>

      <h2>Scaling</h2>
      <p>Both scale. Postgres scales vertically (read replicas, connection pooling with PgBouncer) extremely well and handles most workloads without sharding. MongoDB's horizontal scaling story is better for truly massive document workloads. But you'll hit Postgres's limits at a scale most companies never reach.</p>

      <h2>Our default</h2>
      <p>PostgreSQL for almost everything. MongoDB when the document model is genuinely a better fit for the core data — which is less common than MongoDB's marketing would suggest.</p>
    `,
  },
  {
    slug: "ci-cd-pipeline-best-practices-2025",
    title: "CI/CD Pipeline Best Practices We Use on Every Project",
    excerpt:
      "A broken deployment pipeline is a productivity tax on every engineer, every day. Here's the setup we install on every new project from day one.",
    category: "DevOps",
    tags: ["CI/CD", "GitHub Actions", "DevOps", "Automation"],
    date: "2024-12-05",
    readTime: 7,
    author: { name: "Dev Team", role: "Engineering", initials: "DT", color: "#38bdf8" },
    coverGradient: "linear-gradient(135deg, #000d1a 0%, #38bdf8 100%)",
    accent: "#38bdf8",
    body: `
      <p>A good CI/CD pipeline is invisible. A bad one is a daily source of friction, flaky tests, and the "it works on my machine" problem. Here's what we set up from day one on every project.</p>

      <h2>Pipeline structure</h2>
      <p>Every push to any branch runs: lint → type check → unit tests. Every PR to main adds: integration tests → build → preview deployment. Every merge to main: full test suite → build → staging deployment. Every tag: production deployment with manual approval gate.</p>

      <h2>Speed is a feature</h2>
      <p>A CI pipeline that takes 20 minutes kills developer flow. We target under 5 minutes for the PR pipeline. Key optimisations:</p>
      <ul>
        <li>Layer caching for Docker builds — cache the dependency install layer separately from the application code</li>
        <li>Test parallelisation — split the test suite across multiple runners</li>
        <li>Incremental type checking — only check changed files on PRs</li>
        <li>Smart test selection — run only tests related to changed files for the fast path</li>
      </ul>

      <h2>Preview deployments</h2>
      <p>Every PR gets a preview deployment with a unique URL. This is non-negotiable. The ability to share a live URL for review — with designers, product managers, and clients — eliminates an entire category of miscommunication.</p>

      <h2>Secret management</h2>
      <p>Secrets never live in the repository. We use GitHub Actions secrets for CI, and environment-specific secret stores (AWS Secrets Manager, Doppler, Vault) for runtime. Every new engineer gets onboarded to the secret store on day one.</p>

      <h2>Rollback is a one-command operation</h2>
      <p>Every deployment should be reversible in under 2 minutes. We use immutable deployment artifacts (Docker images tagged with git SHA) and maintain the last 5 production builds for instant rollback. The rollback command is documented in the README.</p>
    `,
  },
  {
    slug: "code-review-culture-that-ships",
    title: "Code Review Culture That Ships: How We Keep PRs Under 24 Hours",
    excerpt:
      "Slow code review is one of the most common productivity killers in engineering teams. Here's how we maintain a culture where PRs get reviewed within hours, not days.",
    category: "Engineering Culture",
    tags: ["Code Review", "Process", "Team", "GitHub"],
    date: "2024-11-18",
    readTime: 5,
    author: { name: "Arqam Malik", role: "Founder & CTO", initials: "AM", color: "#06c8e8" },
    coverGradient: "linear-gradient(135deg, #0a0012 0%, #e879f9 100%)",
    accent: "#e879f9",
    body: `
      <p>Pull requests that sit in review for days are a system problem, not a people problem. Here's how we fixed the system.</p>

      <h2>Small PRs are a forcing function</h2>
      <p>Our rule: no PR over 400 lines of meaningful change. Large PRs don't get reviewed properly — reviewers rubber-stamp them because the cognitive overhead is too high. Small PRs are reviewed quickly, deeply, and correctly.</p>
      <p>This requires a different approach to feature development: stack PRs, use feature flags, ship incomplete features behind flags. The code hits production sooner, the review stays small, and the feedback loop tightens.</p>

      <h2>The 24-hour SLA</h2>
      <p>Every open PR in our team has a 24-hour review SLA. If a PR isn't reviewed within 24 hours, the author pings the reviewer directly. Not in a group channel — directly. This makes the delay visible without being punitive.</p>

      <h2>PR description as communication</h2>
      <p>Good PR descriptions eliminate most review back-and-forth. We require: a summary of what changed and why, screenshots/recordings for UI changes, a note on what was not changed (and why), and any follow-up items. A reviewer who reads the description should understand the PR before looking at a single line of code.</p>

      <h2>Review as teaching, not gatekeeping</h2>
      <p>The tone of code review matters enormously. Comments that say "this is wrong" create defensiveness. Comments that say "I've seen this pattern cause X problem at scale — consider Y instead" create learning. We optimise for the latter.</p>

      <h2>Approve and fix</h2>
      <p>For non-blocking comments, reviewers use "approve with suggestions" and the author decides whether to address them before or after merge. This prevents the approval-hostage situation where a PR is blocked on minor nitpicks for days.</p>
    `,
  },
];

const extraPosts: BlogPost[] = [
  {
    slug: "zero-trust-security-architecture-guide",
    title: "Zero Trust Architecture: The Complete Engineering Guide for 2025",
    excerpt:
      "Perimeter-based security is dead. Zero trust assumes breach by default — every request is verified, every connection is authenticated. Here's how to implement it without grinding your team to a halt.",
    category: "Security",
    tags: ["Zero Trust", "Security", "Architecture", "DevSecOps"],
    date: "2025-05-01",
    readTime: 11,
    author: { name: "Dev Team", role: "Engineering", initials: "DT", color: "#ef4444" },
    coverGradient: "linear-gradient(135deg, #1a0000 0%, #ef4444 100%)",
    accent: "#ef4444",
    body: `
      <p>The traditional castle-and-moat security model assumes everything inside the network perimeter is trusted. That assumption died with the cloud. Zero trust replaces it with a simple principle: never trust, always verify.</p>

      <h2>The three pillars of zero trust</h2>
      <p><strong>Verify explicitly:</strong> Authenticate and authorise every request based on all available data — identity, location, device health, service, workload, and anomalies. No implicit trust based on network location.</p>
      <p><strong>Use least privilege access:</strong> Limit access to only what is needed, when it is needed. Time-bound access, just-in-time provisioning, and risk-based adaptive policies minimise the blast radius of any breach.</p>
      <p><strong>Assume breach:</strong> Design as if the attacker is already inside. Segment everything, encrypt all traffic (east-west and north-south), and instrument for detection rather than only prevention.</p>

      <h2>Identity is the new perimeter</h2>
      <p>In a zero trust model, identity replaces the network as the control plane. Every human and machine identity gets a certificate. Every service-to-service call is mutually authenticated with mTLS. SPIFFE/SPIRE gives you workload identity in Kubernetes. Combine this with a service mesh like Istio or Linkerd and you get cryptographic identity between every pod.</p>

      <h2>Network microsegmentation</h2>
      <p>Flat networks allow lateral movement — once an attacker is in, they can reach anything. Microsegmentation enforces network policies at the workload level. In Kubernetes, NetworkPolicy resources define exactly which pods can talk to which other pods on which ports. Default deny, explicit allow. This alone limits the blast radius of a compromise dramatically.</p>

      <h2>Device trust</h2>
      <p>Zero trust extends to devices. Before a device can access corporate resources, it must pass a health check: is the OS up to date? Is disk encryption enabled? Is the endpoint agent running? Tools like BeyondCorp Enterprise, Cloudflare Access, or Tailscale enforce device posture as part of the access decision.</p>

      <h2>Secrets management</h2>
      <p>Static credentials are the enemy of zero trust. Use dynamic secrets with short TTLs: HashiCorp Vault generates database credentials on demand that expire in minutes. AWS IAM Roles for Service Accounts give pods time-limited AWS credentials without storing anything. Rotate everything. Log every access.</p>

      <h2>Implementation roadmap</h2>
      <p>Start with identity and SSO. Add MFA everywhere. Enforce device posture. Implement mTLS between services. Apply least-privilege IAM. Add network policies. Centralise logging and anomaly detection. Zero trust is a journey, not a product you install.</p>
    `,
  },
  {
    slug: "owasp-top-10-2025-developer-guide",
    title: "OWASP Top 10 2025: A Developer's Practical Guide to Fixing Every Vulnerability",
    excerpt:
      "The OWASP Top 10 lists the most critical web application security risks. Here's not just what they are, but exactly how to fix each one in a modern Node.js / Next.js stack.",
    category: "Security",
    tags: ["OWASP", "Security", "Web", "Node.js", "Vulnerabilities"],
    date: "2025-04-20",
    readTime: 13,
    author: { name: "Dev Team", role: "Engineering", initials: "DT", color: "#ef4444" },
    coverGradient: "linear-gradient(135deg, #0d0000 0%, #dc2626 100%)",
    accent: "#dc2626",
    body: `
      <p>Security is not a feature you add after launch. It's an engineering discipline you apply from the first line of code. The OWASP Top 10 is the best starting point — here's how to actually fix each one.</p>

      <h2>1. Broken Access Control</h2>
      <p>The most common vulnerability in 2025. Users access resources they shouldn't. Fix: enforce authorisation server-side on every request. Never rely on client-side checks. Use attribute-based access control (ABAC) rather than role-based where possible. Test with automated tools like OWASP ZAP on every deployment.</p>

      <h2>2. Cryptographic Failures</h2>
      <p>Sensitive data transmitted or stored without adequate encryption. Fix: TLS 1.3 everywhere, including internal services. Hash passwords with Argon2id (not MD5, not SHA-1, not bcrypt). Encrypt PII at rest using AES-256-GCM. Never roll your own crypto.</p>

      <h2>3. Injection</h2>
      <p>SQL, NoSQL, command, and LDAP injection remain common. Fix: use parameterised queries exclusively. With an ORM like Prisma or Drizzle, raw SQL is rarely needed — but when it is, always use parameterised form. Validate and sanitise all input at the boundary.</p>

      <h2>4. Insecure Design</h2>
      <p>Security flaws baked into the architecture, not the implementation. Fix: threat model every new feature before writing code. Use secure design patterns. Build rate limiting, account lockout, and abuse detection into the design, not as an afterthought.</p>

      <h2>5. Security Misconfiguration</h2>
      <p>Default credentials, open cloud storage, verbose error messages. Fix: infrastructure as code with security baselines. Disable all default accounts. Return generic error messages to clients. Run automated configuration scanning (Prowler for AWS, kube-bench for Kubernetes).</p>

      <h2>6. Vulnerable Components</h2>
      <p>Your application is only as secure as its dependencies. Fix: run <code>npm audit</code> in CI and fail on high severity. Use Dependabot or Renovate for automated dependency updates. Pin dependency versions in production.</p>

      <h2>7. Authentication Failures</h2>
      <p>Weak passwords, credential stuffing, session fixation. Fix: enforce strong passwords or passkeys. Implement MFA. Rotate session tokens after login. Use short-lived JWTs with refresh token rotation. Rate limit authentication endpoints with exponential backoff.</p>

      <h2>8. Integrity Failures</h2>
      <p>Deserialization of untrusted data, CI/CD pipeline attacks. Fix: verify integrity of all downloaded dependencies with checksums. Sign deployment artifacts. Protect your CI/CD pipeline — it's a privileged execution environment. Use Sigstore for supply chain security.</p>

      <h2>9. Logging Failures</h2>
      <p>Insufficient logging means breaches go undetected. Fix: log all authentication events, access control failures, and input validation errors. Ship logs to a centralised SIEM. Alert on anomalies — multiple failed logins, unusual data exports, off-hours access.</p>

      <h2>10. SSRF</h2>
      <p>Server-side request forgery allows attackers to make the server fetch arbitrary URLs, including cloud metadata endpoints. Fix: validate and whitelist all URLs before fetching. Block access to private IP ranges. Disable HTTP redirects in internal fetch calls.</p>
    `,
  },
  {
    slug: "docker-production-best-practices",
    title: "Docker in Production: 12 Best Practices We Apply on Every Project",
    excerpt:
      "Most Docker setups work in development but fail under production load. Here are the 12 practices that separate production-grade containers from development toys.",
    category: "DevOps",
    tags: ["Docker", "Containers", "DevOps", "Production", "Security"],
    date: "2025-04-05",
    readTime: 9,
    author: { name: "Dev Team", role: "Engineering", initials: "DT", color: "#38bdf8" },
    coverGradient: "linear-gradient(135deg, #00080f 0%, #0369a1 100%)",
    accent: "#0369a1",
    body: `
      <p>Docker is deceptively easy to get started with. A <code>Dockerfile</code> with five lines and you have a running container. But production environments expose every shortcut, every assumption, every security gap. Here's what we actually do.</p>

      <h2>1. Multi-stage builds — always</h2>
      <p>A Node.js application doesn't need its build toolchain in production. Use a build stage with all dev dependencies, then copy only the compiled output into a minimal runtime image. This reduces image size by 60–80% and eliminates an entire category of vulnerabilities from build tools that never needed to be in production.</p>

      <h2>2. Pin base image versions</h2>
      <p><code>FROM node:latest</code> is a liability. Pin to a specific digest: <code>FROM node:20.11.0-alpine3.19</code>. Use Dependabot to automate updates with controlled testing.</p>

      <h2>3. Run as non-root</h2>
      <p>By default, containers run as root. If an attacker escapes the container, they have root on the host. Add <code>USER node</code> to your Dockerfile and ensure your application doesn't require root privileges to run.</p>

      <h2>4. Read-only filesystem</h2>
      <p>Mount the container filesystem as read-only. If your application doesn't need to write to the filesystem (it shouldn't — use object storage or volumes), make it impossible. Add <code>--read-only</code> to your run command or set <code>readOnlyRootFilesystem: true</code> in your Kubernetes pod spec.</p>

      <h2>5. Drop all capabilities</h2>
      <p>Linux capabilities give containers access to privileged kernel features. Drop all capabilities and add back only what you need: <code>cap_drop: ALL</code>, then <code>cap_add: [NET_BIND_SERVICE]</code> only if you need to bind to ports below 1024 (you probably don't — use port mapping instead).</p>

      <h2>6. Scan images for vulnerabilities</h2>
      <p>Integrate Trivy or Grype into your CI pipeline. Fail builds on critical vulnerabilities. Scan both your base image and your final image. Keep a policy — we fail on CRITICAL, warn on HIGH, track MEDIUM.</p>

      <h2>7. Layer caching strategy</h2>
      <p>Order Dockerfile instructions from least-changed to most-changed. Copy <code>package.json</code> and run <code>npm install</code> before copying application code. This ensures dependency layers are cached and only rebuild when dependencies change.</p>

      <h2>8. Health checks</h2>
      <p>Define a <code>HEALTHCHECK</code> in your Dockerfile. Orchestrators use this to determine container health and route traffic only to healthy instances. A simple HTTP check on your health endpoint is sufficient.</p>

      <h2>9. Resource limits</h2>
      <p>Always set memory and CPU limits. Without limits, a single misbehaving container can starve all other containers on the host. Set limits at 80% of what you've observed the container actually needs under load.</p>

      <h2>10. Use .dockerignore aggressively</h2>
      <p>Exclude <code>node_modules</code>, <code>.git</code>, <code>.env</code> files, and test directories from the build context. A large build context slows builds and risks leaking secrets into the image.</p>

      <h2>11. Immutable image tags</h2>
      <p>Never overwrite an image tag in production. Tag with the git commit SHA. <code>myapp:a3f9bc2</code> is immutable and traceable. <code>myapp:latest</code> is not.</p>

      <h2>12. Log to stdout</h2>
      <p>Containers should not manage their own log files. Write all logs to stdout/stderr and let the container runtime and your logging infrastructure handle collection. This enables centralised log aggregation without any application-level configuration.</p>
    `,
  },
  {
    slug: "terraform-infrastructure-as-code-patterns",
    title: "Terraform at Scale: Patterns That Don't Fall Apart at 50+ Resources",
    excerpt:
      "Terraform is easy to start with and hard to scale. Here are the module patterns, state management strategies, and team workflows that keep large infrastructure codebases maintainable.",
    category: "DevOps",
    tags: ["Terraform", "IaC", "AWS", "Infrastructure", "DevOps"],
    date: "2025-03-22",
    readTime: 10,
    author: { name: "Dev Team", role: "Engineering", initials: "DT", color: "#a78bfa" },
    coverGradient: "linear-gradient(135deg, #0a0014 0%, #7c3aed 100%)",
    accent: "#7c3aed",
    body: `
      <p>Terraform feels simple at first. One file, a few resources, <code>terraform apply</code> and you're done. Then you add a second environment, a third AWS account, a fourth team member — and suddenly everything is broken and nobody knows why.</p>

      <h2>Module structure that scales</h2>
      <p>We use a three-layer module architecture. Foundation modules (VPC, IAM roles, DNS zones) are versioned separately and consumed by application modules. Application modules (ECS services, RDS clusters, load balancers) are composed into environment modules (dev, staging, production). Each layer has its own state file.</p>

      <h2>State management</h2>
      <p>Never use local state in a team. Use remote state from day one — S3 with DynamoDB locking for AWS. One state file per environment per component. The more you put in one state file, the larger your blast radius when something goes wrong. A <code>terraform apply</code> that touches 200 resources is terrifying. One that touches 12 is fine.</p>

      <h2>Workspaces are not environments</h2>
      <p>Terraform workspaces are widely misused as environment separation. They share the same code and make it easy to accidentally apply dev changes to production. Use separate directories with separate state files for separate environments. The duplication is worth the isolation.</p>

      <h2>Variable validation</h2>
      <p>Use <code>validation</code> blocks in variable declarations. Enforce CIDR ranges, instance type allowlists, and naming conventions at the Terraform layer, not after a failed apply. Fail fast with a clear error message rather than a cryptic AWS API error.</p>

      <h2>Plan in CI, apply with approval</h2>
      <p>Every pull request generates a <code>terraform plan</code> output posted as a PR comment. Engineers review the plan before merging. After merge, Atlantis or Terraform Cloud applies the plan automatically. The human approval step is the PR review — not a manual CLI command.</p>

      <h2>Drift detection</h2>
      <p>Schedule <code>terraform plan</code> runs daily against every environment. If the plan is non-empty, someone changed infrastructure outside of Terraform. Alert on this. Drift is how security incidents start — a manually created IAM role that nobody tracks, a security group rule added in the console.</p>

      <h2>Secrets</h2>
      <p>Never put secrets in Terraform state. Use data sources to read secrets from AWS Secrets Manager or Parameter Store at apply time. Terraform state is readable by anyone with state bucket access — treat it as a potential attack surface.</p>
    `,
  },
  {
    slug: "api-security-best-practices-2025",
    title: "API Security in 2025: The Complete Checklist for Production APIs",
    excerpt:
      "APIs are the attack surface of modern applications. Here's a comprehensive checklist covering authentication, rate limiting, input validation, and everything between that we apply before any API goes live.",
    category: "Security",
    tags: ["API", "Security", "Authentication", "REST", "OAuth"],
    date: "2025-03-08",
    readTime: 10,
    author: { name: "Dev Team", role: "Engineering", initials: "DT", color: "#ef4444" },
    coverGradient: "linear-gradient(135deg, #110000 0%, #b91c1c 100%)",
    accent: "#b91c1c",
    body: `
      <p>Every API endpoint is a potential attack vector. The difference between a secure API and a vulnerable one is usually not a single catastrophic oversight — it's an accumulation of small gaps. Here's our pre-production API security checklist.</p>

      <h2>Authentication and authorisation</h2>
      <p>Use OAuth 2.0 with PKCE for user-facing APIs. Use short-lived JWTs (15-minute expiry) with refresh token rotation. Store refresh tokens in httpOnly, SameSite=Strict cookies — never in localStorage. Validate token signature, expiry, issuer, and audience on every request. Implement proper token revocation.</p>

      <h2>Rate limiting and throttling</h2>
      <p>Every endpoint needs rate limiting — not just authentication endpoints. Use a sliding window algorithm rather than fixed windows to prevent burst attacks at window boundaries. Implement per-user, per-IP, and global rate limits. Return <code>Retry-After</code> headers. Use Redis for distributed rate limiting across multiple API instances.</p>

      <h2>Input validation</h2>
      <p>Validate all inputs at the API boundary before they touch your business logic. Use a schema validation library (Zod, Joi, class-validator). Reject unexpected fields — don't just ignore them. Enforce maximum lengths on all string fields. Validate content types. Never trust client-supplied IDs without authorisation checks.</p>

      <h2>HTTPS and transport security</h2>
      <p>TLS 1.3 only. Disable TLS 1.0 and 1.1. Set HSTS headers with a long max-age. Use certificate pinning in mobile clients. Validate SSL certificates in all server-side HTTP clients — never disable certificate validation.</p>

      <h2>CORS configuration</h2>
      <p>Never use <code>Access-Control-Allow-Origin: *</code> on authenticated endpoints. Specify exact origins. Validate the <code>Origin</code> header server-side. Only allow the HTTP methods your API actually uses. Don't expose sensitive headers in <code>Access-Control-Expose-Headers</code>.</p>

      <h2>Error handling</h2>
      <p>Return generic error messages to clients. Never expose stack traces, database error messages, or internal implementation details. Log the full error server-side. Use consistent error response schemas — attackers use error message differences to enumerate valid usernames, IDs, and resources.</p>

      <h2>Security headers</h2>
      <p>Set <code>X-Content-Type-Options: nosniff</code>, <code>X-Frame-Options: DENY</code>, <code>Content-Security-Policy</code>, and <code>Referrer-Policy</code> on all responses. Use a library like Helmet.js to manage these systematically.</p>

      <h2>Audit logging</h2>
      <p>Log every API call with: timestamp, user ID, IP address, endpoint, HTTP method, response status, and request duration. Never log request bodies containing PII or secrets. Ship logs to a SIEM. Alert on anomalous patterns — high error rates, unusual access times, data export spikes.</p>
    `,
  },
  {
    slug: "observability-beyond-monitoring",
    title: "Observability vs Monitoring: Why Dashboards Aren't Enough",
    excerpt:
      "Monitoring tells you when something is broken. Observability tells you why. Here's how we implement the three pillars — metrics, logs, and traces — to achieve true system understanding.",
    category: "DevOps",
    tags: ["Observability", "Monitoring", "OpenTelemetry", "Prometheus", "Grafana"],
    date: "2025-02-18",
    readTime: 9,
    author: { name: "Dev Team", role: "Engineering", initials: "DT", color: "#34d399" },
    coverGradient: "linear-gradient(135deg, #001a0f 0%, #059669 100%)",
    accent: "#059669",
    body: `
      <p>Monitoring is reactive — you set thresholds and alert when they're breached. Observability is proactive — you instrument your system so you can answer arbitrary questions about its behaviour without deploying new code. Here's the difference in practice.</p>

      <h2>The three pillars</h2>
      <p><strong>Metrics</strong> are numerical measurements over time — request rate, error rate, latency percentiles, resource utilisation. They're cheap to store and fast to query, but they tell you something is wrong, not why. Use Prometheus for collection and Grafana for visualisation. The four golden signals (latency, traffic, errors, saturation) should be on your primary dashboard.</p>
      <p><strong>Logs</strong> are timestamped events. They answer "what happened?" Structured JSON logs are dramatically more useful than text strings. Every log entry should have: timestamp, level, service name, trace ID, and structured context fields. Ship to a log aggregation system (Loki, CloudWatch, Datadog). Never log sensitive data.</p>
      <p><strong>Traces</strong> are the missing piece. A trace follows a single request through every service it touches — the only way to understand distributed system behaviour. OpenTelemetry has become the standard. Instrument your services with the OTel SDK, send to a backend like Jaeger, Tempo, or Honeycomb.</p>

      <h2>OpenTelemetry first</h2>
      <p>Use OpenTelemetry for all instrumentation, not vendor SDKs. OTel gives you vendor-agnostic instrumentation that can be routed to any backend. Switch from Jaeger to Honeycomb without re-instrumenting your application. Add trace IDs to your logs automatically. Correlate metrics, logs, and traces by trace ID.</p>

      <h2>SLOs, not just alerts</h2>
      <p>Service Level Objectives are error budgets — the acceptable level of unreliability over a time window. Instead of alerting when error rate > 1%, alert when you're burning your error budget too fast to meet your SLO. This reduces alert fatigue and focuses attention on user-impacting issues. Use Sloth or the Grafana SLO feature to define and track SLOs.</p>

      <h2>The golden path</h2>
      <p>When an incident occurs, the workflow should be: alert fires → look at dashboard to identify affected service → look at traces for that service during the incident window → identify the slow or failing span → look at logs for that span → find the root cause. If you can't follow this path, you have an observability gap.</p>

      <h2>Cost management</h2>
      <p>Observability data is expensive at scale. Sample traces (head-based or tail-based sampling). Set log retention policies — 30 days in hot storage, 1 year in cold storage. Use metric cardinality limits — high-cardinality labels (like user IDs) in Prometheus will destroy your infrastructure.</p>
    `,
  },
  {
    slug: "aws-cost-optimisation-engineering-guide",
    title: "AWS Cost Optimisation: How We Cut Client Bills by 40% Without Touching Code",
    excerpt:
      "Cloud bills grow fast and invisibly. Here are the 10 levers we pull on every AWS account — most take under an hour to implement and the savings compound month over month.",
    category: "DevOps",
    tags: ["AWS", "Cost Optimisation", "Cloud", "FinOps"],
    date: "2025-01-30",
    readTime: 8,
    author: { name: "Dev Team", role: "Engineering", initials: "DT", color: "#fbbf24" },
    coverGradient: "linear-gradient(135deg, #0d0a00 0%, #d97706 100%)",
    accent: "#d97706",
    body: `
      <p>We inherited an AWS account from a client last year that was costing $28,000 per month. Within 90 days, we had it at $16,000 — same workload, same availability, no performance regression. Here's exactly what we did.</p>

      <h2>Right-size EC2 instances first</h2>
      <p>AWS Compute Optimizer analyses your actual utilisation and recommends right-sized instances. Most early-stage companies over-provision 3–5× "just to be safe." We found r5.2xlarge instances running at 8% CPU utilisation. Down-sized to r5.large, saved $800/month on a single instance family.</p>

      <h2>Reserved Instances and Savings Plans</h2>
      <p>On-demand pricing is the most expensive option and almost nobody should be using it for stable workloads. 1-year Savings Plans give 30–40% discount with no commitment to instance type. 3-year reserved instances give up to 60% off. Analyse your baseline usage in Cost Explorer and commit to what you know you'll use.</p>

      <h2>Spot Instances for fault-tolerant workloads</h2>
      <p>Batch processing, ML training, CI/CD runners, and stateless workers can run on Spot Instances at 70–90% discount. Use Spot with a fallback to on-demand. Configure interruption handlers to drain gracefully. We moved a client's entire CI fleet to Spot and saved $3,200/month.</p>

      <h2>S3 storage classes</h2>
      <p>S3 Standard is priced for frequently accessed data. Most data isn't frequently accessed. Use S3 Intelligent-Tiering for unpredictable access patterns — it automatically moves objects between tiers. Set lifecycle rules to move objects to S3 Glacier after 90 days. We found 4TB of build artifacts sitting in S3 Standard, costing $96/month. Moved to Glacier: $4/month.</p>

      <h2>Delete unused resources</h2>
      <p>Every account has them: unattached EBS volumes ($0.10/GB/month), idle load balancers ($16/month each), stopped EC2 instances still paying for EBS, old AMI snapshots accumulating. Run AWS Trusted Advisor or Cloud Custodian to find and delete them. We typically find $500–$2,000/month in zombie resources on accounts over 2 years old.</p>

      <h2>RDS optimisation</h2>
      <p>RDS Multi-AZ is often enabled in non-production environments where it's not needed. Turn it off in dev and staging. Enable Aurora auto-scaling to scale storage and read replicas based on actual load. Consider Aurora Serverless v2 for variable workloads — you pay per ACU-second, not for provisioned capacity that sits idle.</p>

      <h2>Data transfer costs</h2>
      <p>Data transfer is a hidden cost that compounds fast. Traffic between availability zones costs $0.01/GB each way. Use VPC endpoints for S3 and DynamoDB to avoid NAT gateway transfer costs. Enable CloudFront for static assets — egress from CloudFront is cheaper than from S3 or EC2 directly.</p>

      <h2>Set budgets and alerts</h2>
      <p>AWS Budgets alert you before you overspend, not after. Set alerts at 80% and 100% of your monthly budget. Set anomaly detection alerts for unexpected cost spikes. Make cost a team metric — show the monthly bill at engineering all-hands.</p>
    `,
  },
  {
    slug: "jwt-security-common-mistakes",
    title: "JWT Security: 8 Common Mistakes That Get Applications Breached",
    excerpt:
      "JWTs are widely used and widely misunderstood. These 8 implementation mistakes have caused real-world breaches — here's how to identify and fix them in your application.",
    category: "Security",
    tags: ["JWT", "Security", "Authentication", "API", "Node.js"],
    date: "2025-01-18",
    readTime: 7,
    author: { name: "Dev Team", role: "Engineering", initials: "DT", color: "#ef4444" },
    coverGradient: "linear-gradient(135deg, #0f0000 0%, #991b1b 100%)",
    accent: "#991b1b",
    body: `
      <p>JWTs are deceptively simple. Three base64-encoded sections, a signature, done. But the implementation details matter enormously — mistakes here have led to authentication bypasses in production applications.</p>

      <h2>1. Using HS256 with weak secrets</h2>
      <p>HMAC-SHA256 (HS256) is only as strong as your secret key. A 16-character secret can be brute-forced offline given a valid token. Use a secret of at least 256 bits (32 random bytes) generated by a cryptographically secure random number generator. Or better: switch to RS256/ES256 with asymmetric keys — the private key signs, the public key verifies.</p>

      <h2>2. Storing JWTs in localStorage</h2>
      <p>localStorage is accessible to any JavaScript on the page. A single XSS vulnerability on your domain gives an attacker your users' tokens. Store access tokens in memory (a JavaScript variable) and refresh tokens in httpOnly, SameSite=Strict cookies. httpOnly cookies are inaccessible to JavaScript by design.</p>

      <h2>3. Long expiry times</h2>
      <p>A JWT with a 30-day expiry that gets stolen is valid for 30 days. Use 15-minute access tokens with refresh token rotation. When a refresh token is used, immediately invalidate it and issue a new one. Detect refresh token reuse — if a rotated token is presented, it indicates a token theft, and all sessions for that user should be invalidated.</p>

      <h2>4. Not validating the algorithm</h2>
      <p>The classic "alg:none" attack. Some JWT libraries historically accepted tokens with the algorithm set to "none" — no signature required. Always explicitly specify the expected algorithm when verifying. Never accept the algorithm from the token header itself without validation.</p>

      <h2>5. Ignoring token revocation</h2>
      <p>JWTs are stateless by design, which makes revocation hard. But "hard" doesn't mean "skip it." For sensitive operations (password change, account deletion, suspicious activity), maintain a short-lived revocation list in Redis. Check the list on every request. The performance overhead is negligible.</p>

      <h2>6. Missing audience and issuer validation</h2>
      <p>Validate the <code>aud</code> (audience) and <code>iss</code> (issuer) claims on every token. A token issued by your staging environment should not be valid in production. A token issued for your mobile app should not grant access to your admin API.</p>

      <h2>7. Sensitive data in the payload</h2>
      <p>JWT payloads are base64-encoded, not encrypted. Anyone with the token can decode the payload. Never include passwords, credit card numbers, SSNs, or other sensitive data in a JWT payload. Include only the minimum necessary claims: user ID, roles, expiry.</p>

      <h2>8. No key rotation</h2>
      <p>If your signing key is compromised, all issued tokens are compromised. Implement key rotation: publish a JWKS (JSON Web Key Set) endpoint with multiple active keys. Sign new tokens with the current key. Accept tokens signed with any active key. Retire old keys after their longest-lived tokens expire.</p>
    `,
  },
  {
    slug: "microservices-vs-monolith-honest-guide",
    title: "Microservices vs Monolith: The Honest Guide Nobody Writes",
    excerpt:
      "Microservices are oversold. Monoliths are under-defended. Here's an evidence-based framework for choosing architecture based on your actual team size, traffic, and domain complexity.",
    category: "Engineering",
    tags: ["Microservices", "Architecture", "Monolith", "System Design"],
    date: "2025-01-05",
    readTime: 9,
    author: { name: "Arqam Malik", role: "Founder & CTO", initials: "AM", color: "#06c8e8" },
    coverGradient: "linear-gradient(135deg, #000d1a 0%, #1d4ed8 100%)",
    accent: "#1d4ed8",
    body: `
      <p>The microservices hype peaked around 2018–2020. Since then, a quiet counter-movement has emerged: companies like Shopify, Stack Overflow, and Basecamp have publicly credited their monoliths for their engineering efficiency. Here's the honest picture.</p>

      <h2>Start with a monolith</h2>
      <p>Almost every successful microservices architecture started as a monolith. The reason is fundamental: you can't draw the right service boundaries until you understand the domain. And you can't understand the domain until you've built the product and seen how it evolves. Premature decomposition creates wrong boundaries that are expensive to fix.</p>
      <p>A well-structured monolith with clear module boundaries is easy to extract services from when the time comes. A poorly-structured monolith is a distributed monolith waiting to happen.</p>

      <h2>The real cost of microservices</h2>
      <p>Microservices solve real problems at scale: independent deployability, technology diversity, team autonomy, fault isolation. But they introduce an enormous operational tax. You need: service discovery, distributed tracing, network resilience (circuit breakers, retries, timeouts), distributed transactions, a service mesh, per-service CI/CD pipelines, and a platform team to manage the infrastructure.</p>
      <p>For a team of 10 engineers, this overhead will consume 30–40% of engineering capacity. That's a tax most small teams can't afford.</p>

      <h2>When microservices are worth it</h2>
      <ul>
        <li>Teams of 50+ engineers where Conway's Law makes a monolith hard to coordinate</li>
        <li>Dramatically different scaling requirements between domains (payments vs. search)</li>
        <li>Hard compliance boundaries that require data isolation</li>
        <li>Multiple client types needing different APIs (BFF pattern)</li>
        <li>Independent release cadences across business units</li>
      </ul>

      <h2>The modular monolith middle ground</h2>
      <p>The best architecture for most teams is a modular monolith: a single deployable unit with strict internal module boundaries enforced through code structure and linting rules. Modules communicate through defined interfaces, not shared database tables. When a module needs to scale independently, extract it. You'll extract the right service at the right time.</p>

      <h2>Database per service is non-negotiable (for microservices)</h2>
      <p>The most common microservices anti-pattern: multiple services sharing a single database. This creates tight coupling through the data layer — exactly what microservices are supposed to eliminate. If you're going microservices, each service owns its data. Cross-service data access happens through APIs, not joins.</p>
    `,
  },
  {
    slug: "redis-patterns-production",
    title: "Redis in Production: 7 Patterns Beyond Simple Caching",
    excerpt:
      "Most teams use Redis as a key-value cache and stop there. Here are 7 production patterns — rate limiting, distributed locks, pub/sub, queues, and more — that Redis handles better than purpose-built tools.",
    category: "Engineering",
    tags: ["Redis", "Caching", "Performance", "Architecture", "Node.js"],
    date: "2024-11-30",
    readTime: 8,
    author: { name: "Dev Team", role: "Engineering", initials: "DT", color: "#ef4444" },
    coverGradient: "linear-gradient(135deg, #1a0000 0%, #dc2626 100%)",
    accent: "#dc2626",
    body: `
      <p>Redis is one of the most versatile tools in the modern engineering stack. Teams that use it only as a cache are leaving significant capability on the table. Here are the patterns we reach for regularly.</p>

      <h2>1. Distributed rate limiting with sliding windows</h2>
      <p>A single-server rate limiter breaks when you scale horizontally. Redis provides shared state across all instances. Use a sorted set with timestamps as scores — add the current timestamp, remove entries older than the window, count remaining entries. The Lua scripting capability makes this atomic and race-condition-free.</p>

      <h2>2. Distributed locks</h2>
      <p>For tasks that must run on exactly one node — cron jobs, payment processing, inventory updates — use Redis's Redlock algorithm. The key insight: SET with NX (only if not exists) and EX (expiry) in a single atomic operation gives you a lock that automatically expires if the holder crashes.</p>

      <h2>3. Session storage</h2>
      <p>Redis as a session store gives you: fast reads (sub-millisecond), automatic expiry (no cleanup jobs), and horizontal scalability. More importantly, it decouples session state from application instances — you can deploy new code and kill old instances without invalidating sessions.</p>

      <h2>4. Real-time leaderboards with sorted sets</h2>
      <p>Redis sorted sets maintain a ordered set with scores. <code>ZADD</code>, <code>ZRANK</code>, <code>ZRANGE</code> — adding a member, getting its rank, and getting the top N members are all O(log N) operations. Building a live leaderboard that updates in real-time across millions of users is a single sorted set command per game event.</p>

      <h2>5. Pub/Sub for real-time features</h2>
      <p>Redis pub/sub enables lightweight event-driven communication between services. Perfect for: live notifications, chat applications, real-time dashboards, and invalidating caches across multiple application instances. Not suitable for persistent messaging — events are fire-and-forget. Use Redis Streams for durable messaging.</p>

      <h2>6. Redis Streams as a lightweight queue</h2>
      <p>Redis Streams provide persistent, consumer-group-aware message queues. Unlike pub/sub, messages survive consumer restarts. Consumer groups allow multiple consumers to process the same stream in parallel without processing the same message twice. For moderate-volume job queues (thousands per second), Streams beats the overhead of Kafka significantly.</p>

      <h2>7. Probabilistic data structures</h2>
      <p>HyperLogLog for approximate unique counts (unique page views per day) with minimal memory. Bloom filters for membership testing (has this user seen this notification?) with constant memory regardless of set size. Cuckoo filters for deletable bloom filters. These solve specific problems at a fraction of the cost of exact data structures.</p>
    `,
  },
  {
    slug: "typescript-advanced-patterns-2025",
    title: "TypeScript Patterns That Make Large Codebases Maintainable",
    excerpt:
      "TypeScript's type system is more powerful than most teams use. These patterns — branded types, discriminated unions, template literal types, and inferred types — eliminate entire categories of runtime bugs.",
    category: "Engineering",
    tags: ["TypeScript", "Patterns", "Type Safety", "JavaScript"],
    date: "2024-11-10",
    readTime: 8,
    author: { name: "Dev Team", role: "Engineering", initials: "DT", color: "#38bdf8" },
    coverGradient: "linear-gradient(135deg, #00080a 0%, #0891b2 100%)",
    accent: "#0891b2",
    body: `
      <p>TypeScript is widely used but often underused. Most teams enable strict mode and add types to their functions — but stop before reaching the patterns that genuinely prevent bugs. Here's what we apply on every project.</p>

      <h2>Branded types for domain primitives</h2>
      <p>A user ID and an order ID are both strings. Without branding, TypeScript lets you pass one where the other is expected. Branded types fix this: <code>type UserId = string & { readonly __brand: 'UserId' }</code>. Now <code>getUserById(orderId)</code> is a compile error, not a runtime bug. We brand every domain ID, currency amount, and measurement unit.</p>

      <h2>Discriminated unions for state machines</h2>
      <p>Instead of an object with optional fields and a status string, model state explicitly. A payment is either <code>{ status: 'pending' }</code> or <code>{ status: 'completed', transactionId: string }</code> or <code>{ status: 'failed', error: string }</code>. TypeScript narrows the type in each branch of a switch — accessing <code>transactionId</code> on a pending payment is a compile error.</p>

      <h2>Template literal types for string contracts</h2>
      <p>Route definitions, event names, CSS class patterns — anywhere you have structured strings. <code>type Route = \`/api/$\{string}\`</code> or <code>type EventName = \`$\{'user' | 'order'}.$\{'created' | 'updated' | 'deleted'}\`</code>. Mistyped event names become compile errors instead of silent bugs.</p>

      <h2>Infer types from schemas, not the other way</h2>
      <p>Define your validation schema once (with Zod) and derive the TypeScript type from it. <code>type User = z.infer&lt;typeof UserSchema&gt;</code>. This ensures your type and your runtime validation are always in sync. There's one source of truth — the schema.</p>

      <h2>Const assertions for exhaustive handling</h2>
      <p>Use <code>const</code> assertions with union types and the <code>never</code> trick for exhaustive switch statements. If you add a new status to an enum and forget to handle it, you get a compile error — not a silent runtime gap.</p>

      <h2>Conditional types for API design</h2>
      <p>Return types that depend on input types. A fetch function that returns <code>T</code> if <code>throwOnError</code> is false and <code>T | never</code> if true. A function that returns a different shape based on which options you pass. Conditional types make function overloads type-safe without duplication.</p>
    `,
  },
  {
    slug: "web-performance-core-web-vitals-2025",
    title: "Core Web Vitals in 2025: How We Achieve Green Scores on Complex Apps",
    excerpt:
      "Google's Core Web Vitals directly impact search ranking and user retention. Here's the exact optimisation process we use to get complex, data-heavy applications into the green across all three metrics.",
    category: "Engineering",
    tags: ["Performance", "Core Web Vitals", "Next.js", "SEO", "Web"],
    date: "2024-10-28",
    readTime: 9,
    author: { name: "Dev Team", role: "Engineering", initials: "DT", color: "#4ade80" },
    coverGradient: "linear-gradient(135deg, #001a05 0%, #16a34a 100%)",
    accent: "#16a34a",
    body: `
      <p>Core Web Vitals measure real user experience: loading speed (LCP), interactivity (INP), and visual stability (CLS). Poor scores hurt both users and search ranking. Here's how we systematically improve them.</p>

      <h2>LCP — Largest Contentful Paint (target: under 2.5s)</h2>
      <p>LCP measures when the largest visible element renders. It's almost always a hero image or heading. The optimisation path is predictable: preload the LCP element with <code>&lt;link rel="preload"&gt;</code>. Serve images in WebP/AVIF format. Size images correctly — don't serve a 2000px image in a 400px container. Use <code>priority</code> prop on Next.js Image for the LCP image. Eliminate render-blocking resources that delay the LCP element.</p>
      <p>The most common LCP killer we find in audits: a hero section that imports a large JavaScript library before rendering. Move it to the client boundary, render the hero server-side.</p>

      <h2>INP — Interaction to Next Paint (target: under 200ms)</h2>
      <p>INP replaced FID as the interactivity metric. It measures the delay between user input and the next paint — across all interactions during the page lifecycle, not just the first. Long JavaScript tasks on the main thread are the primary cause. Fix: break long tasks with <code>scheduler.yield()</code>. Move heavy computation to a Web Worker. Defer non-critical JavaScript. Virtualize long lists.</p>

      <h2>CLS — Cumulative Layout Shift (target: under 0.1)</h2>
      <p>Layout shifts happen when elements move after the page loads — usually because images have no size attributes, ads inject content above existing content, or web fonts cause text reflow. Fix: always set explicit width and height on images. Reserve space for dynamic content. Use <code>font-display: optional</code> to prevent FOIT. Test with slow network throttling to catch shifts that happen during load.</p>

      <h2>The optimisation process</h2>
      <p>Measure with WebPageTest (real browser, real network) — not just Lighthouse. Identify the worst-performing pages. Profile with Chrome DevTools Performance tab. Fix the biggest bottleneck. Measure again. Repeat. Don't optimise based on assumptions — every fix should be validated with measurement.</p>

      <h2>Next.js specific wins</h2>
      <p>Enable the new Next.js Image component for automatic WebP conversion and lazy loading. Use Server Components to eliminate client-side data fetching waterfalls. Use <code>next/font</code> to self-host fonts and eliminate cross-origin font requests. Enable Partial Prerendering (PPR) in Next.js 15 for instant shell rendering.</p>
    `,
  },
  {
    slug: "database-performance-optimisation",
    title: "Database Query Optimisation: From 8 Seconds to 80 Milliseconds",
    excerpt:
      "Slow database queries are the most common performance bottleneck in web applications. Here's a systematic approach to identifying and fixing them — illustrated with real queries we optimised in production.",
    category: "Engineering",
    tags: ["Database", "PostgreSQL", "Performance", "SQL", "Optimisation"],
    date: "2024-10-12",
    readTime: 9,
    author: { name: "Dev Team", role: "Engineering", initials: "DT", color: "#34d399" },
    coverGradient: "linear-gradient(135deg, #001a12 0%, #0d9488 100%)",
    accent: "#0d9488",
    body: `
      <p>We inherited a SaaS product where the dashboard loaded in 12 seconds. The backend team insisted the queries were fine. We ran EXPLAIN ANALYZE and found a sequential scan on a 4-million-row table with no index. Three hours later, the dashboard loaded in 400ms. Here's the systematic approach.</p>

      <h2>Start with EXPLAIN ANALYZE</h2>
      <p>Never optimise without measurement. Run <code>EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON)</code> on your slow query. Look for: sequential scans on large tables (Seq Scan), high estimated vs actual row counts (stale statistics), nested loop joins on large datasets, and sort operations that spill to disk.</p>

      <h2>Index strategy</h2>
      <p>Most missing indexes are on foreign keys and filter columns in WHERE clauses. Check <code>pg_stat_user_tables</code> for tables with high <code>seq_scan</code> counts relative to <code>idx_scan</code> counts. Those are your indexing targets. Composite indexes should match your query's WHERE and ORDER BY clauses — column order matters.</p>
      <p>Partial indexes are underused. If you always filter on <code>WHERE status = 'active'</code>, a partial index on active records only is much smaller and faster than a full index. Index only what you query.</p>

      <h2>The N+1 query problem</h2>
      <p>The most common ORM-generated performance problem. You fetch 100 orders, then for each order you fetch its line items — 100 separate queries. Fix with eager loading (Prisma's <code>include</code>, Sequelize's <code>include</code>) or with a single JOIN query. Use the pg_stat_statements extension to identify queries that run thousands of times per second.</p>

      <h2>Pagination</h2>
      <p>OFFSET-based pagination degrades as page number increases — PostgreSQL must scan and discard all preceding rows. Use cursor-based pagination for large datasets: <code>WHERE id &gt; last_seen_id ORDER BY id LIMIT 20</code>. Constant time regardless of page number, and no risk of missing or duplicating rows when data changes between requests.</p>

      <h2>Connection pooling</h2>
      <p>Each PostgreSQL connection is a heavyweight process consuming ~5MB of memory. A serverless application creating a new connection per request will exhaust the connection limit and cause cascading failures. Use PgBouncer in transaction pooling mode, or Prisma Accelerate. Keep the pool size at 10–20 connections for most workloads.</p>

      <h2>Analyse and vacuum</h2>
      <p>PostgreSQL's query planner relies on table statistics. Stale statistics lead to bad query plans — the classic case is estimating 1 row when the actual result is 100,000. Run <code>ANALYZE</code> after large data loads. Monitor for table bloat (dead tuples from updates and deletes) and ensure autovacuum is running effectively.</p>
    `,
  },
  {
    slug: "kubernetes-security-hardening",
    title: "Kubernetes Security Hardening: 10 Controls Every Cluster Needs",
    excerpt:
      "Default Kubernetes configurations are optimised for developer convenience, not security. Here are the 10 security controls we implement on every production cluster before going live.",
    category: "Security",
    tags: ["Kubernetes", "Security", "DevSecOps", "Containers", "K8s"],
    date: "2024-09-28",
    readTime: 10,
    author: { name: "Dev Team", role: "Engineering", initials: "DT", color: "#f87171" },
    coverGradient: "linear-gradient(135deg, #110005 0%, #be123c 100%)",
    accent: "#be123c",
    body: `
      <p>A default Kubernetes cluster is not secure. Pods can communicate freely, containers run as root, and the API server may be accessible from the internet. Here's what we harden before any production cluster serves traffic.</p>

      <h2>1. RBAC — least privilege, always</h2>
      <p>Define the minimum necessary permissions for every service account. Never use cluster-admin for application workloads. Regularly audit RBAC bindings with <code>kubectl auth can-i --list</code> and tools like Rakkess. Remove unused service accounts. Disable the default service account token auto-mounting on pods that don't need API server access.</p>

      <h2>2. Network Policies — default deny</h2>
      <p>Install a CNI that supports NetworkPolicy (Calico, Cilium, or Weave). Apply a default-deny-all policy to every namespace, then explicitly allow the traffic that needs to flow. Pods that can't talk to each other can't be used for lateral movement after a compromise.</p>

      <h2>3. Pod Security Standards</h2>
      <p>Kubernetes 1.25+ includes Pod Security Admission as a built-in control. Apply the <code>restricted</code> profile to all production namespaces — this enforces: no privileged containers, no root, read-only root filesystem, dropped capabilities, no host network/PID/IPC access. Use <code>baseline</code> for system namespaces that need slightly more permissions.</p>

      <h2>4. Secret management</h2>
      <p>Kubernetes Secrets are base64-encoded, not encrypted, by default. Enable etcd encryption at rest. Better: use the External Secrets Operator to sync secrets from AWS Secrets Manager, HashiCorp Vault, or GCP Secret Manager. Secrets never touch etcd in plaintext. Rotate secrets without redeploying applications.</p>

      <h2>5. Image security</h2>
      <p>Use an admission controller (Kyverno or OPA Gatekeeper) to enforce image policies: images must come from your private registry, images must have a non-latest tag, images must pass vulnerability scanning before admission. Implement Cosign image signing and verify signatures at admission time.</p>

      <h2>6. API server access control</h2>
      <p>The Kubernetes API server should not be publicly accessible. Use a private endpoint for EKS/GKE/AKS. Access it through a bastion or VPN. Enable audit logging to CloudWatch or a SIEM. Alert on: anonymous requests, exec/port-forward to production pods, secret reads, RBAC changes.</p>

      <h2>7. Runtime security</h2>
      <p>Deploy Falco for runtime anomaly detection. Falco watches system calls and alerts on suspicious behaviour: a container spawning a shell, reading files it shouldn't, making outbound network connections to unexpected destinations. It catches attacks that admission controls miss because they happen at runtime.</p>

      <h2>8. Cluster version and node updates</h2>
      <p>Run nodes within 1–2 versions of the latest Kubernetes release. Enable automatic node group updates in managed Kubernetes services. Old Kubernetes versions have known CVEs that attackers actively exploit. Treat cluster version as a security patch, not just a feature upgrade.</p>

      <h2>9. Limit container resources</h2>
      <p>Every container must have resource requests and limits defined. Without limits, a compromised container can consume all node resources (CPU, memory, disk) and affect other workloads — a form of denial of service from within the cluster. Use LimitRange objects to enforce defaults at the namespace level.</p>

      <h2>10. Regular penetration testing</h2>
      <p>Run kube-bench against CIS Kubernetes Benchmark. Run Kubescape for compliance checking. Conduct annual penetration tests focused on the cluster. Attack your own cluster with controlled tools like kube-hunter to discover vulnerabilities before attackers do.</p>
    `,
  },
  {
    slug: "sre-practices-for-startups",
    title: "SRE Practices for Startups: What to Adopt Before You Need Them",
    excerpt:
      "Site Reliability Engineering was invented at Google for Google-scale problems. But the core practices — SLOs, error budgets, blameless postmortems — apply at any scale. Here's what to adopt early.",
    category: "DevOps",
    tags: ["SRE", "Reliability", "Incident Response", "SLO", "DevOps"],
    date: "2024-09-10",
    readTime: 8,
    author: { name: "Arqam Malik", role: "Founder & CTO", initials: "AM", color: "#06c8e8" },
    coverGradient: "linear-gradient(135deg, #000a1a 0%, #2563eb 100%)",
    accent: "#2563eb",
    body: `
      <p>SRE is often dismissed as "Google-scale thinking" irrelevant to startups. That's wrong. The practices themselves are universally applicable — you just apply them proportionally to your scale and team size.</p>

      <h2>Start with SLOs</h2>
      <p>A Service Level Objective is a reliability target: "99.9% of homepage requests complete in under 2 seconds." It seems simple — but defining it forces important conversations. What does "available" mean for your service? What do users actually notice? What can you realistically achieve with your current infrastructure?</p>
      <p>Start with three SLOs: availability, latency at p95, and error rate. Track them in Grafana. Review them monthly. Adjust when you learn something new.</p>

      <h2>Error budgets make the trade-off explicit</h2>
      <p>A 99.9% availability SLO gives you 43 minutes of downtime per month as your error budget. When you're shipping features, you're spending error budget. When you're working on reliability, you're restoring it. The error budget makes the engineering trade-off between velocity and reliability visible and negotiable.</p>
      <p>When you've burned your error budget for the month, stop shipping new features and fix reliability. When you have budget to spare, ship faster. This is much healthier than the "we need more uptime" vs "we need more features" argument that never resolves.</p>

      <h2>Blameless postmortems</h2>
      <p>When something breaks, write a postmortem within 48 hours. Describe the timeline. Identify contributing factors (plural — incidents always have multiple causes). Define action items with owners and deadlines. Publish it internally. Never name individuals as causes — the system allowed the error to happen, and the system needs to be fixed.</p>
      <p>Psychological safety around incidents determines whether your team surfaces problems early or hides them. Blame creates the latter.</p>

      <h2>On-call runbooks</h2>
      <p>Every alert that fires should have a runbook — a step-by-step guide for the on-call engineer to diagnose and resolve the issue. "High error rate" should link to: check the logs, check these dashboard panels, try these commands, escalate if X. Runbooks reduce mean time to resolution dramatically, especially for engineers new to on-call.</p>

      <h2>Toil reduction</h2>
      <p>Toil is manual, repetitive work that scales with traffic but provides no lasting value. Provisioning servers manually, rotating logs, manually approving deploys. SRE practice says: if a task is toil, automate it or eliminate it. Track toil as a percentage of engineering time. Keep it under 50%. Every hour spent on toil is an hour not spent on the reliability improvements that reduce future toil.</p>
    `,
  },
  {
    slug: "event-driven-architecture-patterns",
    title: "Event-Driven Architecture: Patterns, Trade-offs, and When Not to Use It",
    excerpt:
      "Event-driven architecture decouples services and enables async workflows — but it adds significant complexity. Here's when to reach for it, which patterns work, and the pitfalls that will hurt you.",
    category: "Engineering",
    tags: ["Event-Driven", "Architecture", "Kafka", "RabbitMQ", "Async"],
    date: "2024-08-25",
    readTime: 10,
    author: { name: "Dev Team", role: "Engineering", initials: "DT", color: "#c084fc" },
    coverGradient: "linear-gradient(135deg, #0a001a 0%, #9333ea 100%)",
    accent: "#9333ea",
    body: `
      <p>Event-driven architecture is one of the most powerful patterns in distributed systems — and one of the most commonly over-applied. Here's the honest picture.</p>

      <h2>When event-driven makes sense</h2>
      <p>Use events when you need temporal decoupling (the producer doesn't need to wait for consumers), fan-out (one event triggers multiple independent reactions), audit trail (every state change is recorded as an immutable event), or resilience (consumers can process events when they recover from downtime).</p>
      <p>Don't use events when you need synchronous responses, strong consistency, or simple request/response workflows. Adding a message broker to a simple CRUD API adds complexity without benefit.</p>

      <h2>The event schema problem</h2>
      <p>Events are API contracts. Once published, consumers depend on their shape. Changing an event schema breaks consumers — potentially silently. Manage event schemas with a schema registry (Confluent Schema Registry, AWS Glue Schema Registry). Enforce backward compatibility. Version your event types. Treat events as public API.</p>

      <h2>Idempotency is mandatory</h2>
      <p>Message brokers guarantee at-least-once delivery. Your consumers will receive the same event multiple times — guaranteed. Design all event handlers to be idempotent: processing the same event twice produces the same result as processing it once. Use idempotency keys, database upserts, and deduplication windows.</p>

      <h2>Saga pattern for distributed transactions</h2>
      <p>Multi-service workflows that span multiple databases need the Saga pattern. A saga is a sequence of local transactions, each publishing an event that triggers the next step. If any step fails, compensating transactions undo the previous steps. Choreography-based sagas (events trigger events) are simpler but harder to debug. Orchestration-based sagas (a coordinator drives the workflow) are more explicit and testable.</p>

      <h2>Event sourcing — powerful but heavy</h2>
      <p>Event sourcing stores the full history of events as the primary source of truth, not the current state. You can replay events to rebuild state, audit everything, and create temporal queries. But it adds significant complexity: event versioning, projections, replay performance. Use it only when the audit and temporal query requirements genuinely need it.</p>

      <h2>Kafka vs RabbitMQ vs SQS</h2>
      <p>Kafka for high-throughput, persistent event streams and event sourcing. RabbitMQ for complex routing, competing consumers, and lower throughput. SQS for AWS-native simplicity with managed infrastructure. The choice matters less than most teams think — pick the one your team knows how to operate.</p>
    `,
  },
  {
    slug: "supply-chain-security-software",
    title: "Software Supply Chain Security: Protecting Your Build Pipeline",
    excerpt:
      "The SolarWinds and XZ Utils attacks proved that the build pipeline is the attack surface most teams ignore. Here's how to secure yours against dependency confusion, malicious packages, and CI/CD attacks.",
    category: "Security",
    tags: ["Supply Chain", "Security", "SBOM", "CI/CD", "DevSecOps"],
    date: "2024-08-10",
    readTime: 8,
    author: { name: "Dev Team", role: "Engineering", initials: "DT", color: "#f59e0b" },
    coverGradient: "linear-gradient(135deg, #0f0a00 0%, #b45309 100%)",
    accent: "#b45309",
    body: `
      <p>The XZ Utils backdoor in 2024 demonstrated how a sophisticated attacker can compromise a widely-used open source library through a long-term social engineering campaign. Your application depends on hundreds of packages — each one is a potential attack vector.</p>

      <h2>Know what you're running</h2>
      <p>Generate a Software Bill of Materials (SBOM) for every build. An SBOM lists every dependency, transitive dependency, their versions, and known vulnerabilities. Tools like Syft (for containers) and CycloneDX generate SBOMs automatically. Attach the SBOM to your release artifacts. Use Grype to scan SBOMs for known CVEs.</p>

      <h2>Dependency pinning and verification</h2>
      <p>Use lockfiles (<code>package-lock.json</code>, <code>yarn.lock</code>, <code>Cargo.lock</code>) and never ignore them. Pin to exact versions in production. Enable <code>npm ci</code> instead of <code>npm install</code> in CI — it installs exactly what's in the lockfile. Verify package integrity with checksums. Use <code>--ignore-scripts</code> where possible to prevent postinstall scripts from running arbitrary code.</p>

      <h2>Dependency confusion attacks</h2>
      <p>An attacker publishes a public npm package with the same name as your private internal package — at a higher version number. npm's resolution prefers the higher public version. Mitigation: use scoped packages for all internal packages (<code>@yourorg/internal-lib</code>). Configure your package manager to always use your private registry for your scope. Verify all published package names.</p>

      <h2>Secure your CI/CD pipeline</h2>
      <p>Your CI pipeline has elevated access to secrets, deployment environments, and code repositories. Treat it as a privileged target. Use short-lived OIDC credentials instead of long-lived API keys. Limit each pipeline job's permissions to the minimum needed. Pin GitHub Actions to a specific commit SHA, not a branch or tag (<code>actions/checkout@a81bbbf8</code>, not <code>actions/checkout@v4</code>). Audit and review third-party Actions before use.</p>

      <h2>Code signing</h2>
      <p>Sign your build artifacts with Sigstore's Cosign. Anyone consuming your artifacts can verify they were produced by your pipeline and haven't been tampered with. Configure your Kubernetes admission controller to reject unsigned images. This closes the gap between "built by our pipeline" and "deployed to production."</p>

      <h2>Automated dependency updates</h2>
      <p>Enable Dependabot or Renovate for automated dependency updates. Outdated dependencies with known CVEs are the most common supply chain vulnerability — and the most preventable. Configure auto-merge for patch updates with passing tests. Review minor and major updates manually. Never let dependencies go stale.</p>
    `,
  },
  {
    slug: "serverless-vs-containers-2025",
    title: "Serverless vs Containers in 2025: A Cost and Complexity Comparison",
    excerpt:
      "The serverless vs containers debate has matured. Both are production-ready, both have legitimate use cases, and the decision tree is clearer than ever. Here's our current recommendation.",
    category: "DevOps",
    tags: ["Serverless", "Lambda", "Containers", "AWS", "Architecture"],
    date: "2024-07-22",
    readTime: 7,
    author: { name: "Dev Team", role: "Engineering", initials: "DT", color: "#38bdf8" },
    coverGradient: "linear-gradient(135deg, #00050f 0%, #1e40af 100%)",
    accent: "#1e40af",
    body: `
      <p>Five years ago this was a heated debate. Today, the decision framework is clearer and the choice often comes down to workload characteristics rather than ideology.</p>

      <h2>When serverless wins</h2>
      <p>Lambda and similar serverless platforms are unbeatable for: event-driven workloads with unpredictable traffic (webhooks, async processors), scheduled tasks, functions that run seconds to minutes per invocation, and teams without platform engineering capacity. You pay per invocation, not per idle capacity. For spiky or low-volume workloads, serverless is dramatically cheaper.</p>
      <p>The cold start problem has been significantly mitigated. Lambda SnapStart for Java, provisioned concurrency for latency-sensitive functions, and the general improvement in AWS infrastructure have made cold starts a manageable concern rather than a deal-breaker.</p>

      <h2>When containers win</h2>
      <p>Long-running connections (WebSockets, SSE, gRPC streaming), workloads that exceed Lambda's 15-minute timeout, applications requiring specific runtime environments or custom binaries, and high-throughput APIs where per-request pricing exceeds flat container pricing — all belong on containers. Container-based architectures also offer better local development parity.</p>

      <h2>The hybrid approach</h2>
      <p>Most production architectures are hybrid: a containerised API for synchronous requests, Lambda for async event processing, and Lambda@Edge or Cloudflare Workers for latency-sensitive edge logic. The platforms are complementary, not competing.</p>

      <h2>Cost comparison at scale</h2>
      <p>At low traffic: Lambda is almost always cheaper (pay per request, no idle cost). At medium traffic: roughly equivalent — the crossover point is typically around 5–10 million requests per month. At high traffic: containers win — a flat EC2/Fargate cost is much lower than per-request Lambda pricing at millions of daily requests.</p>

      <h2>Developer experience</h2>
      <p>Containers win on developer experience. Local development with Docker Compose mirrors production. Debugging is straightforward. Logs are synchronous and structured. Lambda's local development tooling (SAM, LocalStack) has improved but still introduces friction that containers don't have.</p>
    `,
  },
  {
    slug: "hiring-senior-engineers-remotely",
    title: "How We Hire Senior Engineers Remotely: Our Exact Process",
    excerpt:
      "Hiring senior engineers remotely at AlgoCrew. Our 4-step process — async challenge, architecture interview, paid trial — and how we maintain a senior-only bar across 8+ countries.",
    category: "Engineering Culture",
    tags: ["Hiring", "Remote", "Senior Engineers", "Culture", "Process"],
    date: "2024-07-05",
    readTime: 6,
    author: { name: "Arqam Malik", role: "Founder & CTO", initials: "AM", color: "#06c8e8" },
    coverGradient: "linear-gradient(135deg, #000a10 0%, #0e7490 100%)",
    accent: "#0e7490",
    body: `
      <p>We've hired 40+ engineers across 8 countries without a single in-person interview. Here's our exact process and why each step exists.</p>

      <h2>Step 1: Application (async)</h2>
      <p>We ask for three things: CV, a link to the best thing you've shipped (with a paragraph on your specific contribution), and the answer to one technical question relevant to the role. We get 200+ applications per opening. The technical question filters for people who can think in writing — a critical skill for async remote work.</p>
      <p>We reject anything with a generic cover letter. Senior engineers have opinions and specific experience. Genericism suggests neither.</p>

      <h2>Step 2: Async technical challenge (48–72 hours)</h2>
      <p>Not a timed whiteboard — a take-home challenge in the candidate's own environment, with their own tools, over 48–72 hours. The task is small and realistic: design a data model for X, implement Y with tests, diagnose this performance problem. Senior engineers should produce excellent work given reasonable time. Timed challenges measure anxiety tolerance, not engineering skill.</p>
      <p>We review the code for: correctness, edge case handling, code clarity, test quality, and the accompanying explanation document. The document often tells us more than the code.</p>

      <h2>Step 3: Technical interview (60 minutes)</h2>
      <p>We discuss the challenge in depth. Why did you make this design decision? What would you change with more time? Then a system design conversation: design a rate limiter, design a URL shortener, design a notification system. We're looking for depth of thinking, not textbook answers. We want to hear "it depends, and here's what it depends on."</p>

      <h2>Step 4: Paid trial sprint (1 week)</h2>
      <p>One week on a real project, with a real team, fully compensated. This is the most important step. Skills that don't show up in interviews show up in a week of work: how someone handles ambiguity, how they communicate blockers, how they review others' code, whether they ask three sharp questions or thirty vague ones. The trial has a 15% rejection rate — real feedback from real work.</p>

      <h2>The bar</h2>
      <p>Our rule: would this person make our team measurably better? Not "good enough" — measurably better. Senior engineers should raise the level of everyone around them. If they wouldn't, it's a no.</p>
    `,
  },
  {
    slug: "graphql-vs-rest-2025",
    title: "GraphQL vs REST in 2025: When Each Actually Makes Sense",
    excerpt:
      "The GraphQL vs REST debate has produced more heat than light. Here's a practical framework — based on shipping both in production — for choosing the right API style for your use case.",
    category: "Engineering",
    tags: ["GraphQL", "REST", "API", "Architecture", "Backend"],
    date: "2024-06-18",
    readTime: 7,
    author: { name: "Dev Team", role: "Engineering", initials: "DT", color: "#f472b6" },
    coverGradient: "linear-gradient(135deg, #14001a 0%, #be185d 100%)",
    accent: "#be185d",
    body: `
      <p>We've shipped production systems with both REST and GraphQL. The choice matters less than the implementation quality, but the right choice for your context does matter. Here's the framework.</p>

      <h2>REST is the right default</h2>
      <p>REST is simple, well-understood, cacheable by default, and has excellent tooling across every language and platform. HTTP caching (CDN, browser, proxy) works out of the box. OpenAPI/Swagger gives you documentation and SDK generation. Every engineer on your team knows how to work with it.</p>
      <p>For most APIs — internal service-to-service, public third-party APIs, mobile backends with stable data requirements — REST is the right choice. Choose REST unless you have a specific problem that GraphQL solves better.</p>

      <h2>When GraphQL solves real problems</h2>
      <p><strong>Complex, variable data requirements:</strong> When different clients (web, iOS, Android, third-party) need different shapes of the same data, and maintaining multiple REST endpoints or query parameters is becoming unwieldy.</p>
      <p><strong>Rapid frontend iteration:</strong> When the frontend team is moving faster than the backend team can add endpoints. GraphQL lets frontend engineers fetch exactly the data they need without waiting for a new endpoint.</p>
      <p><strong>Aggregation layer:</strong> A GraphQL API as a BFF (Backend for Frontend) that aggregates multiple REST microservices into a single query interface. This is one of GraphQL's strongest use cases.</p>

      <h2>GraphQL trade-offs that hurt</h2>
      <p><strong>Caching:</strong> REST gets HTTP caching for free. GraphQL sends everything as POST to a single endpoint — no CDN caching without additional tooling (persisted queries, Apollo CDN). N+1 queries from nested resolvers require DataLoader. These are solvable problems, but they require explicit effort.</p>
      <p><strong>Security:</strong> GraphQL's flexibility is also its attack surface. Depth limiting, complexity limits, and field-level authorisation require explicit implementation. A naive GraphQL server is trivially DoS'd with deeply nested queries.</p>

      <h2>The hybrid answer</h2>
      <p>Many production systems use REST for simple CRUD and data-retrieval endpoints, and GraphQL for complex, multi-entity queries. There's no rule that says you must pick one. Use the right tool for the specific use case.</p>
    `,
  },
];

blogPosts.push(...extraPosts);

export const categories = ["All", ...Array.from(new Set(blogPosts.map(p => p.category)))];

export function getPost(slug: string) {
  return blogPosts.find(p => p.slug === slug) ?? null;
}

export function getRelated(slug: string, limit = 3) {
  const post = getPost(slug);
  if (!post) return [];
  return blogPosts
    .filter(p => p.slug !== slug && p.category === post.category)
    .slice(0, limit);
}
