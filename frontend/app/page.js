"use client";

import { Suspense, useState } from "react";
import MainScene from "./components/scenes/MainScene";
import { Loader } from "./components/common/Loader";
import Navbar from "./components/Navbar/Navbar";
import Curtains from "./components/Curtains/Curtains";
import HomePage from "./pages/Home/HomePage";

export default function Home() {
  const [isMenuToggled, setIsMenuToggled] = useState(false);
  return (
    <>
      <Navbar
        isMenuToggled={isMenuToggled}
        setIsMenuToggled={setIsMenuToggled}
      />
      <Curtains isMenuToggled={isMenuToggled} />
      <HomePage />
    </>
  );
}
