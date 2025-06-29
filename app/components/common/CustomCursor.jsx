import dynamic from "next/dynamic";
import React from "react";

const AnimatedCursor = dynamic(() => import("react-animated-cursor"), {
  ssr: false,
});

export default function CustomCursor() {
  return (
    <AnimatedCursor
      innerSize={6}
      outerSize={25}
      outerAlpha={0.2}
      innerScale={0.7}
      outerScale={4}
      trailingSpeed={15}
      hasBlendMode={true}
      innerStyle={{
        backgroundColor: "black",
      }}
      outerStyle={{
        backdropFilter: "invert(1)",
      }}
      clickables={[
        "a",
        'input[type="text"]',
        'input[type="email"]',
        'input[type="number"]',
        'input[type="submit"]',
        'input[type="image"]',
        "label[for]",
        "select",
        "textarea",
        "button",
        ".link",
        ".imp",
      ]}
    />
  );
}
