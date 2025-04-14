import Image from "next/image";
import { motion, useScroll } from "framer-motion";

import styles from "./main.module.css";
import { useEffect, useRef, useState } from "react";

export default function Afrocentrism() {
  const [progress, setProgress] = useState(0);

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });

  useEffect(() => {
    scrollYProgress.onChange((y) => {
      setProgress(y);
    });
  }, []);

  return (
    <div className={styles.main} ref={ref}>
      <motion.div
        className="absolute h-full w-full top-0 left-0 origin-center pointer-events-none z-[5]"
        style={{ scale: 2.0 - +progress }}
      >
        <Image
          src={"/imgs/afro.png"}
          alt="insence-image"
          // className="object-cover"
          layout="fill"
        />
      </motion.div>

      <div
        className="flex flex-col justify-center max-w-[50%] h-full px-[50px] text-white bg-[rgba(24,24,24,0.699)] z-[5]
        max-[980px]:max-w-[80%] max-[660px]:max-w-full max-[660px]:px-[5%] max-[660px]:text-center max-[660px]:my-auto"
      >
        <h2 className="m-0 text-[2em] font-['URW_Geometric_SemiBold']">
          Afrocentrism Unmasked
        </h2>
        <p className="m-[30px] font-['Daikon_Light']">
          Afrocentrism rises as both a remedy and a rebellion—a cultural
          re-centering that seeks to rewrite history through African eyes. It
          challenges the long-standing Eurocentric dominance in academia by
          spotlighting Africa’s forgotten empires, intellects, and innovations.
          Yet, in its passionate quest for restoration, Afrocentrism sometimes
          tiptoes into myth-making, replacing one distorted lens with another.
          Critics argue that the movement can oversimplify, glorify, or
          homogenize a continent rich in complexity. The real challenge lies in
          balancing pride with precision—honoring African legacies without
          rewriting facts, and seeking truth rather than trading one bias for
          another.
        </p>
        <motion.a
          href="/"
          initial={{
            top: "50px",
            opacity: 0,
          }}
          whileInView={{
            top: "0px",
            opacity: 1,
            transition: {
              duration: 0.7,
              delay: 0.5,
            },
          }}
          viewport={{ once: true }}
          className="w-fit flex items-center gap-2.5 my-8 py-5 px-8 uppercase border-[1px] border-solid border-white rounded-[44px]"
        >
          {" "}
          Learn More
        </motion.a>
      </div>
    </div>
  );
}
/**works with css */
