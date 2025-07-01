import React, { useState } from "react";
import Landing from "./Landing";
import About from "./About";
import Afrocentrism from "./Afrocentrism";
import Monuments from "./Monuments";
import { ParallaxProvider } from "react-scroll-parallax";
import BookATicket from "./BookATicket";
import Feedback from "./Feedback";
import Footer from "@/app/components/Footer/Footer";
import HieroglyphConverter from "@/app/components/chat/HieroglyphConverter";
import Ar from "./Ar";
import VideoPlayer from "./VideoPlayer";

const HomePage = () => {
  const [playState, setPlayState] = useState(false);
  return (
    <>
      <Landing />
      <About />
      <Monuments />
      <HieroglyphConverter />
      <Afrocentrism />
      <Ar setPlayState={setPlayState} />
      <ParallaxProvider>
        <BookATicket />
        <Feedback />
      </ParallaxProvider>
      <Footer />
      <div>
        <VideoPlayer playState={playState} setPlayState={setPlayState} />
      </div>
    </>
  );
};

export default HomePage;
