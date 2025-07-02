"use client";

import { useState } from "react";
import Script from "next/script";
import InitialLoader from "./components/common/InitialLoader";
import Navbar from "./components/Navbar/Navbar";
import Curtains from "./components/Curtains/Curtains";
import HomePage from "./pages/Home/HomePage";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [isMenuToggled, setIsMenuToggled] = useState(false);

  return (
    <>
      {loading ? (
        <InitialLoader onFinish={() => setLoading(false)} />
      ) : (
        <>
          {/* ✅ PayPal Script for the whole app */}
          <Script
            src="https://www.paypal.com/sdk/js?client-id=sb&currency=USD"
            strategy="afterInteractive"
          />

          <Navbar
            isMenuToggled={isMenuToggled}
            setIsMenuToggled={setIsMenuToggled}
          />
          <Curtains isMenuToggled={isMenuToggled} />
          <HomePage />
        </>
      )}
    </>
  );
}
