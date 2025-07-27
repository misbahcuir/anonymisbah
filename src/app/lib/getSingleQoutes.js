import React from "react";

const getSingleQoutes = async (id) => {
  const res = await fetch(`https://anonymisbah.vercel.app/api/qoutes/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch quote");
  }
  const data = await res.json();
  return data;
};

export default getSingleQoutes;
