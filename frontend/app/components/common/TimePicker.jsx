import React, { useState, useEffect } from "react";

const TimePicker = ({ onChange }) => {
  const [hour, setHour] = useState("03");
  const [minute, setMinute] = useState("22");
  const [ampm, setAmpm] = useState("AM");

  useEffect(() => {
    if (onChange) onChange(`${hour}:${minute} ${ampm}`);
  }, [hour, minute, ampm, onChange]);

  const increase = (value, max) => {
    let v = parseInt(value, 10);
    v = isNaN(v) ? 1 : v >= max ? 1 : v + 1;
    return v.toString().padStart(2, "0");
  };

  const decrease = (value, max) => {
    let v = parseInt(value, 10);
    v = isNaN(v) ? max : v <= 1 ? max : v - 1;
    return v.toString().padStart(2, "0");
  };

  const handleInput = (value, max, fallback = "00") => {
    if (!/^\d{0,2}$/.test(value)) return fallback;
    const num = parseInt(value, 10);
    if (isNaN(num)) return fallback;
    if (num > max) return max.toString().padStart(2, "0");
    if (num < 0) return "00";
    return num.toString().padStart(2, "0");
  };

  return (
    <div className="flex items-center space-x-2 bg-[#1f1f1f] border border-[#d4af37] rounded-md px-3 py-1 text-[#d4af37]">
      {/* Hour */}
      <div className="flex flex-col items-center">
        <button
          onClick={() => setHour(increase(hour, 12))}
          className="text-xs hover:text-white leading-none"
        >
          ▲
        </button>
        <input
          type="text"
          value={hour}
          onChange={(e) => setHour(e.target.value)}
          onBlur={() => setHour(handleInput(hour, 12, "01"))}
          maxLength={2}
          className="w-8 text-center bg-transparent text-[#d4af37] text-base font-medium border-none focus:outline-none focus:ring-0"
          inputMode="numeric"
        />
        <button
          onClick={() => setHour(decrease(hour, 12))}
          className="text-xs hover:text-white leading-none"
        >
          ▼
        </button>
      </div>

      <span className="text-[#d4af37] text-base font-medium">:</span>

      {/* Minute */}
      <div className="flex flex-col items-center">
        <button
          onClick={() => setMinute(increase(minute, 59))}
          className="text-xs hover:text-white leading-none"
        >
          ▲
        </button>
        <input
          type="text"
          value={minute}
          onChange={(e) => setMinute(e.target.value)}
          onBlur={() => setMinute(handleInput(minute, 59))}
          maxLength={2}
          className="w-8 text-center bg-transparent text-[#d4af37] text-base font-medium border-none focus:outline-none focus:ring-0"
          inputMode="numeric"
        />
        <button
          onClick={() => setMinute(decrease(minute, 59))}
          className="text-xs hover:text-white leading-none"
        >
          ▼
        </button>
      </div>

      {/* AM/PM Toggle */}
      <div className="ml-2 flex border border-[#d4af37] rounded-full text-[11px] overflow-hidden">
        {["AM", "PM"].map((p) => (
          <button
            key={p}
            onClick={() => setAmpm(p)}
            className={`px-2 py-0.5 transition ${
              ampm === p ? "bg-[#d4af37] text-black" : "text-[#d4af37]"
            }`}
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TimePicker;
