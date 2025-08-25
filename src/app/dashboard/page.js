"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (!token) router.replace("/login");
    const u = window.localStorage.getItem("user");
    if (u) setUser(JSON.parse(u));
  }, [router]);

  function logout() {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("user");
    router.replace("/login");
  }

  return (
    <main className="space-y-6 p-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <div className="text-sm">{user?.email}</div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="card">
          <h2 className="font-semibold mb-2">Patients</h2>
          <p className="text-sm text-gray-600 mb-3">
            Add new oncology patients and view demographics.
          </p>
          <Link href="/patients" className="link">
            Open Patients →
          </Link>
        </div>
        <div className="card">
          <h2 className="font-semibold mb-2">Coming soon</h2>
          <p className="text-sm text-gray-600">
            Screenings, outcomes, staging timelines…
          </p>
        </div>
      </div>

      <button onClick={logout} className="btn border-gray-300">
        Log out
      </button>
    </main>
  );
}
