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
    "image": "/images/services/team.jpg",
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
  }
];

export { categorizedServices };