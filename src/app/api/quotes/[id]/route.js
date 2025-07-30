import { NextResponse } from "next/server";
import clientPromise from "../../../lib/db";

export async function GET(request, { params }) {
  try {
    const { id } = params;
    
    const client = await clientPromise;
    const db = client.db("anonymisbah");
    
    // Convert string id to ObjectId if needed
    const { ObjectId } = require("mongodb");
    const objectId = new ObjectId(id);

    const quote = await db.collection("quotes").findOne({ _id: objectId });

    if (!quote) {
      return NextResponse.json({ error: "Quote not found" }, { status: 404 });
    }

    return NextResponse.json(quote);
  } catch (error) {
    console.error("Error fetching quote:", error);
    return NextResponse.json(
      { error: "Failed to fetch quote" },
      { status: 500 }
    );
  }
}

export async function PATCH(request, { params }) {
  try {
    const { id } = params;
    const { question, reply, published } = await request.json();

    const client = await clientPromise;
    const db = client.db("anonymisbah");

    // Convert string id to ObjectId if needed
    const { ObjectId } = require("mongodb");
    const objectId = new ObjectId(id);

    const updateData = {};
    if (question !== undefined) updateData.question = question;
    if (reply !== undefined) updateData.reply = reply;
    if (published !== undefined) updateData.published = published;

    const result = await db
      .collection("quotes")
      .updateOne({ _id: objectId }, { $set: updateData });

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Quote not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        message: "Quote updated successfully",
        updatedCount: result.modifiedCount,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating quote:", error);
    return NextResponse.json(
      { error: "Failed to update quote" },
      { status: 500 }
    );
  }
}
