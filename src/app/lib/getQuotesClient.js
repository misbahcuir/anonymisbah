const getquotesClient = async () => {
  // For client components, use the API route - only published quotes
  const res = await fetch("/api/quotes?published=true", {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch quotes");
  }
  const data = await res.json();
  return data;
};

export default getquotesClient;
