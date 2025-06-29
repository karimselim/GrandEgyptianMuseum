// app/components/common/InitialLoader.jsx
"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Load the Rye font
const RyeFontLink = () => (
  <link
    href="https://fonts.googleapis.com/css2?family=Rye&display=swap"
    rel="stylesheet"
  />
);

const greetings = [
  "Hello",
  "Hola",
  "Bonjour",
  "Ciao",
  "こんにちは",
  "Здравствуйте", // Russian
  "مرحبا",
  "नमस्ते",
  "𓂀𓏏𓆣", // Ancient Egyptian glyph
];

export default function InitialLoader({ onFinish }) {
  // 0: loading, 1: slide black, 2: greetings, 3: done
  const [phase, setPhase] = useState(0);
  const [counter, setCounter] = useState(0);
  const [greetIndex, setGreetIndex] = useState(0);

  // Phase 0 → count
  useEffect(() => {
    if (phase !== 0) return;
    const id = setInterval(() => {
      setCounter((c) => {
        if (c >= 100) {
          clearInterval(id);
          return 100;
        }
        return c + 1;
      });
    }, 25);
    return () => clearInterval(id);
  }, [phase]);

  // When hit 100 → slide black
  useEffect(() => {
    if (counter < 100) return;
    setTimeout(() => setPhase(1), 200);
  }, [counter]);

  // Greeting loop
  useEffect(() => {
    if (phase !== 2) return;
    if (greetIndex < greetings.length - 1) {
      const t = setTimeout(() => setGreetIndex((i) => i + 1), 500);
      return () => clearTimeout(t);
    }
    // After last → done
    const t2 = setTimeout(() => setPhase(3), 500);
    return () => clearTimeout(t2);
  }, [phase, greetIndex]);

  // Finish callback
  useEffect(() => {
    if (phase === 3) {
      setTimeout(() => {
        if (onFinish) onFinish();
      }, 500);
    }
  }, [phase, onFinish]);

  return (
    <>
      <RyeFontLink />
      <div
        className="fixed inset-0 overflow-hidden"
        style={{ backgroundColor: "#1b0d03", fontFamily: "'Rye', cursive" }}
      >
        {/* Phase 0: loader */}
        {phase === 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-3/4 h-1 bg-[#e6c27a]">
              <div
                className="absolute top-0 left-0 h-full bg-[#d4af37]"
                style={{ width: `${counter}%` }}
              />
            </div>
            <p
              className="absolute text-[80px] font-bold"
              style={{ color: "#f0e6b0", top: "40%" }}
            >
              {counter}%
            </p>
          </div>
        )}

        {/* Phase 1→2: slide-in black */}
        {(phase === 1 || phase === 2) && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            onAnimationComplete={() => phase === 1 && setPhase(2)}
            style={{ backgroundColor: "#1b0d03" }}
          >
            {phase === 2 && (
              <motion.p
                key={greetIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="text-[60px] text-[#d4af37] text-center"
              >
                {greetings[greetIndex]}
              </motion.p>
            )}
          </motion.div>
        )}
      </div>
    </>
  );
}
