"use client";
import { useState } from "react";

const CANCER_TYPES = [
  "Breast",
  "Lung",
  "Colorectal",
  "Prostate",
  "Cervical",
  "Ovarian",
  "Pancreatic",
  "Leukemia",
  "Lymphoma",
  "Other",
];
const STAGES = ["", "I", "II", "III", "IV"];
const SMOKER = ["", "Never", "Former", "Current"];
const DRINK = ["", "None", "Occasional", "Regular"];
const ECOG = ["", "0", "1", "2", "3", "4"];

export default function PatientForm({ onSaved }) {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    sexAtBirth: "",
    genderIdentity: "",
    ethnicity: "",
    contactPhone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    mrn: "",
    insuranceProvider: "",
    insuranceId: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    heightCm: "",
    weightKg: "",
    smokerStatus: "",
    alcoholUse: "",
    comorbidities: "",
    allergies: "",
    medications: "",
    familyHistory: "",
    cancerType: "",
    stage: "",
    diagnosisDate: "",
    priorTreatments: "",
    tnmT: "",
    tnmN: "",
    tnmM: "",
    ecog: "",
  });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  // const update = (k, v) => setValues((v) => ({ ...v, [k]: v }));
const update = (key, val) => {
  setValues(prev => ({ ...prev, [key]: val }));
};
  async function submit(e) {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      const res = await fetch("/api/patients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok)
        throw new Error((await res.json()).error || "Failed to save");
      if (onSaved) onSaved();
      setValues({
        firstName: "",
        lastName: "",
        dob: "",
        sexAtBirth: "",
        genderIdentity: "",
        ethnicity: "",
        contactPhone: "",
        email: "",
        address: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
        mrn: "",
        insuranceProvider: "",
        insuranceId: "",
        emergencyContactName: "",
        emergencyContactPhone: "",
        heightCm: "",
        weightKg: "",
        smokerStatus: "",
        alcoholUse: "",
        comorbidities: "",
        allergies: "",
        medications: "",
        familyHistory: "",
        cancerType: "",
        stage: "",
        diagnosisDate: "",
        priorTreatments: "",
        tnmT: "",
        tnmN: "",
        tnmM: "",
        ecog: "",
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      {error && <p className="text-red-600 text-sm">{error}</p>}

      {/* Identity */}
      <Section title="Identity">
        <Row>
          <Field label="First name *">
            <input
              className="input"
              value={values.firstName}
              onChange={(e) => {
                 update("firstName", e.target.value)
                
              }}
            />
          </Field>
          <Field label="Last name *">
            <input
              className="input"
              value={values.lastName}
              onChange={(e) => update("lastName", e.target.value)}
            />
          </Field>
        </Row>
        <Row>
          <Field label="Date of Birth *">
            <input
              type="date"
              className="input"
              value={values.dob}
              onChange={(e) => update("dob", e.target.value)}
            />
          </Field>
          <Field label="Sex at Birth *">
            <select
              className="input"
              value={values.sexAtBirth}
              onChange={(e) => update("sexAtBirth", e.target.value)}
            >
              <option value="">Select</option>
              <option>Female</option>
              <option>Male</option>
              <option>Intersex</option>
              <option>Prefer not to say</option>
            </select>
          </Field>
        </Row>
        <Row>
          <Field label="Gender Identity">
            <input
              className="input"
              value={values.genderIdentity}
              onChange={(e) => update("genderIdentity", e.target.value)}
            />
          </Field>
          <Field label="Ethnicity">
            <input
              className="input"
              value={values.ethnicity}
              onChange={(e) => update("ethnicity", e.target.value)}
            />
          </Field>
        </Row>
      </Section>

      {/* Contact */}
      <Section title="Contact">
        <Row>
          <Field label="Email">
            <input
              type="email"
              className="input"
              value={values.email}
              onChange={(e) => update("email", e.target.value)}
            />
          </Field>
          <Field label="Phone">
            <input
              className="input"
              value={values.contactPhone}
              onChange={(e) => update("contactPhone", e.target.value)}
            />
          </Field>
        </Row>
        <Row>
          <Field label="Address">
            <input
              className="input"
              value={values.address}
              onChange={(e) => update("address", e.target.value)}
            />
          </Field>
        </Row>
        <Row>
          <Field label="City">
            <input
              className="input"
              value={values.city}
              onChange={(e) => update("city", e.target.value)}
            />
          </Field>
          <Field label="State/Province">
            <input
              className="input"
              value={values.state}
              onChange={(e) => update("state", e.target.value)}
            />
          </Field>
          <Field label="Postal Code">
            <input
              className="input"
              value={values.postalCode}
              onChange={(e) => update("postalCode", e.target.value)}
            />
          </Field>
        </Row>
        <Row>
          <Field label="Country">
            <input
              className="input"
              value={values.country}
              onChange={(e) => update("country", e.target.value)}
            />
          </Field>
        </Row>
      </Section>

      {/* IDs & Insurance */}
      <Section title="IDs & Insurance">
        <Row>
          <Field label="MRN *">
            <input
              className="input"
              value={values.mrn}
              onChange={(e) => update("mrn", e.target.value)}
            />
          </Field>
          <Field label="Insurance Provider">
            <input
              className="input"
              value={values.insuranceProvider}
              onChange={(e) => update("insuranceProvider", e.target.value)}
            />
          </Field>
        </Row>
        <Row>
          <Field label="Insurance ID">
            <input
              className="input"
              value={values.insuranceId}
              onChange={(e) => update("insuranceId", e.target.value)}
            />
          </Field>
          <Field label="Emergency Contact Name">
            <input
              className="input"
              value={values.emergencyContactName}
              onChange={(e) => update("emergencyContactName", e.target.value)}
            />
          </Field>
        </Row>
        <Row>
          <Field label="Emergency Contact Phone">
            <input
              className="input"
              value={values.emergencyContactPhone}
              onChange={(e) => update("emergencyContactPhone", e.target.value)}
            />
          </Field>
        </Row>
      </Section>

      {/* Vitals */}
      <Section title="Vitals">
        <Row>
          <Field label="Height (cm)">
            <input
              className="input"
              inputMode="decimal"
              value={values.heightCm}
              onChange={(e) => update("heightCm", e.target.value)}
            />
          </Field>
          <Field label="Weight (kg)">
            <input
              className="input"
              inputMode="decimal"
              value={values.weightKg}
              onChange={(e) => update("weightKg", e.target.value)}
            />
          </Field>
        </Row>
        <Row>
          <Field label="Smoker Status">
            <select
              className="input"
              value={values.smokerStatus}
              onChange={(e) => update("smokerStatus", e.target.value)}
            >
              {SMOKER.map((s) => (
                <option key={s} value={s}>
                  {s || "Select"}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Alcohol Use">
            <select
              className="input"
              value={values.alcoholUse}
              onChange={(e) => update("alcoholUse", e.target.value)}
            >
              {DRINK.map((s) => (
                <option key={s} value={s}>
                  {s || "Select"}
                </option>
              ))}
            </select>
          </Field>
        </Row>
      </Section>

      {/* Medical History */}
      <Section title="Medical History">
        <Field label="Comorbidities">
          <textarea
            className="input"
            rows={2}
            value={values.comorbidities}
            onChange={(e) => update("comorbidities", e.target.value)}
          />
        </Field>
        <Field label="Allergies">
          <textarea
            className="input"
            rows={2}
            value={values.allergies}
            onChange={(e) => update("allergies", e.target.value)}
          />
        </Field>
        <Field label="Medications">
          <textarea
            className="input"
            rows={2}
            value={values.medications}
            onChange={(e) => update("medications", e.target.value)}
          />
        </Field>
        <Field label="Family History (cancer)">
          <textarea
            className="input"
            rows={2}
            value={values.familyHistory}
            onChange={(e) => update("familyHistory", e.target.value)}
          />
        </Field>
      </Section>

      {/* Oncology */}
      <Section title="Oncology">
        <Row>
          <Field label="Cancer Type *">
            <select
              className="input"
              value={values.cancerType}
              onChange={(e) => update("cancerType", e.target.value)}
            >
              <option value="">Select</option>
              {CANCER_TYPES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </Field>
          <Field label="Stage">
            <select
              className="input"
              value={values.stage}
              onChange={(e) => update("stage", e.target.value)}
            >
              {STAGES.map((s) => (
                <option key={s} value={s}>
                  {s || "Unknown"}
                </option>
              ))}
            </select>
          </Field>
        </Row>
        <Row>
          <Field label="Diagnosis Date">
            <input
              type="date"
              className="input"
              value={values.diagnosisDate}
              onChange={(e) => update("diagnosisDate", e.target.value)}
            />
          </Field>
          <Field label="ECOG PS">
            <select
              className="input"
              value={values.ecog}
              onChange={(e) => update("ecog", e.target.value)}
            >
              {ECOG.map((s) => (
                <option key={s} value={s}>
                  {s || "—"}
                </option>
              ))}
            </select>
          </Field>
        </Row>
        <Row>
          <Field label="TNM - T">
            <input
              className="input"
              value={values.tnmT}
              onChange={(e) => update("tnmT", e.target.value)}
            />
          </Field>
          <Field label="TNM - N">
            <input
              className="input"
              value={values.tnmN}
              onChange={(e) => update("tnmN", e.target.value)}
            />
          </Field>
          <Field label="TNM - M">
            <input
              className="input"
              value={values.tnmM}
              onChange={(e) => update("tnmM", e.target.value)}
            />
          </Field>
        </Row>
        <Field label="Prior Treatments (e.g., Surgery; Chemo: FOLFOX; RT; IO)">
          <textarea
            className="input"
            rows={2}
            value={values.priorTreatments}
            onChange={(e) => update("priorTreatments", e.target.value)}
          />
        </Field>
      </Section>

      <div className="pt-2">
        <button
          disabled={saving}
          className="btn border-gray-300 bg-gray-900 text-white"
        >
          {saving ? "Saving…" : "Save Patient"}
        </button>
        <p className="text-xs text-gray-500 mt-2">
          Required fields marked with *
        </p>
      </div>
    </form>
  );
}

function Section({ title, children }) {
  return (
    <section className="space-y-3">
      <h3 className="font-semibold">{title}</h3>
      {children}
    </section>
  );
}
function Row({ children }) {
  return <div className="grid md:grid-cols-3 gap-3">{children}</div>;
}
function Field({ label, children }) {
  return (
    <div>
      <label className="block text-sm mb-1">{label}</label>
      {children}
    </div>
  );
}
