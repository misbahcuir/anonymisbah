import { NextResponse } from "next/server";
import clientPromise from "../../lib/db";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const published = searchParams.get("published");

  const client = await clientPromise;
  const db = client.db("anonymisbah");

  // Build query based on parameters
  let query = {};
  if (published !== null) {
    query.published = published === "true";
  }

  // Sort by submission time (latest first)
  const quotes = await db
    .collection("quotes")
    .find(query)
    .sort({ submissionTime: -1 }) // -1 for descending order (latest first)
    .toArray();
  return NextResponse.json(quotes);
}

export async function POST(request) {
  const client = await clientPromise;
  const db = client.db("anonymisbah");
  const { question } = await request.json();

  // Get current count for id
  const count = await db.collection("quotes").countDocuments();
  const id = count + 1;
  const submissionTime = new Date().toISOString();

  const quoteObject = {
    id,
    question,
    submissionTime,
  };

  await db.collection("quotes").insertOne(quoteObject);
  return NextResponse.json({ message: "Data received!", quote: quoteObject });
}
