import nodemailer from "nodemailer";

type SubmissionPayload = {
  formType: "contact" | "appointment";
  values: Record<string, string>;
};

function getTransporter() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    throw new Error("SMTP environment variables are missing.");
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass
    }
  });
}

export async function sendSubmissionEmail(payload: SubmissionPayload) {
  const to = process.env.MAIL_TO;
  const from = process.env.MAIL_FROM || process.env.SMTP_USER;

  if (!to || !from) {
    throw new Error("MAIL_TO or MAIL_FROM is missing.");
  }

  const transporter = getTransporter();
  const subject =
    payload.formType === "appointment"
      ? "New Appointment Request"
      : "New Contact Form Submission";

  const lines = Object.entries(payload.values).map(
    ([key, value]) => `<p><strong>${key}:</strong> ${value}</p>`
  );

  await transporter.sendMail({
    to,
    from,
    subject,
    html: `
      <div style="font-family:Arial,sans-serif;color:#20353a">
        <h2>${subject}</h2>
        ${lines.join("")}
      </div>
    `
  });
}
