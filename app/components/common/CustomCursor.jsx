"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useAnimation } from "framer-motion";

export default function CustomCursor() {
  const [isTouch, setIsTouch] = useState(false);
  const [hovering, setHovering] = useState(false);

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const outerControls = useAnimation();
  const innerControls = useAnimation();

  const springConfig = { damping: 30, stiffness: 250 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const detectTouch = () => setIsTouch(true);
    window.addEventListener("touchstart", detectTouch, { once: true });

    const moveCursor = (e) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    const handleMouseDown = () => {
      outerControls.start({ scale: 1.6 });
      innerControls.start({ scale: 0.3 });
    };

    const handleMouseUp = () => {
      outerControls.start({ scale: hovering ? 2 : 1 });
      innerControls.start({ scale: hovering ? 0.5 : 1 });
    };

    const handleHoverIn = () => {
      setHovering(true);
      outerControls.start({ scale: 2 });
      innerControls.start({ scale: 0.5 });
    };

    const handleHoverOut = () => {
      setHovering(false);
      outerControls.start({ scale: 1 });
      innerControls.start({ scale: 1 });
    };

    const hoverTargets = document.querySelectorAll(".cursor-hover-target");
    hoverTargets.forEach((el) => {
      el.addEventListener("mouseenter", handleHoverIn);
      el.addEventListener("mouseleave", handleHoverOut);
    });

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      hoverTargets.forEach((el) => {
        el.removeEventListener("mouseenter", handleHoverIn);
        el.removeEventListener("mouseleave", handleHoverOut);
      });

      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [hovering]);

  if (isTouch) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9999] pointer-events-none"
      style={{
        translateX: cursorXSpring,
        translateY: cursorYSpring,
      }}
    >
      {/* Outer ring */}
      <motion.div
        animate={outerControls}
        initial={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="w-10 h-10 rounded-full backdrop-invert bg-white/10 mix-blend-difference flex items-center justify-center"
      >
        {/* Inner dot */}
        <motion.div
          animate={innerControls}
          initial={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          className="w-2.5 h-2.5 bg-white rounded-full"
        />
      </motion.div>
    </motion.div>
  );
}
