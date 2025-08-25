"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) router.replace("/dashboard");
  }, [router]);

  function onSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }
    window.localStorage.setItem("token", "demo-token");
    window.localStorage.setItem("user", JSON.stringify({ email }));
    router.push("/dashboard");
  }

  return (
    <main className=" flex items-center justify-center">
      <div className="max-w-md w-full space-y-6 bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow">
        <div className="text-center">
          <h1 className="text-5xl p-4 font-semibold">Incyte Connect</h1>
          <h2 className="text-2xl font-semibold">Sign in</h2>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          {error && <p className="text-red-600">{error}</p>}
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              className="input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@hospital.org"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          <button className="btn border-gray-300 bg-gray-900 text-white w-full">
            Sign in
          </button>
        </form>
      </div>
    </main>
  );
}
