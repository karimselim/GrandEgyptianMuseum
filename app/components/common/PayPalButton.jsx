"use client";
import { useState } from "react";
import { motion } from "framer-motion";

const PayPalButton = ({ triggerPayment }) => {
  const [showSuccess, setShowSuccess] = useState(false);

  const handleFakePayment = () => {
    setTimeout(() => {
      setShowSuccess(true);
    }, 500);
  };

  if (triggerPayment) handleFakePayment();

  return (
    <>
      {showSuccess && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="bg-white text-black rounded-lg shadow-lg px-8 py-6 max-w-sm text-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <h2 className="text-2xl font-bold mb-4">Payment Successful</h2>
            <p className="mb-6">
              Thank you, <strong>Visitor</strong>! Your booking is confirmed.
            </p>
            <button
              onClick={() => setShowSuccess(false)}
              className="bg-[#d4af37] text-black font-semibold px-6 py-2 rounded hover:bg-[#e6c84c] transition"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default PayPalButton;
