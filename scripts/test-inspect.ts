import { hospitals, doctors, visits, getDoctor, getHospital, getVisitsForHospital } from "../client/src/lib/mock-data";
import { neon } from "@neondatabase/serverless";
import * as dotenv from "dotenv";
dotenv.config();

async function main() {
  const allKasturi = hospitals.filter(h => h.name.toLowerCase().includes("kasturi"));
  console.log("All Kasturi Hospitals:", allKasturi.map(h => ({ id: h.id, name: h.name })));

  allKasturi.forEach(h => {
    const vList = visits.filter(v => v.hospitalId === h.id);
    console.log(`Visits in mock-data for ${h.name} (${h.id}):`, vList.length);
    vList.forEach(v => {
      const doc = getDoctor(v.doctorId);
      console.log(`  Visit ${v.id}: Doctor ${doc.name} (${doc.id}), Day: ${v.day}, Date: ${v.date}, Time: ${v.time}`);
    });
  });

  const sql = neon(process.env.DOCX_DATABASE_URL || process.env.DATABASE_URL || "");
  const docVisits = await sql`
    SELECT v.*, d.name as "doctorName", d.specialty as "doctorSpecialty", h.name as "hospitalName", h.city as "hospitalCity"
    FROM visits v
    JOIN doctors d ON d.id = v."doctorId"
    JOIN hospitals h ON h.id = v."hospitalId"
    WHERE v."doctorId" = 'demo-doc002'
    ORDER BY v."startsAt" ASC
  `;
  console.log("DB visits for demo-doc002:", docVisits);
}

main().catch(console.error);

