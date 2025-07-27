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
  description: "We&apos;re committed to transforming your ideas into innovative digital solutions. From vision to execution, we help your business thrive in a rapidly evolving technological landscape.",
  headline: <>Your Idea. Our Logistics. A New Reality.</>,
  featured: {
    display: true,
    title: <>Our Recent Projects <strong className="ml-4"></strong></>,
    href: "/projects",
  },
  subline: (
    <>
      At AlgoCrew, we harness the power of cutting-edge technology and expert industry knowledge to craft digital solutions that make a tangible impact. Whether you&apos;re launching something new or enhancing existing systems, we provide tailor-made solutions that drive growth and elevate your success.
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
  description: "At AlgoCrew, we are dedicated to driving innovation and excellence in the IT industry. As a dynamic, forward-thinking software company, we specialize in delivering top-tier IT solutions that are meticulously tailored to meet the ever-evolving needs of businesses across various sectors and industries.",
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
        Our mission is to provide innovative, reliable, and scalable technology solutions for everyone&mdash;from ambitious startups to established enterprises. We truly believe that each business, no matter its size, deserves the opportunity to thrive, and we&apos;re here to help make that happen. Our approach is simple: no pressure, just results. We offer a 7-day probation test to ensure that you feel confident in our solutions before committing. At AlgoCrew, we&apos;re focused on transforming your ideas into powerful solutions that foster business growth and digital transformation, with no strings attached. We empower businesses with cutting-edge technologies and a dedicated team that solves complex challenges and inspires success.
      </>
    ),
  },

  ourVision: {
    display: true, // set to false to hide this section
    title: "Our Vision",
    img: "/images/about/vision2.png",
    description: (
      <>
        Our vision is to shape the future of technology by building intelligent, scalable, and innovative digital systems that adapt seamlessly to the evolving needs of businesses. Whether you&apos;re a startup or a large enterprise, we&apos;re passionate about helping you succeed, and we work with you at your pace&mdash;no pressure, just collaboration. We offer a 7-day probation test to ensure you feel comfortable and confident in our partnership. Through creativity, collaboration, and cutting-edge technology, we strive to redefine industries globally, driving innovation and setting new benchmarks for success in this digital era.
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
  description: "A photo collection of our projects",
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
