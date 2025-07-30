import { NextResponse } from "next/server";
import clientPromise from "../../../lib/db";
import { ObjectId } from "mongodb";

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const client = await clientPromise;
    const db = client.db("anonymisbah");

    const quote = await db
      .collection("quotes")
      .findOne({ _id: new ObjectId(id) });

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

    const updateData = {};
    if (question !== undefined) updateData.question = question;
    if (reply !== undefined) updateData.reply = reply;
    if (published !== undefined) updateData.published = published;

    const result = await db
      .collection("quotes")
      .updateOne({ _id: new ObjectId(id) }, { $set: updateData });

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Quote not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Quote updated successfully" });
  } catch (error) {
    console.error("Error updating quote:", error);
    return NextResponse.json(
      { error: "Failed to update quote" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    const client = await clientPromise;
    const db = client.db("anonymisbah");

    const result = await db
      .collection("quotes")
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Quote not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Quote deleted successfully" });
  } catch (error) {
    console.error("Error deleting quote:", error);
    return NextResponse.json(
      { error: "Failed to delete quote" },
      { status: 500 }
    );
  }
}
