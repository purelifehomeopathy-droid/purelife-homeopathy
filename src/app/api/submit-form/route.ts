import { NextResponse } from "next/server";
import { sendSubmissionEmail } from "@/lib/mailer";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const formType = formData.get("formType") as
      | "contact"
      | "appointment";

    const values: Record<string, string> = {};

    formData.forEach((value, key) => {
      if (typeof value === "string") {
        values[key] = value;
      }
    });

    const reports = formData.getAll("reports") as File[];

    await sendSubmissionEmail({
  formType,
  values,
  reports
});

    return NextResponse.json({
      success: true,
      message: "Form submitted successfully."
    });
  } catch (error) {
    console.error("Email submission error:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to send email."
      },
      { status: 500 }
    );
  }
}