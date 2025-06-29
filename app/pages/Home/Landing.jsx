"use client";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef, useEffect, useState, useMemo } from "react";
import Scene from "@/app/components/scenes/MainScene";
import CurvedText from "@/app/components/common/CurvedText";
// import SandCanvasParticles from "@/app/components/common/SandCanvasParticles";
import SandCanvasParticles from "@/app/components/canvas/SandCanvasParticles";

const HIEROGLYPHS = ["𓀀", "𓀁", "𓀂", "𓀃"];

const Landing = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const hieroglyphs = useMemo(() => {
    if (!isMounted) return [];
    return HIEROGLYPHS.map((glyph) => ({
      glyph,
      left: Math.random() * 100,
      top: Math.random() * 100,
      yEnd: Math.random() * 100 - 50,
      rotateEnd: Math.random() * 180,
      scaleMin: Math.random() * 0.5 + 0.5,
      scaleMax: Math.random() * 1.2 + 0.5,
      duration: Math.random() * 12 + 8,
    }));
  }, [isMounted]);

  return (
    <div
      className="relative w-screen h-screen overflow-hidden"
      ref={containerRef}
    >
      {/* Optimized canvas particles */}
      <SandCanvasParticles />

      {/* Floating glyphs */}
      {isMounted &&
        hieroglyphs.map((h, i) => (
          <motion.div
            key={i}
            className="absolute text-[#FFD70050] text-4xl pointer-events-none"
            style={{
              left: `${h.left}%`,
              top: `${h.top}%`,
              zIndex: 2,
            }}
            animate={{
              y: [`0vh`, `${h.yEnd}vh`],
              rotate: [0, h.rotateEnd],
              scale: [h.scaleMin, h.scaleMax, h.scaleMin],
            }}
            transition={{
              duration: h.duration,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {h.glyph}
          </motion.div>
        ))}

      {/* Shimmering overlay */}
      <motion.div
        className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,#5e2c0433_50%,transparent_100%)] pointer-events-none"
        animate={{ x: ["-100%", "100%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      {/* Scaled 3D scene */}
      <motion.div className="absolute inset-0" style={{ scale, zIndex: 0 }}>
        <Scene />
      </motion.div>

      {/* Header text */}
      <AnimatePresence>
        <div style={{ textAlign: "center", padding: "2rem", zIndex: 3 }}>
          <CurvedText text="Grand Egyptian Museum" fontSize="58px" />
        </div>
      </AnimatePresence>

      {/* Subtle rotating glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            "conic-gradient(from 45deg, transparent, rgba(255,215,0,0.1), transparent)",
            "conic-gradient(from 225deg, transparent, rgba(255,215,0,0.1), transparent)",
          ],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
        }}
        style={{ zIndex: 0 }}
      />
    </div>
  );
};

export default Landing;
