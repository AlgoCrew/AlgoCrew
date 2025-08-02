"use client";
import React from "react";
import { motion } from "motion/react";

export default function BlurAnimatedText({ text }: { text: string }) {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => prev + 1);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <span className="inline-block">
        {
          text.split("").map((char, index) => (
            <motion.a
              href={`mailto:${text}`}
              key={`${char}-${count}-${index}`}
              initial={{
                y: 0,
              }}
              animate={{
                y: [0, -6, 0],
                scale: [1, 1.01, 1],
                filter: ["blur(0px)", `blur(5px)`, "blur(0px)"],
                opacity: [1, 0.8, 1],
              }}
              transition={{
                duration: .3,
                delay: index * 0.05,
              }}
              className="inline-block whitespace-pre font-sans tracking-tight"
            >
              {char}
            </motion.a>
          ))
        }
      </span>
    </>
  )
}
