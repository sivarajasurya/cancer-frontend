// ==========================
// NEW: src/components/PatientDetailsForm.jsx (your provided form)
// ==========================
"use client";
import { useState } from "react";

export default function PatientDetailsForm({ onSubmit }) {
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget; // keep a stable ref to detect unmount after navigation
    const fd = new FormData(form);
    // const fd = new FormData(e.currentTarget);

    const base = Object.fromEntries(fd.entries());
    const comorbidities = fd.getAll("comorbidities");
    const allergies = fd.getAll("allergies");
    const currentMedications = fd.getAll("current_medications");
    const priorTreatments = fd.getAll("prior_treatments");
    const familyCancers = fd.getAll("family_cancers");
    const infections = fd.getAll("infections");

    const payload = {
      mrn: base.mrn || "",
      registryId: base.registry_id || "",
      firstName: base.first_name || "",
      lastName: base.last_name || "",
      dob: base.dob || null,
      sexAtBirth: base.sex_at_birth || "",
      genderIdentity: base.gender_identity || "",
      maritalStatus: base.marital_status || "",
      education: base.education || "",
      occupation: base.occupation || "",
      phone: base.phone || "",
      email: base.email || "",
      address: {
        line1: base.address_line1 || "",
        line2: base.address_line2 || "",
        city: base.city || "",
        state: base.state || "",
        postalCode: base.postal_code || "",
        country: base.country || "US",
      },
      cancer: {
        diagnosisDate: base.diagnosis_date || null,
        primarySite: base.primary_site || "",
        histology: base.histology || "",
        laterality: base.laterality || "",
        tumorSizeMM: base.tumor_size_mm ? Number(base.tumor_size_mm) : null,
        grade: base.grade || "",
        t: base.stage_t || "",
        n: base.stage_n || "",
        m: base.stage_m || "",
        overallStage: base.overall_stage || "",
        biomarkers: {
          er: base.er_status || "",
          pr: base.pr_status || "",
          her2: base.her2_status || "",
          egfr: base.egfr_status || "",
          alk: base.alk_status || "",
          kras: base.kras_status || "",
          braf: base.braf_status || "",
          pdl1: base.pdl1 || "",
        },
        performanceStatusECOG: base.ecog || "",
      },
      medicalHistory: {
        comorbidities,
        otherComorbidities: base.comorbidities_other || "",
        pastSurgeries: base.past_surgeries || "",
        allergies,
        currentMedications,
        priorTreatments,
        priorTreatmentNotes: base.prior_treatments_notes || "",
        familyHistory: {
          hasFamilyHistory: base.family_history || "no",
          cancers: familyCancers,
          notes: base.family_history_notes || "",
        },
        geneticTesting: {
          done: base.genetic_test_done || "no",
          results: base.genetic_test_results || "",
        },
        reproductive: {
          menarcheAge: base.menarche_age || "",
          parity: base.parity || "",
          menopauseStatus: base.menopause_status || "",
          lmp: base.lmp || "",
        },
        lifestyle: {
          smokingStatus: base.smoking_status || "never",
          tobaccoChew: base.tobacco_chew || "no",
          alcoholUse: base.alcohol_use || "none",
          heightCM: base.height_cm ? Number(base.height_cm) : null,
          weightKG: base.weight_kg ? Number(base.weight_kg) : null,
          activityLevel: base.activity_level || "",
          diet: base.diet || "",
        },
        infections,
      },
      screening: {
        mammogram: {
          date: base.mammogram_date || "",
          result: base.mammogram_result || "",
        },
        colonoscopy: {
          date: base.colonoscopy_date || "",
          result: base.colonoscopy_result || "",
        },
        papSmear: { date: base.pap_date || "", result: base.pap_result || "" },
      },
      vaccination: {
        hpv: base.hpv_vaccine || "unknown",
        hbv: base.hbv_vaccine || "unknown",
      },
      insurance: {
        provider: base.insurance_provider || "",
        memberId: base.insurance_id || "",
        coverageType: base.coverage_type || "",
      },
      socioeconomic: { incomeBracket: base.income_bracket || "" },
      consent: {
        dataUse: base.consent_data_use === "on",
        contact: base.consent_contact === "on",
      },
    };

    try {
      setSubmitting(true);
      if (typeof onSubmit === "function") await onSubmit(payload); // may navigate away
      // If navigating, the form unmounts; guard before touching DOM
      if (!form.isConnected) return;
      form.reset();
      alert("Saved successfully");
    } catch (err) {
      console.error(err);
      if (form.isConnected) alert("Error saving form");
    } finally {
      if (form.isConnected) setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 pb-28">
      <Header />

      {/* Patient Basics */}
      <Section title="Patient Basics">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input name="mrn" label="MRN (Hospital ID)" />
          <Input name="registry_id" label="Cancer Registry ID" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input name="first_name" label="First Name" required />
          <Input name="last_name" label="Last Name" required />
          <Input name="dob" type="date" label="Date of Birth" required />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Select
            name="sex_at_birth"
            label="Sex at Birth"
            options={["Male", "Female", "Intersex", "Prefer not to say"]}
          />
          <Select
            name="gender_identity"
            label="Gender Identity"
            options={[
              "Male",
              "Female",
              "Non-binary",
              "Other",
              "Prefer not to say",
            ]}
          />
          <Select
            name="marital_status"
            label="Marital Status"
            options={["Single", "Married", "Divorced", "Widowed", "Separated"]}
          />
          <Select
            name="education"
            label="Education"
            options={[
              "None",
              "Primary",
              "Secondary",
              "Graduate",
              "Postgraduate",
              "Doctorate",
            ]}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input name="occupation" label="Occupation" />
          <Input name="phone" label="Phone" />
          <Input name="email" label="Email" type="email" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Input
            name="address_line1"
            label="Address Line 1"
            className="md:col-span-2"
          />
          <Input name="address_line2" label="Address Line 2" />
          <Input name="city" label="City" />
          <Input name="state" label="State" />
          <Input name="postal_code" label="PIN Code" />
          <Input name="country" label="Country" defaultValue="US" />
        </div>
      </Section>

      {/* Cancer Details */}
      <Section title="Cancer Details">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Input name="diagnosis_date" type="date" label="Diagnosis Date" />
          <Select
            name="primary_site"
            label="Primary Site"
            options={[
              "Breast",
              "Lung",
              "Colorectal",
              "Prostate",
              "Cervix",
              "Ovary",
              "Head & Neck",
              "Stomach",
              "Liver",
              "Pancreas",
              "Leukemia",
              "Lymphoma",
              "Other",
            ]}
          />
          <Input
            name="histology"
            label="Histology/Type"
            placeholder="e.g., Adenocarcinoma"
          />
          <Select
            name="laterality"
            label="Laterality"
            options={[
              "Left",
              "Right",
              "Bilateral",
              "Midline",
              "Not Applicable",
            ]}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          <Input name="tumor_size_mm" label="Tumor Size (mm)" type="number" />
          <Input name="grade" label="Grade" placeholder="G1/G2/G3/High/Low" />
          <Input name="stage_t" label="T" placeholder="T0–T4" />
          <Input name="stage_n" label="N" placeholder="N0–N3" />
          <Input name="stage_m" label="M" placeholder="M0/M1" />
          <Input
            name="overall_stage"
            label="Overall Stage"
            placeholder="I–IV"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          <Select
            name="er_status"
            label="ER"
            options={["Unknown", "Positive", "Negative", "Not Applicable"]}
          />
          <Select
            name="pr_status"
            label="PR"
            options={["Unknown", "Positive", "Negative", "Not Applicable"]}
          />
          <Select
            name="her2_status"
            label="HER2"
            options={[
              "Unknown",
              "3+",
              "2+",
              "1+",
              "0",
              "Negative",
              "Not Applicable",
            ]}
          />
          <Select
            name="egfr_status"
            label="EGFR"
            options={["Unknown", "Mutated", "Wild-type", "Not Tested"]}
          />
          <Select
            name="alk_status"
            label="ALK"
            options={["Unknown", "Rearranged", "Negative", "Not Tested"]}
          />
          <Select
            name="kras_status"
            label="KRAS"
            options={["Unknown", "Mutated", "Wild-type", "Not Tested"]}
          />
          <Select
            name="braf_status"
            label="BRAF"
            options={["Unknown", "V600E", "Other", "Wild-type", "Not Tested"]}
          />
          <Select
            name="pdl1"
            label="PD-L1"
            options={["Unknown", "<1%", "1–49%", "≥50%", "Not Tested"]}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select
            name="ecog"
            label="ECOG Performance"
            options={["0", "1", "2", "3", "4", "5"]}
          />
        </div>
      </Section>

      {/* Medical History */}
      <Section title="Medical History & Lifestyle">
        <fieldset className="space-y-3">
          <legend className="text-sm font-medium text-gray-700">
            Comorbidities
          </legend>
          <CheckboxGroup
            name="comorbidities"
            options={[
              "Hypertension",
              "Diabetes",
              "Cardiac disease",
              "COPD/Asthma",
              "CKD",
              "Stroke",
              "Thyroid disorder",
              "Tuberculosis",
              "Other",
            ]}
          />
          <Input
            name="comorbidities_other"
            label="Other comorbidities (specify)"
          />
        </fieldset>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Textarea
            name="past_surgeries"
            label="Past Surgeries / Major Illness"
          />
          <Textarea
            name="prior_treatments_notes"
            label="Prior Cancer Treatments (notes)"
            placeholder="Regimen names, cycles, dates"
          />
        </div>

        <fieldset className="space-y-3">
          <legend className="text-sm font-medium text-gray-700">
            Current Medications
          </legend>
          <TagInput
            name="current_medications"
            placeholder="Type a medicine and press Enter"
          />
        </fieldset>

        <fieldset className="space-y-3">
          <legend className="text-sm font-medium text-gray-700">
            Prior Treatments
          </legend>
          <CheckboxGroup
            name="prior_treatments"
            options={[
              "Surgery",
              "Chemotherapy",
              "Radiation",
              "Immunotherapy",
              "Targeted therapy",
              "Hormonal therapy",
              "Palliative care",
            ]}
          />
        </fieldset>

        <fieldset className="space-y-3">
          <legend className="text-sm font-medium text-gray-700">
            Allergies
          </legend>
          <TagInput
            name="allergies"
            placeholder="Type an allergy and press Enter"
          />
        </fieldset>

        <fieldset className="space-y-3">
          <legend className="text-sm font-medium text-gray-700">
            Family History of Cancer
          </legend>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <Select
              name="family_history"
              label="Any family history?"
              options={["no", "yes", "unknown"]}
            />
            <TagInput
              name="family_cancers"
              placeholder="e.g., Mother - Breast; Uncle - Colon"
            />
            <Input name="family_history_notes" label="Notes" />
          </div>
        </fieldset>

        <fieldset className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Select
            name="genetic_test_done"
            label="Genetic Testing Done"
            options={["no", "yes", "unknown"]}
          />
          <Input
            name="genetic_test_results"
            label="Genetic Test Results (summary)"
            className="md:col-span-3"
          />
        </fieldset>

        <fieldset className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Input name="menarche_age" label="Menarche Age" />
          <Input name="parity" label="Parity" />
          <Select
            name="menopause_status"
            label="Menopause Status"
            options={[
              "Premenopausal",
              "Perimenopausal",
              "Postmenopausal",
              "Not applicable",
            ]}
          />
          <Input name="lmp" type="date" label="Last Menstrual Period (LMP)" />
        </fieldset>

        <fieldset className="grid grid-cols-1 md:grid-cols-6 gap-4">
          <Select
            name="smoking_status"
            label="Smoking"
            options={["never", "former", "current"]}
          />
          <Select
            name="tobacco_chew"
            label="Smokeless Tobacco/Betel"
            options={["no", "former", "current"]}
          />
          <Select
            name="alcohol_use"
            label="Alcohol Use"
            options={["none", "occasional", "regular"]}
          />
          <Input name="height_cm" type="number" label="Height (cm)" />
          <Input name="weight_kg" type="number" label="Weight (kg)" />
          <Select
            name="activity_level"
            label="Activity Level"
            options={["Low", "Moderate", "High"]}
          />
          <Input name="diet" label="Diet (notes)" className="md:col-span-3" />
        </fieldset>

        <fieldset className="space-y-3">
          <legend className="text-sm font-medium text-gray-700">
            Chronic Infections
          </legend>
          <CheckboxGroup
            name="infections"
            options={["HBV", "HCV", "HIV", "HPV", "None", "Unknown"]}
          />
        </fieldset>
      </Section>

      {/* Screening & Vaccination */}
      <Section title="Screening & Vaccination">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            name="mammogram_date"
            type="date"
            label="Last Mammogram (Date)"
          />
          <Input name="mammogram_result" label="Mammogram Result" />
          <Input
            name="colonoscopy_date"
            type="date"
            label="Last Colonoscopy (Date)"
          />
          <Input name="colonoscopy_result" label="Colonoscopy Result" />
          <Input name="pap_date" type="date" label="Last Pap Smear (Date)" />
          <Input name="pap_result" label="Pap Smear Result" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select
            name="hpv_vaccine"
            label="HPV Vaccine"
            options={["unknown", "none", "partial", "complete"]}
          />
          <Select
            name="hbv_vaccine"
            label="HBV Vaccine"
            options={["unknown", "none", "partial", "complete"]}
          />
        </div>
      </Section>

      {/* Insurance */}
      <Section title="Insurance & Socioeconomic">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input name="insurance_provider" label="Insurance Provider" />
          <Input name="insurance_id" label="Insurance Member ID" />
          <Input
            name="coverage_type"
            label="Coverage Type"
            placeholder="e.g., Govt, Private, TPA"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select
            name="income_bracket"
            label="Income Bracket"
            options={[
              "< $25,000",
              "$25,000 – $50,000",
              "$50,000 – $75,000",
              "$75,000 – $100,000",
              "> $100,000",
              "Prefer not to say",
            ]}
          />
        </div>
      </Section>

      {/* Consent */}
      <Section title="Consent">
        <div className="flex items-center gap-4">
          <Checkbox
            name="consent_data_use"
            label="I consent to my data being used for clinical care and research as per policy."
          />
        </div>
        <div className="flex items-center gap-4">
          <Checkbox
            name="consent_contact"
            label="I agree to be contacted for follow-up."
          />
        </div>
      </Section>

      <StickyActions submitting={submitting} />
    </form>
  );
}

function Header() {
  return (
    <div className="bg-white/70 backdrop-blur sticky top-0 z-20 border-b">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">
            Patient Intake & Demographics
          </h1>
          <p className="text-sm text-gray-600">
            Capture comprehensive demographics, cancer details, and medical
            history.
          </p>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section className="border rounded-2xl p-4 md:p-6 bg-white shadow-sm">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function Input({
  label,
  name,
  type = "text",
  className = "",
  required = false,
  defaultValue = "",
  placeholder = "",
}) {
  return (
    <label className={`block ${className}`}>
      <span className="block text-sm text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500">*</span>}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="w-full rounded-xl border border-gray-300 focus:border-black focus:ring-black px-3 py-2"
      />
    </label>
  );
}

function Textarea({ label, name, className = "", placeholder = "" }) {
  return (
    <label className={`block ${className}`}>
      <span className="block text-sm text-gray-700 mb-1">{label}</span>
      <textarea
        name={name}
        placeholder={placeholder}
        rows={4}
        className="w-full rounded-xl border border-gray-300 focus:border-black focus:ring-black px-3 py-2"
      />
    </label>
  );
}

function Select({ label, name, options = [], className = "" }) {
  return (
    <label className={`block ${className}`}>
      <span className="block text-sm text-gray-700 mb-1">{label}</span>
      <select
        name={name}
        className="w-full rounded-xl border border-gray-300 focus:border-black focus:ring-black px-3 py-2"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </label>
  );
}

function Checkbox({ name, label }) {
  return (
    <label className="flex items-start gap-2 text-sm">
      <input
        type="checkbox"
        name={name}
        className="mt-1 h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
      />
      <span className="text-gray-700">{label}</span>
    </label>
  );
}

function CheckboxGroup({ name, options = [] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
      {options.map((opt) => (
        <label key={opt} className="flex items-start gap-2 text-sm">
          <input
            type="checkbox"
            name={name}
            value={opt}
            className="mt-1 h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
          />
          <span className="text-gray-700">{opt}</span>
        </label>
      ))}
    </div>
  );
}

function TagInput({ name, placeholder = "" }) {
  const [items, setItems] = useState([]);
  const [value, setValue] = useState("");

  const add = (val) => {
    const v = val.trim();
    if (!v) return;
    if (items.includes(v)) return;
    setItems([...items, v]);
    setValue("");
  };

  const remove = (idx) => setItems(items.filter((_, i) => i !== idx));

  return (
    <div>
      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              add(value);
            }
          }}
          placeholder={placeholder}
          className="flex-1 rounded-xl border border-gray-300 focus:border-black focus:ring-black px-3 py-2"
        />
        <button
          type="button"
          onClick={() => add(value)}
          className="rounded-xl border px-3 py-2 hover:bg-gray-50"
        >
          Add
        </button>
      </div>
      {items.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {items.map((it, idx) => (
            <span
              key={`${it}-${idx}`}
              className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm"
            >
              {it}
              <button
                type="button"
                className="text-gray-500"
                onClick={() => remove(idx)}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}
      {items.map((it, idx) => (
        <input key={`${name}-${idx}`} type="hidden" name={name} value={it} />
      ))}
    </div>
  );
}

function StickyActions({ submitting }) {
  return (
    <div className="fixed bottom-0 inset-x-0 bg-white/80 backdrop-blur border-t z-30">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-center gap-3">
        <button
          type="reset"
          className="px-4 py-2 rounded-xl border hover:bg-gray-50"
        >
          Clear
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="px-4 py-2 rounded-xl bg-black text-white disabled:opacity-60"
        >
          {submitting ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
}
