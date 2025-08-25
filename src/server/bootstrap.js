// Runs on the server to prefill the in‑memory store on first load
// import { getPatients } from "@/server/store";
// import { generatePatients } from "@/scripts/generatePatients";
import { generatePatients } from "@/scripts/generatePatients";
import { getPatients } from "./store";

if (getPatients().length === 0) {
  generatePatients(100); // ← change this number if you want a different count
}
