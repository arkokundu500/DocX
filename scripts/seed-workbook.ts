import { neon } from "@neondatabase/serverless";
import { importedDoctors, importedHospitals, importedVisits } from "../client/src/lib/demo-data";
import "dotenv/config";

const sql = neon(process.env.DOCX_DATABASE_URL || process.env.DATABASE_URL || "");

function startsAt(date: string, time: string) {
  const parsed = new Date(`${date} 2026 ${time} GMT+0530`);
  if (Number.isNaN(parsed.getTime())) throw new Error(`Invalid visit date/time: ${date} ${time}`);
  return parsed.toISOString();
}

async function main() {
  if (!process.env.DOCX_DATABASE_URL && !process.env.DATABASE_URL) throw new Error("DOCX_DATABASE_URL is required");
  for (const hospital of importedHospitals) {
    await sql`
      INSERT INTO hospitals (id, name, type, address, city, rating, "reviewCount", "ambulanceAvailable", "bedCapacity", specialties, tests, phone, source)
      VALUES (${hospital.id}, ${hospital.name}, ${hospital.type}, ${hospital.address}, ${hospital.city}, ${String(hospital.rating)}, ${hospital.reviewCount}, ${hospital.ambulanceAvailable ? 1 : 0}, ${hospital.bedCapacity}, ${JSON.stringify(hospital.specialties)}, ${JSON.stringify(hospital.tests)}, ${hospital.phone}, 'DocX_Hospital_Doctor_Demo_Database.xlsx')
      ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, type = EXCLUDED.type, address = EXCLUDED.address, city = EXCLUDED.city, rating = EXCLUDED.rating, "reviewCount" = EXCLUDED."reviewCount", "ambulanceAvailable" = EXCLUDED."ambulanceAvailable", "bedCapacity" = EXCLUDED."bedCapacity", specialties = EXCLUDED.specialties, tests = EXCLUDED.tests, phone = EXCLUDED.phone
    `;
  }

  for (const doctor of importedDoctors) {
    await sql`
      INSERT INTO doctors (id, name, specialty, department, "experienceYears", rating, "reviewCount", fee, "hospitalIds", phone, email, verified, source)
      VALUES (${doctor.id}, ${doctor.name}, ${doctor.specialty}, ${doctor.department}, ${doctor.experienceYears}, ${String(doctor.rating)}, ${doctor.reviewCount}, ${doctor.fee}, ${JSON.stringify(doctor.hospitalIds)}, NULL, NULL, ${doctor.verified ? 1 : 0}, 'DocX_Hospital_Doctor_Demo_Database.xlsx')
      ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, specialty = EXCLUDED.specialty, department = EXCLUDED.department, "experienceYears" = EXCLUDED."experienceYears", rating = EXCLUDED.rating, "reviewCount" = EXCLUDED."reviewCount", fee = EXCLUDED.fee, "hospitalIds" = EXCLUDED."hospitalIds", verified = EXCLUDED.verified
    `;
  }

  for (const visit of importedVisits) {
    const visitStartsAt = startsAt(visit.date, visit.time);
    await sql`
      INSERT INTO visits (id, "doctorId", "hospitalId", "startsAt", capacity, "bookedCount", status)
      VALUES (${visit.id}, ${visit.doctorId}, ${visit.hospitalId}, ${visitStartsAt}, ${visit.capacity}, ${visit.booked}, ${visit.status})
      ON CONFLICT (id) DO UPDATE SET "doctorId" = EXCLUDED."doctorId", "hospitalId" = EXCLUDED."hospitalId", "startsAt" = EXCLUDED."startsAt", capacity = EXCLUDED.capacity, "bookedCount" = EXCLUDED."bookedCount", status = EXCLUDED.status
    `;
  }

  const [hospitalCount] = await sql`SELECT count(*)::int AS count FROM hospitals`;
  const [doctorCount] = await sql`SELECT count(*)::int AS count FROM doctors`;
  const [visitCount] = await sql`SELECT count(*)::int AS count FROM visits`;
  console.log(JSON.stringify({ hospitals: hospitalCount?.count, doctors: doctorCount?.count, visits: visitCount?.count }));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
