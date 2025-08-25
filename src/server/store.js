// src/server/store.js
// Global singleton store (persists across HMR/dev reloads)
const g = globalThis;

if (!g.__PATIENT_STORE__) {
  g.__PATIENT_STORE__ = { PATIENTS: [] };
}

export function getPatients() {
  return g.__PATIENT_STORE__.PATIENTS;
}

export function addPatient(p) {
  g.__PATIENT_STORE__.PATIENTS.push(p);
  return p;
}

export function getPatientById(id) {
  return g.__PATIENT_STORE__.PATIENTS.find(p => p.id === id);
}
