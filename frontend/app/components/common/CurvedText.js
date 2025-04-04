"use client";
import React from "react";
import { motion } from "framer-motion";
import { Rye } from "next/font/google";

const font = Rye({
  subsets: ["latin"],
  weight: ["400"],
});

const CurvedText = ({ text, fontSize = "40px" }) => {
  const textLength = text.length;
  const baseSize = parseInt(fontSize, 10);
  const radius = Math.max(baseSize * textLength * 0.3, 200);

  const letters = text.split("");

  return (
    <div className="flex justify-center py-[10vh] w-full overflow-visible mt-[6rem]">
      <svg
        viewBox={`0 0 ${radius * 2} ${radius}`}
        width={radius * 2}
        height={radius * 0.8}
        style={{ overflow: "visible" }}
      >
        {/* Path Animation */}
        <motion.path
          id="text-curve"
          d={`M ${radius * 0.1},${radius * 0.6} A ${radius * 0.9},${
            radius * 0.6
          } 0 0 0 ${radius * 1.9},${radius * 0.6}`}
          fill="transparent"
          stroke="#d4af37"
          strokeWidth={2}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: [0, 1, 0], opacity: [0, 1, 0] }}
          transition={{
            duration: 4,
            times: [0, 0.5, 1],
            ease: "easeInOut",
          }}
        />

        {/* Text Animation: Letter-by-letter reveal */}
        <motion.text
          fill="#d4af37"
          className={font.className}
          fontSize={fontSize}
          fontWeight="bold"
        >
          <textPath
            href="#text-curve"
            startOffset="50%"
            textAnchor="middle"
            lengthAdjust="spacingAndGlyphs"
          >
            {letters.map((letter, index) => (
              <motion.tspan
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay: 2 + index * 0.05, // starts after path draws in (2s), then stagger
                  duration: 0.4,
                }}
              >
                {letter}
              </motion.tspan>
            ))}
          </textPath>
        </motion.text>
      </svg>
    </div>
  );
};

export default CurvedText;
