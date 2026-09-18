import "dotenv/config";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DOCX_DATABASE_URL || process.env.DATABASE_URL || "");

async function main() {
  console.log("DB URL:", (process.env.DOCX_DATABASE_URL || process.env.DATABASE_URL || "").slice(0, 40));
  const rows = await sql`SELECT id, "bookingId", "doctorId", "hospitalId", "patientName", "createdAt" FROM appointments ORDER BY id DESC LIMIT 10`;
  console.log("ALL ROWS IN APPOINTMENTS:", JSON.stringify(rows, null, 2));
}

main().catch(console.error);
