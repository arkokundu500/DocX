import "dotenv/config";
import { neon } from "@neondatabase/serverless";

async function main() {
  const dbUrl = process.env.DOCX_DATABASE_URL || process.env.DATABASE_URL;
  if (!dbUrl) {
    console.error("No database URL provided");
    return;
  }
  const sql = neon(dbUrl);

  await sql`
    CREATE TABLE IF NOT EXISTS chat_messages (
      id SERIAL PRIMARY KEY,
      "appointmentId" VARCHAR(64) NOT NULL,
      "bookingId" VARCHAR(32),
      "senderId" INTEGER NOT NULL,
      "senderName" VARCHAR(160) NOT NULL,
      "senderRole" VARCHAR(32) NOT NULL,
      message TEXT NOT NULL,
      "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `;
  await sql`
    CREATE INDEX IF NOT EXISTS idx_chat_messages_appointmentId ON chat_messages("appointmentId");
  `;
  console.log("chat_messages table created/verified successfully in Neon Postgres!");
}

main().catch(console.error);
