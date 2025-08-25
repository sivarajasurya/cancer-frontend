import { addPatient, getPatients } from "@/server/store";

function iso(d) { if (!d) return ""; try { return new Date(d).toISOString().slice(0,10); } catch { return d; } }
function bmiFrom(cm, kg) { const h = Number(cm)/100, w = Number(kg); return h && w ? Math.round((w/(h*h))*10)/10 : null; }

export async function GET() {
  return new Response(JSON.stringify(getPatients().slice(-100).reverse()), { headers: { "Content-Type": "application/json" } });
}

export async function POST(request) {
  const b = await request.json();

  // detect new nested payload (has address/cancer objects)
  const isNested = typeof b === "object" && (b.address || b.cancer || b.medicalHistory);

  let patient;
  if (isNested) {
    const height = b?.medicalHistory?.lifestyle?.heightCM ?? null;
    const weight = b?.medicalHistory?.lifestyle?.weightKG ?? null;
    const bmi = bmiFrom(height, weight);

    patient = {
      id: crypto.randomUUID(),
      mrn: b.mrn || "",
      firstName: b.firstName || "",
      lastName: b.lastName || "",
      dob: iso(b.dob),
      sexAtBirth: b.sexAtBirth || "",
      genderIdentity: b.genderIdentity || "",
      cancerType: b?.cancer?.primarySite || "",
      stage: b?.cancer?.overallStage || "",
      diagnosisDate: iso(b?.cancer?.diagnosisDate),
      email: b.email || "",
      contactPhone: b.phone || "",
      address: [b?.address?.line1,b?.address?.line2,b?.address?.city,b?.address?.state,b?.address?.postalCode,b?.address?.country].filter(Boolean).join(", "),
      bmi,
      raw: b, // keep the full nested payload for detail view
      createdAt: new Date().toISOString(),
    };
  } else {
    // legacy flat payload support (from earlier form)
    patient = {
      id: crypto.randomUUID(),
      firstName: String(b.firstName || "").trim(),
      lastName: String(b.lastName || "").trim(),
      dob: iso(b.dob),
      sexAtBirth: b.sexAtBirth || "",
      genderIdentity: b.genderIdentity || "",
      cancerType: b.cancerType || "",
      stage: b.stage || "",
      diagnosisDate: iso(b.diagnosisDate),
      contactPhone: b.contactPhone || "",
      email: b.email || "",
      address: b.address || "",
      city: b.city || "",
      state: b.state || "",
      postalCode: b.postalCode || "",
      country: b.country || "",
      ethnicity: b.ethnicity || "",
      mrn: String(b.mrn || "").trim(),
      createdAt: new Date().toISOString(),
    };
  }

  // basic required validation
  const missing = ["firstName","lastName","dob","sexAtBirth","mrn"].filter(k => !patient[k] || String(patient[k]).trim() === "");
  if (missing.length) return new Response(JSON.stringify({ error: `Missing fields: ${missing.join(', ')}` }), { status: 400 });

  addPatient(patient);
  return new Response(JSON.stringify(patient), { status: 201, headers: { "Content-Type": "application/json" } });
}