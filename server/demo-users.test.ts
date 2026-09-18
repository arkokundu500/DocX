import { neon } from "@neondatabase/serverless";
import { describe, expect, it } from "vitest";

const sql = neon(process.env.DOCX_DATABASE_URL || process.env.DATABASE_URL || "");

describe("demo user roles", () => {
  it("contains the seeded authority and doctor profiles", async () => {
    const rows = await sql`
      SELECT role, count(*)::int AS count
      FROM users
      WHERE "openId" LIKE 'demo-%'
      GROUP BY role
    `;
    const counts = Object.fromEntries(rows.map((row) => [String(row.role), Number(row.count)]));
    expect(counts.hospital_authority).toBe(2);
    expect(counts.doctor).toBe(3);
  }, 20_000);
});
