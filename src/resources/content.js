import { Logo } from "@once-ui-system/core";

const person = {
  firstName: "Selene",
  lastName: "Yu",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "Design Engineer",
  avatar: "/images/LogoDark.png",
  email: "muhammadarqam920@gmail.com",
  location: "Canada", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: ["English", "Urdu", "Panjabi"], // optional: Leave the array empty if you don't want to display languages
};

const newsletter = {
  display: true,
  title: <>Subscribe to AlgoCrew Newsletter</>,
  description: (
    <>
      We occasionally offer short perid discounts to enlarge our digital family.
    </>
  ),
};

const social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/AlgoCrew/AlgoCrew",
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/company/algocrew/",
  },
  // {
  //   name: "Threads",
  //   icon: "threads",
  //   link: "https://www.threads.com/algo-crew",
  // },
  {
    name: "Email",
    icon: "email",
    link: `mailto:muhammadarqam92@gmail.com`,
  },
];

const home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `AlgoCrew - delivering top-tier IT solutions and services`,
  description: `we are committed to driving innovation and excellence in the world of IT`,
  headline: <>Your idea. Our logistics. New Reality.</>,
  featured: {
    display: true,
    title: <>Our recent projects <strong className="ml-4"></strong></>,
    href: "/projects",
  },
  subline: (
    <>
      We use state of art technology stacks coupled with decades of industry experience to help make your products successful.
    </>
  ),
};

const about = {
  path: "/about",
  label: "About",
  title: `About – AlgoCrew`,
  image: "/images/og/about.jpg",
  description: `we are committed to driving innovation and excellence in the world of IT`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: true,
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        Selene is a Jakarta-based design engineer with a passion for transforming complex challenges
        into simple, elegant design solutions. Her work spans digital interfaces, interactive
        experiences, and the convergence of design and technology.
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Work Experience",
    experiences: [
      {
        company: "FLY",
        timeframe: "2022 - Present",
        role: "Senior Design Engineer",
        achievements: [
          <>
            Redesigned the UI/UX for the FLY platform, resulting in a 20% increase in user
            engagement and 30% faster load times.
          </>,
          <>
            Spearheaded the integration of AI tools into design workflows, enabling designers to
            iterate 50% faster.
          </>,
        ],
        images: [
          // optional: leave the array empty if you don't want to display images
          {
            src: "/images/projects/project-01/cover-01.jpg",
            alt: "Once UI Project",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        company: "Creativ3",
        timeframe: "2018 - 2022",
        role: "Lead Designer",
        achievements: [
          <>
            Developed a design system that unified the brand across multiple platforms, improving
            design consistency by 40%.
          </>,
          <>
            Led a cross-functional team to launch a new product line, contributing to a 15% increase
            in overall company revenue.
          </>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true, // set to false to hide this section
    title: "Studies",
    institutions: [
      {
        name: "University of Jakarta",
        description: <>Studied software engineering.</>,
      },
      {
        name: "Build the Future",
        description: <>Studied online marketing and personal branding.</>,
      },
    ],
  },
  technical: {
    display: true, // set to false to hide this section
    title: "Technical skills",
    skills: [
      {
        title: "Figma",
        description: <>Able to prototype in Figma with Once UI with unnatural speed.</>,
        // optional: leave the array empty if you don't want to display images
        images: [
          {
            src: "/images/projects/project-01/cover-02.jpg",
            alt: "Project image",
            width: 16,
            height: 9,
          },
          {
            src: "/images/projects/project-01/cover-03.jpg",
            alt: "Project image",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        title: "Next.js",
        description: <>Building next gen apps with Next.js + Once UI + Supabase.</>,
        // optional: leave the array empty if you don't want to display images
        images: [
          {
            src: "/images/projects/project-01/cover-04.jpg",
            alt: "Project image",
            width: 16,
            height: 9,
          },
        ],
      },
    ],
  },
};

const aboutUs = {
  path: "/about",
  label: "About",
  title: `Who we are`,
  image: "/images/LogoDark.png",
  description: `At AlgoCrew, we are committed to driving innovation and excellence in the world of IT. As a dynamic and forward-thinking software company, we specialize in delivering top-tier IT solutions and services tailored to meet the evolving needs of businesses across diverse sectors.`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: true,
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        At AlgoCrew, we are committed to driving innovation and excellence in the world of IT. As a dynamic and forward-thinking software company, we specialize in delivering top-tier IT solutions and services tailored to meet the evolving needs of businesses across diverse sectors.
      </>
    ),
  },
  ourMission: {
    display: true, // set to false to hide this section
    title: "Our Mission",
    img: "/images/about/mission2.png",
    description: (
      <>
        Our mission is to empower businesses by delivering cutting-edge technology solutions that drive innovation, efficiency, and sustainable growth.
        We strive to unlock our clients full potential by connecting them with a network of passionate,
        highly skilled engineers dedicated to solving complex challenges and creating meaningful digital transformation.
      </>
    ),
  },

  ourVision: {
    display: true, // set to false to hide this section
    title: "Our Vision",
    img: "/images/about/vision2.png",
    description: (
      <>
        At AlgoCrew, we envision a future where IT systems evolve into intelligent,
        agile, and AI-powered digital assets. Backed by over a decade of expertise,
        we empower global clients with innovative and adaptive solutions, shaping a world where technology seamlessly meets the ever-changing demands of a connected, digital era.
      </>
    ),
  },

  ourValues: {
    display: true, // set to false to hide this section
    title: "What make us more valuable",
    img: "/images/about/vision1.png",
  },

  technical: {
    display: false, // set to false to hide this section
    title: "Technical skills",
    skills: [
      {
        title: "Figma",
        description: <>Able to prototype in Figma with Once UI with unnatural speed.</>,
        // optional: leave the array empty if you don't want to display images
        images: [
          {
            src: "/images/projects/project-01/cover-02.jpg",
            alt: "Project image",
            width: 16,
            height: 9,
          },
          {
            src: "/images/projects/project-01/cover-03.jpg",
            alt: "Project image",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        title: "Next.js",
        description: <>Building next gen apps with Next.js + Once UI + Supabase.</>,
        // optional: leave the array empty if you don't want to display images
        images: [
          {
            src: "/images/projects/project-01/cover-04.jpg",
            alt: "Project image",
            width: 16,
            height: 9,
          },
        ],
      },
    ],
  },
};

const blog = {
  path: "/blog",
  label: "Blog",
  title: "Writing about design and tech...",
  description: `Read what ${person.name} has been up to recently`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const contact = {
  path: "/contact",
  label: "Contact",
  title: "Contact us - Algocrew",
  description: `we are committed to driving innovation and excellence in the world of IT`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `Design and dev projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const services = {
  path: "/services",
  label: "Services",
  title: `What we Do`,
  description: `All services under one roof. And help our customers from ideas in mind to real world solutions`,
  headline: <>We provide cutting-edge digital solutions!</>,
  subline: <>We’re not just here to deliver projects — we’re here to partner for the long impact. By understanding your business challenges, we craft solutions designed to make a meaningful, long-term impact.</>,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const projects = {
  path: "/projects",
  label: "Showcase",
  title: `Projects `,
  description: `A photo collection of our projects`,
  // Images by https://lorant.one
  // These are placeholder images, replace with your own
  images: [
    {
      src: "/images/gallery/horizontal-1.png",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-2.png",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-3.png",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-4.png",
      alt: "image",
      orientation: "horizontal",
    },
    // {
    //   src: "/images/gallery/vertical-1.png",
    //   alt: "image",
    //   orientation: "vertical",
    // },
    // {
    //   src: "/images/gallery/vertical-2.png",
    //   alt: "image",
    //   orientation: "vertical",
    // },
    // {
    //   src: "/images/gallery/vertical-3.jpg",
    //   alt: "image",
    //   orientation: "vertical",
    // },
    // {
    //   src: "/images/gallery/vertical-4.jpg",
    //   alt: "image",
    //   orientation: "vertical",
    // },
  ],
};

export { person, social, newsletter, home, about, aboutUs, blog, work, projects, services, contact };
