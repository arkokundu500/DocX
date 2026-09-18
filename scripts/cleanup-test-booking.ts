import { neon } from "@neondatabase/serverless";
import "dotenv/config";

const sql = neon(process.env.DOCX_DATABASE_URL || process.env.DATABASE_URL || "");

await sql`DELETE FROM appointments WHERE reason = 'Endpoint smoke test'`;
await sql`UPDATE visits SET "bookedCount" = 12 WHERE id = 'v1'`;
console.log("cleaned smoke-test booking; v1 restored to 12/20 booked");
