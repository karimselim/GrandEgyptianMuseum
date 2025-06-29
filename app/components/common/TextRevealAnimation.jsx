import { motion } from "framer-motion";
import React from "react";

const TextRevealAnimation = () => {
  const text =
    "Welcome to the Grand Egyptian Museum, where history, culture, and innovation come together. Step into a world where the wonders of ancient Egypt meet cutting-edge technology, bringing the past to life in breathtaking detail. Explore our exhibits and immerse yourself in a timeless journey through civilization’s greatest treasures.";

  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
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

  const child = {
    hidden: {
      opacity: 0,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 25,
        duration: 0.6,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
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
        fontWeight: "bold",
        textAlign: "center",
      }}
    >
      <motion.div>
        {words.map((word, index) => (
          <motion.span
            key={index}
            variants={child}
            style={{
              marginRight: "8px",
              display: "inline-block",
            }}
          >
            {word}
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default TextRevealAnimation;
