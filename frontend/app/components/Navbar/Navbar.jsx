import { useState } from "react";
import { motion } from "framer-motion";
import { Squeeze as Hamburger } from "hamburger-react";

export default function Navbar({ isMenuToggled, setIsMenuToggled }) {
  const [isHovered, setHovered] = useState(false);

  return (
    <motion.div
      className="fixed top-0 w-full flex flex-row flex-nowrap items-center z-[99]"
      animate={{
        color: isMenuToggled ? "#fff" : "#000",
        transition: {
          duration: 0.7,
        },
      }}
    >
      <div className="px-8 py-4 text-white font-[Daikon] text-2xl mr-auto">
        {/* Grand Egyptian Museum */}
        <svg
          width="100"
          height="100"
          viewBox="0 0 200 140"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon
            points="100,20 40,100 160,100"
            fill="none"
            stroke="#D4AF37"
            strokeWidth="3"
          />
          <line
            x1="70"
            y1="100"
            x2="100"
            y2="40"
            stroke="#D4AF37"
            strokeWidth="2"
          />
          <line
            x1="130"
            y1="100"
            x2="100"
            y2="40"
            stroke="#D4AF37"
            strokeWidth="2"
          />

          <text
            x="50%"
            y="125"
            fontSize="30"
            fontWeight="bold"
            fill="#D4AF37"
            fontFamily="serif"
            textAnchor="middle"
            letterSpacing="1.5"
          >
            GEM
          </text>
        </svg>
      </div>
      <div
        className="px-8 py-4 text-white flex flex-row flex-nowrap items-center font-[URW Geometric SemiBold] uppercase link"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => setIsMenuToggled(!isMenuToggled)}
      >
        <Hamburger
          size={20}
          duration={0.4}
          toggled={isMenuToggled}
          onToggle={(toggle) => setIsMenuToggled(toggle)}
          distance={isHovered ? "sm" : "lg"}
          easing={"ease-in"}
          hideOutline={false}
        />
        <div className="relative w-10 h-full cursor-pointer">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <motion.span
              style={{ position: "relative" }}
              animate={{
                opacity: isHovered ? 0 : 1,
                transition: {
                  delay: isHovered ? 0.2 : 0.5,
                  duration: 0.5,
                },
              }}
            >
              Menu
            </motion.span>
          </div>
          <div>
            <motion.span
              animate={{
                opacity: !isHovered ? 0 : 1,
                transition: {
                  delay: isHovered ? 0.5 : 0.2,
                  duration: 0.5,
                },
              }}
            >
              {isMenuToggled ? "Close" : "Open"}
            </motion.span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
