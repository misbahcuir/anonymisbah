import { NextResponse } from "next/server";
import clientPromise from "../../lib/db";

export async function GET() {
  const client = await clientPromise;
  const db = client.db("anonymisbah");
  const qoutes = await db.collection("qoutes").find({}).toArray();
  return NextResponse.json(qoutes);
}

export async function POST(request) {
  const client = await clientPromise;
  const db = client.db("anonymisbah");
  const { question } = await request.json();

  // Get current count for id
  const count = await db.collection("qoutes").countDocuments();
  const id = count + 1;
  const submissionTime = new Date().toISOString();

  const qouteObject = {
    id,
    question,
    submissionTime,
  };

  await db.collection("qoutes").insertOne(qouteObject);
  return NextResponse.json({ message: "Data received!", qoute: qouteObject });
}
