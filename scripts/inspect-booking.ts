import { neon } from "@neondatabase/serverless";
import "dotenv/config";

const sql = neon(process.env.DOCX_DATABASE_URL || process.env.DATABASE_URL || "");

const visits = await sql`SELECT id, "bookedCount", capacity, status FROM visits WHERE id IN ('v1', 'v2')`;
console.log("visits:", JSON.stringify(visits));

const appointments = await sql`SELECT "bookingId", "visitId", "userId", "patientName", status FROM appointments ORDER BY "createdAt" DESC LIMIT 5`;
console.log("appointments:", JSON.stringify(appointments));
