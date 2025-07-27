import React from "react";

const getQoutes = async () => {
  const res = await fetch("https://anonymisbah.vercel.app/api/qoutes", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch quotes");
  }
  const data = await res.json();
  return data;
};

export default getQoutes;
