import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type ContactPayload = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
};

export async function POST(request: Request) {
  try {
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: "RESEND_API_KEY is not configured." },
        { status: 500 },
      );
    }

    const body = (await request.json()) as ContactPayload;
    const name = body.name?.trim() ?? "";
    const email = body.email?.trim() ?? "";
    const subject = body.subject?.trim() ?? "";
    const message = body.message?.trim() ?? "";

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Please fill in all fields before sending." },
        { status: 400 },
      );
    }

    const toEmail = process.env.CONTACT_TO_EMAIL ?? "yaswanthkillampalli@gmail.com";
    const fromEmail = process.env.CONTACT_FROM_EMAIL ?? "portfolio@yashcodes.tech";

    const result = await resend.emails.send({
      from: `Portfolio Contact <${fromEmail}>`,
      to: [toEmail],
      replyTo: email,
      subject: `Portfolio inquiry: ${subject}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Subject: ${subject}`,
        "",
        message,
      ].join("\n"),
      html: `
        <h2 style="margin:0 0 12px;font-size:20px;">New portfolio inquiry</h2>
        <p style="margin:0 0 8px;"><strong>Name:</strong> ${name}</p>
        <p style="margin:0 0 8px;"><strong>Email:</strong> ${email}</p>
        <p style="margin:0 0 16px;"><strong>Subject:</strong> ${subject}</p>
        <p style="margin:0; white-space:pre-wrap; line-height:1.6;">${message}</p>
      `,
    });

    if (result.error) {
      return NextResponse.json(
        { error: "Failed to send email." },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { message: "Your message was sent successfully." },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      { error: "Unexpected server error while sending email." },
      { status: 500 },
    );
  }
}