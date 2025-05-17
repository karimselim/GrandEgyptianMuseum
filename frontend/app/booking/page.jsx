import Image from "next/image";
import React from "react";
import tut from "../../public/imgs/tut.png";
import booking from "../../public/imgs/booking-dark.png";
import DropdownMenu from "../components/common/DropdownMenu";

const Login = () => {
  return (
    <div className="flex">
      <aside className="h-screen w-1/2">
        <Image
          src={booking}
          alt="booking img"
          className="h-full object-cover"
          priority
        />
      </aside>
      <aside>
        <div className="logo"></div>
        <form>
          <div className="header">
            <svg
              width="100"
              height="100"
              viewBox="0 0 200 140"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polygon
                points="100,20 40,100 160,100"
                fill="none"
                stroke="#D4AF37"
                strokeWidth="3"
              />
              <line
                x1="70"
                y1="100"
                x2="100"
                y2="40"
                stroke="#D4AF37"
                strokeWidth="2"
              />
              <line
                x1="130"
                y1="100"
                x2="100"
                y2="40"
                stroke="#D4AF37"
                strokeWidth="2"
              />

              <text
                x="50%"
                y="125"
                fontSize="30"
                fontWeight="bold"
                fill="#D4AF37"
                fontFamily="serif"
                textAnchor="middle"
                letterSpacing="1.5"
              >
                GEM
              </text>
            </svg>
            <h2>Arrange Your Visit</h2>
          </div>
          <input type="text" placeholder="email" />
          {/* <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500"> */}
          <DropdownMenu />
          {/* </div> */}
        </form>
      </aside>
    </div>
  );
};

export default Login;
