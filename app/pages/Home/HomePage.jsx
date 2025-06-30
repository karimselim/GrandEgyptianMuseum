import React from "react";
import Landing from "./Landing";
import About from "./About";
import Afrocentrism from "./Afrocentrism";
import Monuments from "./Monuments";
import { ParallaxProvider } from "react-scroll-parallax";
import BookATicket from "./BookATicket";
import Feedback from "./Feedback";
import Footer from "@/app/components/Footer/Footer";
import HieroglyphConverter from "@/app/components/chat/HieroglyphConverter";

const HomePage = () => {
  return (
    <>
      <Landing />
      <About />
      <Monuments />
      <HieroglyphConverter />
      <Afrocentrism />
      <ParallaxProvider>
        <BookATicket />
        <Feedback />
      </ParallaxProvider>
      <Footer />
    </>
  );
};

export default HomePage;
