const getSinglequotes = async (id) => {
  // Use relative URL for Next.js full-stack app
  const res = await fetch(`/api/quotes/${id}`, {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch quote");
  }
  const data = await res.json();
  return data;
};

export default getSinglequotes;
