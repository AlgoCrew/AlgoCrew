const allServices = [
  {
    "name": "Web Development",
    "iconName": "FaLaptopCode",
    "path": "services/web-app-development",
    "short_description": "Crafting high-performance, user-friendly, and scalable web applications tailored to meet diverse business requirements and engaging online experiences."
  },
  {
    "name": "App Development",
    "iconName": "FaMobileAlt",
    "path": "services/web-app-development",
    "short_description": "Designing and building innovative mobile applications for iOS, Android, and cross-platform environments, ensuring seamless user experiences."
  },
  {
    "name": "Custom Software Development",
    "iconName": "FaCode",
    "path": "services/web-app-development",
    "short_description": "Creating bespoke software solutions specifically designed to address unique operational challenges and enhance business efficiency."
  },
  {
    "name": "Cloud Application",
    "iconName": "FaCloudMeatball",
    "path": "services/cloud-devops",
    "short_description": "Designing, developing, and deploying robust cloud-native applications optimized for performance, scalability, and cost-effectiveness."
  },
  {
    "name": "Cloud Ops & Migration",
    "iconName": "FaExchangeAlt",
    "path": "services/cloud-devops",
    "short_description": "Managing cloud operations and seamlessly migrating existing infrastructure and applications to secure and efficient cloud environments."
  },
  {
    "name": "Cloud Maintenance & Integration",
    "iconName": "FaSyncAlt",
    "path": "services/cloud-devops",
    "short_description": "Ensuring continuous optimal performance and seamless integration of all your cloud services and applications."
  },
  {
    "name": "DevOps",
    "iconName": "FaCloudUploadAlt",
    "path": "services/cloud-devops",
    "short_description": "Implementing efficient DevOps practices to accelerate software delivery, improve collaboration, and ensure continuous integration."
  },
  {
    "name": "Cybersecurity",
    "iconName": "FaShieldAlt",
    "path": "services/security-quality",
    "short_description": "Protecting your digital assets and infrastructure from evolving cyber threats with robust security strategies and solutions."
  },
  {
    "name": "SaaS",
    "iconName": "FaCloud",
    "path": "services/web-app-development",
    "short_description": "Developing, deploying, and managing scalable Software-as-a-Service solutions tailored to your business model and customer needs."
  },
  {
    "name": "PaaS (Platform as a Service)",
    "iconName": "FaSellsy",
    "short_description": "Providing scalable and flexible platforms for building, deploying, and managing applications.",
    "path": "services/web-app-development",
  },
  {
    "name": "UX/UI Design",
    "iconName": "FaPaintBrush",
    "path": "services/web-app-development",
    "short_description": "Focusing on intuitive user experiences and visually appealing interfaces to ensure products are both functional and delightful to use."
  },
  {
    "name": "Business Applications",
    "iconName": "FaBuilding",
    "path": "services/web-app-development",
    "short_description": "Implementing and customizing robust enterprise-grade business applications to streamline operations and improve overall productivity."
  },
  {
    "name": "D365 ERP",
    "iconName": "FaCogs",
    "path": "services/microsoft-solutions",
    "short_description": "Providing expert implementation and optimization of Microsoft Dynamics 365 for comprehensive Enterprise Resource Planning needs."
  },
  {
    "name": "D365 CRM",
    "iconName": "FaUsers",
    "path": "services/microsoft-solutions",
    "short_description": "Delivering tailored Microsoft Dynamics 365 solutions to enhance customer relationship management and drive sales growth effectively."
  },
  {
    "name": "Power Apps",
    "iconName": "FaPowerOff",
    "path": "services/microsoft-solutions",
    "short_description": "Developing powerful, low-code custom business applications using Microsoft Power Apps to automate workflows and boost efficiency."
  },
  {
    "name": "Metaverse",
    "iconName": "FaGlobe",
    "path": "services/emerging-tech",
    "short_description": "Designing and developing immersive virtual environments and experiences within the evolving landscape of the metaverse."
  },
  {
    "name": "Augmented Reality",
    "iconName": "FaCube",
    "path": "services/emerging-tech",
    "short_description": "Creating interactive and engaging augmented reality experiences that blend digital content with the real world seamlessly."
  },
  {
    "name": "Blockchain & Cryptography",
    "iconName": "FaLink",
    "path": "services/emerging-tech",
    "short_description": "Developing secure, transparent, and decentralized solutions utilizing blockchain technology and advanced cryptographic principles."
  },
  {
    "name": "Data & AI",
    "iconName": "FaBrain",
    "path": "services/emerging-tech",
    "short_description": "Unlocking the potential of your data through advanced analytics and artificial intelligence for informed decision-making."
  },
  {
    "name": "Generative AI",
    "iconName": "FaMagic",
    "path": "services/emerging-tech",
    "short_description": "Implementing state-of-the-art generative AI models to automate content creation, enhance creativity, and solve complex problems."
  },
  {
    "name": "Data Analytics",
    "iconName": "FaChartBar",
    "path": "services/data-automation",
    "short_description": "Transforming raw data into actionable insights through comprehensive analysis, visualization, and reporting for strategic planning."
  },
  {
    "name": "Staff Augmentation",
    "iconName": "FaHandshake",
    "path": "services/team-services",
    "short_description": "Providing highly skilled and experienced professionals to seamlessly integrate with your existing teams and enhance project capabilities."
  },
  {
    "name": "Quality Assurance",
    "iconName": "FaShieldAlt",
    "path": "services/security-quality",
    "short_description": "Ensuring the highest standards of software quality and reliability through rigorous testing and robust quality assurance processes."
  },
  {
    "name": "Manual Testing",
    "iconName": "FaUserShield",
    "path": "services/security-quality",
    "short_description": "Thoroughly testing software manually to identify usability issues and complex bugs.",
  },
  {
    "name": "Automation Testing",
    "iconName": "FaAutoprefixer",
    "path": "services/security-quality",
    "short_description": "Implementing automated test scripts to ensure fast and repeatable quality checks.",
  },
  {
    "name": "Penetration Testing",
    "iconName": "FaCheckCircle",
    "path": "services/security-quality",
    "short_description": "Simulating cyberattacks to find and fix vulnerabilities before they can be exploited.",
  },
  {
    "name": "Security Audits",
    "iconName": "FaRegCheckCircle",
    "path": "services/security-quality",
    "short_description": "Conducting comprehensive reviews of your systems to identify security weaknesses and compliance issues.",
  },
  {
    "name": "Cybersecurity Consulting",
    "iconName": "FaUserShield",
    "path": "services/security-quality",
    "short_description": "Providing expert guidance to develop and implement a robust cybersecurity strategy.",
  },
  {
    "name": "E-commerce Design & Development",
    "iconName": "FaShoppingCart",
    "path": "services/e-commerce",
    "short_description": "Crafting visually appealing and highly functional e-commerce websites designed to convert visitors into loyal customers."
  },
  {
    "name": "E-commerce Maintenance & Support",
    "iconName": "FaTools",
    "path": "services/e-commerce",
    "short_description": "Providing ongoing maintenance, updates, and dedicated support to ensure your e-commerce platform runs smoothly and efficiently."
  },
  {
    "name": "E-commerce Automation & Apps",
    "iconName": "FaRobot",
    "path": "services/e-commerce",
    "short_description": "Automating key e-commerce processes and developing custom applications to enhance operational efficiency and customer engagement."
  },
  {
    "name": "Shopify Development",
    "iconName": "FaShopify",
    "path": "services/e-commerce",
    "short_description": "Specialized development services for building and customizing Shopify stores.",
  },
  {
    "name": "WooCommerce Development",
    "iconName": "FaShoppingBasket",
    "path": "services/e-commerce",
    "short_description": "Custom solutions for e-commerce platforms built on WooCommerce and WordPress.",
  },
  {
    "name": "Gaming Art & Design",
    "iconName": "FaPalette",
    "path": "services/gaming",
    "short_description": "Producing stunning visual assets, character designs, and captivating environments that bring gaming worlds to life."
  },
  {
    "name": "Gaming Web3",
    "iconName": "FaEthereum",
    "path": "services/gaming",
    "short_description": "Integrating cutting-edge Web3 technologies like NFTs and blockchain into games for innovative player ownership and experiences."
  },
  {
    "name": "Gaming AR/VR/XR",
    "iconName": "FaVrCardboard",
    "path": "services/gaming",
    "short_description": "Developing groundbreaking augmented, virtual, and extended reality games that offer truly immersive and interactive experiences."
  },
]

export { allServices };
