"use client";

import { useState } from "react";

type ContactFormProps = {
  formType: "contact" | "appointment";
};

const fieldSets = {
  contact: [
    { name: "name", label: "Name", type: "text", required: true },
    { name: "mobile", label: "Mobile Number", type: "tel", required: true },
    { name: "age", label: "Age", type: "number", required: true },
    { name: "gender", label: "Gender", type: "text", required: true },
    {
      name: "concern",
      label: "Disease Suffering From",
      type: "text",
      required: true
    }
  ],
  appointment: [
    { name: "name", label: "Full Name", type: "text", required: true },
    { name: "mobile", label: "Phone Number", type: "tel", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "preferredDate", label: "Preferred Date", type: "date", required: true },
    { name: "message", label: "Symptoms or Notes", type: "text", required: true }
  ]
} as const;

const initialStates = {
  contact: { name: "", mobile: "", age: "", gender: "", concern: "" },
  appointment: {
    name: "",
    mobile: "",
    email: "",
    preferredDate: "",
    message: ""
  }
};

export function InquiryForm({ formType }: ContactFormProps) {
  const [values, setValues] = useState(initialStates[formType]);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle"
  );
  const [error, setError] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setError("");

    const response = await fetch("/api/submit-form", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ formType, values })
    });

    if (!response.ok) {
      const payload = (await response.json().catch(() => null)) as
        | { error?: string }
        | null;
      setStatus("error");
      setError(payload?.error || "Something went wrong. Please try again.");
      return;
    }

    setStatus("success");
    setValues(initialStates[formType]);
  }

  return (
    <form className="form-card" onSubmit={onSubmit}>
      <div className="form-grid">
        {fieldSets[formType].map((field) => (
          <label key={field.name} className="field">
            <span>{field.label}</span>
            <input
              type={field.type}
              name={field.name}
              required={field.required}
              value={values[field.name as keyof typeof values]}
              onChange={(event) =>
                setValues((current) => ({
                  ...current,
                  [field.name]: event.target.value
                }))
              }
            />
          </label>
        ))}
      </div>
      <button className="button button-primary" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending..." : "Send"}
      </button>
      {status === "success" ? (
        <p className="form-success">Your submission has been sent successfully.</p>
      ) : null}
      {status === "error" ? <p className="form-error">{error}</p> : null}
    </form>
  );
}
