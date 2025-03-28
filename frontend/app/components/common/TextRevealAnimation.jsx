import { motion } from "framer-motion";
import React from "react";

const ScaleFadeTextReveal = () => {
  const text =
    "this is some placeholder for the about of the Museum as a placeholder";

  // Split text into words for animation
  const words = text.split(" ");

  // Variants for container
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  // Variants for each word
  const child = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      filter: "blur(2px)",
    },
    visible: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 200,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      filter: "blur(2px)",
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      exit="exit"
      viewport={{ margin: "-100px" }}
      variants={container}
      style={{
        fontSize: "1.5rem",
        lineHeight: 1.6,
        padding: "4rem 2rem",
        maxWidth: "800px",
        margin: "0 auto",
        minHeight: "50vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <motion.div style={{ textAlign: "center" }}>
        {words.map((word, index) => (
          <motion.span
            key={index}
            variants={child}
            style={{
              marginRight: "8px",
              display: "inline-block",
              transformOrigin: "bottom center",
            }}
          >
            {word}
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default ScaleFadeTextReveal;
