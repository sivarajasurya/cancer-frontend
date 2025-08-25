import { notFound } from "next/navigation";
import { getPatientById } from "@/server/store";

export default async function PatientDetailPage({ params }) {
  const { id } = await params;
  const p = getPatientById(id);
  if (!p) return notFound();

  const raw = p.raw || {};

  return (
    <main className="space-y-6 p-5">
      <h1 className="text-2xl font-semibold">Patient Record</h1>

      <Section title="Demographics">
        <Item k="Name" v={`${p.firstName} ${p.lastName}`} />
        <Item k="MRN" v={p.mrn} />
        <Item k="DOB" v={p.dob || "—"} />
        <Item k="Sex at Birth" v={p.sexAtBirth || "—"} />
        <Item k="Gender Identity" v={p.genderIdentity || raw.genderIdentity || "—"} />
        <Item k="Marital Status" v={raw.maritalStatus || "—"} />
        <Item k="Education" v={raw.education || "—"} />
        <Item k="Occupation" v={raw.occupation || "—"} />
      </Section>

      <Section title="Contact & Address">
        <Item k="Email" v={p.email || "—"} />
        <Item k="Phone" v={p.contactPhone || raw.phone || "—"} />
        <Item k="Address" v={p.address || [raw?.address?.line1,raw?.address?.line2,raw?.address?.city,raw?.address?.state,raw?.address?.postalCode,raw?.address?.country].filter(Boolean).join(', ') || '—'} />
        <Item k="Insurance" v={[raw?.insurance?.provider, raw?.insurance?.memberId, raw?.insurance?.coverageType].filter(Boolean).join(' • ') || '—'} />
      </Section>

      <Section title="Vitals & Lifestyle">
        <Item k="BMI" v={p.bmi ?? '—'} />
        <Item k="Smoking" v={raw?.medicalHistory?.lifestyle?.smokingStatus || '—'} />
        <Item k="Alcohol" v={raw?.medicalHistory?.lifestyle?.alcoholUse || '—'} />
        <Item k="Height (cm)" v={raw?.medicalHistory?.lifestyle?.heightCM ?? '—'} />
        <Item k="Weight (kg)" v={raw?.medicalHistory?.lifestyle?.weightKG ?? '—'} />
      </Section>

      <Section title="Medical History">
        <Item k="Comorbidities" v={(raw?.medicalHistory?.comorbidities || []).join(', ') || '—'} />
        <Item k="Allergies" v={(raw?.medicalHistory?.allergies || []).join(', ') || '—'} />
        <Item k="Medications" v={(raw?.medicalHistory?.currentMedications || []).join(', ') || '—'} />
        <Item k="Past Surgeries" v={raw?.medicalHistory?.pastSurgeries || '—'} />
        <Item k="Family History" v={(raw?.medicalHistory?.familyHistory?.cancers || []).join(', ') || '—'} />
      </Section>

      <Section title="Oncology">
        <Item k="Primary Site" v={p.cancerType || raw?.cancer?.primarySite || '—'} />
        <Item k="Stage" v={p.stage || raw?.cancer?.overallStage || '—'} />
        <Item k="Diagnosis Date" v={p.diagnosisDate || raw?.cancer?.diagnosisDate || '—'} />
        <Item k="Histology" v={raw?.cancer?.histology || '—'} />
        <Item k="Laterality" v={raw?.cancer?.laterality || '—'} />
        <Item k="TNM" v={[raw?.cancer?.t && `T:${raw.cancer.t}`, raw?.cancer?.n && `N:${raw.cancer.n}`, raw?.cancer?.m && `M:${raw.cancer.m}`].filter(Boolean).join(' ' ) || '—'} />
        <Item k="Biomarkers" v={Object.entries(raw?.cancer?.biomarkers || {}).filter(([_,v]) => v).map(([k,v]) => `${k.toUpperCase()}:${v}`).join(' | ') || '—'} />
        <Item k="ECOG" v={raw?.cancer?.performanceStatusECOG || '—'} />
      </Section>

      <Section title="Screening & Vaccination">
        <Item k="Mammogram" v={[raw?.screening?.mammogram?.date, raw?.screening?.mammogram?.result].filter(Boolean).join(' • ') || '—'} />
        <Item k="Colonoscopy" v={[raw?.screening?.colonoscopy?.date, raw?.screening?.colonoscopy?.result].filter(Boolean).join(' • ') || '—'} />
        <Item k="Pap Smear" v={[raw?.screening?.papSmear?.date, raw?.screening?.papSmear?.result].filter(Boolean).join(' • ') || '—'} />
        <Item k="HPV Vaccine" v={raw?.vaccination?.hpv || '—'} />
        <Item k="HBV Vaccine" v={raw?.vaccination?.hbv || '—'} />
      </Section>

      <p className="text-xs text-gray-500">Created: {p.createdAt}</p>
    </main>
  );
}

function Section({ title, children }) { return <section className="card space-y-2"><h2 className="font-semibold">{title}</h2>{children}</section>; }
function Item({ k, v }) { return <div className="text-sm"><span className="text-gray-500 w-48 inline-block">{k}</span><span className="font-medium">{String(v)}</span></div>; }
