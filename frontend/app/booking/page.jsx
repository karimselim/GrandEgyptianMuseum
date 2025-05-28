"use client";
import Image from "next/image";
import React from "react";
import tut from "../../public/imgs/tut.png";
import booking from "../../public/imgs/booking-dark.png";
import DropdownMenu from "../components/common/DropdownMenu";
import { motion } from "framer-motion";

const Booking = () => {
  return (
    <header>
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
    </header>
  );
};

export default Booking;
