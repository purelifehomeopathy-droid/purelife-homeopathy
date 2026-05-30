import { NextResponse } from "next/server";
import { sendSubmissionEmail } from "@/lib/mailer";

type FormRequest = {
formType: "contact" | "appointment";
values: Record<string, string>;
};

function isValidPayload(body: unknown): body is FormRequest {
if (!body || typeof body !== "object") {
return false;
}

const payload = body as FormRequest;

if (
payload.formType !== "contact" &&
payload.formType !== "appointment"
) {
return false;
}

if (!payload.values || typeof payload.values !== "object") {
return false;
}

return true;
}

export async function POST(request: Request) {
try {
const body = await request.json();

```
if (!isValidPayload(body)) {
  return NextResponse.json(
    { error: "Invalid form submission." },
    { status: 400 }
  );
}

await sendSubmissionEmail(body);

return NextResponse.json({
  success: true,
  message: "Form submitted successfully.",
});
```

} catch (error) {
console.error("Email submission error:", error);

```
return NextResponse.json(
  {
    success: false,
    error:
      error instanceof Error
        ? error.message
        : "Failed to send email.",
  },
  { status: 500 }
);
```

}
}
