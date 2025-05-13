import ImageSlider from "@/app/components/common/ImageSlider";
import React from "react";
import img1 from "../../assets/afro.png";
import img2 from "../../assets/first.jpeg";
import img3 from "../../assets/pic.jpeg";
import img4 from "../../assets/second.jpeg";

const imgs = [
  img1,
  img2,
  img3,
  img4,
  img1,
  img2,
  img3,
  img4,
  img1,
  img2,
  img3,
  img4,
];
console.log(imgs);

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
