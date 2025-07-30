import clientPromise from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function GET(request) {
  const client = await clientPromise;
  const db = client.db("anonymisbah");
  const quote = await db.collection("quotes").find({ _id: id }).toArray();
  return NextResponse.json(quote);
}
