import { NextRequest, NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase";
import { Resend } from "resend";

const resend = new Resend("re_YXDTQDBu_7ZGRs8ALvPhKEB5mwzxBpfNb");

export async function POST(req: NextRequest) {
  const body = await req.json();
  const {
    firstName,
    lastName,
    email,
    dialCode,
    phone,
    service,
    budget,
    message,
    source = "modal",
  } = body;

  if (!email || !message) {
    return NextResponse.json({ error: "Email and message are required." }, { status: 400 });
  }

  const fullPhone = phone ? `${dialCode ?? ""}${phone}` : null;
  const fullName = [firstName, lastName].filter(Boolean).join(" ") || null;

  /* ── Save to Supabase ── */
  const supabase = getServiceClient();
  const { error: dbError } = await supabase.from("contact_submissions").insert({
    first_name: firstName || null,
    last_name: lastName || null,
    full_name: fullName,
    email,
    phone: fullPhone,
    service: service || null,
    budget: budget || null,
    message,
    source,
  });

  if (dbError) {
    console.error("Supabase insert error:", dbError);
    return NextResponse.json({ error: "Failed to save submission." }, { status: 500 });
  }

  /* ── Notify admin ── */
  const { error: emailError } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: "tariqwebdev@gmail.com",
    subject: `New contact from ${fullName ?? email}${service ? ` — ${service}` : ""}`,
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#0f1c3f;">
        <div style="background:#0048ff;padding:24px 32px;border-radius:12px 12px 0 0;">
          <h1 style="color:#fff;margin:0;font-size:20px;font-weight:700;">New Contact Submission</h1>
          <p style="color:rgba(255,255,255,0.7);margin:4px 0 0;font-size:13px;">Acrobit Landing Page — ${source}</p>
        </div>
        <div style="border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px;padding:28px 32px;">
          <table style="width:100%;border-collapse:collapse;font-size:14px;">
            <tr><td style="padding:8px 0;color:#6b7280;width:130px;">Name</td><td style="padding:8px 0;font-weight:600;">${fullName ?? "—"}</td></tr>
            <tr><td style="padding:8px 0;color:#6b7280;">Email</td><td style="padding:8px 0;font-weight:600;"><a href="mailto:${email}" style="color:#0048ff;">${email}</a></td></tr>
            ${fullPhone ? `<tr><td style="padding:8px 0;color:#6b7280;">Phone</td><td style="padding:8px 0;font-weight:600;">${fullPhone}</td></tr>` : ""}
            ${service ? `<tr><td style="padding:8px 0;color:#6b7280;">Service</td><td style="padding:8px 0;font-weight:600;">${service}</td></tr>` : ""}
            ${budget ? `<tr><td style="padding:8px 0;color:#6b7280;">Budget</td><td style="padding:8px 0;font-weight:600;">${budget}</td></tr>` : ""}
          </table>
          <div style="margin-top:20px;padding:16px;background:#f5f8ff;border-radius:8px;border-left:3px solid #0048ff;">
            <p style="margin:0 0 6px;font-size:12px;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:0.05em;">Message</p>
            <p style="margin:0;font-size:14px;line-height:1.6;">${message.replace(/\n/g, "<br/>")}</p>
          </div>
        </div>
      </div>
    `,
  });

  if (emailError) {
    console.error("Resend error:", emailError);
  }

  return NextResponse.json({ success: true });
}
