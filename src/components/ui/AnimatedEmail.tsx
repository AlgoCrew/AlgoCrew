import { motion } from 'framer-motion';
import ColourfulText from './ColourFulText';


const AnimatedEmail = ({ email }: { email: string }) => {
  return (
    <motion.a
      href={`mailto:${email}`} // ✅ Correct usage of template literal
      animate={{
        scale: [.8, 1, .8],
      }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      whileHover={{
        scale: 1,
      }}
      style={{
        display: 'inline-block',
        cursor: 'pointer',
      }}
      className=' neutral-border-alpha-medium neutral-on-background-strong'
    >
      info@algocrew.io
    </motion.a>
  );
};

export default AnimatedEmail;
