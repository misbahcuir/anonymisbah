import { NextResponse } from "next/server";
import clientPromise from "../../lib/db";
import { Resend } from "resend";

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
  try {
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

    // Save to database
    await db.collection("quotes").insertOne(quoteObject);

    // Send email notification - now with proper error handling
    let emailSent = false;
    let emailError = null;

    try {
      // Check if RESEND_API_KEY is available
      if (!process.env.RESEND_API_KEY) {
        console.error("RESEND_API_KEY is not defined in environment variables");
        emailError = "RESEND_API_KEY not configured";
      } else {
        console.log("Attempting to send email for quote ID:", id);
        const resend = new Resend(process.env.RESEND_API_KEY);

        const emailResult = await resend.emails.send({
          from: "Anonymisbah <onboarding@resend.dev>",
          to: ["misbahlax3700@gmail.com"],
          subject: `New Anonymous Quote Received- ${id}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
              <div style="background-color: #d97706; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
                <h1 style="margin: 0; font-size: 24px;">New Anonymous Quote</h1>
              </div>
              <div style="background-color: white; padding: 20px; border-radius: 0 0 8px 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                <p style="font-size: 16px; line-height: 1.6; color: #333;">
                  <strong>Quote ID:</strong> ${id}
                </p>
                <p style="font-size: 16px; line-height: 1.6; color: #333;">
                  <strong>Submitted:</strong> ${new Date(submissionTime).toLocaleString()}
                </p>
                <div style="background-color: #fef3c7; padding: 15px; border-radius: 6px; margin: 20px 0;">
                  <p style="font-size: 18px; line-height: 1.6; color: #92400e; font-style: italic; margin: 0;">
                    "${question}"
                  </p>
                </div>
                <p style="font-size: 14px; color: #666; margin-top: 20px;">
                  This quote has been saved to your database and is ready for your response.
                </p>
              </div>
            </div>
          `,
        });

        console.log(
          "Email sent successfully for quote ID:",
          id,
          "Result:",
          emailResult
        );
        emailSent = true;
      }
    } catch (emailError) {
      console.error(
        "Email sending failed for quote ID:",
        id,
        "Error:",
        emailError
      );
      console.error("Error details:", {
        message: emailError.message,
        code: emailError.code,
        statusCode: emailError.statusCode,
      });
    }

    return NextResponse.json({
      message: "Quote submitted successfully!",
      quote: quoteObject,
      emailSent,
      emailError: emailError ? emailError.message : null,
    });
  } catch (error) {
    console.error("Error submitting quote:", error);
    return NextResponse.json(
      { error: "Failed to submit quote" },
      { status: 500 }
    );
  }
}
