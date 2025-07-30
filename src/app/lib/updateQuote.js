const updateQuote = async (id, updateData) => {
  const res = await fetch(`/api/quotes/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateData),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to update quote");
  }

  const data = await res.json();
  return data;
};

export default updateQuote;
