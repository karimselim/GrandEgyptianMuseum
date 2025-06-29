"use client";

import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const NUM_COLUMNS = 12;
const RISE_DELAY = 0.07;
const DROP_DELAY = 0.07;

export default function AnimatedLayout({ children }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [phase, setPhase] = useState("rising"); // "rising", "dropping", "done"
  const [showChildren, setShowChildren] = useState(isHome); // if home, show content immediately

  useEffect(() => {
    if (isHome) return;

    setPhase("rising");
    setShowChildren(false);

    const totalRise = NUM_COLUMNS * RISE_DELAY * 1000 + 600;
    const totalDrop = NUM_COLUMNS * DROP_DELAY * 1000 + 600;

    const startDrop = setTimeout(() => {
      setPhase("dropping");
    }, totalRise);

    const finishAnim = setTimeout(() => {
      setPhase("done");
      setShowChildren(true);
    }, totalRise + totalDrop);

    return () => {
      clearTimeout(startDrop);
      clearTimeout(finishAnim);
    };
  }, [pathname, isHome]);

  return (
    <div className="relative overflow-hidden z-10">
      {/* Animated Columns (only if not home) */}
      {!isHome && phase !== "done" && (
        <div className="fixed inset-0 z-50 pointer-events-none flex">
          {Array.from({ length: NUM_COLUMNS }).map((_, i) => {
            const index = phase === "dropping" ? NUM_COLUMNS - 1 - i : i;

            return (
              <motion.div
                key={i}
                initial={{ y: "100%" }}
                animate={{
                  y: phase === "rising" ? "0%" : "100%",
                  transition: {
                    delay:
                      index * (phase === "rising" ? RISE_DELAY : DROP_DELAY),
                    duration: 0.5,
                    ease: [0.83, 0, 0.17, 1],
                  },
                }}
                className="flex-1 h-full bg-[#ffce00]"
              />
            );
          })}
        </div>
      )}

      {/* Page Content */}
      {showChildren && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.8,
            ease: [0.4, 0, 0.2, 1],
          }}
        >
          {children}
        </motion.div>
      )}
    </div>
  );
}
