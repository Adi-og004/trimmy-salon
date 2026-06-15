import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, phone, email, service } = body;

    // Validate required fields
    if (!name || !phone || !email || !service) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // Basic phone validation
    const phoneRegex = /^[\d\s+\-()]{7,15}$/;
    if (!phoneRegex.test(phone)) {
      return NextResponse.json(
        { error: "Please provide a valid phone number." },
        { status: 400 }
      );
    }

    // Check for missing environment variables
    const missingVars = [];
    if (!process.env.GMAIL_USER) missingVars.push("GMAIL_USER");
    if (!process.env.GMAIL_APP_PASSWORD) missingVars.push("GMAIL_APP_PASSWORD");
    if (!process.env.OWNER_EMAIL) missingVars.push("OWNER_EMAIL");

    if (missingVars.length > 0) {
      const errorMsg = `Missing environment variables: ${missingVars.join(", ")}. Please set them in your Vercel Project Settings.`;
      console.error(`[SMTP Config Error] ${errorMsg}`);
      return NextResponse.json(
        { error: errorMsg },
        { status: 500 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // ===== EMAIL 1: Owner Lead Alert =====
    const ownerMailOptions = {
      from: `"Trimmy's Website" <${process.env.GMAIL_USER}>`,
      to: process.env.OWNER_EMAIL,
      subject: `🔔 New Enquiry — ${service} | ${name}`,
      text: `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   NEW LEAD FROM WEBSITE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Customer Name:    ${name}
Mobile Number:    ${phone}
Email Address:    ${email}
Requested Service: ${service}

Submitted At: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Please follow up with the customer at the earliest.
      `.trim(),
    };

    // ===== EMAIL 2: Customer Confirmation =====
    const customerMailOptions = {
      from: `"Trimmy's Luxurious Salon" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: `Thank You, ${name}! Your Enquiry Has Been Received ✨`,
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background:#0A0A0A;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#111111;border-radius:16px;overflow:hidden;margin-top:32px;margin-bottom:32px;">
    <!-- Header -->
    <tr>
      <td style="background:linear-gradient(135deg,#9A2A2A 0%,#6b1e1e 100%);padding:40px 32px;text-align:center;">
        <h1 style="color:#ffffff;font-size:28px;margin:0;font-weight:700;letter-spacing:1px;">Trimmy's</h1>
        <p style="color:rgba(255,255,255,0.7);font-size:13px;margin:8px 0 0;letter-spacing:3px;text-transform:uppercase;">Luxurious Salon</p>
      </td>
    </tr>
    <!-- Body -->
    <tr>
      <td style="padding:40px 32px;">
        <h2 style="color:#ffffff;font-size:22px;margin:0 0 16px;font-weight:600;">
          Hello, ${name}! 👋
        </h2>
        <p style="color:#cccccc;font-size:15px;line-height:1.7;margin:0 0 24px;">
          Thank you for reaching out to Trimmy's. We've received your enquiry for <strong style="color:#C5A880;">${service}</strong> and our coordination team will contact you shortly to schedule your appointment.
        </p>
        <!-- Details Card -->
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#1a1a1a;border-radius:12px;border:1px solid rgba(255,255,255,0.06);">
          <tr>
            <td style="padding:24px;">
              <p style="color:#C5A880;font-size:12px;text-transform:uppercase;letter-spacing:2px;margin:0 0 16px;font-weight:600;">Your Enquiry Details</p>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="color:#888;font-size:13px;padding:6px 0;width:120px;">Name</td>
                  <td style="color:#fff;font-size:13px;padding:6px 0;font-weight:500;">${name}</td>
                </tr>
                <tr>
                  <td style="color:#888;font-size:13px;padding:6px 0;">Mobile</td>
                  <td style="color:#fff;font-size:13px;padding:6px 0;font-weight:500;">${phone}</td>
                </tr>
                <tr>
                  <td style="color:#888;font-size:13px;padding:6px 0;">Email</td>
                  <td style="color:#fff;font-size:13px;padding:6px 0;font-weight:500;">${email}</td>
                </tr>
                <tr>
                  <td style="color:#888;font-size:13px;padding:6px 0;">Service</td>
                  <td style="color:#C5A880;font-size:13px;padding:6px 0;font-weight:600;">${service}</td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
        <p style="color:#888;font-size:13px;line-height:1.6;margin:24px 0 0;">
          We look forward to giving you the premium salon experience you deserve. If you need immediate assistance, feel free to visit us at our Bhiwadi location.
        </p>
      </td>
    </tr>
    <!-- Footer -->
    <tr>
      <td style="padding:24px 32px;border-top:1px solid rgba(255,255,255,0.06);text-align:center;">
        <p style="color:#555;font-size:12px;margin:0;">
          © ${new Date().getFullYear()} Trimmy's Luxurious Salon | Bhiwadi, Rajasthan
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
      `.trim(),
    };

    // Send both emails concurrently
    await Promise.all([
      transporter.sendMail(ownerMailOptions),
      transporter.sendMail(customerMailOptions),
    ]);

    return NextResponse.json(
      { message: "Enquiry submitted successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send enquiry. Please try again later." },
      { status: 500 }
    );
  }
}
