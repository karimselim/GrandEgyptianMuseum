import React, { useState } from "react";

const DatePicker = ({ onChange }) => {
  const today = new Date().toISOString().split("T")[0]; // yyyy-mm-dd
  const [selectedDate, setSelectedDate] = useState(today);

  const handleChange = (e) => {
    setSelectedDate(e.target.value);
    if (onChange) onChange(e.target.value);
  };

  return (
    <div className="relative">
      <input
        type="date"
        value={selectedDate}
        onChange={handleChange}
        className="bg-[#1f1f1f] text-[#d4af37] border border-[#d4af37] rounded-md px-3 py-7 text-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] cursor-pointer h-[34px]"
        style={{
          colorScheme: "dark",
        }}
      />
    </div>
  );
};

export default DatePicker;
