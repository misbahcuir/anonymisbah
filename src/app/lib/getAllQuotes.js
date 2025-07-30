import clientPromise from "./db";

const getAllQuotes = async () => {
  // For server components, directly access the database
  const client = await clientPromise;
  const db = client.db("anonymisbah");
  // Fetch all quotes (published and unpublished), sorted by submission time (latest first)
  const quotes = await db
    .collection("quotes")
    .find({})
    .sort({ submissionTime: -1 }) // -1 for descending order (latest first)
    .toArray();
  return quotes;
};

export default getAllQuotes;
