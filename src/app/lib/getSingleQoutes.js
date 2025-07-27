import React from "react";

const getSingleQoutes = async (id) => {
  const res = await fetch(`http://localhost:3000/api/qoutes/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch quote");
  }
  const data = await res.json();
  return data;
};

export default getSingleQoutes;
