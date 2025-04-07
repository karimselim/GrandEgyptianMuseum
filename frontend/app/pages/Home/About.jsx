import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function About() {
  const [isDesignerHovered, setDesignerHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const el = document.getElementById("second-screen-image");
      if (el) {
        el.style.backgroundSize = `${88 + window.pageYOffset / 35}%`;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-full h-screen bg-black py-[50px] max-md:h-fit">
      <motion.h1
        initial={{ opacity: 0 }}
        whileInView={{
          opacity: 1,
          transition: {
            delay: 0.5,
            duration: 0.4,
          },
        }}
        viewport={{ once: true }}
        className="text-white font-['URW Geometric SemiBold'] text-3xl text-center mx-auto pt-8 pb-14 px-5 max-md:px-[20px]"
      >
        A Timeless Journey Through History
      </motion.h1>

      <div className="min-h-[80%] grid grid-cols-2 text-white max-md:flex max-md:flex-col">
        <div className="flex flex-col items-center gap-[10px] px-[20%] py-[30px] text-center max-md:text-center">
          <motion.p className="text-[#a3a3a3] text-[1.2em] font-['Daikon Light'] text-left max-md:text-center">
            {`Welcome to the Grand Egyptian Museum, where history, culture, and innovation come together. Step into a world where the wonders of ancient Egypt meet cutting-edge technology, bringing the past to life in breathtaking detail. Explore our exhibits and immerse yourself in a timeless journey through civilization’s greatest treasures`
              .split(" ")
              .map((ele, ind) => (
                <motion.span
                  key={ind}
                  initial={{ opacity: 0, top: "10px", position: "relative" }}
                  whileInView={{
                    opacity: 1,
                    top: "0px",
                    transition: {
                      delay: ind * 0.02 + 1.2,
                      duration: 0.1,
                    },
                  }}
                  viewport={{ once: true }}
                >
                  {" "}
                  {ele}
                </motion.span>
              ))}
          </motion.p>

          <div
            className="w-full flex flex-row items-center gap-[10px] text-left text-[1.2em] font-['Daikon Medium'] py-[10px] max-md:flex-col link"
            onMouseEnter={() => setDesignerHovered(true)}
            onMouseLeave={() => setDesignerHovered(false)}
          >
            <span className="uppercase">Lotus Crown</span>
            <motion.div
              initial={{ width: "0px" }}
              animate={{
                width: isDesignerHovered ? "80px" : "0px",
                transition: {
                  duration: 0.7,
                  ease: "easeInOut",
                },
              }}
              className="h-[1px] bg-white"
            />
            <motion.span
              className="text-[#aeaeae]"
              animate={{
                opacity: isDesignerHovered ? 1 : 0,
                transition: {
                  delay: isDesignerHovered ? 0.7 : 0,
                  duration: 0.4,
                },
              }}
            >
              • Symbol of Rebirth
            </motion.span>
          </div>

          <div className="flex items-start gap-[10px] uppercase text-[1.4em] font-['Daikon Bold'] mt-[1em] mb-[1em] max-md:flex-col max-md:items-center max-md:justify-center max-md:m-0 max-md:mb-[20px]">
            <motion.span
              className="text-[5em] relative mt-[20px] max-md:m-0 max-md:leading-[30px]"
              initial={{ opacity: 0, top: "10px", position: "relative" }}
              whileInView={{
                opacity: 1,
                top: "0px",
                transition: {
                  delay: 1.3,
                  duration: 0.4,
                },
              }}
              viewport={{ once: true }}
            >
              70
            </motion.span>
            <motion.span
              className="relative mt-[60px] w-[250px] font-['Daikon Light']"
              initial={{ opacity: 0, top: "10px", position: "relative" }}
              whileInView={{
                opacity: 1,
                top: "0px",
                transition: {
                  delay: 1.6,
                  duration: 0.4,
                },
              }}
              viewport={{ once: true }}
            >
              million annual visitors capacity
            </motion.span>
          </div>
        </div>

        <div className="p-[10%] bg-[#1b1b1b] max-md:hidden max-lg:p-0 max-lg:h-[500px]">
          <div
            className="relative w-full h-full"
            id="second-screen-image"
            style={{
              background: 'url("/imgs/first.jpeg")',
              backgroundPosition: "center",
              backgroundSize: "100%",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}
