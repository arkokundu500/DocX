import { neon } from "@neondatabase/serverless";
import { describe, expect, it } from "vitest";

const sql = neon(process.env.DOCX_DATABASE_URL || process.env.DATABASE_URL || "");

describe("workbook import", () => {
  it("contains the imported hospital, doctor, and visit counts", async () => {
    const [row] = await sql`
      SELECT
        (SELECT count(*)::int FROM hospitals WHERE source = 'DocX_Hospital_Doctor_Demo_Database.xlsx') AS hospitals,
        (SELECT count(*)::int FROM doctors WHERE source = 'DocX_Hospital_Doctor_Demo_Database.xlsx') AS doctors,
        (SELECT count(*)::int FROM visits v JOIN doctors d ON d.id = v."doctorId" WHERE d.source = 'DocX_Hospital_Doctor_Demo_Database.xlsx') AS visits
    `;
    expect(Number(row?.hospitals)).toBe(100);
    expect(Number(row?.doctors)).toBe(100);
    expect(Number(row?.visits)).toBeGreaterThanOrEqual(100);
  }, 20_000);
});
