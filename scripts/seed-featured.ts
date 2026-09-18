import { neon } from "@neondatabase/serverless";
import { doctors as allDoctors, hospitals as allHospitals, visits as allVisits } from "../client/src/lib/mock-data";
import "dotenv/config";

/**
 * Seed the featured Bengaluru records (the hand-curated ones at the top of the
 * experience) into Neon. The workbook import only covers `demo-*` records; the
 * featured `v1`-`v9` visit slots must exist in the database for atomic booking.
 */

const sql = neon(process.env.DOCX_DATABASE_URL || process.env.DATABASE_URL || "");

const featuredHospitals = allHospitals.filter(h => !h.id.startsWith("demo-"));
const featuredDoctors = allDoctors.filter(d => !d.id.startsWith("demo-"));
const featuredVisits = allVisits.filter(v => !v.id.startsWith("demo-"));

const MONTHS: Record<string, number> = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 };

function startsAt(date: string, time: string): string {
  // date like "18 Sep", time like "4:30 PM" — appointments year 2026, IST.
  const [dayStr, monStr] = date.split(" ");
  const day = Number(dayStr);
  const month = MONTHS[monStr];
  if (!Number.isInteger(day) || month === undefined) throw new Error(`Invalid visit date: ${date}`);
  const match = time.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) throw new Error(`Invalid visit time: ${time}`);
  let hours = Number(match[1]);
  const minutes = Number(match[2]);
  const meridiem = match[3].toUpperCase();
  if (meridiem === "PM" && hours !== 12) hours += 12;
  if (meridiem === "AM" && hours === 12) hours = 0;
  // 18 Sep 2026 4:30 PM IST === 11:00 UTC
  const iso = new Date(Date.UTC(2026, month, day, hours - 5, minutes - 30));
  return iso.toISOString();
}

async function main() {
  if (!process.env.DOCX_DATABASE_URL && !process.env.DATABASE_URL) throw new Error("DOCX_DATABASE_URL is required");

  for (const hospital of featuredHospitals) {
    await sql`
      INSERT INTO hospitals (id, name, type, address, city, rating, "reviewCount", "ambulanceAvailable", "bedCapacity", specialties, tests, phone, source)
      VALUES (${hospital.id}, ${hospital.name}, ${hospital.type}, ${hospital.address}, ${hospital.city}, ${String(hospital.rating)}, ${hospital.reviewCount}, ${hospital.ambulanceAvailable ? 1 : 0}, ${hospital.bedCapacity}, ${JSON.stringify(hospital.specialties)}, ${JSON.stringify(hospital.tests)}, ${hospital.phone}, 'DocX featured Bengaluru records')
      ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, rating = EXCLUDED.rating, "reviewCount" = EXCLUDED."reviewCount"
    `;
  }

  for (const doctor of featuredDoctors) {
    await sql`
      INSERT INTO doctors (id, name, specialty, department, "experienceYears", rating, "reviewCount", fee, "hospitalIds", verified, source)
      VALUES (${doctor.id}, ${doctor.name}, ${doctor.specialty}, ${doctor.department}, ${doctor.experienceYears}, ${String(doctor.rating)}, ${doctor.reviewCount}, ${doctor.fee}, ${JSON.stringify(doctor.hospitalIds)}, ${doctor.verified ? 1 : 0}, 'DocX featured Bengaluru records')
      ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, fee = EXCLUDED.fee, rating = EXCLUDED.rating, "reviewCount" = EXCLUDED."reviewCount"
    `;
  }

  for (const visit of featuredVisits) {
    await sql`
      INSERT INTO visits (id, "doctorId", "hospitalId", "startsAt", capacity, "bookedCount", status)
      VALUES (${visit.id}, ${visit.doctorId}, ${visit.hospitalId}, ${startsAt(visit.date, visit.time)}, ${visit.capacity}, ${visit.booked}, ${visit.status})
      ON CONFLICT (id) DO UPDATE SET "bookedCount" = EXCLUDED."bookedCount", capacity = EXCLUDED.capacity, status = EXCLUDED.status
    `;
  }

  const [count] = await sql`SELECT count(*)::int AS c FROM visits WHERE id IN ('v1','v2','v3','v4','v5','v6','v7','v8','v9')`;
  console.log(JSON.stringify({ featuredHospitals: featuredHospitals.length, featuredDoctors: featuredDoctors.length, featuredVisitsSeeded: count?.c }));
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
