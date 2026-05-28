import { NextResponse } from "next/server";
import { sendSubmissionEmail } from "@/lib/mailer";

function isValidPayload(body: unknown) {
  if (!body || typeof body !== "object") return false;
  const payload = body as { formType?: string; values?: unknown };
  if (!["contact", "appointment"].includes(payload.formType || "")) return false;
  if (!payload.values || typeof payload.values !== "object") return false;
  return true;
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!isValidPayload(body)) {
    return NextResponse.json({ error: "Invalid form submission." }, { status: 400 });
  }

  try {
    await sendSubmissionEmail(body);
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Email delivery is not configured correctly.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
