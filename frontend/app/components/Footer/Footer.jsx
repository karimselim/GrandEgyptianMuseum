import { motion } from "framer-motion";
import {
  AiFillBehanceCircle,
  AiFillFacebook,
  AiFillTwitterCircle,
  AiOutlineInstagram,
} from "react-icons/ai";

export default function Footer() {
  return (
    <div className="h-fit mt-[100px]">
      <motion.div
        initial={{
          background:
            "linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(10,10,10,1) 0%)",
          WebkitTextStroke: "1px white",
          color: "rbga(255, 255, 255, 0)",
        }}
        whileHover={{
          background:
            "linear-gradient(90deg, rgba(0,0,0,1) 100%, rgba(10,10,10,1) 100%)",
          WebkitTextStroke: "1px white",
          color: "rbga(255, 255, 255, 1)",
          transition: {
            duration: 0.7,
            delay: 0.2,
            ease: "easeInOut",
          },
        }}
        className="min-h-[300px] w-full flex flex-row items-center text-[var(--text-color)] px-[10%] transition-all duration-700 ease-in-out max-[660px]:flex-col max-[660px]:text-center"
      >
        <a href="/">
          <h1 className="uppercase text-[2.5em] font-[Daikon Bold]">
            Grand Egyptian Museum
          </h1>
        </a>
      </motion.div>

      <div className="w-full flex flex-row justify-between mt-[100px] px-[10%] py-[100px] bg-[#0a0a0a] max-[660px]:flex-col max-[660px]:gap-[20px] max-[660px]:mt-0">
        <div>
          <a href="/">
            <h1 className="font-[URW Geometric Bold] m-0">MTIS</h1>
          </a>
          <div className="flex flex-row justify-between items-center gap-[10px] text-[1.5em]">
            <motion.a
              href="/"
              initial={{ rotateZ: 0 }}
              whileHover={{
                rotateZ: 350,
                transition: { type: "tween", duration: 0.2 },
              }}
            >
              <AiOutlineInstagram />
            </motion.a>
            <motion.a
              href="/"
              initial={{ rotateZ: 0 }}
              whileHover={{
                rotateZ: 370,
                transition: { type: "tween", duration: 0.2 },
              }}
            >
              <AiFillFacebook />
            </motion.a>
            <motion.a
              href="/"
              initial={{ rotateZ: 0 }}
              whileHover={{
                rotateZ: 350,
                transition: { type: "tween", duration: 0.2 },
              }}
            >
              <AiFillTwitterCircle />
            </motion.a>
            <motion.a
              href="/"
              initial={{ rotateZ: 0 }}
              whileHover={{
                rotateZ: 370,
                transition: { type: "tween", duration: 0.2 },
              }}
            >
              <AiFillBehanceCircle />
            </motion.a>
          </div>
        </div>

        <div>
          <h2 className="font-[URW Geometric SemiBold] m-0">Navigation</h2>
          <div className="w-[30px] h-[2px] bg-white my-[5px] mb-[10px]" />
          <div className="flex flex-col gap-[10px] font-[Daikon Medium] text-[1em] uppercase text-gray-500">
            <a href="/">Home</a>
            <a href="/">Events</a>
            <a href="/">About</a>
            <a href="/">Book A Ticket</a>
          </div>
        </div>

        <div>
          <h2 className="font-[URW Geometric SemiBold] m-0">Contact</h2>
          <div className="w-[30px] h-[2px] bg-white my-[5px] mb-[10px]" />
          <div className="flex flex-col gap-[10px] font-[Daikon Medium] text-[1em] uppercase text-gray-500">
            <p className="m-0">
              <strong className="text-white">E</strong> : info@dsngrid.com
            </p>
            <p className="m-0">
              <strong className="text-white">E</strong> : info@dsngrid.com
            </p>
            <p className="m-0">
              <strong className="text-white">E</strong> : info@dsngrid.com
            </p>
          </div>
        </div>

        <div>
          <h2 className="font-[URW Geometric SemiBold] m-0">Address</h2>
          <div className="w-[30px] h-[2px] bg-white my-[5px] mb-[10px]" />
          <div className="flex flex-col gap-[10px] font-[Daikon Medium] text-[1em] uppercase text-gray-500">
            <p className="m-0">
              X4VF+V38, Cairo - Alexandria Desert Rd, Kafr Nassar, Al Haram,
              Giza Governorate 3513204
            </p>
          </div>
        </div>
      </div>

      <div
        style={{
          width: "100%",
          height: "2px",
          background:
            "radial-gradient(circle, rgba(255,255,255,1) 10%, rgba(134,134,134,1) 29%, rgba(9,9,9,1) 73%)",
          margin: "0 auto",
        }}
      />

      <div className="flex flex-col justify-center items-center gap-[10px] bg-[#0a0a0a] text-gray-500 py-[20px] pb-[100px] font-[Daikon Medium]">
        <p className="m-0">Ancient Portal Keepers</p>
        <p className="m-0">
          Designed by <span className="text-white">Ancient Portal Keepers</span>
        </p>
      </div>
    </div>
  );
}
