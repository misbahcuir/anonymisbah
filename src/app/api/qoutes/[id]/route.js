import { NextResponse } from "next/server";
import clientPromise from "@/app/lib/db";
import { ObjectId } from "mongodb";

export async function GET(request, { params }) {
  const { id } = params;

  const client = await clientPromise;
  const db = client.db("anonymisbah");

  const qoute = await db
    .collection("qoutes")
    .findOne({ _id: new ObjectId(id) });

  if (!qoute) {
    return NextResponse.json({ message: "Quote not found" }, { status: 404 });
  }

  return NextResponse.json(qoute);
}
