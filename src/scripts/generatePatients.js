// ==========================
// UPDATED: scripts/generatePatients.js — create 100 random demo patients with American names
// ==========================
import { addPatient } from "@/server/store";

function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
function randomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

const firstNames = [
  "James",
  "Mary",
  "John",
  "Patricia",
  "Robert",
  "Jennifer",
  "Michael",
  "Linda",
  "William",
  "Elizabeth",
  "David",
  "Barbara",
  "Richard",
  "Susan",
  "Joseph",
  "Jessica",
  "Thomas",
  "Sarah",
  "Charles",
  "Karen",
  "Christopher",
  "Nancy",
  "Daniel",
  "Lisa",
  "Matthew",
  "Betty",
  "Anthony",
  "Margaret",
  "Mark",
  "Sandra",
];
const lastNames = [
  "Smith",
  "Johnson",
  "Williams",
  "Brown",
  "Jones",
  "Garcia",
  "Miller",
  "Davis",
  "Rodriguez",
  "Martinez",
  "Hernandez",
  "Lopez",
  "Gonzalez",
  "Wilson",
  "Anderson",
  "Thomas",
  "Taylor",
  "Moore",
  "Jackson",
  "Martin",
  "Lee",
  "Perez",
  "Thompson",
  "White",
  "Harris",
  "Sanchez",
  "Clark",
  "Ramirez",
  "Lewis",
  "Robinson",
];

const cancers = [
  "Breast",
  "Lung",
  "Colorectal",
  "Prostate",
  "Cervix",
  "Ovary",
  "Head & Neck",
  "Stomach",
  "Liver",
  "Leukemia",
];
const stages = ["I", "II", "III", "IV"];

export function generatePatients(n = 100) {
  for (let i = 0; i < n; i++) {
    const first = randomChoice(firstNames);
    const last = randomChoice(lastNames);
    const dob = randomDate(new Date(1950, 0, 1), new Date(2005, 0, 1));
    const diagnosis = randomDate(new Date(2015, 0, 1), new Date());
    const sexAtBirth = randomChoice(["Male", "Female"]);

    const patient = {
      id: crypto.randomUUID(),
      mrn: `${Math.floor(Math.random() * 900000) + 100000}`,
      firstName: first,
      lastName: last,
      dob: dob.toISOString().slice(0, 10),
      sexAtBirth,
      genderIdentity: sexAtBirth,
      cancerType: randomChoice(cancers),
      stage: randomChoice(stages),
      diagnosisDate: diagnosis.toISOString().slice(0, 10),
      email: `${first.toLowerCase()}.${last.toLowerCase()}@demo.com`,
      contactPhone: `+1${Math.floor(2000000000 + Math.random() * 7000000000)}`,
      address: `${Math.floor(Math.random() * 999)} Main St, ${randomChoice([
        "New York",
        "Los Angeles",
        "Chicago",
        "Houston",
        "Phoenix",
        "Philadelphia",
        "San Antonio",
        "San Diego",
        "Dallas",
        "San Jose",
      ])} USA`,
      bmi: Math.round(18 + Math.random() * 10),
      createdAt: new Date().toISOString(),
      raw: {
        education: randomChoice(["High School", "College", "Graduate"]),
        maritalStatus: randomChoice([
          "Single",
          "Married",
          "Divorced",
          "Widowed",
        ]),
        medicalHistory: {
          comorbidities: [randomChoice(["Hypertension", "Diabetes", "None"])],
          lifestyle: {
            smokingStatus: randomChoice(["never", "former", "current"]),
            alcoholUse: randomChoice(["none", "occasional", "regular"]),
            heightCM: 150 + Math.floor(Math.random() * 50),
            weightKG: 50 + Math.floor(Math.random() * 30),
          },
        },
        cancer: {
          primarySite: randomChoice(cancers),
          overallStage: randomChoice(stages),
          diagnosisDate: diagnosis.toISOString().slice(0, 10),
          histology: "Adenocarcinoma",
          biomarkers: { er: "Positive", her2: "2+" },
        },
      },
    };

    addPatient(patient);
  }
  console.log(`Generated ${n} demo patients with American names.`);
}
