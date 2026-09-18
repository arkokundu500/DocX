import { neon } from "@neondatabase/serverless";
import { describe, expect, it } from "vitest";

describe("Neon database connection", () => {
  it("executes a lightweight server-side health query", async () => {
    const connectionString = process.env.DOCX_DATABASE_URL || process.env.DATABASE_URL;
    expect(connectionString).toMatch(/^postgresql:\/\//);
    const sql = neon(connectionString as string);
    const rows = await sql`select 1 as ok`;
    expect(Number(rows[0]?.ok)).toBe(1);
  }, 20_000);
});
