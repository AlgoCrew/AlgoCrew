import { Testimonials } from "../../components/ui/Testimonals";

export default function AnimatedTestimonials() {
  const testimonials = [
    {
      quote:
        "I have been working with the team at AlgoCrew for nearly three years. I work with their team day in and day out to advance the Nice2stay platform. They have met high-pressure deadlines and created work for us on a product that has thousands of daily unique visitors. They’re easy to get in touch with and quick to follow up and resolve any issues. It has been a great experience to work with the team at AlgoCrew.",
      name: "Femke Zawan",
      designation: "Funder of Nice2Stay",
      src: "/images/testimonals/femke.jpeg",
    },

    {
      quote:
        "Working with the team at AlgoCrew has been an absolute pleasure. Their expertise and dedication to delivering results have made a significant impact on our platform. From the seamless implementation to the excellent support, their team truly exceeds expectations.",
      name: "Natalia Serwar",
      designation: "Founder of Hotel Weekend",
      src: "/images/testimonals/natalia.png",
    },
  ];
  return <Testimonials testimonials={testimonials} />;
}
