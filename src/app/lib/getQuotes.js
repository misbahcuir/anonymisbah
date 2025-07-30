import clientPromise from "./db";

const getquotes = async () => {
  try {
    // For server components, directly access the database
    const client = await clientPromise;
    const db = client.db("anonymisbah");

    // Only fetch published quotes, sorted by submission time (latest first)
    const quotes = await db
      .collection("quotes")
      .find({ published: true })
      .sort({ submissionTime: -1 }) // -1 for descending order (latest first)
      .toArray();

    return quotes;
  } catch (error) {
    console.error("Error fetching quotes from database:", error);
    throw new Error("Failed to fetch quotes from database");
  }
};

export default getquotes;
