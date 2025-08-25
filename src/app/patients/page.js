"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

export default function PatientsPage() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");

  async function load() {
    setLoading(true);
    const res = await fetch("/api/patients", { cache: "no-store" });
    const data = await res.json();
    setPatients(data);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => {
    if (!q.trim()) return patients;
    const term = q.toLowerCase();
    return patients.filter(p => {
      const hay = [
        p.firstName, p.lastName, p.mrn, p.sexAtBirth, p.cancerType, p.stage, p.diagnosisDate, p.email, p.contactPhone
      ].filter(Boolean).join(" ").toLowerCase();
      return hay.includes(term);
    });
  }, [patients, q]);

  return (
    <main className="space-y-6 p-5">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <h1 className="text-2xl font-semibold">Patients</h1>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="flex-1 md:flex-none">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by name, MRN, cancer type…"
              className="input"
            />
          </div>
          <Link href="/patients/new" className="btn border-gray-300">+ Add New Patient</Link>
        </div>
      </div>

      <div className="card">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold">Patient List</h2>
          {!loading && (<span className="text-xs text-gray-500">{filtered.length} / {patients.length}</span>)}
        </div>

        {loading ? (
          <p>Loading…</p>
        ) : filtered.length === 0 ? (
          <EmptyState q={q} onClear={() => setQ("")} />
        ) : (
          <ul className="space-y-2 max-h-[70vh] overflow-auto pr-1">
            {filtered.map(p => (
              <li key={p.id} className="border rounded-xl p-3">
                <div className="flex items-center justify-between">
                  <div className="font-medium">
                    {p.firstName} {p.lastName} <span className="text-xs text-gray-500">(MRN {p.mrn})</span>
                  </div>
                  <Link href={`/patients/${p.id}`} className="link text-sm">View →</Link>
                </div>
                <div className="text-sm text-gray-700">{p.sexAtBirth} • {p.cancerType} • Stage {p.stage || "N/A"}</div>
                <div className="text-xs text-gray-500">Diagnosed: {p.diagnosisDate || "—"}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}

function EmptyState({ q, onClear }) {
  return (
    <div className="text-sm text-gray-600 flex items-center justify-between">
      <span>No patients match “{q}”.</span>
      <button className="btn border-gray-300" onClick={onClear}>Clear</button>
    </div>
  );
}