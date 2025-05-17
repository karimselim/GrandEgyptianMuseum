"use client";
import { useState, useRef, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";

export default function DropdownMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Drop Down");
  const dropdownRef = useRef(null);

  const options = ["HTML", "CSS", "JS", "React", "Angular"];

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
  };

  // 👉 Handle click outside to close menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative w-80 mx-auto z-10">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center px-5 h-14 bg-white rounded-xl shadow-lg cursor-pointer"
      >
        <span className="text-gray-800 font-semibold text-lg">{selected}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          <FaChevronDown className="text-gray-600" />
        </motion.div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute w-full mt-2 bg-white shadow-2xl rounded-xl py-2 overflow-hidden"
          >
            {options.map((option, index) => (
              <li
                key={index}
                onClick={() => handleSelect(option)}
                className="px-6 py-3 text-gray-800 font-medium cursor-pointer hover:bg-pink-500 hover:text-white transition-colors duration-300"
              >
                {option}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
