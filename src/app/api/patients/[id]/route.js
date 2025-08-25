import { getPatientById } from "@/server/store";

export async function GET(_req, { params }) {
  const p = getPatientById(params.id);
  if (!p) return new Response(JSON.stringify({ error: "Not found" }), { status: 404 });
  return new Response(JSON.stringify(p), { headers: { "Content-Type": "application/json" } });
}
