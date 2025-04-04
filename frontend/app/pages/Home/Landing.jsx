import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef, useEffect, useState, useMemo } from "react";
import Scene from "@/app/components/scenes/MainScene";
import CurvedText from "@/app/components/common/CurvedText";

const HIEROGLYPHS = ["𓀀", "𓀁", "𓀂", "𓀃", "𓀄", "𓀅", "𓀆", "𓀇"];
const NUM_SAND_PARTICLES = 200;

const Landing = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.3, duration: 1.2 },
    }),
  };

  const sandParticles = useMemo(() => {
    if (!isMounted) return [];
    return Array.from({ length: NUM_SAND_PARTICLES }, () => ({
      width: Math.random() * 3 + 1,
      height: Math.random() * 3 + 1,
      left: Math.random() * 100,
      top: Math.random() * 100,
      xEnd: Math.random() * 200 - 100,
      yEnd: Math.random() * 200 - 100,
      duration: Math.random() * 10 + 5,
    }));
  }, [isMounted]);

  const hieroglyphs = useMemo(() => {
    if (!isMounted) return [];
    return HIEROGLYPHS.map((glyph) => ({
      glyph,
      left: Math.random() * 100,
      top: Math.random() * 100,
      yEnd: Math.random() * 200 - 100,
      rotateEnd: Math.random() * 360,
      scaleMin: Math.random() * 0.5 + 0.5,
      scaleMax: Math.random() * 1.5 + 0.5,
      duration: Math.random() * 15 + 10,
    }));
  }, [isMounted]);

  return (
    <div
      className="relative w-screen h-screen overflow-hidden"
      ref={containerRef}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {sandParticles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute bg-[#d4a017] rounded-full"
            style={{
              width: `${p.width}px`,
              height: `${p.height}px`,
              left: `${p.left}%`,
              top: `${p.top}%`,
            }}
            animate={{
              x: [`0vw`, `${p.xEnd}vw`],
              y: [`0vh`, `${p.yEnd}vh`],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {isMounted &&
        hieroglyphs.map((h, i) => (
          <motion.div
            key={i}
            className="absolute text-[#FFD70050] text-4xl pointer-events-none"
            style={{
              left: `${h.left}%`,
              top: `${h.top}%`,
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

      <motion.div
        className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,#5e2c0433_50%,transparent_100%)] pointer-events-none"
        animate={{
          x: ["-100%", "100%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <motion.div className="absolute inset-0" style={{ scale }}>
        <Scene scale={1.7} />
      </motion.div>

      <AnimatePresence>
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <CurvedText text="Grand Egyptian Museum" fontSize="58px" />
        </div>
      </AnimatePresence>

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
      />
    </div>
  );
};

export default Landing;
