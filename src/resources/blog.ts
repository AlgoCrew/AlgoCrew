import { isListedPost } from "./routeMigration";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  /** SEO <title> (~55-60 chars). Falls back to `title` when omitted. */
  metaTitle?: string;
  /** SEO meta description (~150 chars). Falls back to `excerpt` when omitted. */
  metaDescription?: string;
  /** ISO date of last meaningful content update. Falls back to `date`. */
  updated?: string;
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
      "Most agencies hide juniors behind senior faces. We don't hire juniors at all, here's the compounding effect that creates on delivery speed, code quality, and client trust.",
    metaTitle: "Why Senior-Only Teams Ship Faster",
    metaDescription: "Senior-only engineering teams cut review overhead, rework, and ramp-up time. See the compounding effect on delivery speed, code quality, and cost.",
    updated: "2026-06-16",
    category: "Engineering Culture",
    tags: ["Team", "Hiring", "Senior Engineers", "Delivery"],
    date: "2025-05-12",
    readTime: 7,
    featured: true,
    author: { name: "AlgoCrew engineering", role: "Cloud, DevOps and security team", initials: "AC", color: "#06c8e8" },
    coverGradient: "linear-gradient(135deg, #0a1628 0%, #06c8e8 100%)",
    accent: "#06c8e8",
    body: `
      <p>When we founded AlgoCrew, we made one rule we have never broken: we do not hire junior engineers. Every person who touches client code has at least five years of production experience. People warned us this would make us too expensive and impossible to scale. Several years and dozens of shipped products later, the opposite has proven true. Senior-only teams are not a premium indulgence. They are the most reliable way we know to ship complex software quickly and keep it maintainable.</p>

      <h2>The hidden cost of mixed teams</h2>
      <p>A typical agency staffs one senior engineer for every three or four juniors. On paper the blended rate looks attractive. What the invoice never shows is the tax that structure quietly charges. The senior spends their week reviewing pull requests, unblocking people, re-explaining architecture decisions, and rewriting work that did not quite land. Our own time tracking puts that overhead at roughly 40 to 60 percent of a senior's week on a mixed team. You end up paying senior rates for junior output, twice.</p>
      <p>On a senior-only team that overhead nearly disappears. Everyone can take a ticket from problem statement to deployed feature without supervision. Nobody needs hand-holding on whether to introduce a queue or a cron job. Pull requests get reviewed by peers in hours, not parked for days while the one qualified reviewer clears their backlog.</p>

      <h2>Senior engineers write less code, not more</h2>
      <p>The biggest misconception about senior engineers is that they are simply faster typists. The real difference is restraint. A senior reaches for the boring, proven solution instead of the framework that trended last month. They delete code as readily as they add it. They see the edge case, the null state, and the failure mode on the first pass instead of discovering them in production three weeks later.</p>
      <blockquote>The best code is the code you never had to write twice.</blockquote>
      <p>That restraint compounds. Clean architecture makes the next feature cheaper to build rather than more expensive. Clients who come to us after a mixed-model engagement are often surprised that their new codebase is actually readable. That should not be a differentiator, but it is, and it is a direct result of who is writing the code.</p>

      <h2>The 48-hour first commit</h2>
      <p>We commit working code within 48 hours of kickoff. That is only possible because there is no ramp-up week. A senior engineer reads the codebase, asks three sharp questions, and ships something real on day two. New work does not stall behind onboarding sessions or a junior slowly building context. This is the same discipline that powers our MVP development service, where the gap between a signed contract and a deployed prototype is measured in days, not sprints.</p>

      <h2>What this looks like on a real project</h2>
      <p>When we rebuilt the cloud infrastructure behind a global designer marketplace, the entire engagement ran with a small senior team. There was no layer of juniors translating requirements into half-finished tickets. The engineers who designed the high-availability architecture were the same engineers who wrote it, tested it, and put it into production. The result was 99.99 percent uptime and zero post-launch downtime incidents, outcomes that are hard to reach when ownership is fragmented across experience levels.</p>

      <h2>Quality control when everyone is senior</h2>
      <p>People assume juniors exist to absorb the unglamorous work: writing tests, fixing flaky pipelines, triaging bugs. On our teams that work does not vanish, it gets automated or owned. Senior engineers write tests as they build because they have been burned by skipping them. They invest a day in continuous integration so the pipeline catches regressions instead of a person catching them in review. The unglamorous work still happens. It just happens once and stays fixed, rather than being delegated, done poorly, and revisited.</p>

      <h2>How senior-only changes the economics</h2>
      <p>Clients often assume a senior-only team must cost more. Per hour, yes. Per shipped feature, almost never. When a senior solves in two hours what a junior would take a day to attempt and a senior would then have to fix, the cheaper line item produces the more expensive outcome. This is also why we refuse to bill by the hour at all. Our milestone billing model ties every invoice to a delivered, verifiable result, so speed works in your favour instead of ours.</p>

      <h2>The trade-offs we accept</h2>
      <p>Senior-only is not free of downsides, and it would be dishonest to pretend otherwise. We hire slowly because the bar is high, which means we cannot spin up a 30-person team overnight. We say no to engagements where the work is genuinely junior in nature and a senior would be bored and overpriced. And we invest heavily in written documentation and an async-first culture so that a lean team is never a single point of failure. These are deliberate constraints, and they are the price of the speed and quality our clients actually hire us for.</p>

      <h2>The one question to ask any agency</h2>
      <p>If you are evaluating engineering partners, ask them a single question: what is the ratio of senior to junior engineers who will touch my project, and who specifically will review the code? If the answer is vague, or if it turns out the polished people in the sales call are not the people writing your software, you have learned what you need to know.</p>
      <p>Senior-only is not about prestige. It is the only structure we have found that delivers predictable, fast, high-quality software on the kind of complex products where technical debt compounds fastest. If that is the kind of work you need done, <a href="/contact">tell us about your project</a>.</p>
    `,
  },
  {
    slug: "async-first-engineering-culture",
    title: "Async-First Engineering: How We Work Across 8 Time Zones Without Meetings",
    excerpt:
      "Daily standups are a 1970s management invention. We run an async-first engineering culture across 8 countries, and ship faster because of it.",
    metaTitle: "Async-First Engineering Across Time Zones",
    metaDescription: "How we run an async-first engineering culture across 8 time zones with almost no meetings, and ship production software every single week.",
    updated: "2026-06-16",
    category: "Engineering Culture",
    tags: ["Async", "Remote", "Culture", "Productivity"],
    date: "2025-04-28",
    readTime: 6,
    author: { name: "AlgoCrew engineering", role: "Cloud, DevOps and security team", initials: "AC", color: "#06c8e8" },
    coverGradient: "linear-gradient(135deg, #0d0d1a 0%, #2563eb 100%)",
    accent: "#2563eb",
    body: `
      <p>We have engineers in Canada, Pakistan, Ukraine, Nigeria, Brazil, India, the Philippines, and Germany. Our timezone spread is thirteen hours. We ship every week, and we do it with two recurring meetings on the entire calendar. This is not an accident or a perk. Async-first is a deliberate operating system, and it is one of the main reasons a small senior-only team can outpace agencies several times our size.</p>

      <h2>The meeting tax</h2>
      <p>Every sixty-minute meeting with five people costs five engineer-hours. That is half a day of productive output gone before anyone writes a line of code. Multiply that across daily standups, weekly syncs, planning sessions, and the endless ad-hoc calls that fill a calendar, and most teams that call themselves agile are spending 20 to 30 percent of their working hours talking about work instead of doing it.</p>
      <p>Async-first does not mean no communication. It means defaulting to written, recorded, and permanent communication over synchronous calls. It means trusting engineers to manage their own time and judging them on what they ship, not on whether they were visibly online at 9am in a timezone that has nothing to do with the work.</p>

      <h2>Written by default</h2>
      <p>The core habit is simple: if something matters, write it down where the next person can find it. A decision made in a call that is not written down did not really happen, because in two weeks nobody will remember the reasoning and someone will relitigate it. A decision captured in a document compounds. It onboards the next engineer, settles the next debate, and survives the people who made it.</p>
      <p>This discipline is what lets us promise a first commit within 48 hours of kickoff. There is no tribal knowledge locked in someone's head and no meeting required to unlock it. The context lives in the repository and the spec, where any senior engineer can absorb it and start shipping.</p>

      <h2>Our stack</h2>
      <p><strong>Notion</strong> holds a living spec for every project. Not a PDF that is out of date by Tuesday, but a real document that engineers update as they discover things.</p>
      <p><strong>Linear</strong> holds all tasks, priorities, and status in one place, so nobody has to send a Slack message asking what the status of something is.</p>
      <p><strong>Loom</strong> covers anything that takes twenty minutes to write but three minutes to show: pull request walkthroughs, bug reproductions, and architecture reviews.</p>
      <p><strong>GitHub</strong> treats pull request descriptions as first-class documents. Every PR carries a summary, screenshots, test coverage, and a deployment checklist, so review can happen whenever the reviewer is awake.</p>

      <h2>The rule we live by</h2>
      <p>If a question can be answered by reading existing documentation, it should not be asked in chat. If it cannot, that is a documentation gap, not a meeting opportunity. Write the answer down and improve the docs so the question never has to be asked again. Over months this turns a project into a system that explains itself, which is exactly what you want when your team spans thirteen hours of daylight.</p>

      <h2>When we do meet</h2>
      <p>We keep exactly two recurring meetings. The first is a weekly thirty-minute demo with the client, recorded so anyone who could not attend can watch it later. The second is a fortnightly retrospective. Everything else is asynchronous. When a real-time conversation is genuinely the fastest path, we have it, record it, and transcribe it automatically so the outcome rejoins the written record.</p>

      <h2>Why clients feel the difference</h2>
      <p>For a client, async-first shows up as a progress update every morning regardless of where their team sits. The engineers building a microservices analytics platform in Singapore did not need a daily call with stakeholders to stay aligned, because the written trail did that job continuously. You see commits, deployed previews, and a short written summary of what moved and what is next. That visibility is usually better than what an in-house team provides, precisely because we are forced to make our work legible.</p>

      <h2>It also keeps us honest on billing</h2>
      <p>Async-first pairs naturally with how we charge. Because the work is visible and the deliverables are written down, there is no ambiguity about what was done. That is the foundation of our milestone-based pricing: you can see the shipped result before you pay for it, instead of trusting a timesheet.</p>

      <h2>The failure mode to avoid</h2>
      <p>Async-first has one classic way of going wrong: writing that nobody reads, or status updates that exist to perform activity rather than to inform. The fix is not more documentation, it is better-targeted documentation. A good async update answers three things in a few lines: what shipped, what is blocked, and what is next. Anything longer usually means the writer has not done the thinking yet. We coach engineers to write the summary first and the detail underneath, so a busy reader gets the signal in ten seconds and the depth only if they need it. Async only saves time if the reading is faster than the meeting it replaced.</p>

      <h2>Is async-first for everyone?</h2>
      <p>No. It demands strong writers, high trust, and engineers who are genuinely senior enough to make decisions without a meeting to hide behind. A team built on juniors cannot run this way, which is part of why our model and our hiring bar reinforce each other. If you are building a product and want a team that communicates in artifacts you can actually read rather than meetings you have to attend, <a href="/contact">start a conversation with us</a>.</p>
    `,
  },
  {
    slug: "milestone-billing-vs-hourly",
    title: "Milestone Billing vs. Hourly: Why We Never Bill by the Hour",
    excerpt:
      "Hourly billing creates misaligned incentives. The longer a project takes, the more the agency earns. We fixed this by tying every invoice to a shipped deliverable.",
    metaTitle: "Milestone Billing vs Hourly Pricing",
    metaDescription: "Hourly billing rewards slowness. See how milestone-based software pricing aligns an agency's incentives with your shipped product, plus a 30-day exit.",
    updated: "2026-06-16",
    category: "Business",
    tags: ["Pricing", "Billing", "Transparency", "Client"],
    date: "2025-04-14",
    readTime: 5,
    author: { name: "AlgoCrew engineering", role: "Cloud, DevOps and security team", initials: "AC", color: "#06c8e8" },
    coverGradient: "linear-gradient(135deg, #0a0a0a 0%, #a78bfa 100%)",
    accent: "#a78bfa",
    body: `
      <p>Hourly billing is the original misaligned incentive in software services. When you pay by the hour, you are rewarding time spent, not outcomes delivered. The longer the project drags, the more the agency earns. We built AlgoCrew on a different model because we wanted our incentives to point in the same direction as our clients' incentives, every single week.</p>

      <h2>The hourly trap</h2>
      <p>Imagine hiring a plumber who charges by the hour. Would they rush to fix your pipe, or take their time? Hourly billing makes slowness profitable and penalises efficiency. It also creates a corrosive dynamic where the client ends up watching the clock and auditing timesheets instead of focusing on the product they are trying to launch.</p>
      <p>In software the distortion is even sharper. A senior engineer who solves a problem in two hours earns half as much as a junior who fumbles through it in four. The pricing model literally rewards the slower, lower-quality path. That is backwards, and it is one more reason we staff projects with senior engineers only: under hourly billing, their speed would be a financial liability instead of the entire point.</p>

      <h2>How milestone billing works</h2>
      <p>Every engagement is broken into two to four milestones, each tied to a concrete, verifiable deliverable. You pay when we ship the milestone, not before. If we miss a milestone, you do not pay until we deliver it. The structure is simple, but the effect on behaviour is profound: we are now financially motivated to ship fast and ship well, because shipping is how we get paid and move to the next milestone.</p>

      <h2>What a milestone actually looks like</h2>
      <ul>
        <li><strong>Milestone 1:</strong> authentication, database schema, and core API endpoints, deployed to a staging environment you can click through.</li>
        <li><strong>Milestone 2:</strong> the core user flows complete, tested, and deployed to staging with QA sign-off.</li>
        <li><strong>Milestone 3:</strong> production deployment, monitoring and alerting in place, and handover documentation.</li>
      </ul>
      <p>Each milestone is something you can see, test, and judge. There is no abstract pile of hours to interpret, just working software at the end of every stage. You can review our full <a href="/our-approach#engagement-models">pricing and engagement models</a> to see how these milestones map to fixed-scope sprints and rolling studio work.</p>

      <h2>Why this protects you</h2>
      <p>Milestone billing transfers the risk of slowness from you to us. Under hourly billing, an underestimate is your problem: the meter just keeps running. Under milestone billing, an underestimate is our problem, because the price of the deliverable was agreed up front. That single shift changes how carefully we scope, how honestly we estimate, and how hard we push to avoid the kind of gold-plating that inflates hours without adding value.</p>

      <h2>It starts with honest scoping</h2>
      <p>Fixed milestones only work if the scope is defined well, which is why we put real effort into scoping before a contract is signed. A vague brief produces vague milestones and disappointed everyone. A sharp brief produces deliverables both sides can measure. If you are at the start of that process, our guide on how to scope an MVP that actually ships walks through the exact exercise we run with new clients.</p>

      <h2>The 30-day exit clause</h2>
      <p>For ongoing studio engagements we add a 30-day rolling exit. Either party can end the relationship with thirty days of notice, with no lock-in and no penalties. People sometimes ask why we would give clients an easy way to leave. The answer is that it keeps us accountable every month. We have to earn the next milestone and the next month of work through results, not through a contract that traps you. In practice, clients rarely use the exit, precisely because they never feel they need to.</p>

      <h2>What about change requests?</h2>
      <p>The honest objection to milestone billing is change: real products evolve mid-build. We handle this by treating a change that alters a milestone's scope as its own small, priced deliverable rather than pretending it is free or letting it silently expand the original estimate. You see the cost before you approve it, so there are no surprise invoices and no padding. When we built the vendor transaction system behind a fintech billing platform, requirements shifted as the finance team learned what they actually needed, and the milestone structure absorbed those changes cleanly because each one was scoped and agreed on its own terms.</p>

      <h2>The bottom line</h2>
      <p>Hourly billing optimises for hours. Milestone billing optimises for shipped product. We know which one we would want if we were the client, so it is the only model we offer. If you would rather pay for outcomes than for time, <a href="/contact">tell us what you are building</a> and we will scope it into milestones you can hold us to.</p>
    `,
  },
  {
    slug: "nextjs-15-app-router-production-lessons",
    title: "Next.js 15 App Router: 6 Lessons From 12 Months in Production",
    excerpt:
      "We've shipped Next.js 15 App Router across 8 production projects. Here's what the docs don't tell you about caching, streaming, and server components at scale.",
    metaTitle: "Next.js 15 App Router: Lessons From Production",
    metaDescription: "What the docs do not tell you about the Next.js 15 App Router: caching, streaming, and server components at scale, learned from shipping real applications.",
    updated: "2026-06-16",
    category: "Engineering",
    tags: ["Next.js", "React", "Performance", "Production"],
    date: "2025-03-30",
    readTime: 10,
    author: { name: "AlgoCrew engineering", role: "Cloud, DevOps and security team", initials: "AC", color: "#34d399" },
    coverGradient: "linear-gradient(135deg, #000 0%, #34d399 100%)",
    accent: "#34d399",
    body: `
      <p>The Next.js App Router is a genuine step forward, but moving real applications onto it surfaces lessons the documentation does not emphasise. The mental model is different enough from the older approach that teams trip over the same things. Here is what we have learned shipping production applications on it, the kind we build through our web engineering work.</p>

      <h2>Server components are the default for a reason</h2>
      <p>In the App Router, components render on the server unless you opt out. Embracing this rather than fighting it is the biggest mindset shift. Keep data fetching and heavy logic on the server, and reach for client components only where you genuinely need interactivity. Teams that mark everything as a client component throw away most of the benefit and ship far more JavaScript than they need, which hurts Core Web Vitals.</p>

      <h2>Caching is powerful and surprising</h2>
      <p>The framework caches aggressively at several layers, and the single most common source of confusion is data that seems stale because it was cached more eagerly than expected. The fix is not to disable caching everywhere but to understand the layers and to be explicit about what should revalidate and when. Treat caching as something you configure deliberately, not something that should be invisible.</p>

      <h2>Streaming changes how pages feel</h2>
      <p>The App Router can stream a page in pieces, showing a meaningful shell immediately while slower data loads behind a boundary. Used well, this makes pages feel dramatically faster because users see structure right away. The lesson is to place loading boundaries thoughtfully around genuinely slow sections rather than wrapping everything or nothing.</p>

      <h2>Keep the server and client boundary clean</h2>
      <p>The line between server and client code is real, and crossing it carelessly causes confusing errors. Be intentional about what runs where, keep secrets and heavy dependencies strictly on the server, and pass only serialisable data across the boundary. Strong typing, in the spirit of our TypeScript patterns, makes this boundary much safer to work with.</p>

      <h2>Server actions are useful, not magic</h2>
      <p>Server actions simplify mutations by letting you call server code directly, but they are still endpoints. They need the same authentication, authorisation, and input validation as any API, because the convenience of the syntax does not change the security model. Treat them with the same caution you would any server entry point.</p>

      <h2>Common migration mistakes</h2>
      <p>Two patterns cause most of the pain when teams move an existing application across. The first is porting old data-fetching habits directly, wrapping everything in client-side effects instead of letting server components fetch data where it renders. The result is an app that technically uses the new router while keeping all the downsides of the old one. The second is treating every shared layout as static when parts of it genuinely need per-request data, which leads to confusing stale content. The fix in both cases is to start from the server, decide deliberately what must be dynamic, and push interactivity to the smallest possible client islands. Migrating incrementally, one route at a time, beats a big-bang rewrite, because it lets the team build an accurate mental model on low-risk pages before touching the critical ones.</p>

      <h2>Adopt it deliberately</h2>
      <p>The App Router rewards teams who learn its model and frustrates teams who treat it as a drop-in replacement for the old one. Invest the time to understand server components, caching, and streaming before committing a large application, and the payoff in performance and structure is real. If you want it adopted properly on a production application, our web engineering team has done it repeatedly.</p>
    `,
  },
  {
    slug: "building-ai-features-that-actually-work",
    title: "Building AI Features That Actually Work in Production",
    excerpt:
      "LLMs are non-deterministic, expensive, and slow. Here's how we architect AI features that are reliable, cost-controlled, and fast enough for real users.",
    metaTitle: "Building AI Features That Work in Production",
    metaDescription: "LLM features are non-deterministic, slow, and costly. Here is how we architect AI features that stay reliable, cost-controlled, and fast enough for real users.",
    updated: "2026-06-16",
    category: "AI / ML",
    tags: ["AI", "LLM", "Architecture", "Production", "OpenAI"],
    date: "2025-03-15",
    readTime: 9,
    author: { name: "AlgoCrew engineering", role: "Cloud, DevOps and security team", initials: "AC", color: "#c084fc" },
    coverGradient: "linear-gradient(135deg, #0d0020 0%, #c084fc 100%)",
    accent: "#c084fc",
    body: `
      <p>Large language models are non-deterministic, slow relative to normal API calls, and priced per token in a way that punishes careless design. None of that makes them unusable. It just means an AI feature needs more engineering discipline than a CRUD endpoint, not less. The teams that ship reliable AI products treat the model as one unreliable component inside a system they fully control, rather than as magic that excuses sloppy architecture.</p>

      <h2>Treat the model as an untrusted dependency</h2>
      <p>The single most useful mental shift is to stop treating model output as correct. Validate it the way you would validate input from a third-party API you do not trust. If you expect JSON, parse it and reject anything that does not match a schema. If you expect one of five categories, constrain the output and fall back deterministically when it returns a sixth. This is the same defensive instinct that keeps a <a href="/blog/microservices-vs-monolith-honest-guide">distributed system</a> stable when one service misbehaves.</p>

      <h2>Constrain the problem before you reach for a bigger model</h2>
      <p>Most production AI failures are scope failures, not model failures. A prompt that asks the model to do five things will do each of them worse than five focused prompts. Break the task down. Give the model a narrow job with clear inputs and a structured output, and you will get dramatically more reliable results from a smaller, cheaper, faster model than you would from the largest model handed a vague instruction.</p>

      <h2>Control cost at the architecture level</h2>
      <p>Token cost compounds invisibly until a finance dashboard makes it visible. Cache aggressively: identical or near-identical requests should never hit the model twice. Use a small model for routing and classification and reserve the expensive model for the genuinely hard step. Set hard token ceilings on both input and output so a single pathological request cannot run up a surprising bill. Treating cost as a first-class design constraint here mirrors how we approach <a href="/blog/aws-cost-optimisation-engineering-guide">cloud cost optimisation</a> generally.</p>

      <h2>Design for latency from the start</h2>
      <p>Users abandon interactions that feel frozen. Stream tokens as they arrive so the interface comes alive immediately instead of staring at a spinner for several seconds. Where a response can be precomputed, precompute it. Where a slow call is unavoidable, make it asynchronous and notify the user when it completes rather than blocking the whole flow.</p>

      <h2>Build the evaluation harness early</h2>
      <p>You cannot improve what you cannot measure, and "it seems better" is not a measurement. Assemble a set of real input cases with known good outputs and run every prompt or model change against them. This turns prompt engineering from superstition into a repeatable process, and it is the only way to safely change a model version without regressing behaviour your users depend on.</p>

      <h2>Keep a human in the loop where stakes are high</h2>
      <p>For anything that touches money, health, legal text, or irreversible actions, the model should draft and a human should approve. This is not a failure of ambition. It is how you ship useful AI in regulated and high-trust domains without betting the company on a hallucination. The intentional, scoped shortcut here is exactly the kind of deliberate trade-off we describe in our piece on when technical debt is worth taking.</p>

      <h2>Where this fits</h2>
      <p>Reliable AI features are an engineering problem first and a model problem second. The work of schema validation, caching, evaluation, and graceful fallback is what separates a demo from a product. If you are adding AI to a real application and want it built with that discipline, our data and AI engineering team does exactly this, and you can <a href="/contact">tell us what you are building</a>.</p>
    `,
  },
  {
    slug: "kubernetes-vs-ecs-2025",
    title: "Kubernetes vs ECS in 2025: What We Actually Recommend",
    excerpt:
      "After running both in production across dozens of client projects, here's our honest take on when to use Kubernetes, when ECS wins, and when neither is the right answer.",
    metaTitle: "Kubernetes vs ECS in 2025: What to Choose",
    metaDescription: "After running both in production, here is an honest take on when Kubernetes earns its complexity, when ECS wins, and when neither is the right answer.",
    updated: "2026-06-16",
    category: "DevOps",
    tags: ["Kubernetes", "AWS", "ECS", "DevOps", "Infrastructure"],
    date: "2025-02-28",
    readTime: 8,
    author: { name: "AlgoCrew engineering", role: "Cloud, DevOps and security team", initials: "AC", color: "#38bdf8" },
    coverGradient: "linear-gradient(135deg, #001122 0%, #38bdf8 100%)",
    accent: "#38bdf8",
    body: `
      <p>Kubernetes and ECS both run containers in production reliably, so the choice is not about capability. It is about how much operational complexity you should take on in exchange for flexibility. The wrong way to decide is by resume-driven development. The right way is to be honest about your team's size and what you actually need to run.</p>

      <h2>What you are really choosing</h2>
      <p>Kubernetes is a powerful, portable, vendor-neutral platform with an enormous ecosystem and a correspondingly steep operational surface. ECS is a simpler, managed container orchestrator that trades some flexibility for a much lighter operational load if you are already on AWS. The decision is essentially how much control you need versus how much platform work you can afford to own.</p>

      <h2>When ECS is the right answer</h2>
      <p>For most small and mid-sized teams running a reasonable number of services on AWS, ECS is the pragmatic choice, especially with Fargate handling the underlying capacity. You get container orchestration without running a control plane, learning a large new vocabulary, or dedicating engineers to cluster maintenance. If your needs are standard and you are committed to AWS, ECS lets you ship the product instead of operating the platform.</p>

      <h2>When Kubernetes earns its complexity</h2>
      <p>Kubernetes becomes worth it when you have real pressure that ECS cannot relieve: multi-cloud or hybrid requirements, a need to avoid vendor lock-in, a large catalogue of services with sophisticated deployment and scaling policies, or a platform team that can own the cluster as a product. At that scale the ecosystem and flexibility pay for the operational cost. Below it, you are paying for power you will not use.</p>

      <h2>The hidden cost nobody budgets for</h2>
      <p>The real expense of Kubernetes is not the control plane fee. It is the ongoing human cost of upgrades, security patching, networking debugging, and the specialised knowledge required to operate it safely. A cluster is not something you set up once. It is a system you run, and running it badly is worse than not running it at all, which is why <a href="/blog/kubernetes-security-hardening">hardening every cluster</a> is non-negotiable.</p>

      <h2>When neither is the answer</h2>
      <p>Sometimes the honest recommendation is to skip orchestration entirely. A small application with predictable, modest traffic may be better served by a simpler platform-as-a-service or even <a href="/blog/serverless-vs-containers-2025">serverless functions</a>. Reaching for Kubernetes to run three containers is a common and expensive form of over-engineering. Match the tool to the actual problem.</p>

      <h2>How to actually decide</h2>
      <p>Strip away the ecosystem noise and the decision comes down to a few honest questions. Do you have, or can you fund, an engineer who will own the cluster as part of their job? Are you committed to a single cloud, or do you have a real multi-cloud requirement rather than a hypothetical one? How many services are you running, and do they need sophisticated, differentiated deployment policies? If the answers point to a small team on one cloud running a modest number of standard services, ECS or an equivalent managed option will serve you better and cost less in human time. If you have genuine scale, portability needs, and platform ownership, Kubernetes pays for its complexity. The mistake is choosing the powerful option for the prestige and then discovering the operational bill months later.</p>

      <h2>Our default</h2>
      <p>Start with the simplest thing that meets your needs, usually managed containers on ECS or a comparable service, and move to Kubernetes only when a concrete constraint forces the upgrade. This keeps your operational burden proportional to your actual scale. If you want that decision made and run by people who operate both daily, our <a href="/services/devops">cloud and DevOps team</a> can help.</p>
    `,
  },
  {
    slug: "react-native-vs-flutter-2025",
    title: "React Native vs Flutter in 2025: A Pragmatic Comparison",
    excerpt:
      "We've shipped production apps in both. Here's the framework comparison that skips the benchmarks and focuses on what actually matters: developer experience, hiring, and long-term maintainability.",
    metaTitle: "React Native vs Flutter in 2025: Which to Pick",
    metaDescription: "We have shipped production apps in both. A comparison that skips benchmarks and focuses on what matters: developer experience, hiring, and maintainability.",
    updated: "2026-06-16",
    category: "Mobile",
    tags: ["React Native", "Flutter", "Mobile", "Cross-platform"],
    date: "2025-02-10",
    readTime: 7,
    author: { name: "AlgoCrew engineering", role: "Cloud, DevOps and security team", initials: "AC", color: "#fb923c" },
    coverGradient: "linear-gradient(135deg, #1a0800 0%, #fb923c 100%)",
    accent: "#fb923c",
    body: `
      <p>The React Native versus Flutter debate usually drowns in benchmark screenshots, which is exactly the wrong way to choose. For most teams the deciding factors are not a few milliseconds of render time but developer experience, hiring, and long-term maintainability. Both are mature and both ship excellent production apps, so the honest comparison is about fit with your team and product.</p>

      <h2>The fundamental difference</h2>
      <p>React Native uses JavaScript and the React model, rendering through native platform components. Flutter uses the Dart language and draws its own UI with a high-performance rendering engine. That distinction drives most of the trade-offs: React Native leans on an ecosystem and skills you may already have, while Flutter offers tight visual consistency and control at the cost of a less common language.</p>

      <h2>Developer experience and ecosystem</h2>
      <p>If your team already writes React for the web, React Native is a short hop. The mental model, the component approach, and much of the tooling carry over, and the same TypeScript patterns apply. Flutter offers an extremely polished development experience of its own, with fast iteration and strong tooling, but it asks the team to adopt Dart, which few engineers know coming in.</p>

      <h2>Hiring is a real constraint</h2>
      <p>The pool of JavaScript and React engineers is enormous, which makes staffing a React Native project straightforward and is often the deciding factor for a growing company. Flutter talent is rarer, though motivated, and many teams successfully retrain existing engineers because Dart is approachable. Be honest about whether you can hire and retain for your choice, because the best technical fit is worthless if you cannot staff it.</p>

      <h2>UI consistency versus native feel</h2>
      <p>Because Flutter draws everything itself, your app looks identical across platforms and you have pixel-level control, which designers love. React Native renders real native components, so it can feel more at home on each platform but may require more per-platform attention to look perfect. Neither is better in the abstract; it depends on whether brand consistency or native familiarity matters more to your product.</p>

      <h2>Sharing logic with the web</h2>
      <p>If a web application is part of your plan, React Native lets you share concepts, patterns, and sometimes code with a React web frontend, which is a meaningful efficiency for a small team. Our perspective on the web side is covered in our Next.js production lessons, and that shared foundation often tips the decision toward React Native.</p>

      <h2>Performance is rarely the deciding factor</h2>
      <p>Teams spend a surprising amount of energy comparing rendering performance, when for the vast majority of applications both frameworks are comfortably fast enough. Unless you are building something with unusually demanding animation or real-time graphics, the user will not perceive a difference attributable to the framework. What users do perceive is whether the app is well built: thoughtful navigation, responsive interactions, and the absence of jank caused by doing heavy work on the wrong thread. Both frameworks let you build excellent apps and both let you build sluggish ones. The performance ceiling is high enough in each that your engineering discipline matters far more than the logo on the framework. Choose for the human factors, team skills, hiring, and code sharing, and treat raw benchmark numbers as the tiebreaker they almost never need to be.</p>

      <h2>A pragmatic recommendation</h2>
      <p>For teams with existing React or JavaScript strength, or a web product to share with, React Native is usually the lower-friction choice. For teams that prioritise pixel-perfect cross-platform consistency and are happy to invest in Dart, Flutter is excellent. Both are safe bets in 2025. If you want help choosing and building for a specific product, our application engineering team ships in both.</p>
    `,
  },
  {
    slug: "technical-debt-is-not-always-bad",
    title: "Technical Debt Is Not Always Bad, Here's When to Embrace It",
    excerpt:
      "The phrase 'technical debt' is used to justify both legitimate shortcuts and inexcusable laziness. Here's how to tell the difference and make intentional tradeoffs.",
    metaTitle: "Technical Debt: When to Embrace It, When Not To",
    metaDescription: "Technical debt justifies both smart shortcuts and plain laziness. How to tell the difference and make intentional, well-documented trade-offs.",
    updated: "2026-06-16",
    category: "Engineering",
    tags: ["Technical Debt", "Architecture", "Engineering", "Product"],
    date: "2025-01-25",
    readTime: 6,
    author: { name: "AlgoCrew engineering", role: "Cloud, DevOps and security team", initials: "AC", color: "#06c8e8" },
    coverGradient: "linear-gradient(135deg, #0a0a00 0%, #fbbf24 100%)",
    accent: "#fbbf24",
    body: `
      <p>The phrase technical debt gets used to justify two completely different things: a deliberate, well-understood shortcut taken to hit a deadline, and a mess created by carelessness that nobody chose on purpose. Treating these as the same concept is why so many teams either fear all debt or excuse all of it. The useful distinction is intent. Real technical debt is borrowed on purpose, with a plan to repay it.</p>

      <h2>The debt metaphor is more accurate than people think</h2>
      <p>Financial debt is not inherently bad. Borrowed wisely, it lets you build something now and pay for it over time. Borrowed recklessly, the interest compounds until it owns you. Code is the same. A shortcut that lets you validate a product idea this month can be an excellent trade. A shortcut taken because nobody wanted to think clearly is just damage with a respectable name.</p>

      <h2>Good debt is intentional, isolated, and documented</h2>
      <p>Deliberate debt has three properties. It is intentional: someone decided the trade-off out loud. It is isolated: the shortcut lives behind a clear boundary so it does not spread through the codebase. And it is documented: a comment or ticket records why it exists and what would trigger paying it back. Debt with those properties is a tool. Debt without them is a liability waiting to surface during an incident.</p>

      <h2>When embracing debt is the right call</h2>
      <p>Take the shortcut when you are still proving a hypothesis. An early-stage MVP does not need a perfectly normalised schema or a fully abstracted payment layer. It needs to find out whether anyone wants the thing. Hardcoding a value, faking a workflow manually, or skipping an optimisation that only matters at scale are all reasonable when the alternative is spending weeks polishing something that may never ship.</p>

      <h2>When debt will quietly destroy you</h2>
      <p>Avoid debt in the foundations: authentication, data integrity, and the core domain model. A shortcut in your security boundary is not debt, it is a vulnerability. A shortcut in how you store core business data tends to metastasise, because every later feature builds on that shape and inherits its flaws. These are the areas where senior engineers refuse to cut corners, which is one reason a strong code review culture matters most around foundational code.</p>

      <h2>Make repayment visible</h2>
      <p>Debt you cannot see is debt you will never repay. Track it where the team already looks: a labelled backlog, a section in the architecture doc, comments that link to the ticket. The goal is not to eliminate all debt, which is impossible, but to keep it on a balance sheet you actually read. When a shortcut starts charging interest in the form of slow features or recurring bugs, that visibility is what lets you justify the time to fix it.</p>

      <h2>A practical way to talk about it</h2>
      <p>The most useful habit a team can build is a shared, unemotional vocabulary for debt. When someone proposes a shortcut, ask three questions out loud: what are we trading away, what would trigger us to pay this back, and where will we record it. If the answers are clear, the shortcut is a legitimate engineering decision and everyone can move on without guilt. If the answers are vague, that is the signal that you are about to create the bad kind of debt. This small ritual turns debt from an accusation into a design conversation, and it keeps the team honest about which shortcuts are investments and which are just mess. Over time it also builds an accurate map of where the bodies are buried, which is exactly what you want when planning the next quarter's work.</p>

      <h2>The cultural part</h2>
      <p>Healthy teams talk about debt without blame. A shortcut taken last quarter under real pressure was probably the right decision with the information available then. The point of revisiting it is not to assign fault but to decide whether the trade still makes sense. That blameless, pragmatic posture is the same one that makes our MVP engagements move fast without leaving clients buried in a mess they cannot maintain.</p>
    `,
  },
  {
    slug: "how-to-scope-an-mvp-correctly",
    title: "How to Scope an MVP That Actually Ships",
    excerpt:
      "Most MVPs fail before they launch, not because of bad code, but because of bad scoping. Here's the framework we use to define an MVP that ships in 6 weeks, not 6 months.",
    metaTitle: "How to Scope an MVP That Actually Ships | AlgoCrew",
    metaDescription: "A practical framework for scoping an MVP that ships in 6 weeks, not 6 months: the one-sentence test, the three-column cut, and the case for shipping ugly.",
    updated: "2026-06-16",
    category: "Product",
    tags: ["MVP", "Product", "Scoping", "Startups"],
    date: "2025-01-12",
    readTime: 7,
    author: { name: "AlgoCrew engineering", role: "Cloud, DevOps and security team", initials: "AC", color: "#06c8e8" },
    coverGradient: "linear-gradient(135deg, #001a00 0%, #4ade80 100%)",
    accent: "#4ade80",
    body: `
      <p>We have scoped and built dozens of minimum viable products. The ones that fail almost never fail for technical reasons. They fail because the scope was wrong from the very start. Good scoping is the highest-leverage work in the entire MVP process, and it happens before a single line of code is written.</p>

      <h2>The MVP trap</h2>
      <p>A founder arrives with a 48-page requirements document and calls it an MVP. Everything is a must-have. The authentication system has to support single sign-on, OAuth, passwordless, and two-factor on day one. The dashboard needs fourteen chart types. The notification system needs email, SMS, push, and in-app delivery. That is not a minimum viable product. That is a full platform, and it will take twelve months and quite possibly never ship.</p>
      <p>The instinct is understandable. Every feature feels essential when you are close to the idea. But an MVP is not a small version of the final product. It is the smallest thing that can test whether the core idea is true.</p>

      <h2>The one-sentence test</h2>
      <p>A valid MVP can be described in a single sentence: a tool that lets a specific user perform one core action so that one measurable outcome happens. If you cannot compress your product into that sentence, the scope is not minimal yet. The discipline of writing the sentence forces you to choose the one action that matters most, which is exactly the choice most early teams avoid.</p>

      <h2>The three-column exercise</h2>
      <p>We run every client through three columns. <strong>Must Have</strong> means the MVP fails without it. <strong>Should Have</strong> means it makes the product meaningfully better. <strong>Nice to Have</strong> is everything else. The rule is uncomfortable on purpose: the Must Have column should feel too small. If it feels comfortable, you have not cut enough. Most features that founders are certain belong in column one quietly belong in column two once they have to defend them out loud.</p>

      <h2>Feature dependencies are scope creep in disguise</h2>
      <p>The most common way scope balloons is through dependencies that sound technical but are really premature optimisation. "We need the API to support pagination before we can build the list view." Do you? Can the list view load all twenty items for now and add pagination when there are two hundred? Almost every technical dependency in an MVP is a future-proofing decision wearing the costume of a requirement. Challenge each one, and most of them disappear.</p>

      <h2>Ship ugly</h2>
      <p>The first version does not need to be beautiful. It needs to prove the hypothesis. We have shipped MVPs with hardcoded data, manual processes running quietly behind the scenes, and deliberately plain interfaces. Users do not abandon a product because the button styling is generic. They abandon it because the core value does not land. Spend your scarce early budget on proving the value, not on polishing a product nobody has validated yet.</p>

      <h2>Manual behind the curtain</h2>
      <p>One of the most useful scoping tricks is to fake the hard parts with human effort first. If your product promises automated matching, do the matching by hand for the first ten customers. If it promises a complex report, generate it manually overnight. This lets you launch in weeks instead of months and learn whether anyone actually wants the outcome before you invest in automating it. Once demand is proven, automation becomes a funded, well-understood project instead of an expensive guess.</p>

      <h2>How this connects to delivery</h2>
      <p>Tight scope is also what makes fixed-price delivery possible. When the Must Have column is genuinely minimal, we can break it into clear stages and tie payment to each one. That is the foundation of our milestone billing model, and it is why scoping and pricing are really the same conversation. A disciplined scope produces an MVP we can ship in roughly six weeks through our MVP development service, with each milestone landing as working software you can put in front of real users.</p>

      <h2>A scoping checklist you can steal</h2>
      <p>Before you commit to building anything, run the idea through five questions. Can you describe it in one sentence? Does the Must Have column feel uncomfortably small? Is every dependency in it a genuine requirement rather than future-proofing? Can the hard parts be faked manually for the first handful of users? And is there a single, measurable outcome that tells you whether the experiment worked? If you cannot answer all five cleanly, you are not ready to build yet, and an extra afternoon of scoping will save you weeks of wasted engineering. This is the exact checklist we walk through before quoting any new product engagement.</p>

      <h2>What good scoping buys you</h2>
      <p>A well-scoped MVP gives you the one thing early-stage products are always short of: time to learn. You launch sooner, you get real signal from real users, and you make your next decisions with evidence instead of opinion. We have seen this play out across our client work, where the products that scaled were almost always the ones that started narrow and earned the right to grow. If you are sitting on a 48-page requirements document and a launch date that keeps slipping, <a href="/contact">let us help you cut it down to something that ships</a>.</p>
    `,
  },
  {
    slug: "postgres-vs-mongodb-choose-right",
    title: "PostgreSQL vs MongoDB: How to Choose Without Starting a Religion War",
    excerpt:
      "The database debate is one of the most opinionated in engineering. Here's a framework based on actual project requirements rather than tribal loyalty.",
    metaTitle: "PostgreSQL vs MongoDB: How to Actually Choose",
    metaDescription: "Skip the tribal database debate. A practical framework for choosing PostgreSQL or MongoDB based on your data shape, consistency needs, and access patterns.",
    updated: "2026-06-16",
    category: "Engineering",
    tags: ["PostgreSQL", "MongoDB", "Database", "Architecture"],
    date: "2024-12-20",
    readTime: 8,
    author: { name: "AlgoCrew engineering", role: "Cloud, DevOps and security team", initials: "AC", color: "#34d399" },
    coverGradient: "linear-gradient(135deg, #000a08 0%, #34d399 100%)",
    accent: "#34d399",
    body: `
      <p>The PostgreSQL versus MongoDB argument is one of the most religious in engineering, which is exactly why it is so unhelpful. The honest answer is that both are excellent, both are used at enormous scale, and the right choice follows from your data's shape and your consistency requirements, not from loyalty to relational or document models. Pick based on the problem in front of you.</p>

      <h2>Default to PostgreSQL</h2>
      <p>For most applications, a relational database is the safer default, and PostgreSQL is the strongest open option. You get strong consistency, transactions that span multiple tables, a mature query planner, and the flexibility to model relationships properly. The data in most products is relational whether or not the team admits it, and trying to fake relationships in a document store usually ends in pain. PostgreSQL also handles JSON natively, so you can store semi-structured data without abandoning the relational core.</p>

      <h2>When MongoDB genuinely fits</h2>
      <p>MongoDB earns its place when your data is naturally document-shaped and your access patterns are document-centric: you read and write whole documents, the schema varies between records, and you rarely need complex joins across collections. Content management, product catalogues with heterogeneous attributes, and event or activity logs are good fits. When the document boundary matches the unit of work, the model is a pleasure to use.</p>

      <h2>The schema question is really an access question</h2>
      <p>The flexible-schema selling point is often misunderstood. Schema flexibility does not remove the need for structure. It just moves responsibility for that structure from the database into your application code. That can be a fair trade for genuinely variable data, but if your records all share the same shape, a relational schema that enforces it for you is a feature, not a limitation. Decide based on how you query, because the access pattern dictates which model stays fast.</p>

      <h2>Consistency and transactions</h2>
      <p>If your domain involves money, inventory, or anything where two updates must succeed or fail together, multi-document transactional guarantees matter enormously. PostgreSQL gives you these naturally. MongoDB supports multi-document transactions too, but if you find yourself relying on them constantly, that is a strong signal your data was relational all along and you chose the wrong tool.</p>

      <h2>Performance is mostly about the same things</h2>
      <p>Whichever you choose, the performance fundamentals are shared: appropriate indexes, queries that use them, and avoiding the patterns that force full scans. A poorly indexed PostgreSQL database and a poorly indexed MongoDB database are both slow. Our guide to database query optimisation applies regardless of which engine you land on, and most teams pair either database with Redis for caching and hot-path reads.</p>

      <h2>You can change your mind, at a cost</h2>
      <p>The database choice feels permanent, which is why it generates so much anxiety, but it is not irreversible. What makes a migration painful later is not the database itself, it is application code that has leaked database-specific assumptions everywhere. If you keep your data access behind a clear boundary rather than scattering raw queries through the codebase, switching engines becomes a contained project rather than a rewrite. That same discipline also lets you introduce a second store for a specific job, such as a document store for one content-heavy feature alongside a relational core, without tangling the two. The lesson is to make the choice thoughtfully but to protect yourself by keeping data access well isolated, so that being wrong is recoverable instead of catastrophic.</p>

      <h2>A simple recommendation</h2>
      <p>Start with PostgreSQL unless you have a specific, well-articulated reason the document model fits better. It is the lower-regret default because it handles relational and document data competently, while a document store that meets a relational problem ages badly. If you want this decision made for a specific product alongside the rest of the data architecture, our SaaS engineering team does it routinely.</p>
    `,
  },
  {
    slug: "ci-cd-pipeline-best-practices-2025",
    title: "CI/CD Pipeline Best Practices We Use on Every Project",
    excerpt:
      "A broken deployment pipeline is a productivity tax on every engineer, every day. Here's the setup we install on every new project from day one.",
    metaTitle: "CI/CD Pipeline Best Practices for 2025",
    metaDescription: "A broken deployment pipeline taxes every engineer every day. The CI/CD setup we install on every new project from day one, and why each piece matters.",
    updated: "2026-06-16",
    category: "DevOps",
    tags: ["CI/CD", "GitHub Actions", "DevOps", "Automation"],
    date: "2024-12-05",
    readTime: 7,
    author: { name: "AlgoCrew engineering", role: "Cloud, DevOps and security team", initials: "AC", color: "#38bdf8" },
    coverGradient: "linear-gradient(135deg, #000d1a 0%, #38bdf8 100%)",
    accent: "#38bdf8",
    body: `
      <p>A deployment pipeline is infrastructure that either accelerates every engineer or taxes them daily. A good one makes shipping boring, frequent, and safe. A bad one makes every release an event people dread. Here is the setup we install on every new project from the first commit, because retrofitting a pipeline later is far harder than starting with one.</p>

      <h2>Automate from the first commit</h2>
      <p>Set up continuous integration before you have much to integrate. It is cheap when the project is small and painful to add once there is a large untested codebase. From day one, every push should trigger the same automated checks, so quality is enforced by the pipeline rather than by memory.</p>

      <h2>Run the fast checks first</h2>
      <p>Order your pipeline so the quickest checks fail fastest. Linting and type checking run in seconds and catch a lot, so they go first. Then unit tests, then slower integration tests. Developers get feedback on common mistakes almost immediately instead of waiting for a long suite to reveal a typo.</p>

      <h2>Make the pipeline the single source of truth for quality</h2>
      <p>Everything that defines "good" should run automatically: formatting, linting, type checks, tests, and security scans. This is what frees human code review to focus on design rather than style, and it means standards are applied consistently regardless of who is reviewing.</p>

      <h2>Keep builds fast and reproducible</h2>
      <p>A slow pipeline is one people learn to bypass. Cache dependencies, parallelise independent steps, and keep build times low enough that waiting for the pipeline is not a reason to batch up large risky changes. Reproducibility matters too: the same commit should always produce the same artifact.</p>

      <h2>Build once, promote the same artifact</h2>
      <p>Build your deployable artifact a single time and promote that exact artifact through staging to production. Rebuilding per environment invites subtle differences and the classic "it worked in staging" failure. The thing you tested should be the thing you ship.</p>

      <h2>Scan for security in the pipeline</h2>
      <p>Dependency scanning and image scanning belong in the pipeline so vulnerabilities are caught automatically. This is also your front line for <a href="/blog/supply-chain-security-software">supply chain security</a>, catching a compromised or vulnerable dependency before it reaches production.</p>

      <h2>Deploy small and often</h2>
      <p>The single biggest cultural payoff of a good pipeline is that it makes small, frequent deployments safe, and small frequent deployments are the foundation of reliable software. When you ship a large batch of changes at once, any failure is hard to diagnose because dozens of things changed together. When you ship one small change at a time, a problem is obvious and the fix is a fast rollback. Teams that deploy rarely tend to deploy nervously, which makes each release a larger event, which makes them deploy even less often, a doom loop the pipeline is meant to break. Aim for deployments that are boring: automated, frequent, individually small, and trivially reversible. The goal is a state where shipping to production is the least dramatic part of an engineer's day rather than something the team braces for.</p>

      <h2>Automate deployment and make rollback trivial</h2>
      <p>Manual deployment steps are where human error lives. Automate the path to production and, just as importantly, make rollback a single fast action. The confidence to ship often comes directly from knowing you can undo a bad release in seconds. If you want a pipeline like this built for your team, our <a href="/services/devops">DevOps service</a> sets one up, and pairs it with the <a href="/blog/docker-production-best-practices">container practices</a> that make it reliable.</p>
    `,
  },
  {
    slug: "code-review-culture-that-ships",
    title: "Code Review Culture That Ships: How We Keep PRs Under 24 Hours",
    excerpt:
      "Slow code review is one of the most common productivity killers in engineering teams. Here's how we maintain a culture where PRs get reviewed within hours, not days.",
    metaTitle: "Code Review Culture: Ship PRs in Under 24 Hours",
    metaDescription: "Slow code review quietly taxes every engineer daily. Here is how we keep pull requests reviewed within hours, not days, without sacrificing quality.",
    updated: "2026-06-16",
    category: "Engineering Culture",
    tags: ["Code Review", "Process", "Team", "GitHub"],
    date: "2024-11-18",
    readTime: 5,
    author: { name: "AlgoCrew engineering", role: "Cloud, DevOps and security team", initials: "AC", color: "#06c8e8" },
    coverGradient: "linear-gradient(135deg, #0a0012 0%, #e879f9 100%)",
    accent: "#e879f9",
    body: `
      <p>Slow code review is one of the most expensive and least visible drags on an engineering team. Every pull request that sits for two days is a context switch the author has to pay for twice, a branch drifting further from main, and a teammate blocked on the change. A team that reviews within hours moves at a fundamentally different speed than one where review is an afterthought, and the difference compounds across every feature.</p>

      <h2>Small pull requests are the whole game</h2>
      <p>The biggest lever on review speed is review size. A 60-line change gets a thoughtful review in fifteen minutes. A 1,500-line change gets a rubber stamp, because no reviewer can hold that much in their head, so they skim it and approve. Smaller PRs are reviewed faster, reviewed better, and revert more cleanly when something goes wrong. Teaching engineers to decompose work into small, independently shippable changes does more for quality than any checklist.</p>

      <h2>The author does the reviewer's work first</h2>
      <p>A pull request should arrive ready to review. That means a clear description of what changed and why, screenshots or a short recording for anything visual, a note on how it was tested, and inline comments on the non-obvious decisions. When the author front-loads this context, the reviewer spends their time on judgement rather than archaeology. This is the same written-first discipline that powers async engineering across time zones.</p>

      <h2>Review is for design, not for linting</h2>
      <p>Humans should never be arguing about whitespace, import order, or quote style. Automate all of it: formatters, linters, type checks, and tests run in <a href="/blog/ci-cd-pipeline-best-practices-2025">continuous integration</a> before a human looks at the change. That frees the reviewer to focus on the things only a human can catch: is this the right approach, does it handle the edge cases, will it be maintainable, does it introduce a subtle debt we should name on purpose.</p>

      <h2>Set an explicit response expectation</h2>
      <p>Make the turnaround a stated norm, not a hope. Our expectation is that an open pull request gets a first response within a few hours of the reviewer's working day. The response does not have to be an approval. It can be questions or a request for changes. What matters is that the author is never left wondering whether anyone has looked, because that uncertainty is what kills momentum.</p>

      <h2>Review with respect</h2>
      <p>Tone determines whether review culture survives contact with reality. Comments should critique the code, not the person, ask questions instead of issuing verdicts, and clearly separate blocking concerns from optional suggestions. A reviewer who nitpicks harshly teaches authors to dread review and to batch up large changes to avoid it, which is the exact opposite of what you want.</p>

      <h2>What to do when reviews stall anyway</h2>
      <p>Even good teams hit periods where pull requests pile up, usually because everyone is heads-down on their own work and review feels like an interruption. The fix is to make review a visible, shared responsibility rather than an individual favour. Some teams rotate a daily review owner whose first job each morning is to clear the open queue. Others set a simple agreement that review takes priority over starting new work, on the logic that finishing something already built beats starting something new. What does not work is hoping people will get to it. Whatever mechanism you choose, the principle is that an unreviewed pull request is blocked work, and unblocking a teammate is more valuable than making private progress. Treat the review queue as a team-level metric, not a personal preference.</p>

      <h2>The payoff</h2>
      <p>Fast, respectful, design-focused review is not a process overhead. It is how knowledge spreads through a team, how standards stay consistent, and how a senior team keeps shipping without a quality regression. If you want an engineering team that already operates this way, our <a href="/our-approach#engagement-models">team services</a> are built around it.</p>
    `,
  },
];

const extraPosts: BlogPost[] = [
  {
    slug: "zero-trust-security-architecture-guide",
    title: "Zero Trust Architecture: The Complete Engineering Guide for 2025",
    excerpt:
      "Perimeter-based security is dead. Zero trust assumes breach by default, every request is verified, every connection is authenticated. Here's how to implement it without grinding your team to a halt.",
    metaTitle: "Zero Trust Architecture: A 2025 Engineering Guide",
    metaDescription: "Perimeter security is dead. Zero trust verifies every request and authenticates every connection. How to implement it without grinding your team to a halt.",
    updated: "2026-06-16",
    category: "Security",
    tags: ["Zero Trust", "Security", "Architecture", "DevSecOps"],
    date: "2025-05-01",
    readTime: 11,
    author: { name: "AlgoCrew engineering", role: "Cloud, DevOps and security team", initials: "AC", color: "#ef4444" },
    coverGradient: "linear-gradient(135deg, #1a0000 0%, #ef4444 100%)",
    accent: "#ef4444",
    body: `
      <p>The old security model assumed a hard perimeter: a trusted inside and a dangerous outside, with a firewall between them. That model fails the moment an attacker gets inside, and in a world of cloud services, remote work, and third-party integrations, the perimeter barely exists. Zero trust replaces it with a simple, demanding principle: never trust, always verify. Every request is authenticated and authorised regardless of where it comes from.</p>

      <h2>The core principle</h2>
      <p>Zero trust assumes breach. It treats the internal network as no more trustworthy than the public internet, so a request from inside the data centre is verified just as rigorously as one from outside. This eliminates the soft, chewy centre that lets a single compromised machine pivot freely through everything, which is the failure mode behind many of the worst breaches.</p>

      <h2>Identity is the new perimeter</h2>
      <p>When location no longer confers trust, identity becomes the control plane. Every user and every service must have a strong, verifiable identity, and access decisions are made per request based on that identity and its permissions. Strong authentication everywhere, including service-to-service, is the foundation, and it builds directly on getting <a href="/blog/jwt-security-common-mistakes">token handling</a> right.</p>

      <h2>Least privilege, enforced</h2>
      <p>Every identity should have the minimum access needed to do its job and nothing more. Broad, standing permissions are what turn a small compromise into a large one. Scope access tightly, prefer short-lived grants over permanent ones, and review permissions regularly so they do not quietly accumulate. This is the same deny-by-default instinct that anchors our <a href="/blog/api-security-best-practices-2025">API security practices</a>.</p>

      <h2>Micro-segmentation</h2>
      <p>Rather than one flat internal network, divide the system into small zones with controlled, authenticated traffic between them. If one component is compromised, segmentation limits how far the attacker can move. In a containerised environment this is enforced with network policies, which is one reason <a href="/blog/kubernetes-security-hardening">cluster hardening</a> is part of a real zero trust implementation.</p>

      <h2>Verify devices and context, not just credentials</h2>
      <p>Mature zero trust considers more than whether a password is correct. It weighs the health of the device, the context of the request, and the sensitivity of the resource, and it can demand stronger verification for riskier actions. The goal is access decisions that reflect real risk rather than a one-time login.</p>

      <h2>Avoid the productivity trap</h2>
      <p>The fastest way to make zero trust fail is to implement it so clumsily that engineers route around it. Security controls that add constant friction without visible benefit train people to find workarounds, which leaves you less secure than before. The goal is verification that is rigorous but mostly invisible: strong authentication that uses single sign-on rather than a dozen separate logins, short-lived access that renews automatically rather than forcing constant re-authentication, and policies that demand extra friction only for genuinely sensitive actions. Done well, zero trust should feel to a legitimate user like the system simply works, while quietly making an attacker's job dramatically harder. Security and usability are not opposites here; a design that ignores the human experience will be undermined by the very people it is meant to protect.</p>

      <h2>Implement it incrementally</h2>
      <p>The mistake teams make is trying to boil the ocean and grinding delivery to a halt. Zero trust is a direction, not a single project. Start with strong authentication everywhere, then tighten authorisation to least privilege, then segment the highest-value systems first. Each step reduces risk on its own. If you want a pragmatic, staged rollout that does not paralyse your team, our <a href="/services/cloud-security">security and QA team</a> plans and implements it.</p>
    `,
  },
  {
    slug: "owasp-top-10-2025-developer-guide",
    title: "OWASP Top 10 2025: A Developer's Practical Guide to Fixing Every Vulnerability",
    excerpt:
      "The OWASP Top 10 lists the most critical web application security risks. Here's not just what they are, but exactly how to fix each one in a modern Node.js / Next.js stack.",
    metaTitle: "OWASP Top 10 (2025): A Developer's Fix Guide",
    metaDescription: "The OWASP Top 10 lists the most critical web app risks. Here is not just what each one is, but exactly how to fix it in a modern Node.js and Next.js stack.",
    updated: "2026-06-16",
    category: "Security",
    tags: ["OWASP", "Security", "Web", "Node.js", "Vulnerabilities"],
    date: "2025-04-20",
    readTime: 13,
    author: { name: "AlgoCrew engineering", role: "Cloud, DevOps and security team", initials: "AC", color: "#ef4444" },
    coverGradient: "linear-gradient(135deg, #0d0000 0%, #dc2626 100%)",
    accent: "#dc2626",
    body: `
      <p>The OWASP Top 10 is the industry's reference list of the most critical web application security risks. Knowing the names is not the point. Knowing exactly how to prevent each one in the code you actually write is. This guide walks the categories and the concrete defence for each in a modern JavaScript stack, and pairs with our broader <a href="/blog/api-security-best-practices-2025">API security checklist</a>.</p>

      <h2>Broken access control</h2>
      <p>The most common serious flaw: users acting outside their intended permissions. Enforce authorisation on the server for every request, never trust the client to hide a button, and check ownership on every record a user tries to read or modify. Deny by default and grant explicitly.</p>

      <h2>Cryptographic failures</h2>
      <p>Sensitive data exposed through weak or missing encryption. Use TLS everywhere, hash passwords with a strong adaptive algorithm, encrypt sensitive data at rest, and never invent your own cryptography. Most failures here are about using the wrong tool, not a broken algorithm.</p>

      <h2>Injection</h2>
      <p>Untrusted input interpreted as a command, classically SQL injection. Use parameterised queries everywhere and never concatenate user input into a query string. Validate and sanitise input, and apply the same caution to NoSQL, command, and template injection. This is also why we treat the N+1 and raw-query temptations in our database guide with care.</p>

      <h2>Insecure design</h2>
      <p>Flaws baked into the architecture rather than the code. Threat-model features before building them, and design controls like rate limiting and segregation of duties from the start. You cannot patch your way out of a fundamentally insecure design, which is the whole premise of <a href="/blog/zero-trust-security-architecture-guide">zero trust</a>.</p>

      <h2>Security misconfiguration</h2>
      <p>Default credentials, verbose error messages, unnecessary features left on. Harden every environment, disable what you do not use, keep error output generic in production, and automate configuration so it is consistent and reviewable rather than hand-tuned per server.</p>

      <h2>Vulnerable and outdated components</h2>
      <p>Most applications are mostly other people's code. Track your dependencies, scan them automatically, and patch known vulnerabilities promptly. This category bleeds directly into <a href="/blog/supply-chain-security-software">supply chain security</a>, which deserves its own attention.</p>

      <h2>Build it into the process, not the audit</h2>
      <p>The teams that consistently avoid these vulnerabilities are not the ones that run a security audit once a year. They are the ones who have folded the defences into everyday development so the secure path is the easy path. Parameterised queries are the default because the data layer makes them so. Authorisation checks are a standard part of every endpoint template. Dependency scanning runs on every change without anyone thinking about it. When prevention lives in tooling, conventions, and review rather than in a checklist someone remembers under deadline pressure, the whole class of risk shrinks. Treat the OWASP list not as an exam to pass at release time but as a set of habits to encode into how the team writes code every day, so that doing the right thing requires no extra discipline.</p>

      <h2>The rest, briefly</h2>
      <p>Round out your defences against the remaining categories: enforce strong authentication and session management to prevent identification failures; verify the integrity of code and data in your pipeline; log and monitor security events so breaches are detected, not discovered months later; and validate any server-side request that uses a user-supplied URL to prevent SSRF. None of these are exotic. They are disciplines applied consistently, which is exactly what our <a href="/services/cloud-security">security and QA team</a> builds into client systems before launch.</p>
    `,
  },
  {
    slug: "docker-production-best-practices",
    title: "Docker in Production: 12 Best Practices We Apply on Every Project",
    excerpt:
      "Most Docker setups work in development but fail under production load. Here are the 12 practices that separate production-grade containers from development toys.",
    metaTitle: "Docker in Production: 12 Best Practices",
    metaDescription: "Most Docker setups work in development and fail under production load. Twelve practices that separate production-grade containers from development toys.",
    updated: "2026-06-16",
    category: "DevOps",
    tags: ["Docker", "Containers", "DevOps", "Production", "Security"],
    date: "2025-04-05",
    readTime: 9,
    author: { name: "AlgoCrew engineering", role: "Cloud, DevOps and security team", initials: "AC", color: "#38bdf8" },
    coverGradient: "linear-gradient(135deg, #00080f 0%, #0369a1 100%)",
    accent: "#0369a1",
    body: `
      <p>A Docker setup that works on a developer's laptop is a long way from one that survives production. The gap is a set of practices around image size, security, and reliability that are easy to skip and expensive to omit. Here are twelve we apply to every image before it ships, and they underpin the container choices in our <a href="/blog/kubernetes-vs-ecs-2025">orchestration guide</a>.</p>

      <h2>1. Use multi-stage builds</h2>
      <p>Build with all your tooling in one stage, then copy only the compiled output into a clean, minimal final image. Your build toolchain has no business in production. Multi-stage builds shrink images dramatically and remove an entire class of vulnerabilities that ship with build tools.</p>

      <h2>2. Start from minimal base images</h2>
      <p>A smaller base means a smaller attack surface and faster pulls. Prefer slim or distroless bases over full operating system images. Every package you do not include is a package that cannot have a vulnerability.</p>

      <h2>3. Run as a non-root user</h2>
      <p>By default containers run as root, so a container escape hands the attacker root. Create and switch to an unprivileged user. This is a foundational control that also appears in our <a href="/blog/kubernetes-security-hardening">cluster hardening</a> list.</p>

      <h2>4. Pin your versions</h2>
      <p>Avoid the latest tag. Pin base images and dependencies to specific versions so builds are reproducible and a surprise upstream change cannot break or compromise you silently.</p>

      <h2>5. Use a dockerignore file</h2>
      <p>Keep secrets, local config, and the version control directory out of the build context. It speeds builds and prevents accidentally baking sensitive files into an image.</p>

      <h2>6. Leverage layer caching</h2>
      <p>Order instructions from least to most frequently changing, and copy dependency manifests before source so dependency installation is cached. Well-ordered layers turn a slow build into a fast one.</p>

      <h2>7. One concern per container</h2>
      <p>A container should do one job. Combining a web server, a database, and a worker into one image defeats the point and makes scaling and recovery harder. Compose multiple single-purpose containers instead.</p>

      <h2>8. Add health checks</h2>
      <p>Define a health check so the orchestrator knows whether the application inside is actually working, not just whether the process is running. This is what lets traffic route only to healthy instances.</p>

      <h2>9. Handle signals properly</h2>
      <p>Ensure your process receives termination signals and shuts down gracefully, finishing in-flight work before exiting. Containers are killed and rescheduled constantly, so clean shutdown is a reliability feature.</p>

      <h2>10. Scan images for vulnerabilities</h2>
      <p>Make image scanning part of your <a href="/blog/ci-cd-pipeline-best-practices-2025">continuous integration pipeline</a> so known issues are caught before deployment, not after a breach.</p>

      <h2>11. Never bake in secrets</h2>
      <p>Secrets must not live in the image or the Dockerfile. Inject them at runtime through the environment or a secrets manager, because anything in the image is readable by anyone who pulls it.</p>

      <h2>Why small images matter more than you think</h2>
      <p>It is tempting to treat image size as a vanity metric, but in production it compounds across everything. Smaller images pull faster, which means quicker deployments, faster autoscaling when traffic spikes, and less time to recover when a node fails and workloads must be rescheduled. They also have a smaller attack surface, because every tool and library you did not include is one that cannot harbour a vulnerability. A bloated image carrying a full operating system and a build toolchain is slower, more expensive to store and transfer, and riskier, all at once. The discipline of multi-stage builds and minimal bases is not aesthetic housekeeping; it directly improves how quickly and safely your system responds to the events that matter most, which are exactly the moments when you cannot afford a slow pull.</p>

      <h2>12. Set resource limits</h2>
      <p>Constrain CPU and memory so one container cannot starve its neighbours. Limits are both a reliability and a security control. If you want your containerisation reviewed against this list, our <a href="/services/devops">cloud and DevOps team</a> does it routinely.</p>
    `,
  },
  {
    slug: "terraform-infrastructure-as-code-patterns",
    title: "Terraform at Scale: Patterns That Don't Fall Apart at 50+ Resources",
    excerpt:
      "Terraform is easy to start with and hard to scale. Here are the module patterns, state management strategies, and team workflows that keep large infrastructure codebases maintainable.",
    metaTitle: "Terraform at Scale: Patterns That Hold Up",
    metaDescription: "Terraform is easy to start and hard to scale. Module patterns, state strategies and team workflows that keep large codebases maintainable.",
    updated: "2026-06-16",
    category: "DevOps",
    tags: ["Terraform", "IaC", "AWS", "Infrastructure", "DevOps"],
    date: "2025-03-22",
    readTime: 10,
    author: { name: "AlgoCrew engineering", role: "Cloud, DevOps and security team", initials: "AC", color: "#a78bfa" },
    coverGradient: "linear-gradient(135deg, #0a0014 0%, #7c3aed 100%)",
    accent: "#7c3aed",
    body: `
      <p>Terraform makes it easy to stand up infrastructure and surprisingly hard to keep that infrastructure maintainable as it grows. A few hundred resources in, the patterns that worked for a quick proof of concept start to fall apart. Here are the practices that keep a large infrastructure codebase manageable for a whole team rather than comprehensible to only its author.</p>

      <h2>Structure around modules</h2>
      <p>Group related resources into reusable modules with clear inputs and outputs, the same way you would extract a well-named function. A module should do one thing and hide its internals. This is what lets you compose infrastructure instead of copying and pasting blocks, and it keeps changes local instead of rippling everywhere.</p>

      <h2>Separate environments cleanly</h2>
      <p>Staging and production must be isolated so a change to one cannot accidentally affect the other. Keep their state separate and drive the differences through variables rather than duplicated code. The goal is environments that are identical in shape and different only in their parameters.</p>

      <h2>Treat state as critical infrastructure</h2>
      <p>The state file is the source of truth for what exists, and corrupting or losing it is a genuine incident. Store it remotely with locking so two people cannot apply at once, enable versioning so you can recover, and never edit it by hand. Most catastrophic Terraform stories are really state-management stories.</p>

      <h2>Pin provider and module versions</h2>
      <p>Unpinned versions mean an unrelated upstream release can change your plan unexpectedly. Pin provider and module versions so infrastructure changes happen when you choose, not when an upstream maintainer ships. Reproducibility is as important here as it is in your <a href="/blog/ci-cd-pipeline-best-practices-2025">application pipeline</a>.</p>

      <h2>Plan in code review, apply through automation</h2>
      <p>Run the plan automatically on every change and make the output part of review, so the team can see exactly what will change before it does. Apply through a controlled pipeline rather than from laptops, so there is one auditable path to production infrastructure and no surprise local applies.</p>

      <h2>Keep secrets out of state and code</h2>
      <p>Sensitive values can end up in plain text in state, so manage them through a secrets manager and reference them rather than hardcoding. This is part of the same hygiene that protects your <a href="/blog/supply-chain-security-software">build and deployment pipeline</a>.</p>

      <h2>The discipline that keeps it sane</h2>
      <p>Beyond any specific pattern, the habit that separates maintainable infrastructure code from a liability is treating it exactly like application code. It gets reviewed before it merges, it has a single controlled path to production, and nobody changes production by hand outside of it. The moment people start making quick manual changes in the cloud console to fix something urgent, the code stops describing reality and every future change becomes a gamble. Detecting and reconciling that drift is tedious, so the better answer is a culture where the console is read-only for humans and all changes flow through the reviewed pipeline. This is unglamorous, and it is the difference between infrastructure you can reason about and a configuration that technically exists in version control while production has quietly diverged from it.</p>

      <h2>Watch for drift and cost</h2>
      <p>Detect drift when reality diverges from the code, because manual console changes erode the guarantees infrastructure-as-code is supposed to provide. And review what your configuration actually costs, since it is easy to provision generously in code, which ties directly into our <a href="/blog/aws-cost-optimisation-engineering-guide">cloud cost work</a>. If you want infrastructure built this way from the start, our <a href="/services/devops">cloud and DevOps team</a> does it.</p>
    `,
  },
  {
    slug: "api-security-best-practices-2025",
    title: "API Security in 2025: The Complete Checklist for Production APIs",
    excerpt:
      "APIs are the attack surface of modern applications. Here's a comprehensive checklist covering authentication, rate limiting, input validation, and everything between that we apply before any API goes live.",
    metaTitle: "API Security in 2025: A Production Checklist",
    metaDescription: "APIs are the attack surface of modern apps. A complete production checklist: authentication, authorisation, rate limiting, input validation, and more.",
    updated: "2026-06-16",
    category: "Security",
    tags: ["API", "Security", "Authentication", "REST", "OAuth"],
    date: "2025-03-08",
    readTime: 10,
    author: { name: "AlgoCrew engineering", role: "Cloud, DevOps and security team", initials: "AC", color: "#ef4444" },
    coverGradient: "linear-gradient(135deg, #110000 0%, #b91c1c 100%)",
    accent: "#b91c1c",
    body: `
      <p>APIs are where modern applications meet the internet, which makes them the primary attack surface. Securing an API is not one big feature but a set of disciplines applied consistently to every endpoint. This is the checklist we run before any API we build goes live, and it complements the category-by-category fixes in our <a href="/blog/owasp-top-10-2025-developer-guide">OWASP Top 10 guide</a>.</p>

      <h2>Authentication: prove who is calling</h2>
      <p>Every non-public endpoint must verify identity. Use a well-tested standard rather than rolling your own, keep tokens short-lived, and handle refresh carefully. Tokens are also where many teams go wrong in subtle ways, which is why we wrote a dedicated piece on <a href="/blog/jwt-security-common-mistakes">JWT mistakes that get applications breached</a>.</p>

      <h2>Authorisation: check what they can do</h2>
      <p>Authentication is not authorisation. After you know who the caller is, you must check whether they are allowed to perform this specific action on this specific resource. Enforce it on the server for every request, check ownership of records, and deny by default. Broken authorisation is consistently the most damaging API flaw.</p>

      <h2>Validate every input</h2>
      <p>Treat all incoming data as hostile. Validate types, ranges, and formats against a strict schema and reject anything that does not conform. This single discipline closes off injection, malformed-data crashes, and a long tail of abuse. Validation belongs at the boundary, before the data touches any business logic.</p>

      <h2>Rate limit and throttle</h2>
      <p>Without rate limiting, a single client can overwhelm your service or brute-force credentials. Apply sensible limits per client and stricter limits on sensitive operations like login. A shared, atomic store makes this reliable across instances, which is one of the production Redis patterns we rely on.</p>

      <h2>Do not leak information</h2>
      <p>Error responses should help legitimate developers without handing attackers a map. Keep production errors generic, never return stack traces or internal identifiers, and be careful that timing and response differences do not reveal whether an account exists. Verbose errors are a quiet but real vulnerability.</p>

      <h2>Transport and headers</h2>
      <p>Serve everything over TLS, with no plaintext fallback, and set the security headers that instruct browsers to behave safely. Configure cross-origin policy explicitly rather than allowing everything. These are low-effort, high-value controls that should be defaults on every service.</p>

      <h2>Test it like an attacker would</h2>
      <p>A checklist applied at design time is necessary but not sufficient, because the gap between intended behaviour and actual behaviour is where breaches live. The complement is to probe your own API the way an attacker would: try to access another user's records by changing an id, send malformed and oversized payloads, hammer an endpoint to see whether rate limiting actually engages, and call privileged operations with an under-privileged token. Much of this can be automated and run continuously, so a regression in an authorisation check is caught the same way a failing unit test would be. Security that is only verified by reading the code on the day it was written decays as the code changes around it. Treat these abuse cases as first-class tests that run on every change, and the checklist becomes a guarantee rather than an intention.</p>

      <h2>Log, monitor, and assume breach</h2>
      <p>Record security-relevant events so you can detect and investigate abuse, and alert on the patterns that indicate an attack in progress. Combined with a <a href="/blog/zero-trust-security-architecture-guide">zero trust posture</a>, this is what turns a breach from a silent catastrophe into a contained incident. If you want this checklist enforced on your APIs by specialists, our <a href="/services/cloud-security">security and QA service</a> does exactly that.</p>
    `,
  },
  {
    slug: "observability-beyond-monitoring",
    title: "Observability vs Monitoring: Why Dashboards Aren't Enough",
    excerpt:
      "Monitoring tells you when something is broken. Observability tells you why. Here's how we implement the three pillars, metrics, logs, and traces, to achieve true system understanding.",
    metaTitle: "Observability vs Monitoring: The Real Difference",
    metaDescription: "Monitoring tells you when something broke. Observability tells you why. How to use metrics, logs and traces for real understanding.",
    updated: "2026-06-16",
    category: "DevOps",
    tags: ["Observability", "Monitoring", "OpenTelemetry", "Prometheus", "Grafana"],
    date: "2025-02-18",
    readTime: 9,
    author: { name: "AlgoCrew engineering", role: "Cloud, DevOps and security team", initials: "AC", color: "#34d399" },
    coverGradient: "linear-gradient(135deg, #001a0f 0%, #059669 100%)",
    accent: "#059669",
    body: `
      <p>Monitoring and observability are often used interchangeably, but they answer different questions. Monitoring tells you when a known thing has gone wrong: a dashboard goes red, an alert fires. Observability lets you ask why, including questions you never thought to predefine. As systems grow more distributed, the gap between the two becomes the gap between guessing and understanding.</p>

      <h2>Why monitoring alone is not enough</h2>
      <p>Traditional monitoring watches for predefined conditions: error rate above a threshold, disk nearly full. That is necessary but limited, because it only catches failure modes you anticipated. Real incidents are frequently novel, and a dashboard built for last quarter's problems will not explain this quarter's. You need the ability to explore, not just to be alerted.</p>

      <h2>The first pillar: metrics</h2>
      <p>Metrics are numeric measurements over time: request rates, latencies, error counts, resource usage. They are cheap to store and ideal for dashboards and alerting because they aggregate well. Metrics are how you notice that something is wrong and roughly where, and they are the natural home for the service-level objectives in our <a href="/blog/sre-practices-for-startups">SRE guide</a>.</p>

      <h2>The second pillar: logs</h2>
      <p>Logs are timestamped records of discrete events, and they carry the detail metrics lack. The key to useful logs is structure: emit them as structured data with consistent fields rather than free-form text, so they can be searched and correlated. A flood of unstructured log lines is noise; well-structured logs are evidence.</p>

      <h2>The third pillar: traces</h2>
      <p>Distributed tracing follows a single request across every service it touches, showing where the time went and where it failed. In a system of many services, or an <a href="/blog/event-driven-architecture-patterns">event-driven architecture</a> where a flow hops through several handlers, tracing is what turns an impossible debugging session into a readable timeline. It is the pillar teams most often skip and most regret skipping.</p>

      <h2>Correlate the three</h2>
      <p>The real power comes from connecting the pillars. A metric shows latency rising, a trace shows which service is slow, and the logs for that service explain why, all linked together. Observability is less about having three separate tools than about being able to move fluidly between them while investigating one problem.</p>

      <h2>Cost and signal-to-noise</h2>
      <p>Observability has a failure mode that is the opposite of too little data: collecting so much that it is both expensive and useless. Logging everything at full detail and retaining it forever produces enormous bills and a haystack in which the important signal is impossible to find. The skill is deciding what is worth keeping and for how long. High-cardinality detail is invaluable while investigating an incident and largely worthless a month later, so sampling, sensible retention, and aggregation matter. The aim is not maximum data, it is the ability to answer the questions you actually ask during an incident, at a cost you can sustain. A lean, well-structured set of signals you trust beats an exhaustive firehose nobody can afford to query, and it keeps the team looking at telemetry instead of ignoring it.</p>

      <h2>Make it actionable</h2>
      <p>Telemetry is only valuable if it drives action. Alert on symptoms that matter to users rather than on every fluctuation, so people trust the alerts instead of muting them. Tie what you collect to the questions you actually ask during an incident. Often the path from a slow trace leads straight to a database query that needs work. If you want observability built into your systems properly, our <a href="/services/devops">cloud and DevOps team</a> implements all three pillars.</p>
    `,
  },
  {
    slug: "aws-cost-optimisation-engineering-guide",
    title: "AWS Cost Optimisation: How We Cut Client Bills by 40% Without Touching Code",
    excerpt:
      "Cloud bills grow fast and invisibly. Here are the 10 levers we pull on every AWS account, most take under an hour to implement and the savings compound month over month.",
    metaTitle: "AWS Cost Optimisation: 10 Levers That Work",
    metaDescription: "Cloud bills grow fast and invisibly. Ten levers we pull on every AWS account, most take under an hour to apply and the savings compound month over month.",
    updated: "2026-06-16",
    category: "DevOps",
    tags: ["AWS", "Cost Optimisation", "Cloud", "FinOps"],
    date: "2025-01-30",
    readTime: 8,
    author: { name: "AlgoCrew engineering", role: "Cloud, DevOps and security team", initials: "AC", color: "#fbbf24" },
    coverGradient: "linear-gradient(135deg, #0d0a00 0%, #d97706 100%)",
    accent: "#d97706",
    body: `
      <p>Cloud bills grow quietly until someone finally looks at the invoice and panics. The good news is that most accounts carry a lot of obvious waste, and removing it does not require touching application code. Here are ten levers we pull on AWS accounts, ordered roughly from quickest to most involved, and they share the same cost-shape thinking as our <a href="/blog/serverless-vs-containers-2025">serverless versus containers</a> guide.</p>

      <h2>1. Delete what nobody is using</h2>
      <p>Every account accumulates orphaned resources: unattached storage volumes, idle load balancers, old snapshots, stopped instances still paying for their disks. Finding and removing them is the fastest saving available and often the largest single one.</p>

      <h2>2. Right-size over-provisioned resources</h2>
      <p>Teams provision generously to be safe and never revisit it. Look at actual utilisation and shrink instances that sit mostly idle. Matching capacity to real usage frequently cuts a meaningful share of compute spend with no impact on performance.</p>

      <h2>3. Commit to baseline usage</h2>
      <p>For the steady, predictable portion of your workload, commitment-based pricing offers a substantial discount over on-demand rates. Analyse your baseline and commit to what you know you will use, while keeping on-demand for the variable top layer.</p>

      <h2>4. Use spot capacity for interruptible work</h2>
      <p>Batch jobs, build runners, and other fault-tolerant workloads can run on heavily discounted spare capacity, as long as they handle interruption gracefully. This is one of the largest discounts available for the right kind of work.</p>

      <h2>5. Set storage lifecycle rules</h2>
      <p>Data you rarely access does not need premium storage. Automatically move older data to cheaper tiers and expire what you no longer need, so storage cost reflects how the data is actually used.</p>

      <h2>6. Watch data transfer</h2>
      <p>Moving data between regions and out to the internet carries charges that surprise people. Keep traffic within a region where possible and use a CDN to cut repeated egress for the same content.</p>

      <h2>7. Choose the right compute model</h2>
      <p>Sometimes the cheapest win is architectural: a rarely used service may be far cheaper as a function than an always-on instance. Match the compute model to the traffic shape, as covered in our <a href="/blog/kubernetes-vs-ecs-2025">orchestration guide</a>.</p>

      <h2>8. Tag everything and attribute cost</h2>
      <p>You cannot manage what you cannot attribute. Consistent tagging lets you see which team, product, or feature drives spend, which turns cost from a mystery into something owners can act on.</p>

      <h2>9. Set budgets and alerts</h2>
      <p>Configure spending alerts so a runaway cost is caught in days, not at the end of the billing month. Cost should be monitored like any other production signal, an idea straight out of our <a href="/blog/observability-beyond-monitoring">observability guide</a>.</p>

      <h2>Make cost an engineering habit</h2>
      <p>The reason cloud bills balloon is that, for most teams, spending money is frictionless and nobody owns the total. An engineer can provision a generous instance in seconds and never see the monthly consequence. The durable fix is cultural as much as technical: give teams visibility into what their own services cost, fold a quick cost glance into the same reviews that already look at performance and security, and treat a surprising bill as a bug to investigate rather than a fact of life. None of the individual levers here are difficult, and that is precisely the problem, because easy savings that nobody is responsible for simply do not happen. When cost becomes a normal engineering signal that owners watch alongside latency and error rate, efficiency stops being a periodic cleanup and becomes a steady state.</p>

      <h2>10. Review regularly</h2>
      <p>Cost optimisation is not a one-time cleanup. Usage drifts, new resources appear, and savings erode. A short recurring review keeps the account efficient over time. If you want this run as an ongoing discipline rather than a panic, our <a href="/services/devops">cloud and DevOps team</a> manages it.</p>
    `,
  },
  {
    slug: "jwt-security-common-mistakes",
    title: "JWT Security: 8 Common Mistakes That Get Applications Breached",
    excerpt:
      "JWTs are widely used and widely misunderstood. These 8 implementation mistakes have caused real-world breaches, here's how to identify and fix them in your application.",
    metaTitle: "JWT Security: 8 Mistakes That Get You Breached",
    metaDescription: "JWTs are widely used and widely misunderstood. Eight implementation mistakes behind real breaches, and how to find and fix each one.",
    updated: "2026-06-16",
    category: "Security",
    tags: ["JWT", "Security", "Authentication", "API", "Node.js"],
    date: "2025-01-18",
    readTime: 7,
    author: { name: "AlgoCrew engineering", role: "Cloud, DevOps and security team", initials: "AC", color: "#ef4444" },
    coverGradient: "linear-gradient(135deg, #0f0000 0%, #991b1b 100%)",
    accent: "#991b1b",
    body: `
      <p>JSON Web Tokens are everywhere in modern authentication, and they are misunderstood almost as often as they are used. The token format itself is fine. The breaches come from a recurring set of implementation mistakes. Here are eight that have caused real-world compromises, and how to avoid each. They sit underneath the authentication layer in our <a href="/blog/api-security-best-practices-2025">API security checklist</a>.</p>

      <h2>1. Trusting the algorithm in the token</h2>
      <p>A classic attack abuses servers that read the signing algorithm from the token header. An attacker switches it to "none" or downgrades it, and a naive verifier accepts a forged token. Always enforce the expected algorithm on the server and reject anything else, rather than trusting the token to declare how it should be verified.</p>

      <h2>2. Putting secrets in the payload</h2>
      <p>A JWT payload is encoded, not encrypted. Anyone holding the token can read it. Putting sensitive data in there exposes it to anyone who intercepts or inspects the token. Keep the payload to non-sensitive identifiers and claims.</p>

      <h2>3. Weak or shared signing keys</h2>
      <p>A short, guessable signing secret can be brute-forced offline, after which an attacker can mint valid tokens at will. Use a long, random key, store it securely, and never commit it to source control, which ties directly into <a href="/blog/supply-chain-security-software">securing your build pipeline</a>.</p>

      <h2>4. No expiry, or expiry too long</h2>
      <p>A token that never expires is a permanent credential, so a single leak is forever. Keep access tokens short-lived and use a separate refresh mechanism. The shorter the window, the smaller the blast radius of a stolen token.</p>

      <h2>5. No way to revoke</h2>
      <p>Stateless tokens are valid until they expire, which is awkward when you need to log someone out or respond to a compromise immediately. Maintain a revocation list or keep access-token lifetimes short enough that revocation is rarely needed, ideally both.</p>

      <h2>6. Storing tokens unsafely in the browser</h2>
      <p>Tokens in places accessible to JavaScript are exposed to cross-site scripting. Prefer secure, http-only cookies with appropriate flags so a script flaw cannot read the token. How you store the token is as important as how you sign it.</p>

      <h2>7. Skipping full validation</h2>
      <p>Verifying the signature is not enough. Check the issuer, the audience, and the expiry on every request. A token that is validly signed but intended for a different service or already expired must still be rejected.</p>

      <h2>The pattern behind the mistakes</h2>
      <p>Look across these eight errors and a single theme emerges: trouble comes from treating a token as inherently trustworthy rather than as a claim to be verified rigorously every time. The algorithm, the issuer, the audience, the expiry, the storage location, and the signing key are each a place where misplaced trust opens a door. A useful mental exercise is to assume an attacker has seen your token and can craft their own, then ask what stops a forged or stolen one from working. If the honest answer is a long random key kept secret, strict server-side verification of every claim, short lifetimes, and safe storage, you are in good shape. If any of those is weak, that is your vulnerability. The token format is sound; the security lives entirely in the discipline of how you issue, store, and verify.</p>

      <h2>8. Using JWTs where a session would be simpler</h2>
      <p>JWTs shine for stateless, cross-service authentication. For a single traditional web application, a server session is often simpler and easier to revoke. Choosing the token because it is fashionable, rather than because it fits, is its own mistake. If you want your authentication reviewed against these pitfalls, our <a href="/services/cloud-security">security team</a> audits exactly this.</p>
    `,
  },
  {
    slug: "microservices-vs-monolith-honest-guide",
    title: "Microservices vs Monolith: The Honest Guide Nobody Writes",
    excerpt:
      "Microservices are oversold. Monoliths are under-defended. Here's an evidence-based framework for choosing architecture based on your actual team size, traffic, and domain complexity.",
    metaTitle: "Microservices vs Monolith: An Honest Guide",
    metaDescription: "Microservices are oversold and monoliths under-defended. A practical framework for choosing architecture by team size, traffic, and real domain complexity.",
    updated: "2026-06-16",
    category: "Engineering",
    tags: ["Microservices", "Architecture", "Monolith", "System Design"],
    date: "2025-01-05",
    readTime: 9,
    author: { name: "AlgoCrew engineering", role: "Cloud, DevOps and security team", initials: "AC", color: "#06c8e8" },
    coverGradient: "linear-gradient(135deg, #000d1a 0%, #1d4ed8 100%)",
    accent: "#1d4ed8",
    body: `
      <p>The microservices conversation generates more heat than light. One camp treats services as the only serious way to build software, the other treats the monolith as a badge of pragmatism. Both positions skip the only question that matters: what does your team size, traffic, and domain complexity actually require right now? Architecture is a response to constraints, not an identity.</p>

      <h2>Start with the modular monolith</h2>
      <p>For almost every new product, the right starting point is a single deployable application with clean internal module boundaries. You get one codebase to reason about, one deployment, local function calls instead of network hops, and transactions that just work. A well-structured monolith is not technical debt. It is the architecture that lets a small team move fast while the domain is still being discovered. Premature service decomposition is one of the most expensive mistakes dressed up as best practice.</p>

      <h2>What microservices actually cost</h2>
      <p>Splitting into services trades in-process simplicity for distributed-systems complexity. Now a single user action may cross several network boundaries, each of which can fail, retry, or time out. You inherit eventual consistency, distributed tracing, service discovery, and a deployment surface that multiplies. These are solvable problems, but solving them consumes engineering capacity that a small team usually needs for the product itself.</p>

      <h2>The signals that justify splitting</h2>
      <p>Reach for services when you have concrete pressure, not aspiration. Different parts of the system need to scale independently. Separate teams keep colliding in the same deployment and need autonomy. One component has genuinely different reliability or compliance requirements. When these forces are real, the operational cost of services buys you something. When they are hypothetical, it just buys you complexity.</p>

      <h2>Conway's law is not optional</h2>
      <p>Your architecture will come to mirror your communication structure whether you plan for it or not. Two teams will struggle to share one tightly coupled service, and one team will struggle to coordinate ten. Choose boundaries that match how your people are actually organised, and revisit them when the organisation changes. Boundaries drawn on a whiteboard that ignore team structure tend to dissolve in practice.</p>

      <h2>Decompose along the domain, not the layer</h2>
      <p>When you do split, draw boundaries around business capabilities rather than technical layers. A service that owns "billing" end to end is far healthier than a "database service" and a separate "API service" that must change together for every feature. Capability-aligned services can evolve independently, which is the entire point. Many teams find that <a href="/blog/event-driven-architecture-patterns">event-driven patterns</a> are what make those boundaries genuinely decoupled rather than distributed-monolith in disguise.</p>

      <h2>The migration path that works</h2>
      <p>When a team does outgrow its monolith, the failure mode is trying to rewrite the whole thing into services at once, which stalls feature work for months and frequently collapses under its own ambition. The path that works is incremental. Keep the monolith running, identify the one capability under the most pressure, and extract just that into a service while everything else stays put. Each extraction teaches you something about your real boundaries and delivers value on its own, so the effort is never an all-or-nothing bet. This is only feasible if the monolith had clean internal modules to begin with, which is the strongest argument for investing in those seams early even when you have no immediate plan to split. A well-structured monolith is not the opposite of microservices; it is the on-ramp to them.</p>

      <h2>A pragmatic default</h2>
      <p>Begin with a modular monolith, keep the module seams clean so extraction is cheap later, and split a service out only when a real constraint demands it. This path keeps you fast early and gives you a clear, low-drama route to services when you have earned the need. If you want help designing that evolution, our <a href="/services/devops">cloud and DevOps team</a> does this regularly, and you can compare it with our take on <a href="/blog/serverless-vs-containers-2025">serverless versus containers</a> for the runtime decision.</p>
    `,
  },
  {
    slug: "redis-patterns-production",
    title: "Redis in Production: 7 Patterns Beyond Simple Caching",
    excerpt:
      "Most teams use Redis as a key-value cache and stop there. Here are 7 production patterns, rate limiting, distributed locks, pub/sub, queues, and more, that Redis handles better than purpose-built tools.",
    metaTitle: "Redis in Production: 7 Patterns Beyond Caching",
    metaDescription: "Most teams use Redis only as a cache. Seven production patterns, rate limiting, locks, pub/sub, queues, and more, that Redis handles better than bespoke tools.",
    updated: "2026-06-16",
    category: "Engineering",
    tags: ["Redis", "Caching", "Performance", "Architecture", "Node.js"],
    date: "2024-11-30",
    readTime: 8,
    author: { name: "AlgoCrew engineering", role: "Cloud, DevOps and security team", initials: "AC", color: "#ef4444" },
    coverGradient: "linear-gradient(135deg, #1a0000 0%, #dc2626 100%)",
    accent: "#dc2626",
    body: `
      <p>Most teams reach for Redis as a simple key-value cache and never look further, which leaves a remarkable amount of capability on the table. Redis is a fast, versatile data structure server, and several problems that teams solve by building bespoke infrastructure are better handled by a Redis pattern they already have running. Here are seven that earn their place in production.</p>

      <h2>1. Caching, done deliberately</h2>
      <p>Caching is the obvious use, but doing it well takes thought. Decide on sensible expiry, choose between lazy-loading on miss and writing through on update, and plan for the thundering herd when a popular key expires and every request stampedes the database at once. Done right, a cache is the cheapest database performance win available.</p>

      <h2>2. Rate limiting</h2>
      <p>Redis is ideal for rate limiting because counters are atomic and expiry is built in. A sliding-window or token-bucket limiter backed by Redis protects your APIs from abuse and accidental overload with a few operations, and it works across many application instances because the state lives in one shared place. This is a core building block of the controls in our <a href="/blog/api-security-best-practices-2025">API security checklist</a>.</p>

      <h2>3. Distributed locks</h2>
      <p>When multiple instances must coordinate so that only one performs a task at a time, a Redis lock with a sensible timeout is a pragmatic solution. It needs care around expiry and ownership to avoid two workers believing they hold the lock, but for many coordination problems it is far simpler than standing up a dedicated coordination service.</p>

      <h2>4. Pub/sub and lightweight messaging</h2>
      <p>Redis pub/sub lets services broadcast messages to subscribers in real time, which is handy for live notifications and fan-out updates. It is fire-and-forget rather than durable, so for anything that must not be lost you want a stream or a real queue, but for ephemeral real-time signalling it is simple and fast, and it pairs naturally with <a href="/blog/event-driven-architecture-patterns">event-driven designs</a>.</p>

      <h2>5. Job queues</h2>
      <p>Backgrounding slow work keeps your request path fast. Redis-backed queues let you push tasks like sending email, generating reports, or processing uploads to worker processes that handle them asynchronously. Redis Streams add durability and consumer groups when you need delivery guarantees beyond a simple list.</p>

      <h2>6. Session and ephemeral state</h2>
      <p>Storing sessions in Redis lets a stateless application scale horizontally, because any instance can serve any user by reading shared session state. Built-in expiry handles cleanup automatically. The same approach suits any short-lived state that should survive a single request but does not belong in your primary database.</p>

      <h2>Know what Redis is not</h2>
      <p>The flip side of Redis being useful for so many things is the temptation to use it for everything, including jobs it is wrong for. It is an in-memory store, so the working set is bounded by memory and is more expensive per gigabyte than disk. It is not a durable primary database, and treating it as your only copy of important data is asking to lose it during a restart or eviction. For anything that must survive and be the source of truth, Redis complements a primary database rather than replacing it. The right mental model is a fast, versatile layer in front of and alongside your real datastore, handling hot reads, coordination, and ephemeral state, while the durable record of truth lives somewhere built for durability. Used within those limits it is superb; pushed beyond them it becomes a liability.</p>

      <h2>7. Real-time leaderboards and counters</h2>
      <p>Sorted sets make ranking and leaderboards trivial and fast, and atomic increments make accurate high-throughput counters easy. These are awkward and slow to do in a relational database under load, and a natural fit for Redis. If you want help deciding which of these patterns fit your system and wiring them up safely, our <a href="/services/devops">cloud and DevOps team</a> uses them in production regularly.</p>
    `,
  },
  {
    slug: "typescript-advanced-patterns-2025",
    title: "TypeScript Patterns That Make Large Codebases Maintainable",
    excerpt:
      "TypeScript's type system is more powerful than most teams use. These patterns, branded types, discriminated unions, template literal types, and inferred types, eliminate entire categories of runtime bugs.",
    metaTitle: "TypeScript Patterns for Maintainable Codebases",
    metaDescription: "TypeScript's type system is more powerful than most teams use. Patterns, branded types, discriminated unions, and inference, that eliminate runtime bugs.",
    updated: "2026-06-16",
    category: "Engineering",
    tags: ["TypeScript", "Patterns", "Type Safety", "JavaScript"],
    date: "2024-11-10",
    readTime: 8,
    author: { name: "AlgoCrew engineering", role: "Cloud, DevOps and security team", initials: "AC", color: "#38bdf8" },
    coverGradient: "linear-gradient(135deg, #00080a 0%, #0891b2 100%)",
    accent: "#0891b2",
    body: `
      <p>Most teams use TypeScript as JavaScript with a few annotations, which leaves most of its value untapped. Used well, the type system eliminates entire categories of runtime bugs at compile time and makes a large codebase safe to change. These are the patterns that deliver the most maintainability, and they pay off most in the kind of long-lived applications we build through our web engineering work.</p>

      <h2>Discriminated unions for state</h2>
      <p>Application state is full of cases that should be mutually exclusive: loading, loaded, error. Modelling these as a discriminated union, where a shared tag field distinguishes each case, lets the compiler force you to handle every possibility and prevents impossible states like loaded-but-also-error. This single pattern removes a huge class of "cannot read property of undefined" bugs by making the bad states unrepresentable.</p>

      <h2>Branded types for values that look alike</h2>
      <p>A user id and an order id are both strings, and nothing stops you from passing one where the other is expected. Branded types attach a compile-time tag to a primitive so the type system treats them as distinct, catching mix-ups that would otherwise be silent runtime bugs. They are invaluable for ids, validated values, and units.</p>

      <h2>Lean on inference, annotate boundaries</h2>
      <p>Good TypeScript is not covered in explicit type annotations. Let inference do the work inside functions, and reserve explicit types for the boundaries: function signatures, public APIs, and module exports. This keeps code readable while still giving you strong guarantees where they matter, and it makes refactoring safer because the compiler propagates changes through inferred types.</p>

      <h2>Make illegal states unrepresentable</h2>
      <p>The overarching principle behind these patterns is to design types so that invalid combinations simply cannot be constructed. If two fields must either both be present or both absent, model them as a single optional object rather than two independent optionals. The more the types encode your real rules, the fewer runtime checks and defensive branches you need.</p>

      <h2>Template literal types for string contracts</h2>
      <p>Template literal types let you describe the shape of strings, such as route patterns or event names, at the type level. This catches typos in things that used to be stringly-typed and only failed at runtime, turning a class of silent mistakes into compile errors.</p>

      <h2>Types are documentation that cannot rot</h2>
      <p>Beyond catching bugs, the underrated benefit of using the type system well is that the types become living documentation. A function signature that precisely describes what it accepts and returns tells the next engineer exactly how to use it, and unlike a comment it can never drift out of sync with the code, because the compiler enforces it. A discriminated union that enumerates every state of a feature is a clearer specification of that feature than any wiki page. This is why investing in good types pays off most on long-lived codebases and larger teams, where the people changing the code are often not the people who wrote it. The types carry the intent forward. Comments lie eventually; well-designed types cannot, which makes them the most reliable form of documentation a codebase can have.</p>

      <h2>Use the strictest configuration</h2>
      <p>Enable strict mode and resist the urge to reach for escape hatches. Every use of the any type or a non-null assertion is a hole in the guarantees you are paying for. The discipline of keeping the codebase genuinely strict is what makes the type system trustworthy, and it is the kind of standard a strong code review culture enforces. These patterns also shine in a Next.js application, where types flow across the server and client boundary.</p>
    `,
  },
  {
    slug: "web-performance-core-web-vitals-2025",
    title: "Core Web Vitals in 2025: How We Achieve Green Scores on Complex Apps",
    excerpt:
      "Google's Core Web Vitals directly impact search ranking and user retention. Here's the exact optimisation process we use to get complex, data-heavy applications into the green across all three metrics.",
    metaTitle: "Core Web Vitals in 2025: A Practical Guide",
    metaDescription: "Core Web Vitals affect ranking and retention. The exact optimisation process we use to get complex, data-heavy applications into the green on all three metrics.",
    updated: "2026-06-16",
    category: "Engineering",
    tags: ["Performance", "Core Web Vitals", "Next.js", "SEO", "Web"],
    date: "2024-10-28",
    readTime: 9,
    author: { name: "AlgoCrew engineering", role: "Cloud, DevOps and security team", initials: "AC", color: "#4ade80" },
    coverGradient: "linear-gradient(135deg, #001a05 0%, #16a34a 100%)",
    accent: "#16a34a",
    body: `
      <p>Core Web Vitals are Google's measurable proxies for how a page feels to a real user, and they influence both search ranking and how many visitors stay. Getting a simple page into the green is easy. Doing it for a complex, data-heavy application takes a deliberate process. Here is the approach we use, and it connects directly to the backend performance work that often turns out to be the real bottleneck.</p>

      <h2>Understand the three metrics</h2>
      <p>The vitals measure three different feelings. One captures how quickly the main content appears, one captures how responsive the page is to interaction, and one captures how much the layout jumps around as it loads. They are distinct problems with distinct fixes, so the first step is always to find out which one you are actually failing.</p>

      <h2>Measure real users, not just your laptop</h2>
      <p>Your development machine on fast internet is not representative. Use field data from real users on real devices and networks alongside lab tests. Optimising against a lab score while real users on mid-range phones suffer is a common and wasteful mistake. Measure first, then fix the metric that is actually failing for real people.</p>

      <h2>Make content appear faster</h2>
      <p>The largest content element appearing quickly is mostly about getting critical resources to the browser fast: efficient server responses, sensible caching, optimised and properly sized images, and not blocking the initial render on non-essential work. Server-rendering the meaningful content, as a framework like Next.js does, helps a great deal here.</p>

      <h2>Keep interactions responsive</h2>
      <p>Responsiveness suffers when the main thread is busy running too much JavaScript when the user tries to interact. Ship less script, break up long tasks, and defer non-critical work. A page that looks ready but freezes when tapped is failing the user even if it rendered quickly.</p>

      <h2>Stop the layout from jumping</h2>
      <p>Layout shift is maddening and entirely preventable. Reserve space for images and embeds by specifying their dimensions, avoid inserting content above what the user is already reading, and load fonts in a way that does not reflow the page. Most shift comes from a handful of fixable causes.</p>

      <h2>Performance is a feature, not a cleanup</h2>
      <p>The teams that keep their vitals green treat performance as an ongoing product concern rather than a task they do once before launch and forget. The reason is simple: applications get slower by default. Every new feature adds code, every new image adds weight, and every well-meaning addition nudges the numbers in the wrong direction until one day the page feels sluggish and nobody can point to the change that did it. The antidote is to make performance visible and owned, with a budget enforced automatically so a regression is caught at the moment it is introduced rather than discovered weeks later by frustrated users. Framed this way, performance stops being a heroic optimisation project and becomes a quiet standard the team maintains, which is far cheaper and far more effective than periodic rescue missions.</p>

      <h2>Treat performance as a budget</h2>
      <p>Performance regresses one reasonable-looking change at a time unless you defend it. Set a performance budget and enforce it in your <a href="/blog/ci-cd-pipeline-best-practices-2025">pipeline</a>, so a change that blows the budget is caught in review rather than discovered in production weeks later. Performance is not a one-time push but an ongoing standard. If you want a complex application brought into the green and kept there, our web engineering team does this work.</p>
    `,
  },
  {
    slug: "database-performance-optimisation",
    title: "Database Query Optimisation: From 8 Seconds to 80 Milliseconds",
    excerpt:
      "Slow database queries are the most common performance bottleneck in web applications. Here's a systematic approach to identifying and fixing them, illustrated with real queries we optimised in production.",
    metaTitle: "Database Query Optimisation: A Practical Guide",
    metaDescription: "Slow queries are the most common web performance bottleneck. A systematic method for finding and fixing them: indexes, query plans, and the N+1 problem.",
    updated: "2026-06-16",
    category: "Engineering",
    tags: ["Database", "PostgreSQL", "Performance", "SQL", "Optimisation"],
    date: "2024-10-12",
    readTime: 9,
    author: { name: "AlgoCrew engineering", role: "Cloud, DevOps and security team", initials: "AC", color: "#34d399" },
    coverGradient: "linear-gradient(135deg, #001a12 0%, #0d9488 100%)",
    accent: "#0d9488",
    body: `
      <p>Slow database queries are the most common performance bottleneck in web applications, and the good news is that fixing them is a systematic process rather than a dark art. Most dramatic speedups come from a small number of well-understood causes. The discipline is to measure first, change one thing, and measure again, rather than guessing.</p>

      <h2>Measure before you touch anything</h2>
      <p>The first rule is to find the actual slow query instead of optimising the one you assume is slow. Turn on slow-query logging, look at which queries dominate total time, and reproduce the worst offender in isolation. Optimisation without measurement is how teams spend a week speeding up a query that runs twice a day while ignoring the one that runs ten thousand times an hour.</p>

      <h2>Read the query plan</h2>
      <p>Every serious database can show you how it intends to execute a query. Learning to read that plan is the single highest-leverage database skill. It tells you whether the engine is scanning an entire table or using an index, where the time is going, and whether your mental model of the query matches reality. Almost every fix starts with looking at the plan and noticing a full scan where there should be an index lookup.</p>

      <h2>Indexes are the biggest lever</h2>
      <p>The most common cause of a slow query is a missing or unused index. Index the columns you filter and join on, and use composite indexes when you consistently query several columns together. But indexes are not free: each one adds write overhead and storage, so an over-indexed table is its own problem. The goal is the right indexes for your real query patterns, not an index on everything.</p>

      <h2>Kill the N+1 problem</h2>
      <p>The N+1 query problem is the most common performance bug in applications using an ORM. You fetch a list of items, then the code quietly issues one more query per item to load a relation, turning one screen into hundreds of round trips. Eager-load the relations you know you need in a single query instead. This pattern hides especially well behind GraphQL resolvers, where each field can trigger its own query unless you batch.</p>

      <h2>Select only what you need</h2>
      <p>Fetching every column when you need three wastes bandwidth, memory, and cache space, and can prevent the database from satisfying a query entirely from an index. Selecting only the required columns is a small change that compounds across every request. The same goes for pulling back thousands of rows to count or paginate them in application code instead of letting the database do it.</p>

      <h2>Fix the cause, not the symptom</h2>
      <p>When a query is slow, there is always a tempting shortcut: cache the result, add a read replica, or throw more hardware at it. Sometimes that is the right answer, but reaching for it first often hides a problem that will resurface and grow. A missing index, an N+1 pattern, or a query pulling far more data than it needs is a cause; caching over it treats the symptom and adds a new layer of complexity and potential staleness on top. The disciplined sequence is to understand why the query is slow by reading its plan, fix the underlying issue if there is one, and only then add caching or capacity for the load that genuinely remains. Caching a query that should simply have been indexed is one of the most common ways teams accumulate complexity while leaving the real problem in place.</p>

      <h2>When the query is already optimal</h2>
      <p>Sometimes the query is as fast as it can be and the data is simply hot. That is where a cache earns its place: put frequently read, infrequently changed results in Redis and serve them without touching the database at all. Knowing whether you have a query problem or a caching problem is the difference between hours and days of work, and it connects directly to your overall application performance. If you want a stubborn performance issue diagnosed properly, our <a href="/services/devops">engineering team</a> can help.</p>
    `,
  },
  {
    slug: "kubernetes-security-hardening",
    title: "Kubernetes Security Hardening: 10 Controls Every Cluster Needs",
    excerpt:
      "Default Kubernetes configurations are optimised for developer convenience, not security. Here are the 10 security controls we implement on every production cluster before going live.",
    metaTitle: "Kubernetes Security: 10 Essential Controls",
    metaDescription: "Default Kubernetes settings favour convenience over safety. Ten security controls we apply to every production cluster before it goes live.",
    updated: "2026-06-16",
    category: "Security",
    tags: ["Kubernetes", "Security", "DevSecOps", "Containers", "K8s"],
    date: "2024-09-28",
    readTime: 10,
    author: { name: "AlgoCrew engineering", role: "Cloud, DevOps and security team", initials: "AC", color: "#f87171" },
    coverGradient: "linear-gradient(135deg, #110005 0%, #be123c 100%)",
    accent: "#be123c",
    body: `
      <p>Kubernetes defaults are tuned for developer convenience, not security, which means a freshly stood-up cluster is not production-safe. Hardening it is a finite, well-understood list of controls. Here are the ten we apply to every cluster before it serves real traffic, and they are a concrete expression of <a href="/blog/zero-trust-security-architecture-guide">zero trust</a> inside the cluster.</p>

      <h2>1. Role-based access control, scoped tightly</h2>
      <p>Grant the minimum permissions each user and service account needs. The default of broad access is exactly what an attacker exploits after a single compromise. Deny by default and grant specific roles deliberately.</p>

      <h2>2. Network policies</h2>
      <p>By default, every pod can talk to every other pod. Define network policies so components communicate only with what they actually need. This micro-segmentation contains a compromise instead of letting it spread.</p>

      <h2>3. Drop root and restrict capabilities</h2>
      <p>Containers should not run as root. Set security contexts to run as a non-root user, drop unnecessary Linux capabilities, and use a read-only root filesystem where possible so a compromised container has little to work with.</p>

      <h2>4. Pod security standards</h2>
      <p>Enforce baseline pod security so workloads cannot request dangerous privileges like host access or privileged mode. An admission policy that rejects unsafe pod specs stops the problem before it is deployed.</p>

      <h2>5. Manage secrets properly</h2>
      <p>Native secrets are only base64-encoded, not encrypted, by default. Enable encryption at rest, restrict who can read secrets, and consider an external secrets manager. This connects to keeping signing keys and credentials out of your <a href="/blog/supply-chain-security-software">build pipeline</a>.</p>

      <h2>6. Scan images and use minimal bases</h2>
      <p>Vulnerabilities enter through container images. Scan every image for known issues, use minimal base images to shrink the attack surface, and rebuild regularly to pick up patches, the same discipline as our <a href="/blog/docker-production-best-practices">Docker production practices</a>.</p>

      <h2>7. Keep the cluster patched</h2>
      <p>Old Kubernetes versions carry known, actively exploited vulnerabilities. Stay within a supported version range and enable automated node updates. Treat the cluster version as a security patch, not just a feature upgrade.</p>

      <h2>8. Limit the API server's exposure</h2>
      <p>The control plane API is the keys to the kingdom. Do not expose it to the public internet, restrict access by network and identity, and audit who can reach it. A reachable, weakly protected API server is a catastrophic single point of failure.</p>

      <h2>9. Set resource limits</h2>
      <p>Without CPU and memory limits, one misbehaving or malicious workload can starve everything else on the node. Limits are both a reliability control and a defence against denial-of-service from within the cluster.</p>

      <h2>Defence in depth, not a single wall</h2>
      <p>No single control on this list is sufficient on its own, and that is the point. Security in a cluster works because the controls overlap, so that bypassing one still leaves an attacker facing several more. Tight access control limits what a stolen credential can do; network policies limit where a compromised pod can reach; non-root containers and dropped capabilities limit what an attacker gains from a container escape; and audit logging means that even a successful intrusion is visible rather than silent. Treating any one of these as the answer is the mistake, because a determined attacker will find the gap. The goal is layers, each independently reducing the blast radius, so that the failure of one is contained by the others. Harden the cluster as a system, not as a checklist of isolated boxes to tick.</p>

      <h2>10. Audit logging and monitoring</h2>
      <p>Enable audit logs so you can see who did what, and monitor for suspicious activity. Detection is the difference between a contained incident and a breach you learn about from someone else. For the orchestration choice that sits underneath all of this, see our take on <a href="/blog/kubernetes-vs-ecs-2025">Kubernetes versus ECS</a>, and if you want a cluster hardened by specialists, our <a href="/services/cloud-security">security team</a> does it.</p>
    `,
  },
  {
    slug: "sre-practices-for-startups",
    title: "SRE Practices for Startups: What to Adopt Before You Need Them",
    excerpt:
      "Site Reliability Engineering was invented at Google for Google-scale problems. But the core practices, SLOs, error budgets, blameless postmortems, apply at any scale. Here's what to adopt early.",
    metaTitle: "SRE Practices Startups Should Adopt Early",
    metaDescription: "SRE was built for Google-scale problems, but its core ideas work at any size. SLOs, error budgets, and blameless postmortems to adopt before you need them.",
    updated: "2026-06-16",
    category: "DevOps",
    tags: ["SRE", "Reliability", "Incident Response", "SLO", "DevOps"],
    date: "2024-09-10",
    readTime: 8,
    author: { name: "AlgoCrew engineering", role: "Cloud, DevOps and security team", initials: "AC", color: "#06c8e8" },
    coverGradient: "linear-gradient(135deg, #000a1a 0%, #2563eb 100%)",
    accent: "#2563eb",
    body: `
      <p>Site Reliability Engineering was developed at Google for problems most startups will never have. That leads many small teams to dismiss it as overkill. But the core practices of SRE are not about scale, they are about how to think clearly about reliability, and the cheapest time to adopt them is before you desperately need them. Here is what actually transfers to an early-stage team.</p>

      <h2>Define reliability with SLOs</h2>
      <p>A service-level objective is a clear target for how reliable a service should be, expressed in terms users care about, such as the percentage of requests served successfully and quickly. The value of an SLO is that it makes reliability a concrete, agreed number rather than a vague aspiration. It turns "the site should be fast" into something you can measure and decide against, building on the <a href="/blog/observability-beyond-monitoring">metrics</a> you already collect.</p>

      <h2>Use error budgets to balance speed and stability</h2>
      <p>If your objective is not perfection, and it never should be, then the gap between your target and perfection is an error budget: the amount of unreliability you can afford. This reframes a tired argument. When the budget is healthy, ship features fast. When you have burned through it, slow down and invest in stability. The budget replaces opinion with a shared rule both product and engineering can accept.</p>

      <h2>Run blameless postmortems</h2>
      <p>When something breaks, write up what happened, why, and what will prevent a recurrence, without assigning blame to individuals. The goal is to fix the system, not to punish a person, because a culture that hunts for someone to blame teaches people to hide problems. This blameless posture is the same one that makes healthy code review work.</p>

      <h2>Reduce toil deliberately</h2>
      <p>Toil is the repetitive manual operational work that scales with usage and produces no lasting value: restarting things by hand, manual deployments, copy-paste fixes. SRE treats reducing toil as real engineering work, because every hour automated away is an hour returned to building, and a startup cannot afford to drown its small team in operations.</p>

      <h2>Monitor what users feel</h2>
      <p>Alert on symptoms that affect users rather than on every internal fluctuation. A spike in failed requests matters; a brief CPU blip that nobody noticed does not. Alert fatigue from noisy, low-value alerts is dangerous, because the alert that matters gets ignored along with the ones that do not.</p>

      <h2>Reliability is a product decision</h2>
      <p>The deepest idea SRE offers a small team is that reliability is not a purely technical target to be maximised but a product trade-off to be chosen. Perfect uptime is impossibly expensive and almost never what users actually need, so the real question is how reliable a given service should be given what it does and what your users tolerate. A payment flow and a marketing page do not deserve the same reliability investment, and pretending they do wastes effort on one while neglecting the other. Framing reliability as a deliberate level you pick, backed by an objective and an error budget, lets a startup spend its limited engineering time where it matters and ship boldly everywhere else. That clarity, more than any specific tool, is what makes these practices worth adopting before you are forced to.</p>

      <h2>Start small</h2>
      <p>You do not need a dedicated reliability team to adopt SRE thinking. Pick one critical service, set one SLO, and run one blameless postmortem after the next incident. Each practice delivers value on its own, and together they build a reliability culture that scales with you instead of being bolted on in crisis. If you want help putting these foundations in place, our <a href="/services/devops">cloud and DevOps team</a> does it for growing teams.</p>
    `,
  },
  {
    slug: "event-driven-architecture-patterns",
    title: "Event-Driven Architecture: Patterns, Trade-offs, and When Not to Use It",
    excerpt:
      "Event-driven architecture decouples services and enables async workflows, but it adds significant complexity. Here's when to reach for it, which patterns work, and the pitfalls that will hurt you.",
    metaTitle: "Event-Driven Architecture: Trade-offs",
    metaDescription: "Event-driven architecture decouples services but adds real complexity. When to use it, which patterns work, and the pitfalls that will hurt you.",
    updated: "2026-06-16",
    category: "Engineering",
    tags: ["Event-Driven", "Architecture", "Kafka", "RabbitMQ", "Async"],
    date: "2024-08-25",
    readTime: 10,
    author: { name: "AlgoCrew engineering", role: "Cloud, DevOps and security team", initials: "AC", color: "#c084fc" },
    coverGradient: "linear-gradient(135deg, #0a001a 0%, #9333ea 100%)",
    accent: "#9333ea",
    body: `
      <p>Event-driven architecture decouples the parts of a system by having components communicate through events rather than direct calls. Done well, it lets services evolve independently and absorb load gracefully. Done reflexively, it scatters your business logic across a dozen handlers and turns a simple bug into an archaeology project. The patterns are powerful, and so are the ways they go wrong.</p>

      <h2>What you actually gain</h2>
      <p>The core benefit is decoupling. A producer emits an event and does not know or care who consumes it. New consumers can be added without touching the producer. Work can be absorbed into a queue and processed at a sustainable rate instead of overwhelming a downstream system during a spike. This is what makes event-driven patterns a natural fit once you have committed to <a href="/blog/microservices-vs-monolith-honest-guide">independent services</a>.</p>

      <h2>Pattern: event notification</h2>
      <p>The simplest pattern: a service emits a lightweight event announcing that something happened, and interested consumers react. An order was placed, so email, analytics, and inventory each do their part. Keep these events small and let consumers fetch any detail they need. It is easy to reason about and a sensible default for most asynchronous workflows.</p>

      <h2>Pattern: event-carried state transfer</h2>
      <p>Here the event carries the data consumers need, so they do not have to call back to the producer. This reduces coupling and read load on the source, at the cost of larger events and the need to handle data that may be slightly stale by the time it is consumed. It is a good fit when consumers would otherwise hammer the producer for the same information.</p>

      <h2>Pattern: event sourcing, with caution</h2>
      <p>Event sourcing stores the full history of changes as an immutable sequence of events and derives current state by replaying them. It gives you a perfect audit trail and the ability to reconstruct any past state, which is invaluable in domains like finance. It also introduces serious complexity around versioning, replay, and querying. Adopt it only where the audit and temporal requirements genuinely justify the cost, not as a default.</p>

      <h2>The pitfalls that will hurt you</h2>
      <p>Three failure modes recur. The first is the distributed monolith, where services are nominally decoupled but every change still ripples across all of them. The second is debugging difficulty, because a flow that hops through several asynchronous handlers is much harder to trace than a single call stack, which makes <a href="/blog/observability-beyond-monitoring">strong observability</a> mandatory. The third is duplicate and out-of-order delivery, which means consumers must be idempotent or you will corrupt state under load.</p>

      <h2>When not to use it</h2>
      <p>For all its strengths, event-driven architecture is the wrong default for a simple system, and reaching for it too early is a common and expensive mistake. If a single service can do the job with direct calls and a straightforward database, the indirection of events buys you complexity you do not need: harder debugging, eventual consistency to reason about, and infrastructure to operate. The patterns earn their cost when you have genuine decoupling needs, independent scaling requirements, or asynchronous workflows that would otherwise block users. Until then, a clear synchronous design is easier to build, understand, and change. The mature instinct is to keep things as simple as the problem allows and introduce events when a concrete pressure makes the trade worthwhile, rather than adopting them as an architectural fashion and discovering the operational tax afterwards.</p>

      <h2>Practical foundations</h2>
      <p>If you adopt these patterns, invest early in idempotent consumers, a dead-letter strategy for events that cannot be processed, and tracing that follows an event across every hop. A reliable broker matters too, and many teams find Redis or a dedicated message system covers most needs. If you want this designed properly from the start, our <a href="/services/devops">cloud and DevOps team</a> builds event-driven systems that stay debuggable.</p>
    `,
  },
  {
    slug: "supply-chain-security-software",
    title: "Software Supply Chain Security: Protecting Your Build Pipeline",
    excerpt:
      "The SolarWinds and XZ Utils attacks proved that the build pipeline is the attack surface most teams ignore. Here's how to secure yours against dependency confusion, malicious packages, and CI/CD attacks.",
    metaTitle: "Software Supply Chain Security: Secure Your Build",
    metaDescription: "SolarWinds and XZ Utils proved the build pipeline is an ignored attack surface. How to secure yours against malicious packages and CI/CD attacks.",
    updated: "2026-06-16",
    category: "Security",
    tags: ["Supply Chain", "Security", "SBOM", "CI/CD", "DevSecOps"],
    date: "2024-08-10",
    readTime: 8,
    author: { name: "AlgoCrew engineering", role: "Cloud, DevOps and security team", initials: "AC", color: "#f59e0b" },
    coverGradient: "linear-gradient(135deg, #0f0a00 0%, #b45309 100%)",
    accent: "#b45309",
    body: `
      <p>For years, security focused on the code teams wrote and the servers they ran. The SolarWinds and XZ Utils incidents made it impossible to ignore a different attack surface: the supply chain that produces your software. Modern applications are assembled from thousands of third-party packages and built by automated pipelines, and attackers have learned that compromising what you build with is often easier than attacking what you built.</p>

      <h2>Your dependencies are your attack surface</h2>
      <p>Most of the code in a typical application was written by someone else. Every package you install, and every package those packages depend on, is code you are trusting and running. A single malicious or compromised dependency deep in that tree can execute in your build or your production environment. Treating dependencies as trusted by default is the core mistake, and it is the same lesson as the vulnerable-components category in our <a href="/blog/owasp-top-10-2025-developer-guide">OWASP Top 10 guide</a>.</p>

      <h2>Know exactly what you ship</h2>
      <p>You cannot secure what you cannot see. Maintain an accurate inventory of your dependencies, often formalised as a software bill of materials, so that when a vulnerability is announced you can answer within minutes whether you are affected. Teams without this visibility spend days during a major disclosure simply trying to find out if they are exposed.</p>

      <h2>Pin and verify what you install</h2>
      <p>Use lock files so builds are reproducible and an attacker cannot silently slip a different version into your tree. Verify integrity hashes so a tampered package is rejected. Be deliberate about adopting brand-new versions immediately, since a compromised release is most dangerous in the window before the community notices. Reproducibility here is the same discipline that keeps a <a href="/blog/ci-cd-pipeline-best-practices-2025">CI/CD pipeline</a> trustworthy.</p>

      <h2>Watch for dependency confusion</h2>
      <p>Dependency confusion attacks trick your build into pulling a malicious public package in place of an intended internal one by exploiting how package managers resolve names. Configure your tooling so internal packages always resolve from your private registry and cannot be shadowed by a public package of the same name. This is a specific, well-documented attack that a few configuration choices prevent.</p>

      <h2>The build pipeline is production</h2>
      <p>Your CI/CD system has access to source code, secrets, and the ability to deploy, which makes it one of the most valuable targets you own. Apply least privilege to pipeline credentials, scope tokens narrowly, avoid running untrusted code with access to your secrets, and audit who can change pipeline configuration. A compromised pipeline can inject malicious code into a perfectly clean codebase, which is exactly how the most damaging supply chain attacks have worked. Securing it is a direct application of <a href="/blog/zero-trust-security-architecture-guide">zero trust</a> to your own infrastructure.</p>

      <h2>Scan continuously, not once</h2>
      <p>New vulnerabilities are disclosed in existing dependencies every day, so a one-time scan is nearly worthless. Build automated dependency and image scanning into the pipeline and run it continuously, so a newly disclosed issue in a package you already use is flagged promptly rather than discovered by an attacker. This pairs naturally with the input and authentication controls in our <a href="/blog/api-security-best-practices-2025">API security checklist</a>.</p>

      <h2>Sign and verify your artifacts</h2>
      <p>Sign the artifacts your pipeline produces and verify those signatures before deployment, so only artifacts that came from your trusted build process can reach production. This closes the loop: even if an attacker can place a file where deployment looks for it, an unsigned or wrongly signed artifact is rejected.</p>

      <h2>Make it a standing practice</h2>
      <p>Supply chain security is not a project you finish but a posture you maintain, because the dependency tree and the threat landscape both change constantly. Inventory, pin, scan, least-privilege your pipeline, and sign your builds, and revisit all of it regularly. If you want your build pipeline and dependencies secured and monitored by specialists, our <a href="/services/cloud-security">security and QA team</a> does exactly that, and you can <a href="/contact">talk to us about a review</a>.</p>
    `,
  },
  {
    slug: "serverless-vs-containers-2025",
    title: "Serverless vs Containers in 2025: A Cost and Complexity Comparison",
    excerpt:
      "The serverless vs containers debate has matured. Both are production-ready, both have legitimate use cases, and the decision tree is clearer than ever. Here's our current recommendation.",
    metaTitle: "Serverless vs Containers in 2025: How to Decide",
    metaDescription: "Both serverless and containers are production-ready in 2025. A clear cost and complexity decision tree for choosing the right runtime for your workload.",
    updated: "2026-06-16",
    category: "DevOps",
    tags: ["Serverless", "Lambda", "Containers", "AWS", "Architecture"],
    date: "2024-07-22",
    readTime: 7,
    author: { name: "AlgoCrew engineering", role: "Cloud, DevOps and security team", initials: "AC", color: "#38bdf8" },
    coverGradient: "linear-gradient(135deg, #00050f 0%, #1e40af 100%)",
    accent: "#1e40af",
    body: `
      <p>The serverless versus containers debate has matured to the point where the honest answer is that both are production-ready and the choice is about fit, not superiority. The interesting work is matching the runtime to the workload's traffic shape, latency needs, and your team's operational appetite, rather than picking a side and rationalising it afterwards.</p>

      <h2>Where serverless wins</h2>
      <p>Functions shine for spiky, unpredictable, or low-baseline traffic. You pay per request and nothing while idle, which is ideal for event handlers, scheduled jobs, webhooks, and early-stage products whose traffic you cannot yet predict. There are no servers to patch and scaling is automatic. For a new product that might get ten requests a day or ten thousand, serverless removes a whole category of capacity planning you are not ready to do.</p>

      <h2>Where serverless hurts</h2>
      <p>The model has real edges. Cold starts add latency to infrequently used functions. Execution time limits make long-running work awkward. Per-request pricing that is a bargain at low volume becomes expensive at sustained high volume. And persistent connections, especially to databases, need careful pooling because a flood of concurrent function instances can exhaust a connection limit fast. These constraints are manageable but they are real design inputs.</p>

      <h2>Where containers win</h2>
      <p>Containers are the better fit for steady, predictable traffic and for workloads that need full control: long-running processes, specific runtimes, persistent connections, or heavy compute. At sustained high volume a flat compute cost is usually far cheaper than paying per request. You also get portability and a consistent environment from a developer's laptop to production, which is why we treat solid <a href="/blog/docker-production-best-practices">Docker practices</a> as foundational.</p>

      <h2>The cost crossover</h2>
      <p>The decision often comes down to a crossover point. At low and bursty volume, serverless is cheaper because you pay for nothing when idle. As steady traffic grows, there is a point where an always-on container becomes the cheaper option per request. You do not need a precise number to reason about this. You need to know roughly which side of the curve your workload sits on, and to revisit it as you grow. This is the same cost-shape thinking behind our <a href="/blog/aws-cost-optimisation-engineering-guide">cloud cost work</a>.</p>

      <h2>You do not have to choose globally</h2>
      <p>The best architectures often mix both. Run the steady core of the application on containers and push spiky, asynchronous, or glue work to functions. An image-processing step, a nightly report, or a third-party webhook handler can be serverless while the main API runs in containers. Choosing per workload rather than per company is usually the most cost-effective and least dogmatic answer.</p>

      <h2>The decision is reversible, so do not agonise</h2>
      <p>Teams often treat this choice as a fork in the road that locks them in for years, and that anxiety leads to over-analysis. In practice, if you keep your business logic cleanly separated from the specifics of how it is deployed, moving a workload between serverless and containers later is a contained piece of work rather than a rewrite. The logic that processes an order does not care whether it was invoked by a function trigger or an always-on server, provided you did not entangle it with the runtime. That separation gives you the freedom to start with whichever model fits your current scale and revisit it as traffic and cost change. Pick the option that matches where you are today, protect the boundary between your code and its runtime, and let the decision evolve with the workload instead of trying to predict years ahead.</p>

      <h2>If you land on containers</h2>
      <p>Once you commit to containers, the next decision is orchestration, which is its own trade-off between control and operational burden. Our guide on <a href="/blog/kubernetes-vs-ecs-2025">Kubernetes versus ECS</a> covers that in detail. If you would rather hand the whole runtime decision to people who do it daily, our <a href="/services/devops">cloud and DevOps service</a> can design and run it for you.</p>
    `,
  },
  {
    slug: "hiring-senior-engineers-remotely",
    title: "How We Hire Senior Engineers Remotely: Our Exact Process",
    excerpt:
      "Hiring senior engineers remotely at AlgoCrew. Our 4-step process, async challenge, architecture interview, paid trial, and how we maintain a senior-only bar across 8+ countries.",
    metaTitle: "How We Hire Senior Engineers Remotely",
    metaDescription: "Our 4-step remote process for hiring senior engineers: async challenge, architecture interview, paid trial, and how we keep the bar high.",
    updated: "2026-06-16",
    category: "Engineering Culture",
    tags: ["Hiring", "Remote", "Senior Engineers", "Culture", "Process"],
    date: "2024-07-05",
    readTime: 6,
    author: { name: "AlgoCrew engineering", role: "Cloud, DevOps and security team", initials: "AC", color: "#06c8e8" },
    coverGradient: "linear-gradient(135deg, #000a10 0%, #0e7490 100%)",
    accent: "#0e7490",
    body: `
      <p>Hiring senior engineers remotely is a different problem from hiring locally. You cannot rely on a shared timezone, a whiteboard, or the casual signals of an office. What you can do is design a process that measures the things that actually predict senior performance: judgement, communication, and the ability to ship without supervision. This is the exact process we use to maintain a senior-only team across many countries.</p>

      <h2>Why the usual interview fails for senior roles</h2>
      <p>The timed algorithm puzzle measures anxiety tolerance and recent practice, not engineering ability. A genuinely senior engineer who has spent ten years building systems may stumble on a contrived puzzle they would never face in real work, while a junior who drilled the pattern last week sails through. For senior hiring you want to observe judgement on realistic problems, not performance under artificial pressure.</p>

      <h2>Step 1: a sharp written screen</h2>
      <p>The first filter is written, because writing is the core skill of async-first work. A few pointed questions about real trade-offs reveal more than a CV ever will. A senior engineer explains why they chose an approach and what they would do differently at a different scale. Vague, buzzword-heavy answers are a reliable negative signal.</p>

      <h2>Step 2: an async take-home challenge</h2>
      <p>Instead of a timed test, we send a small, realistic task to be done in the candidate's own environment with their own tools, over a couple of days. Design a data model for this scenario, implement this feature with tests, or diagnose this performance problem. Senior engineers produce clean, well-reasoned work when given realistic conditions. We pay for substantial take-homes, because asking experienced people to work for free is both unfair and a bad filter.</p>

      <h2>Step 3: an architecture conversation</h2>
      <p>Next is a live discussion built around the take-home and a broader design problem. We are not looking for one right answer. We are listening for how the candidate reasons about trade-offs, how they handle being challenged, and whether they can explain a complex decision clearly to someone who disagrees. The same instincts that surface here are the ones that make a good reviewer in our code review culture.</p>

      <h2>Step 4: a paid trial</h2>
      <p>The final step is real, paid work on a real task with the team. Nothing predicts how someone will perform like watching them actually perform. A trial reveals collaboration, communication cadence, and whether the polished interview persona matches the day-to-day engineer. It also respects the candidate's time by being concrete and compensated.</p>

      <h2>Selling the role goes both ways</h2>
      <p>An often-missed truth of senior hiring is that the best candidates are evaluating you at least as hard as you are evaluating them. Experienced engineers have options and are wary of process that disrespects their time or signals a chaotic organisation. A respectful, well-run hiring process is therefore not just a filter, it is your strongest pitch: clear communication, prompt responses, paid and realistic exercises, and interviewers who can talk credibly about the technical work all demonstrate the kind of place you are to work. Treating candidates as people whose time matters, rather than as supplicants to be tested, is what convinces a strong senior engineer to choose you over a competing offer. The same care that makes the process a good filter makes it a good advertisement, and at the senior level you need it to be both.</p>

      <h2>Holding the bar as you scale</h2>
      <p>The hardest part of senior-only hiring is keeping the bar high when you are busy and a role has been open too long. The discipline is to accept slower hiring rather than lowering the standard, because one mis-hire on a small senior team costs far more than an unfilled seat. This is the staffing philosophy behind our <a href="/our-approach#engagement-models">team and staffing services</a>, and if you want senior engineers held to that bar, <a href="/contact">get in touch</a>.</p>
    `,
  },
  {
    slug: "graphql-vs-rest-2025",
    title: "GraphQL vs REST in 2025: When Each Actually Makes Sense",
    excerpt:
      "The GraphQL vs REST debate has produced more heat than light. Here's a practical framework, based on shipping both in production, for choosing the right API style for your use case.",
    metaTitle: "GraphQL vs REST in 2025: When to Use Each",
    metaDescription: "A practical framework, from shipping both in production, for choosing between GraphQL and REST based on your clients, data shape, and team rather than hype.",
    updated: "2026-06-16",
    category: "Engineering",
    tags: ["GraphQL", "REST", "API", "Architecture", "Backend"],
    date: "2024-06-18",
    readTime: 7,
    author: { name: "AlgoCrew engineering", role: "Cloud, DevOps and security team", initials: "AC", color: "#f472b6" },
    coverGradient: "linear-gradient(135deg, #14001a 0%, #be185d 100%)",
    accent: "#be185d",
    body: `
      <p>The GraphQL versus REST argument has produced a lot of tribal noise and very little useful guidance. Both are mature, both are production-proven, and the right choice depends on your client needs, data shape, and team, not on which one is fashionable. Having shipped both, our view is that they solve overlapping problems with different trade-offs, and many systems are best served by using each where it fits.</p>

      <h2>What REST does well</h2>
      <p>REST is simple, universally understood, and plays perfectly with the HTTP ecosystem. Caching at the CDN and browser level works out of the box because resources map to URLs. Tooling, debugging, and onboarding are trivial because everyone already knows how it works. For a public API, a CRUD-shaped domain, or a service with well-defined resources, REST is often the lower-friction and more operable choice.</p>

      <h2>What GraphQL does well</h2>
      <p>GraphQL shines when clients need flexible, precise access to a connected graph of data. A mobile app that wants exactly three fields and a web dashboard that wants twenty can each ask for precisely what they need from the same endpoint, avoiding the over-fetching and under-fetching that plague rigid REST endpoints. A strongly typed schema also gives you excellent tooling and a self-documenting contract between frontend and backend.</p>

      <h2>The problems each creates</h2>
      <p>REST's weakness is round trips and payload fit: complex screens end up making many calls or receiving bloated responses, and teams sprout ad-hoc custom endpoints to compensate. GraphQL's weaknesses are the flip side of its power. HTTP caching no longer works automatically. A single malicious or careless query can be expensive, so you need depth limiting, cost analysis, and rate controls. And the infamous N+1 query problem will wreck your database performance unless you batch loads deliberately.</p>

      <h2>Security cuts both ways</h2>
      <p>Whichever you choose, the fundamentals from our <a href="/blog/api-security-best-practices-2025">API security checklist</a> still apply: authentication, authorisation on every field or resource, input validation, and rate limiting. GraphQL adds a few specific concerns around query cost and introspection exposure, while REST's flatter surface is easier to reason about. Neither is secure by default.</p>

      <h2>A decision framework</h2>
      <p>Prefer REST when you are building a public API, your domain is resource-shaped, or you want the simplest operable system. Prefer GraphQL when you have many diverse clients, deeply connected data, and a frontend that benefits from asking for exactly what it needs. And remember the choice is not exclusive: a REST core with a GraphQL layer for complex client-facing reads is a perfectly reasonable architecture.</p>

      <h2>The data model matters more than the protocol</h2>
      <p>Step back from the protocol argument and a larger truth appears: most of the difficulty teams blame on REST or GraphQL actually comes from an unclear underlying data model. A well-designed domain with clean boundaries is pleasant to expose through either style, while a tangled model is awkward through both, sprouting special-case endpoints in REST or convoluted resolvers in GraphQL. Before agonising over the API style, it is usually more valuable to get the entities, their relationships, and their access patterns right. Once that foundation is solid, the choice between REST and GraphQL becomes the relatively minor, reversible decision it should be, driven by client needs rather than by hope that the protocol will paper over a confused design. Fix the model first, and the API layer tends to fall into place whichever style you pick.</p>

      <h2>The honest bottom line</h2>
      <p>Most teams overestimate how much the API style matters compared to getting the data model and boundaries right. Choose the one your team can build and operate well, apply the security basics, and move on to the product. If you want help making that call for a specific application, our web application engineering team makes it every week.</p>
    `,
  },
];

blogPosts.push(...extraPosts);

export const categories = ["All", ...Array.from(new Set(blogPosts.map(p => p.category)))];

export function getPost(slug: string) {
  return blogPosts.find(p => p.slug === slug) ?? null;
}

/** Posts that are listed, indexed and in the sitemap (retired and hidden posts excluded, 05#59–74). */
export const listedPosts = () => blogPosts.filter((p) => isListedPost(p.slug));

export function getRelated(slug: string, limit = 3) {
  const post = getPost(slug);
  if (!post) return [];
  return listedPosts()
    .filter(p => p.slug !== slug && p.category === post.category)
    .slice(0, limit);
}
