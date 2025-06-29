"use client";
import { useState, useRef, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";

// 💰 Ticket pricing per group
const PRICES = {
  egyptian: {
    Adult: 150,
    Child: 80,
    Student: 100,
  },
  nonEgyptian: {
    Adult: 450,
    Child: 250,
    Student: 300,
  },
  expatriate: {
    Adult: 200,
    Child: 100,
    Student: 150,
  },
};

export default function DropdownMenu({
  label = "Select Tickets",
  groupKey = "egyptian",
  onChange,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const options = ["Adult", "Child", "Student"];

  const [quantities, setQuantities] = useState(() =>
    Object.fromEntries(options.map((opt) => [opt, 0]))
  );

  const increase = (opt) => {
    setQuantities((prev) => {
      const updated = { ...prev, [opt]: (prev[opt] || 0) + 1 };
      notifyParent(updated);
      return updated;
    });
  };

  const decrease = (opt) => {
    setQuantities((prev) => {
      const updated = { ...prev, [opt]: prev[opt] > 0 ? prev[opt] - 1 : 0 };
      notifyParent(updated);
      return updated;
    });
  };

  const notifyParent = (updatedQuantities) => {
    if (onChange) {
      let total = 0;
      const breakdown = {};

      for (const type in updatedQuantities) {
        const quantity = updatedQuantities[type] || 0;
        const price = PRICES[groupKey][type];
        const subtotal = quantity * price;
        if (quantity > 0) {
          breakdown[type] = { quantity, price, subtotal };
          total += subtotal;
        }
      }

      onChange({ quantities: updatedQuantities, total, breakdown });
    }
  };

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
      {/* Dropdown Toggle */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center px-5 h-14 bg-[#d4af37] text-black rounded-xl cursor-pointer border border-black"
      >
        <span className="font-semibold text-base">{label}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          <FaChevronDown className="text-black" />
        </motion.div>
      </div>

      {/* Dropdown Items */}
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="absolute w-full mt-2 bg-[#d4af37] border border-black shadow-xl rounded-xl py-2"
          >
            {options.map((option) => {
              const quantity = quantities[option] || 0;
              const unitPrice = PRICES[groupKey][option];
              const subtotal = quantity * unitPrice;

              return (
                <li
                  key={option}
                  className="flex flex-col gap-1 px-4 py-3 text-black text-sm"
                >
                  <div className="flex justify-between items-center font-medium">
                    <span>{option}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => decrease(option)}
                        className="w-8 h-8 flex items-center justify-center border border-[#d4af37] text-[#d4af37] bg-black hover:bg-[#2c2c2c] hover:scale-105 transition rounded-[6px] text-lg font-light"
                      >
                        −
                      </button>
                      <span className="w-5 text-center text-base font-medium">
                        {quantity}
                      </span>
                      <button
                        onClick={() => increase(option)}
                        className="w-8 h-8 flex items-center justify-center border border-[#d4af37] text-[#d4af37] bg-black hover:bg-[#2c2c2c] hover:scale-105 transition rounded-[6px] text-lg font-light"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  {quantity > 0 && (
                    <div className="text-xs text-black/80 pl-1">
                      {quantity} × {unitPrice} EGP ={" "}
                      <strong>{subtotal} EGP</strong>
                    </div>
                  )}
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
