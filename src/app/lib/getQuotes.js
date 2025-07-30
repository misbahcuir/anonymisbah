import clientPromise from "./db";

const getquotes = async () => {
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
};

export default getquotes;
