import React from "react";
import Landing from "./Landing";
import About from "./About";
import Afrocentrism from "./Afrocentrism";
import Monuments from "./Monuments";
import { ParallaxProvider } from "react-scroll-parallax";
import BookATicket from "./BookATicket";
// import SeventhScreen from "@/app/components/SeventhScreen/SeventhScreen";
// import Footer from "@/app/components/Footer/Footer";
// import { GizaPyramidsGallery } from "@/app/components/common/MonumentsGallery";

const HomePage = () => {
  return (
    <>
      <Landing />
      <About />
      <Monuments />
      <Afrocentrism />
      <ParallaxProvider>
        <BookATicket />
      </ParallaxProvider>
    </>
  );
};

export default HomePage;
