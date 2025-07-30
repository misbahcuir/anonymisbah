import React from "react";
import { getFontStyle } from "../lib/fontUtils";

const Quote = ({ q }) => {
  const { question, reply } = q;

  // Detect language and get appropriate font for each text
  const questionFont = getFontStyle(question);
  const replyFont = getFontStyle(reply || "");

  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-amber-950 p-4">
      <div>
        <h6 className="text-amber-500 text-sm">Anonymous Text-</h6>
        <h3 className={`${questionFont} text-white`}>{question}</h3>
      </div>
      <hr className="text-amber-500"></hr>
      <div>
        <h6 className="text-amber-500 text-sm">Reply-</h6>
        <h3 className={`${replyFont} text-white`}>
          {reply ? reply : "Not Replied Yet"}
        </h3>
      </div>
    </div>
  );
};

export default Quote;
