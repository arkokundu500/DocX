import { neon } from "@neondatabase/serverless";

export const managedRoles = ["user", "admin", "hospital_authority", "doctor"] as const;
export type ManagedRole = (typeof managedRoles)[number];

function getSql() {
  const url = process.env.DOCX_DATABASE_URL || process.env.DATABASE_URL || "";
  if (!url) throw new Error("DOCX_DATABASE_URL is required");
  return neon(url);
}

export async function listDemoUsers() {
  const sql = getSql();
  return sql`
    SELECT id, "openId", name, email, role, "loginMethod", "lastSignedIn", "createdAt"
    FROM users
    WHERE "openId" LIKE 'demo-%'
    ORDER BY role, name NULLS LAST
  `;
}

export async function updateDemoUserRole(openId: string, role: ManagedRole) {
  if (!openId.startsWith("demo-")) throw new Error("Only demo users can be managed here");
  const sql = getSql();
  const rows = await sql`
    UPDATE users
    SET role = ${role}, "updatedAt" = NOW()
    WHERE "openId" = ${openId} AND "openId" LIKE 'demo-%'
    RETURNING id, "openId", name, email, role, "loginMethod", "lastSignedIn", "createdAt"
  `;
  if (!rows[0]) throw new Error("Demo user not found");
  return rows[0];
}
