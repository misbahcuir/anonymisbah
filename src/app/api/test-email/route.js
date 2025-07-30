import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function GET() {
  try {
    // Check if RESEND_API_KEY is available
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({
        success: false,
        error: "RESEND_API_KEY is not defined in environment variables"
      }, { status: 500 });
    }

    console.log("Testing email configuration...");
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    const emailResult = await resend.emails.send({
      from: "Anonymisbah <onboarding@resend.dev>",
      to: ["misbahlax3700@gmail.com"],
      subject: "Test Email from Production",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1>Test Email</h1>
          <p>This is a test email to verify that email sending is working in production.</p>
          <p>Time: ${new Date().toISOString()}</p>
        </div>
      `,
    });

    console.log("Test email sent successfully:", emailResult);
    
    return NextResponse.json({
      success: true,
      message: "Test email sent successfully",
      result: emailResult
    });
  } catch (error) {
    console.error("Test email failed:", error);
    return NextResponse.json({
      success: false,
      error: error.message,
      details: {
        code: error.code,
        statusCode: error.statusCode
      }
    }, { status: 500 });
  }
} 