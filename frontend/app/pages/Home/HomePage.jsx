import React from "react";
import Landing from "./Landing";
import About from "./About";
import Afrocentrism from "./Afrocentrism";
import Monuments from "./Monuments";
import { ParallaxProvider } from "react-scroll-parallax";
import BookATicket from "./BookATicket";
import Feedback from "./Feedback";

const HomePage = () => {
  return (
    <>
      <Landing />
      <About />
      <Monuments />
      <Afrocentrism />
      <ParallaxProvider>
        <BookATicket />
        <Feedback />
      </ParallaxProvider>
    </>
  );
};

export default HomePage;
