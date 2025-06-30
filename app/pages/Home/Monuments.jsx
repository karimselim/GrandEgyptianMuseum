import ImageSlider from "@/app/components/common/ImageSlider";
import React from "react";
import img1 from "../../assets/one.jpg";
import img2 from "../../assets/two.jpg";
import img3 from "../../assets/three.jpg";
import img4 from "../../assets/four.jpg";
import img5 from "../../assets/five.jpg";
import img6 from "../../assets/six.jpg";
import img7 from "../../assets/seven.jpg";
import img8 from "../../assets/eight.jpg";
import img9 from "../../assets/nine.jpg";
import img10 from "../../assets/ten.jpg";
import img11 from "../../assets/eleven.jpg";

const imgs = [
  img6,
  img1,
  img2,
  img3,
  img7,
  img8,
  img9,
  img10,
  img11,
  img4,
  img5,
];

const Monuments = () => {
  return (
    <div className="mt-40">
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
        Highlights from the Grand Egyptian Museum
      </h1>

      <ImageSlider imgs={imgs} />
    </div>
  );
};

export default Monuments;
