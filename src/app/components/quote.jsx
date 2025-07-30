import React from "react";

const Quote = ({ q }) => {
  const { question, reply } = q;

  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-amber-950 p-4">
      <div>
        <h6 className="text-amber-500 text-sm">Anonymous Text-</h6>
        <h3>{question}</h3>
      </div>
      <hr className="text-amber-500"></hr>
      <div>
        <h6 className="text-amber-500 text-sm">Reply-</h6>
        <h3>{reply ? reply : "Not Replied Yet"}</h3>
      </div>
    </div>
  );
};

export default Quote;
