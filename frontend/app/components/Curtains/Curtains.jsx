/* eslint-disable @next/next/no-html-link-for-pages */
import { motion, AnimatePresence } from "framer-motion";

export default function Curtains({ isMenuToggled }) {
  const arrayLinks = ["Home", "Events", "About", "Book A Ticket"];

  return (
    <div className="fixed top-0 left-0 h-0 w-full z-10">
      <motion.div
        className="absolute top-0 -left-1/2 h-screen w-[50vw] bg-[#1f1f1fa1]"
        animate={{
          left: isMenuToggled ? "0%" : "-50%",
          transition: {
            duration: 1,
            delay: isMenuToggled ? 0 : 1,
          },
        }}
      ></motion.div>
      <motion.div
        className="absolute top-0 -left-1/2 h-screen w-[50vw] bg-[#0c0c0c] flex items-center justify-center"
        animate={{
          left: isMenuToggled ? "0%" : "-50%",
          transition: {
            duration: 1,
            delay: isMenuToggled ? 1 : 0,
            ease: "easeInOut",
          },
        }}
      >
        <AnimatePresence>
          {isMenuToggled && (
            <motion.ul
              className="text-white list-none m-0 p-0"
              initial={{ opacity: 0, left: "-10px" }}
              animate={{
                opacity: 1,
                left: "0px",
                transition: {
                  delay: 2,
                  duration: 0.4,
                  ease: "easeInOut",
                },
              }}
              exit={{ opacity: 0 }}
            >
              {arrayLinks.map((ele, ind) => {
                return (
                  <motion.li
                    className="relative left-0 font-[Daikon SemiBold] text-4xl py-[10px] px-0 max-sm:text-3xl"
                    key={ind}
                    initial={{
                      opacity: 0,
                      left: "-30px",
                      transform: "scale(0.8)",
                    }}
                    animate={{
                      opacity: 1,
                      left: "20px",
                      transform: "scale(1.1)",
                      transition: {
                        delay: ind * 0.2 + 2,
                        duration: 0.4,
                        ease: "easeInOut",
                      },
                    }}
                    exit={{ opacity: 0 }}
                  >
                    <a href="/">{ele}</a>
                  </motion.li>
                );
              })}
            </motion.ul>
          )}
        </AnimatePresence>
      </motion.div>
      <motion.div
        className="absolute top-0 left-full h-screen w-[50vw] bg-[#1f1f1fa1]"
        animate={{
          left: isMenuToggled ? "50%" : "100%",
          transition: {
            duration: 1,
            delay: isMenuToggled ? 0 : 1,
            ease: "easeInOut",
          },
        }}
      ></motion.div>
      <motion.div
        className="absolute top-0 left-full h-screen w-[50vw] bg-[#0c0c0c] flex justify-end items-center"
        animate={{
          left: isMenuToggled ? "50%" : "100%",
          transition: {
            duration: 1,
            delay: isMenuToggled ? 1 : 0,
            ease: "easeInOut",
          },
        }}
      ></motion.div>
    </div>
  );
}
