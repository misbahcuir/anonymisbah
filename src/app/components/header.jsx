"use client";
import React from "react";
import BlurText from "../../../ReactBits/BlurText/BlurText";

const header = (text) => {
  return (
    <div>
      <BlurText
        text={text}
        delay={150}
        animateBy="words"
        direction="top"
        className="text-5xl md:text-6xl font-semibold text-center"
      />
    </div>
  );
};

export default header;
