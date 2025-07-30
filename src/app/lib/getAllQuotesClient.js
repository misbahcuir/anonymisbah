const getAllQuotesClient = async () => {
  // For client components, use the API route - all quotes (published and unpublished)
  const res = await fetch("/api/quotes", {
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

export default getAllQuotesClient;
