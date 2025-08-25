"use client";
import { useRouter } from "next/navigation";
import PatientDetailsForm from "@/components/PatientDetailsForm";

export default function NewPatientPage() {
  const router = useRouter();

  async function save(payload) {
    const res = await fetch("/api/patients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const err = await res.json();
      alert(err.error || "Failed to save");
      return;
    }
    const created = await res.json();
    // Redirect to the new patient's detail page
    router.push(`/patients/${created.id}`);
  }

  return (
    <main className="space-y-6 p-5">
      <h1 className="text-2xl font-semibold">Add Patient</h1>
      <div className="card">
        <PatientDetailsForm onSubmit={save} />
      </div>
    </main>
  );
}
