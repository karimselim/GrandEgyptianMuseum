"use client";

import { useState } from "react";
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
