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
  {
    name: "consultationMode",
    label: "Consultation Mode",
    type: "select",
    required: true
  },
  {
    name: "name",
    label: "Full Name",
    type: "text",
    required: true
  },
  {
    name: "age",
    label: "Age",
    type: "number",
    required: true
  },
  {
    name: "gender",
    label: "Gender",
    type: "select",
    required: true
  },
  {
    name: "mobile",
    label: "Mobile Number",
    type: "tel",
    required: true
  },
  {
    name: "address",
    label: "Address",
    type: "text",
    required: true
  },
  {
    name: "condition",
    label: "Disease Condition",
    type: "select",
    required: true
  },
  {
    name: "preferredDate",
    label: "Preferred Date",
    type: "date",
    required: true
  },
  {
    name: "preferredSlot",
    label: "Preferred Slot",
    type: "select",
    required: true
  },
{
  name: "whatsapp",
  label: "WhatsApp Number",
  type: "tel",
  required: false
},
{
  name: "email",
  label: "Email Address",
  type: "email",
  required: false
},
{
  name: "city",
  label: "City",
  type: "text",
  required: false
},
{
  name: "diseaseDuration",
  label: "Duration of Disease",
  type: "text",
  required: false
},
{
  name: "currentMedicines",
  label: "Current Medicines",
  type: "text",
  required: false
},
{
  name: "reports",
  label: "Upload Reports",
  type: "file",
  required: false
},
  {
    name: "message",
    label: "Additional Notes",
    type: "text",
    required: false
  }
]
} as const;

const initialStates = {
  contact: { name: "", mobile: "", age: "", gender: "", concern: "" },
appointment: {
  consultationMode: "",
whatsapp: "",
email: "",
city: "",
diseaseDuration: "",
currentMedicines: "",
  name: "",
  age: "",
  gender: "",
  mobile: "",
  address: "",
  condition: "",
  preferredDate: "",
  preferredSlot: "",
  message: ""
}

};

export function InquiryForm({ formType }: ContactFormProps) {
  const [values, setValues] = useState(initialStates[formType]);
const consultationMode =
  formType === "appointment"
    ? (values as Record<string, string>).consultationMode
    : "";
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
    <div className="appointment-intro">
      <h3>Book Your Consultation</h3>

      <p>
        Personalized homeopathic treatment for chronic and acute health conditions.
      </p>

      <ul className="appointment-features">
        <li>Experienced Homeopathic Care</li>
        <li>Clinic & Online Consultation Available</li>
        <li>Personalized Treatment Plans</li>
        <li>Quick Appointment Confirmation</li>
      </ul>
    </div>

   <div className="form-grid">
  {fieldSets[formType].map((field) => {

    if (
      formType === "appointment" &&
      consultationMode === "Clinic Visit" &&
      [
        "whatsapp",
        "email",
        "city",
        "diseaseDuration",
        "currentMedicines"
      ].includes(field.name)
    ) {
      return null;
    }

    return (
      <label key={field.name} className="field">
      <span>{field.label}</span>

     {field.type === "select" ? (
<select
name={field.name}
required={field.required}
value={String(values[field.name as keyof typeof values] ?? "")}
onChange={(event) =>
setValues((current) => ({
...current,
[field.name]: event.target.value
}))
}

>


{field.name === "consultationMode" ? (
  <>
    <option value="">Select Consultation Mode</option>
    <option value="Clinic Visit">Clinic Visit</option>
    <option value="Online Video Consultation">
      Online Video Consultation
    </option>
    <option value="Online Phone Consultation">
      Online Phone Consultation
    </option>
  </>
) : field.name === "gender" ? (
  <>
    <option value="">Select Gender</option>
    <option value="Male">Male</option>
    <option value="Female">Female</option>
    <option value="Other">Other</option>
  </>
) : field.name === "preferredSlot" ? (
  <>
    <option value="">Select Time Slot</option>
    <option value="10:00 AM - 10:30 AM">10:00 AM - 10:30 AM</option>
    <option value="10:30 AM - 11:00 AM">10:30 AM - 11:00 AM</option>
    <option value="11:00 AM - 11:30 AM">11:00 AM - 11:30 AM</option>
    <option value="11:30 AM - 12:00 PM">11:30 AM - 12:00 PM</option>
    <option value="05:00 PM - 05:30 PM">05:00 PM - 05:30 PM</option>
    <option value="05:30 PM - 06:00 PM">05:30 PM - 06:00 PM</option>
    <option value="06:00 PM - 06:30 PM">06:00 PM - 06:30 PM</option>
    <option value="06:30 PM - 07:00 PM">06:30 PM - 07:00 PM</option>
    <option value="07:00 PM - 07:30 PM">07:00 PM - 07:30 PM</option>
    <option value="07:30 PM - 08:00 PM">07:30 PM - 08:00 PM</option>
  </>
) : (
  <>
    <option value="">Select Condition</option>
    <option value="Piles / Fissure / Fistula">
      Piles / Fissure / Fistula
    </option>
    <option value="Kidney Stones">Kidney Stones</option>
    <option value="Migraine & Headaches">
      Migraine & Headaches
    </option>
    <option value="Skin Diseases">Skin Diseases</option>
    <option value="Hair Fall">Hair Fall</option>
    <option value="Digestive Disorders">
      Digestive Disorders
    </option>
    <option value="Respiratory Disorders">
      Respiratory Disorders
    </option>
    <option value="Joint Problems">Joint Problems</option>
    <option value="Women's Health">Women's Health</option>
    <option value="Other">Other</option>
  </>
)}


  </select>
)
 : (
        <input
  type={field.type}
  name={field.name}
  required={field.required}
  value={String(values[field.name as keyof typeof values] ?? "")}
  onChange={(event) =>
    setValues((current) => ({
      ...current,
      [field.name]: event.target.value
    }))
  }
/>
      )}
    </label>
    );
  })}
</div>

    <button
      className="button button-primary"
      disabled={status === "submitting"}
    >
      {status === "submitting"
        ? "Booking..."
        : "Book Consultation"}
    </button>

    {status === "success" ? (
      <p className="form-success">
        Thank you. Our team will contact you shortly to confirm your appointment.
      </p>
    ) : null}

       {status === "error" ? (
      <p className="form-error">{error}</p>
    ) : null}
  </form>
);
}
