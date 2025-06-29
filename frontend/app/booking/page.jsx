"use client";
import React from "react";
import { motion } from "framer-motion";
import { MdHome } from "react-icons/md";
import DropdownMenu from "../components/common/DropdownMenu";
import {
  AiFillFacebook,
  AiFillTwitterCircle,
  AiOutlineInstagram,
} from "react-icons/ai";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import TimePicker from "../components/common/TimePicker";
import DatePicker from "../components/common/DatePicker";

const Booking = () => {
  return (
    <div className="h-screen pb-36">
      <header className="flex items-center justify-between mx-[5%] border-b border-b-white">
        <svg
          width="100"
          height="100"
          viewBox="0 0 200 140"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            d="M100,20 L40,100 L160,100 Z"
            fill="none"
            stroke="#D4AF37"
            strokeWidth="3"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
          <motion.path
            d="M70,100 L100,40"
            stroke="#D4AF37"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeInOut", delay: 0.3 }}
          />
          <motion.path
            d="M130,100 L100,40"
            stroke="#D4AF37"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeInOut", delay: 0.6 }}
          />
          <motion.text
            x="50%"
            y="125"
            fontSize="30"
            fontWeight="bold"
            fill="#D4AF37"
            fontFamily="serif"
            textAnchor="middle"
            letterSpacing="1.5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            GEM
          </motion.text>
        </svg>
        <MdHome className="text-5xl text-[#d4af37]" />
      </header>

      <main className="px-[5%] pt-5">
        <h2 className="mb-3 text-xl">Select Time and Date</h2>
        <div className="flex flex-col lg:flex-row justify-between gap-4 flex-wrap">
          <aside className="flex flex-wrap lg:flex-nowrap items-center gap-4">
            <TimePicker />
            <DatePicker />
          </aside>
          <aside className="flex flex-wrap lg:flex-nowrap items-center gap-4">
            <h2>Select Tickets</h2>
            <DropdownMenu
              label="Egyptians"
              groupKey="egyptian"
              onChange={() => {}}
            />
            <DropdownMenu
              label="Non Egyptians"
              groupKey="nonEgyptian"
              onChange={() => {}}
            />
            <DropdownMenu
              label="Expatriates"
              groupKey="expatriate"
              onChange={() => {}}
            />
          </aside>
        </div>

        <div className="bg-[#1f1f1f] border border-[#d4af37] rounded-md px-4 sm:px-6 py-6 w-full max-w-4xl mx-auto text-white mt-10">
          <h2 className="text-xl font-bold text-[#d4af37] mb-2">
            Visitor Information
          </h2>
          <h3 className="text-sm text-white/80 mb-6">
            Tickets will be sent to the email address you provide. Please make
            sure to enter a valid email address
          </h3>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <input
              type="text"
              id="firstname"
              placeholder="First Name"
              className="w-full bg-[#2b2b2b] border border-[#d4af37] text-white placeholder-white/70 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
            />
            <input
              type="text"
              id="lastname"
              placeholder="Last Name"
              className="w-full bg-[#2b2b2b] border border-[#d4af37] text-white placeholder-white/70 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
            />
            <input
              type="email"
              id="email"
              placeholder="Email"
              className="w-full bg-[#2b2b2b] border border-[#d4af37] text-white placeholder-white/70 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
            />
            <input
              type="email"
              id="confirm"
              placeholder="Confirm Email Address"
              className="w-full bg-[#2b2b2b] border border-[#d4af37] text-white placeholder-white/70 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
            />
            <input
              type="text"
              id="nationality"
              placeholder="Nationality"
              className="w-full bg-[#2b2b2b] border border-[#d4af37] text-white placeholder-white/70 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
            />
            <div className="flex">
              <div className="flex items-center bg-[#2b2b2b] border border-[#d4af37] px-3 rounded-l-md text-white">
                <span className="text-sm font-semibold">+20</span>
              </div>
              <input
                type="text"
                id="mobile"
                placeholder="Mobile Number"
                className="w-full bg-[#2b2b2b] border-t border-b border-r border-[#d4af37] text-white placeholder-white/70 rounded-r-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
              />
            </div>
          </form>

          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="bg-[#d4af37] text-black font-semibold px-8 py-2 rounded-md hover:bg-[#e6c84c] transition cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>
      </main>

      <footer className="fixed bottom-0 px-[5%] flex flex-col sm:flex-row items-start sm:items-center justify-between w-full bg-[#d4af37] text-black py-4 gap-4 max-2xl:hidden">
        <aside>
          <h3 className="font-semibold">Follow Us</h3>
          <div className="flex items-center gap-2">
            <motion.a
              href="https://www.instagram.com/grandegyptianmuseum/"
              initial={{ rotateZ: 0 }}
              whileHover={{
                rotateZ: 350,
                transition: { type: "tween", duration: 0.2 },
              }}
            >
              <AiOutlineInstagram className="text-xl" />
            </motion.a>
            <a
              href="https://www.instagram.com/grandegyptianmuseum/"
              className="text-lg"
            >
              Instagram
            </a>
          </div>
          <div className="flex items-center gap-2">
            <motion.a
              href="https://www.facebook.com/GrandEgyptianMuseum"
              initial={{ rotateZ: 0 }}
              whileHover={{
                rotateZ: 370,
                transition: { type: "tween", duration: 0.2 },
              }}
            >
              <AiFillFacebook className="text-xl" />
            </motion.a>
            <a
              href="https://www.facebook.com/GrandEgyptianMuseum"
              className="text-lg"
            >
              Facebook
            </a>
          </div>
          <div className="flex items-center gap-2">
            <motion.a
              href="https://x.com/EgyptMuseumGem"
              initial={{ rotateZ: 0 }}
              whileHover={{
                rotateZ: 350,
                transition: { type: "tween", duration: 0.2 },
              }}
            >
              <AiFillTwitterCircle className="text-xl" />
            </motion.a>
            <a href="https://x.com/EgyptMuseumGem" className="text-lg">
              Twitter
            </a>
          </div>
        </aside>

        <aside>
          <h3 className="font-semibold">Contact Us</h3>
          <div className="flex my-2 items-center gap-2">
            <FaPhoneAlt />: 02 35317344
          </div>
          <div className="flex items-center gap-2">
            <IoMdMail />:
            <a href="mailto:Ramses.kiosk@gem.eg">Ramses.kiosk@gem.eg</a>
          </div>
        </aside>
      </footer>
    </div>
  );
};

export default Booking;
