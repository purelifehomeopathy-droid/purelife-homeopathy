import nodemailer from "nodemailer";

type SubmissionPayload = {
  formType: "contact" | "appointment";
  values: Record<string, string>;
};

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: Number(process.env.SMTP_PORT) === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendSubmissionEmail(
  payload: SubmissionPayload
): Promise<void> {
  const recipient = process.env.MAIL_TO || "purelifehomeopathy@gmail.com";
  const sender = process.env.MAIL_FROM || process.env.SMTP_USER;

  if (!sender) {
    throw new Error("MAIL_FROM or SMTP_USER is not configured.");
  }

  const subject =
    payload.formType === "appointment"
      ? "New Appointment Request - Pure Life Homeopathy"
      : "New Contact Form Submission - Pure Life Homeopathy";

  const html = `
    <div style="font-family: Arial, sans-serif; padding:20px;">
      <h2>${subject}</h2>
      <table border="1" cellpadding="10" cellspacing="0" style="border-collapse:collapse;">
        ${Object.entries(payload.values)
          .map(
            ([key, value]) =>
              `<tr><td><strong>${key}</strong></td><td>${value}</td></tr>`
          )
          .join("")}
      </table>
    </div>
  `;

  await transporter.sendMail({
    from: sender,
    to: recipient,
    subject,
    html,
  });
}