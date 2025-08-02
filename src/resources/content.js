import { Logo } from "@once-ui-system/core";

const person = {
  firstName: "Arqam",
  lastName: "Tahir",
  get name() {
    // Escaped the backticks within the template literal for clarity if it were raw string
    // This is already a template literal, so standard string escaping for single quotes isn't strictly needed here,
    // but the original error implies it was being treated as a JSX string directly.
    return `${this.firstName} ${this.lastName}`;
  },
  role: "Software Engineer",
  avatar: "/images/LogoDark.png",
  email: "hr@algocrew.io",
  location: "Canada", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: ["English", "Urdu", "Panjabi"], // optional: Leave the array empty if you don't want to display languages
};

const newsletter = {
  display: true,
  title: <>Subscribe to AlgoCrew Newsletter</>,
  description: (
    <>
      Stay updated with our latest insights, innovations, and exclusive offers. Be part of our growing digital family and enjoy special discounts and updates.
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
    link: "mailto:info@algocrew.io", // Added quotes around mailto link
  },
];

const home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  // Escaped apostrophes
  title: "AlgoCrew - Delivering Top-Tier IT Solutions and Services",
  description: "At AlgoCrew, we turn bold ideas into scalable software solutions. From MVP development to full-scale digital transformation, our expert teams combine cutting-edge technology with deep industry insight to deliver impactful, tailor-made products. Whether you are building something new or optimizing legacy systems, we are your partner in growth and innovation.",
  headline: <>Your Idea. Our Logistics. A New Reality.</>,
  featured: {
    display: true,
    title: <>Our Recent Projects <strong className="ml-4"></strong></>,
    href: "/projects",
  },
  subline: (
    <>
      At AlgoCrew, we turn bold ideas into scalable software solutions. From MVP development to full-scale digital transformation, our expert teams combine cutting-edge technology with deep industry insight to deliver impactful, tailor-made products. Whether you are building something new or optimizing legacy systems, we are your partner in growth and innovation.
    </>
  ),
  valueProposition: (
    <>
      <h3>Why Choose Us?</h3>
      <ul>
        <li><strong>Innovative Solutions:</strong> We leverage the latest technologies to build scalable and efficient solutions.</li>
        <li><strong>End-to-End Expertise:</strong> From ideation and design to deployment and support, we cover all aspects of your project.</li>
        <li><strong>Client-Centric Approach:</strong> Your business goals are our top priority. We work alongside you to achieve success.</li>
        <li><strong>Proven Track Record:</strong> A portfolio of successful projects and satisfied clients speaks for itself.</li>
      </ul>
    </>
  ),
  testimonials: {
    display: true,
    title: <>What Our Clients Say</>,
    content: (
      <>
        &quot;Working with AlgoCrew was a game changer for our business. Their expertise, creativity, and professionalism turned our ideas into a reality, driving both growth and innovation.&quot;
        <br />
        <strong>- Happy Client</strong>
      </>
    ),
  },
  sublineExpanded: (
    <>
      Our team uses state-of-the-art technology stacks and agile methodologies to ensure seamless delivery. With our collaborative approach, we help you navigate the complexities of the digital world and achieve long-term business success.
    </>
  ),
};

const about = {
  path: "/about",
  label: "About",
  // Escaped apostrophes
  title: "About – AlgoCrew",
  image: "/images/og/about.jpg",
  description: "We are committed to driving innovation and excellence in the world of IT.",
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
        At AlgoCrew, we believe in leveraging state-of-the-art technology stacks and industry expertise to solve complex problems and bring impactful solutions to life. We transform your challenges into successful digital products.
      </>
    ),
  },
  work: {
    display: true,
    title: "Work Experience",
  },
};

const aboutUs = {
  path: "/about",
  label: "About",
  title: "Who We Are",
  image: "/images/LogoDark.png",
  metaDescription: "At AlgoCrew, we are a team of technologists, strategists, and innovators dedicated to helping businesses succeed through purpose-built digital solutions. Whether you are a startup shaping your first MVP or an enterprise scaling complex systems, we bring the talent and technology needed to deliver fast, reliable, and scalable outcomes.",
  description: (
    <>
      <>
        At AlgoCrew, we are a team of technologists, strategists, and innovators dedicated to helping businesses succeed through purpose-built digital solutions. Whether you are a startup shaping your first MVP or an enterprise scaling complex systems, we bring the talent and technology needed to deliver fast, reliable, and scalable outcomes.
      </>
      <span>
        We are not just another IT vendor, we are your remote product team, tech partner, and long-term growth ally.
      </span>
    </>
  ),
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
        We are committed to delivering exceptional software solutions that truly stand out. Whether you&apos;re a startup looking for innovative solutions or an enterprise seeking scalable technology, we provide agile, high-performance technology to help you meet your business goals and accelerate growth in a competitive landscape.
      </>
    ),
  },

  ourMission: {
    display: true, // set to false to hide this section
    title: "Our Mission",
    img: "/images/about/mission2.png",
    description: (
      <>
        <>
          To empower businesses of all sizes with innovative, reliable, and future-ready technology.
          From launching your first MVP to solving enterprise-level challenges, we deliver measurable results without the pressure. We offer a 7-day risk-free trial to prove our value before you commit.
        </>
        <strong className="mt-m mb-s">We specialize in:</strong>
        <li>
          MVP Development & Product Prototyping
        </li>
        <li>
          Remote Engineering Teams
        </li>
        <li>
          Ongoing Support & Maintenance
        </li>
        <li>
          Strategic IT Consultancy
        </li>
        <span>
          At AlgoCrew, your vision becomes our mission, and our mission is to turn it into reality.
        </span>
      </>
    ),
  },

  ourVision: {
    display: true, // set to false to hide this section
    title: "Our Vision",
    img: "/images/about/vision2.png",
    description: (
      <>
        <>
          To redefine what is possible in digital product development by building intelligent, adaptable systems that help businesses thrive in a fast-changing world.
          We believe in collaboration without friction, offering flexible engagement models and a problem-solving mindset that moves at your pace.
        </>
        <span className="mt-m mb-s">
          Whether you are launching, scaling, or modernizing, we are here to elevate your journey with:
        </span>
        <li>
          Agile workflows
        </li>
        <li>
          Cutting-edge technologies
        </li>
        <li>
          Domain-aligned engineering talent
        </li>
        <li>
          Transparent communication & delivery
        </li>
        <span>
          Let’s shape the future together.
        </span>
      </>
    ),
  },

  ourValues: {
    display: true, // set to false to hide this section
    title: "What Makes Us Valuable",
    img: "/images/about/vision1.png",
    description: (
      <>
        At AlgoCrew, we strongly believe in the core values that define our work and culture. These values guide us in everything we do:
        <ul>
          <li><strong>Collaboration:</strong> We thrive on teamwork, working together internally and with clients to deliver exceptional outcomes and ensure success.</li>
          <li><strong>Innovation:</strong> We are constantly pushing the boundaries of technology, always striving to deliver fresh, forward-thinking solutions that lead the way.</li>
          <li><strong>Integrity:</strong> We conduct all our business dealings with transparency, honesty, and strong ethical principles, ensuring trust with our clients and partners.</li>
          <li><strong>Excellence:</strong> We are driven by excellence, striving to surpass expectations and set new industry standards through our dedication to quality and professionalism.</li>
        </ul>
      </>
    ),
  },
};

const blog = {
  path: "/blog",
  label: "Blog",
  title: "Writing about design and tech...",
  // Escaped apostrophes
  description: `Read what ${person.name} has been up to recently`, // Used template literal for dynamic content
};

const contact = {
  path: "/contact",
  label: "Contact",
  title: "Contact us - AlgoCrew",
  description: "We are committed to driving innovation and excellence in the world of IT.",
};

const hire = {
  path: "/hire",
  label: "Hire Developer",
  title: "Hire a Developer - AlgoCrew",
  description: "Hire the best dedicated team to take your ideas to the next level.",
};

const work = {
  path: "/work",
  label: "Work",
  // Escaped apostrophes
  title: `Projects – ${person.name}`, // Used template literal for dynamic content
  description: `Design and dev projects by ${person.name}`, // Used template literal for dynamic content
};

const services = {
  path: "/services",
  label: "Services",
  title: "What We Do – AlgoCrew",
  description: "All services under one roof. We help our customers bring ideas to life and turn them into real-world solutions.",
  headline: <>We provide cutting-edge digital solutions!</>,
  subline: <>We&apos;re not just here to deliver projects&mdash;we&apos;re here to partner for the long term. By understanding your business challenges, we craft solutions designed to create a meaningful, long-term impact.</>,
};

const projects = {
  path: "/projects",
  label: "Showcase",
  title: "Projects – AlgoCrew",
  metaDescription: "A photo collection of our projects",
  description: (
    <>
      <strong className="mt-m mb-s">
        Where Vision Meets Execution
      </strong>
      <>
        At AlgoCrew, we do not just build software, we engineer results. Every project we take on is rooted in innovation, precision, and impact. From rapid MVPs to enterprise-grade platforms, our work reflects our commitment to delivering value and driving growth.
      </>
      <span>
        Explore how we have helped startups and global companies turn bold ideas into powerful, real-world digital solutions.
      </span>

    </>
  ),
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
  ],
};

export { person, social, newsletter, home, about, aboutUs, blog, work, projects, services, contact, hire };
