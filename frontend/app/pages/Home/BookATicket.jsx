import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { useParallax } from "react-scroll-parallax";
import { useEffect, useRef } from "react";
import img1 from "../../assets/first.jpeg";
// import styles from "./main.module.css";

export default function BookATicket() {
  const controls = useAnimation();
  const componentRef = useRef(null);
  const parallex = useParallax({
    speed: -5,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start("visible");
        } else {
          controls.start("hidden");
        }
      },
      {
        threshold: 0.5,
        rootMargin: "0px 0px -25% 0px",
      }
    );

    if (componentRef.current) {
      observer.observe(componentRef.current);
    }

    return () => {
      if (componentRef.current) {
        observer.unobserve(componentRef.current);
      }
    };
  }, [controls]);

  const contentVariants = {
    hidden: {
      y: 40,
      opacity: 0,
      transition: { duration: 0 },
    },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        delay: 0.3 + i * 0.15,
        ease: [0.16, 0.77, 0.47, 0.97],
      },
    }),
  };

  return (
    <motion.div
      ref={componentRef}
      className="h-screen w-screen flex flex-row justify-center items-center gap-[50px] px-[20%] py-[5%] my-[50px] max-[600px]:h-fit  max-[600px]:flex-col max-[600px]:gap-0 max-[600px]:py-[5%] max-[600px]:px-0"
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { duration: 0.5 },
        },
      }}
    >
      <div className="flex flex-col justify-center relative w-1/2 h-full overflow-hidden max-[600px]:w-full max-[600px]:mt-[-500px] max-[600px]:min-h-[500px]">
        <div
          style={{
            height: "100%",
            width: "100%",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Image
            ref={parallex.ref}
            src={img1}
            alt="Time Tag Watch display"
            layout="fill"
            objectFit="cover"
            quality={100}
            className="object-cover max-[600px]:min-h-[500px] max-[600px]:hidden"
            priority
          />
        </div>
      </div>

      <div className="flex flex-col justify-center relative w-1/2 h-full text-white max-[600px]:w-full max-[600px]:p-[10%]">
        <motion.h1
          custom={0}
          variants={contentVariants}
          className="mb-0 text-4xl font-[URW Geometric SemiBold] text-white relative"
        >
          Experience the Future of Live Events
        </motion.h1>

        <motion.h3
          custom={1}
          variants={contentVariants}
          className="my-2.5 mx-0 font-[Daikon SemiBold] text-[#e0e0e0] relative"
        >
          Join us for an unforgettable evening of innovation and entertainment.
          Our cutting-edge production brings together world-class performers and
          groundbreaking technology for a show that redefines live experiences.
        </motion.h3>

        <motion.p
          custom={2}
          variants={contentVariants}
          className="font-[Daikon Medium] text-[#b0b0b0] relative"
        >
          Reserve your seats now for guaranteed access to this limited-capacity
          event. With high demand expected, we recommend booking early to avoid
          disappointment and secure your preferred viewing experience.
        </motion.p>

        <motion.a
          href="/book-tickets"
          className="w-fit flex flex-nowrap flex-row items-center gap-2.5 my-8 mx-0 py-2.5 px-5 text-sm tracking-[2px] uppercase border-solid border-white border rounded-[44px] text-white no-underline transition-all ease-in-out duration-300 hover:bg-[rgba(255, 255, 255, 0.1)] relative"
          custom={3}
          variants={contentVariants}
          whileHover={{
            scale: 1.05,
            transition: { duration: 0.2 },
          }}
          whileTap={{
            scale: 0.95,
          }}
        >
          Book Your Tickets Now →
        </motion.a>
      </div>
    </motion.div>
  );
}
