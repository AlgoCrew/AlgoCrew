const categorizedServices = [
  {
    "name": "Web & App Development",
    "category": "Digital Engineering",
    "metric_value": "99.9% Uptime",
    "status": "READY TO DEPLOY",
    "highlights": [
      "Optimized for high-performance delivery",
      "Modular & Scalable architecture"
    ],
    "description": "Crafting bespoke web and mobile applications tailored to your business needs, from concept to deployment.",
    "slug": "web-app-development",
    "path": "services/web-app-development",
    "title": "Web & App Development Services | Build Your Digital Future",
    "image": "/images/services/webapp.jpg",
    "side_image": "/images/services/developer1.png",
    "includes": [
      { "name": "Web Development", "description": "Creating responsive, high-performance websites.", "slug": "web-development" },
      { "name": "App Development", "description": "Developing native and cross-platform mobile applications.", "slug": "app-development" },
      { "name": "Custom Software", "description": "Building tailored software solutions.", "slug": "custom-software-development" },
      { "name": "SaaS", "description": "Scalable Software-as-a-Service platforms.", "slug": "saas-development" },
      { "name": "MVP Development", "description": "Quickly test ideas with core features.", "slug": "FaRocket" },
      { "name": "PaaS", "description": "Flexible platforms for managing applications.", "slug": "paas-development" },
      { "name": "Cloud Native", "description": "Applications designed for cloud environments.", "slug": "cloud-native-application" },
      { "name": "WordPress", "description": "SEO optimized WordPress websites.", "slug": "web-app-development" },
      { "name": "UX/UI Design", "description": "Engaging user experiences and interfaces.", "slug": "ux-ui-design" },
      { "name": "Business Apps", "description": "Enhance specific business functions.", "slug": "business-applications" }
    ],
    "steps": [
      { "title": "Discovery", "description": "Understand vision and define requirements." },
      { "title": "Design", "description": "Develop UX/UI and interactive prototypes." },
      { "title": "Coding", "description": "Build using cutting-edge technologies." },
      { "title": "QA", "description": "Rigorously test for performance and security." },
      { "title": "Launch", "description": "Successfully deploy to live platforms." },
      { "title": "Support", "description": "Ongoing updates for long-term success." }
    ]
  },
  {
    "name": "Cloud & DevOps",
    "category": "Infrastructure",
    "metric_value": "10ms Latency",
    "status": "ACTIVE MONITORING",
    "highlights": [
      "Automated CI/CD Workflows",
      "Zero-Downtime Migration"
    ],
    "description": "Empowering your business with scalable cloud solutions and streamlined development operations.",
    "slug": "cloud-devops",
    "path": "services/cloud-devops",
    "title": "Cloud & DevOps Solutions | Scalable Infrastructure & Automation",
    "image": "/images/services/cloud.jpg",
    "side_image": "/images/services/devops.png",
    "includes": [
      { "name": "Cloud App Dev", "description": "Cloud-native apps for maximum efficiency.", "slug": "cloud-application" },
      { "name": "Migration", "description": "Seamlessly migrating systems to the cloud.", "slug": "cloud-ops-migration" },
      { "name": "Integration", "description": "Integrating cloud services with your ecosystem.", "slug": "cloud-maintenance-integration" },
      { "name": "DevOps", "description": "Automate development workflows.", "slug": "devops" },
      { "name": "CI/CD Pipeline", "description": "Speed up software release cycles.", "slug": "ci-cd-pipeline" },
      { "name": "Compliance", "description": "Ensuring GDPR, HIPAA, and SOC 2 compliance.", "slug": "compliance-regulations" },
      { "name": "Containers", "description": "Managing apps with Docker and Kubernetes.", "slug": "containerization" },
      { "name": "IaC", "description": "Infrastructure as Code for consistency.", "slug": "infrastructure-as-code" },
      { "name": "Monitoring", "description": "Robust logging and performance insights.", "slug": "monitoring-logging" }
    ],
    "steps": [
      { "title": "Strategy", "description": "Define a cloud or DevOps adoption plan." },
      { "title": "Architecture", "description": "Design robust cloud architectures." },
      { "title": "Implementation", "description": "Execute deployments and CI/CD pipelines." },
      { "title": "Optimization", "description": "Automate and optimize resource usage." },
      { "title": "Handover", "description": "Knowledge transfer to internal teams." }
    ]
  },
  {
    "name": "E-commerce",
    "category": "Retail Solutions",
    "metric_value": "3x Conversion",
    "status": "STORE READY",
    "highlights": [
      "Conversion-focused UX Design",
      "Secure Payment Gateway Integration"
    ],
    "description": "Building and maintaining powerful e-commerce platforms to drive online sales and business growth.",
    "slug": "e-commerce",
    "path": "services/e-commerce",
    "title": "E-commerce Solutions | Design, Develop & Optimize Online Stores",
    "image": "/images/services/ecommerce.jpg",
    "side_image": "/images/services/commerce.png",
    "includes": [
      { "name": "Store Dev", "description": "Visually appealing stores to maximize sales.", "slug": "ecommerce-design-development" },
      { "name": "Maintenance", "description": "Smooth operations with continuous support.", "slug": "ecommerce-maintenance-support" },
      { "name": "Automation", "description": "Automating e-commerce apps for efficiency.", "slug": "ecommerce-automation-apps" },
      { "name": "Shopify", "description": "Specialized Shopify store development.", "slug": "shopify-development" },
      { "name": "WooCommerce", "description": "Custom WooCommerce and WordPress solutions.", "slug": "woocommerce-development" }
    ],
    "steps": [
      { "title": "Discovery", "description": "Define a successful e-commerce strategy." },
      { "title": "UX Design", "description": "Conversion-focused online store designs." },
      { "title": "Development", "description": "Build on Shopify, WooCommerce, or custom." },
      { "title": "Customization", "description": "Integrate third-party apps and payments." },
      { "title": "Optimization", "description": "Go live and optimize based on data." },
      { "title": "Support", "description": "Ongoing security and technical updates." }
    ]
  },
  {
    "name": "Security & Quality",
    "category": "Cyber Defense",
    "metric_value": "Zero Vulnerabilities",
    "status": "SHIELD ACTIVE",
    "highlights": [
      "Rigorous Penetration Testing",
      "ISO 27001 Compliance Standards"
    ],
    "description": "Ensuring the robustness, reliability, and security of your digital assets.",
    "slug": "security-quality",
    "path": "services/security-quality",
    "title": "Cybersecurity & Quality Assurance | Protect & Perfect Your Systems",
    "image": "/images/services/quality.jpg",
    "side_image": "/images/services/quality.png",
    "includes": [
      { "name": "Manual Testing", "description": "Identifying usability issues and bugs.", "slug": "manual-testing" },
      { "name": "Automation", "description": "Repeatable and fast quality checks.", "slug": "automation-testing" },
      { "name": "Penetration", "description": "Simulating cyberattacks to fix gaps.", "slug": "penetration-testing" },
      { "name": "Security Audits", "description": "Comprehensive review of system weaknesses.", "slug": "security-audits" },
      { "name": "Consulting", "description": "Expert guidance for cybersecurity strategy.", "slug": "cybersecurity-consulting" },
      { "name": "Quality Assurance", "description": "Ensuring flawless software performance.", "slug": "quality-assurance" }
    ],
    "steps": [
      { "title": "Assessment", "description": "Identify potential security weaknesses." },
      { "title": "Planning", "description": "Develop tailored security protocols." },
      { "title": "Implementation", "description": "Deploy measures and conduct testing." },
      { "title": "Monitoring", "description": "Continuously monitor for anomalies." },
      { "title": "Refinement", "description": "Refine processes and train internal teams." }
    ]
  },
  {
    "name": "Data, AI & Automation",
    "category": "Artificial Intelligence",
    "metric_value": "85% Automation",
    "status": "INTELLIGENCE LIVE",
    "highlights": [
      "Predictive Analytics Models",
      "Generative AI Implementation"
    ],
    "description": "Leveraging the power of data, artificial intelligence, and automation to drive innovation and insights.",
    "slug": "data-automation",
    "path": "services/data-automation",
    "title": "Data, AI & Automation Services | Smart Solutions for Business Growth",
    "image": "/images/services/automation.jpg",
    "side_image": "/images/services/automation.png",
    "includes": [
      { "name": "Data & AI", "description": "Building intelligent learning models.", "slug": "data-ai" },
      { "name": "Generative AI", "description": "AI solutions for content and problem-solving.", "slug": "generative-ai" },
      { "name": "Data Analytics", "description": "Transform data into actionable insights.", "slug": "data-analytics" },
      { "name": "BI", "description": "BI tools for strategic decision-making.", "slug": "business-intelligence" },
      { "name": "RPA", "description": "Automating repetitive tasks with robotics.", "slug": "rpa" },
      { "name": "Power Apps", "description": "Custom apps for rapid business automation.", "slug": "power-apps-data-ai" }
    ],
    "steps": [
      { "title": "Data Preparation", "description": "Gather and prepare data for models." },
      { "title": "Model Training", "description": "Train AI models for specific challenges." },
      { "title": "Integration", "description": "Deploy AI solutions into existing systems." },
      { "title": "Optimization", "description": "Monitor and retrain models for accuracy." },
      { "title": "Reporting", "description": "Provide dashboards with actionable data." }
    ]
  },
  {
    "name": "Microsoft Solutions",
    "category": "Enterprise Systems",
    "metric_value": "D365 Optimized",
    "status": "ENTERPRISE READY",
    "highlights": [
      "Low-code Innovation Experts",
      "Seamless ERP/CRM Integration"
    ],
    "description": "Optimizing business processes with comprehensive Microsoft Dynamics 365 and Power Platform solutions.",
    "slug": "microsoft-solutions",
    "path": "services/microsoft-solutions",
    "title": "Microsoft Solutions | D365 ERP, CRM & Power Apps Expertise",
    "image": "/images/services/microsoft.jpg",
    "side_image": "/images/services/microsoft.png",
    "includes": [
      { "name": "D365 ERP", "description": "Customizing D365 for resource planning.", "slug": "d365-erp" },
      { "name": "D365 CRM", "description": "Tailoring CRM to enhance relationships.", "slug": "d365-crm" },
      { "name": "Power Apps", "description": "Building custom low-code applications.", "slug": "power-apps-microsoft" }
    ],
    "steps": [
      { "title": "Requirements", "description": "Determine the best Microsoft solution fit." },
      { "title": "Design", "description": "Customize D365/Power Apps to processes." },
      { "title": "Configuration", "description": "Configure modules and integrate systems." },
      { "title": "Training", "description": "Facilitate a smooth live transition." },
      { "title": "Support", "description": "Ongoing maintenance and enhancements." }
    ]
  },
  {
    "name": "Digital Marketing",
    "category": "Growth & Performance",
    "metric_value": "200% ROI",
    "status": "CAMPAIGN ACTIVE",
    "highlights": [
      "Data-Driven SEO Strategies",
      "Omni-channel Engagement"
    ],
    "description": "Boosting your online presence and driving measurable results with comprehensive digital marketing strategies.",
    "slug": "digital-marketing",
    "path": "services/digital-marketing",
    "title": "Digital Marketing Services | Boost Your Online Presence",
    "image": "/images/services/digital.png",
    "side_image": "/images/services/digital.png",
    "includes": [
      { "name": "SEO", "description": "Improving visibility on search engines.", "slug": "seo" },
      { "name": "SMM", "description": "Brand engagement across social platforms.", "slug": "smm" },
      { "name": "Content", "description": "Creating valuable, consistent content.", "slug": "content-marketing" },
      { "name": "PPC", "description": "Targeted ad campaigns on Google and social.", "slug": "ppc-advertising" },
      { "name": "Email", "description": "Email campaigns to build customer loyalty.", "slug": "email-marketing" },
      { "name": "Influencer", "description": "Reach wider audiences with personalities.", "slug": "influencer-marketing" },
      { "name": "Analytics", "description": "Analyzing performance to optimize strategy.", "slug": "marketing-analytics" },
      { "name": "CRO", "description": "Optimizing funnels to increase conversion.", "slug": "cro" }
    ],
    "steps": [
      { "title": "Strategy", "description": "Define target audience and set objectives." },
      { "title": "Research", "description": "Analyze consumer behavior and trends." },
      { "title": "Campaigns", "description": "Develop compelling content and creatives." },
      { "title": "Execution", "description": "Implement across digital platforms." },
      { "title": "Optimization", "description": "A/B testing for maximum ROI." },
      { "title": "Analysis", "description": "Regular reporting with actionable insights." }
    ]
  },
  {
    "name": "Team & Support Services",
    "category": "Talent Solutions",
    "metric_value": "Top 1% Talent",
    "status": "STAFFED & READY",
    "highlights": [
      "Expert Staff Augmentation",
      "24/7 Technical Management"
    ],
    "description": "Augmenting your team with expert talent and providing dedicated support for seamless operations.",
    "slug": "team-services",
    "path": "services/team-services",
    "title": "Staff Augmentation & Support | Extend Your Team with Experts",
    "image": "/images/services/team.png",
    "side_image": "/images/services/team.png",
    "includes": [
      { "name": "Augmentation", "description": "Skilled pros to integrate with your team.", "slug": "staff-augmentation" },
      { "name": "Dedicated Teams", "description": "Managing full teams for your projects.", "slug": "dedicated-teams" },
      { "name": "IT Consulting", "description": "Strategic guidance for IT infrastructure.", "slug": "it-consulting" }
    ],
    "steps": [
      { "title": "Assessment", "description": "Understand project and skill requirements." },
      { "title": "Matching", "description": "Identify top-tier professionals." },
      { "title": "Onboarding", "description": "Smooth integration into your team." },
      { "title": "Management", "description": "Ensure successful ongoing collaboration." },
      { "title": "Monitoring", "description": "Regular performance and satisfaction checks." }
    ]
  },
  {
    "name": "Emerging Tech",
    "category": "Future Innovation",
    "metric_value": "Web3 Integrated",
    "status": "PIONEERING LIVE",
    "highlights": [
      "Metaverse Architecture",
      "Blockchain/Crypto Security"
    ],
    "description": "Pioneering the future with cutting-edge solutions in Metaverse, AR, Blockchain, and AI.",
    "slug": "emerging-tech",
    "path": "services/emerging-tech",
    "title": "Emerging Tech Solutions | Metaverse, AR, Blockchain & AI Innovation",
    "image": "/images/services/emerging.jpg",
    "side_image": "/images/services/emerging.png",
    "includes": [
      { "name": "Metaverse", "description": "Immersive virtual worlds for enterprise.", "slug": "metaverse" },
      { "name": "AR", "description": "Blending digital content with the real world.", "slug": "augmented-reality" },
      { "name": "Blockchain", "description": "Secure and decentralized blockchain solutions.", "slug": "blockchain-cryptography" },
      { "name": "Gen AI", "description": "Advanced AI for creative design.", "slug": "generative-ai-emerging" }
    ],
    "steps": [
      { "title": "Feasibility", "description": "Assess viability for your specific use case." },
      { "title": "Prototyping", "description": "Build early prototypes to validate concepts." },
      { "title": "Integration", "description": "Develop and integrate cutting-edge tech." },
      { "title": "Iteration", "description": "Test and iterate based on user feedback." },
      { "title": "Future-Proof", "description": "Plan for future scalability and growth." }
    ]
  },
  {
    "name": "Gaming",
    "category": "Entertainment Tech",
    "metric_value": "Unreal 5 High-Fi",
    "status": "ENGINE READY",
    "highlights": [
      "AAA Quality Game Art",
      "Web3/NFT Game Economies"
    ],
    "description": "Delivering captivating gaming experiences through exceptional art, design, and innovative technologies.",
    "slug": "gaming",
    "path": "services/gaming",
    "title": "Gaming Development Services | Art, Web3 & XR Gaming",
    "image": "/images/services/gaming.jpg",
    "side_image": "/images/services/gaming.png",
    "includes": [
      { "name": "Art & Design", "description": "Stunning visuals and gameplay mechanics.", "slug": "gaming-art-design" },
      { "name": "Unity", "description": "Cross-platform games and experiences.", "slug": "unity-development" },
      { "name": "Unreal Engine", "description": "High-fidelity games and simulations.", "slug": "unreal-engine-development" },
      { "name": "Metaverse", "description": "Immersive worlds for the metaverse.", "slug": "metaverse-development" },
      { "name": "Animation", "description": "Dynamic and expressive game characters.", "slug": "game-animation" },
      { "name": "Web3", "description": "Decentralized play-to-earn game models.", "slug": "gaming-web3-main" },
      { "name": "AR/VR/XR", "description": "Cutting-edge immersive gaming titles.", "slug": "gaming-ar-vr-xr-main" }
    ],
    "steps": [
      { "title": "Storyboarding", "description": "Define narrative and core game mechanics." },
      { "title": "Asset Creation", "description": "Develop art, characters, and environments." },
      { "title": "Development", "description": "Program game logic and physics." },
      { "title": "Testing", "description": "Test for bugs, performance, and UX." },
      { "title": "Launch", "description": "Publish on target platforms and support." }
    ]
  },

  /* ── INDUSTRY VERTICALS ── */
  {
    name: "Fintech Software Development",
    category: "Industry Vertical",
    metric_value: "PCI-DSS Ready",
    status: "SPECIALIZED",
    highlights: [
      "Banking-grade security architecture",
      "Regulatory compliance built in",
    ],
    description: "Custom fintech software built for compliance, speed, and scale. From payment platforms to banking dashboards, we engineer financial software that regulators and users trust.",
    slug: "fintech-software-development",
    path: "services/fintech-software-development",
    title: "Fintech Software Development | AlgoCrew",
    image: "/images/services/webapp.jpg",
    side_image: "/images/services/developer1.png",
    includes: [
      { name: "Payment Platforms", description: "Stripe, Plaid, and custom payment gateway integrations.", slug: "payment-platforms" },
      { name: "Banking Dashboards", description: "Real-time transaction monitoring and reporting portals.", slug: "banking-dashboards" },
      { name: "Compliance Engineering", description: "PCI-DSS, SOC 2, and KYC/AML workflow automation.", slug: "compliance-engineering" },
      { name: "Fraud Detection", description: "ML-powered transaction anomaly detection systems.", slug: "fraud-detection" },
      { name: "Crypto & Web3", description: "Wallet integrations, smart contracts, and DeFi tooling.", slug: "crypto-web3" },
      { name: "Lending & Insurance", description: "Loan origination, underwriting, and policy management systems.", slug: "lending-insurance" },
    ],
    steps: [
      { title: "Compliance Audit", description: "Map regulatory requirements before a line of code is written." },
      { title: "Secure Architecture", description: "Design zero-trust, encrypted data flows from the ground up." },
      { title: "Development", description: "Senior engineers with fintech domain experience." },
      { title: "Penetration Testing", description: "Third-party security audit before launch." },
      { title: "Certification", description: "Guide through PCI-DSS, SOC 2, or relevant certifications." },
      { title: "Ongoing Monitoring", description: "24/7 alerting, audit logs, and incident response." },
    ],
  },
  {
    name: "SaaS Development",
    category: "Industry Vertical",
    metric_value: "Multi-tenant Ready",
    status: "SPECIALIZED",
    highlights: [
      "Scalable multi-tenant architecture",
      "Subscription billing & analytics built in",
    ],
    description: "End-to-end SaaS product development from MVP to enterprise scale. We build subscription platforms that grow with your customer base without re-architecture.",
    slug: "saas-development",
    path: "services/saas-development",
    title: "SaaS Development Company | AlgoCrew",
    image: "/images/services/webapp.jpg",
    side_image: "/images/services/developer1.png",
    includes: [
      { name: "Multi-tenant Architecture", description: "Data isolation, tenant provisioning, and permission systems.", slug: "multi-tenant" },
      { name: "Subscription Billing", description: "Stripe, Paddle, and custom billing with trial/upgrade flows.", slug: "subscription-billing" },
      { name: "Admin Dashboards", description: "Internal ops tooling for customer success and finance teams.", slug: "admin-dashboards" },
      { name: "Usage Analytics", description: "Feature adoption tracking, churn signals, and cohort analysis.", slug: "usage-analytics" },
      { name: "API & Webhooks", description: "Public API with documentation, rate limiting, and SDKs.", slug: "api-webhooks" },
      { name: "White-labelling", description: "Custom branding per tenant for B2B SaaS platforms.", slug: "white-labelling" },
    ],
    steps: [
      { title: "Product Scoping", description: "Define MVP feature set and success metrics." },
      { title: "Architecture Design", description: "Multi-tenant data model and scalability planning." },
      { title: "MVP Build", description: "Core feature set shipped in 6-10 weeks." },
      { title: "Billing Integration", description: "Subscription management and payment flows." },
      { title: "Beta Launch", description: "Controlled rollout with analytics and feedback loops." },
      { title: "Scale & Iterate", description: "Ongoing engineering based on real usage data." },
    ],
  },
  {
    name: "Startup MVP Development",
    category: "Industry Vertical",
    metric_value: "6-10 Week Delivery",
    status: "FAST TRACK",
    highlights: [
      "From idea to live product in 6-10 weeks",
      "Investor-ready technical foundations",
    ],
    description: "Get your MVP built by senior engineers in 6-10 weeks. No juniors, no re-work. We build the right thing the first time so you can raise, validate, and scale.",
    slug: "startup-mvp-development",
    path: "services/startup-mvp-development",
    title: "Startup MVP Development | AlgoCrew",
    image: "/images/services/webapp.jpg",
    side_image: "/images/services/developer1.png",
    includes: [
      { name: "Product Strategy", description: "Feature prioritization and MVP scope definition workshops.", slug: "product-strategy" },
      { name: "UI/UX Design", description: "Figma prototypes and investor-ready design systems.", slug: "ux-design-mvp" },
      { name: "Full-Stack Development", description: "Next.js, React Native, or whatever stack fits best.", slug: "fullstack-mvp" },
      { name: "Cloud Setup", description: "AWS or GCP with CI/CD from day one.", slug: "cloud-setup-mvp" },
      { name: "Analytics Integration", description: "Mixpanel, Segment, or Amplitude for user behavior data.", slug: "analytics-mvp" },
      { name: "Pitch Deck Support", description: "Technical architecture slides and due diligence documentation.", slug: "pitch-deck-support" },
    ],
    steps: [
      { title: "Discovery (Week 1)", description: "Scope, stack selection, and project roadmap." },
      { title: "Design (Week 2-3)", description: "Wireframes, UI kit, and stakeholder sign-off." },
      { title: "Sprint 1 (Week 4-6)", description: "Core user flows and data model." },
      { title: "Sprint 2 (Week 7-9)", description: "Polish, integrations, and QA." },
      { title: "Launch (Week 10)", description: "Deployment, monitoring, and handover." },
      { title: "Post-launch Support", description: "30-day bug warranty and optional retainer." },
    ],
  },
  {
    name: "Healthcare Software Development",
    category: "Industry Vertical",
    metric_value: "HIPAA Compliant",
    status: "SPECIALIZED",
    highlights: [
      "HIPAA-compliant by design",
      "EHR & telemedicine integrations",
    ],
    description: "HIPAA-compliant healthcare software for clinics, digital health startups, and medical device companies. We build patient-safe software that passes audits and earns trust.",
    slug: "healthcare-software-development",
    path: "services/healthcare-software-development",
    title: "Healthcare Software Development | AlgoCrew",
    image: "/images/services/webapp.jpg",
    side_image: "/images/services/developer1.png",
    includes: [
      { name: "Patient Portals", description: "Secure, accessible portals for appointments, records, and billing.", slug: "patient-portals" },
      { name: "Telemedicine Platforms", description: "HIPAA-compliant video consultation and e-prescription systems.", slug: "telemedicine" },
      { name: "EHR Integrations", description: "Epic, Cerner, and HL7/FHIR API integrations.", slug: "ehr-integrations" },
      { name: "Medical Device Software", description: "FDA-cleared embedded and companion app development.", slug: "medical-device" },
      { name: "Claims & Billing", description: "Insurance claim automation and revenue cycle management.", slug: "medical-billing" },
      { name: "Clinical Analytics", description: "Population health dashboards and outcome reporting.", slug: "clinical-analytics" },
    ],
    steps: [
      { title: "HIPAA Assessment", description: "Map all PHI data flows and compliance gaps." },
      { title: "Secure Design", description: "End-to-end encryption, access controls, and audit logging." },
      { title: "Development", description: "Healthcare-experienced senior engineers." },
      { title: "Clinical QA", description: "Testing against clinical workflows and edge cases." },
      { title: "Compliance Review", description: "HIPAA, HITECH, and relevant state regulations." },
      { title: "Staff Training", description: "Documentation and onboarding for clinical teams." },
    ],
  },
  {
    name: "E-Commerce Development",
    category: "Industry Vertical",
    metric_value: "99.9% Checkout Uptime",
    status: "READY TO DEPLOY",
    highlights: [
      "Headless commerce architecture",
      "Conversion-optimized by default",
    ],
    description: "High-performance e-commerce platforms that convert. From headless Shopify builds to fully custom storefronts, we engineer shopping experiences that scale to millions in revenue.",
    slug: "ecommerce-development",
    path: "services/ecommerce-development",
    title: "E-Commerce Development Services | AlgoCrew",
    image: "/images/services/webapp.jpg",
    side_image: "/images/services/developer1.png",
    includes: [
      { name: "Headless Commerce", description: "Next.js storefronts with Shopify, Medusa, or custom backends.", slug: "headless-commerce" },
      { name: "Custom Storefronts", description: "Fully bespoke e-commerce with no platform limitations.", slug: "custom-storefront" },
      { name: "Checkout Optimization", description: "A/B tested checkout flows engineered to maximize conversion.", slug: "checkout-optimization" },
      { name: "Inventory & ERP", description: "Warehouse management, ERP integrations, and fulfilment automation.", slug: "inventory-erp" },
      { name: "Marketplace Development", description: "Multi-vendor marketplaces with seller dashboards and payouts.", slug: "marketplace-development" },
      { name: "International & Localization", description: "Multi-currency, multi-language, and geo-specific tax rules.", slug: "ecommerce-international" },
    ],
    steps: [
      { title: "Store Audit", description: "Analyze current conversion rates and identify friction points." },
      { title: "Architecture Planning", description: "Choose headless vs. platform, data model, and integrations." },
      { title: "Design & Prototype", description: "Conversion-focused UI with mobile-first approach." },
      { title: "Development", description: "Performance-first build with Core Web Vitals targets." },
      { title: "Load Testing", description: "Simulate peak traffic before launch day." },
      { title: "Launch & Optimise", description: "Analytics-driven iteration post-launch." },
    ],
  },
];

export { categorizedServices };