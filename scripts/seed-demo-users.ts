import { neon } from "@neondatabase/serverless";
import "dotenv/config";

const sql = neon(process.env.DOCX_DATABASE_URL || process.env.DATABASE_URL || "");

const demoUsers = [
  { openId: "demo-hospital-authority-apollo-green", name: "Arvind Sharma", email: "arvind.sharma.demo@docx.example", role: "hospital_authority", loginMethod: "demo" },
  { openId: "demo-hospital-authority-manipal-heritage", name: "Neha Bhatia", email: "neha.bhatia.demo@docx.example", role: "hospital_authority", loginMethod: "demo" },
  { openId: "demo-doctor-ananya-rao", name: "Dr. Ananya Rao", email: "ananya.rao.demo@docx.example", role: "doctor", loginMethod: "demo" },
  { openId: "demo-doctor-vivek-menon", name: "Dr. Vivek Menon", email: "vivek.menon.demo@docx.example", role: "doctor", loginMethod: "demo" },
  { openId: "demo-doctor-meera-iyer", name: "Dr. Meera Iyer", email: "meera.iyer.demo@docx.example", role: "doctor", loginMethod: "demo" },
] as const;

async function main() {
  if (!process.env.DOCX_DATABASE_URL && !process.env.DATABASE_URL) throw new Error("DOCX_DATABASE_URL is required");
  for (const user of demoUsers) {
    await sql`
      INSERT INTO users ("openId", name, email, "loginMethod", role, "onboardingCompleted")
      VALUES (${user.openId}, ${user.name}, ${user.email}, ${user.loginMethod}, ${user.role}, 1)
      ON CONFLICT ("openId") DO UPDATE SET name = EXCLUDED.name, email = EXCLUDED.email, "loginMethod" = EXCLUDED."loginMethod", role = EXCLUDED.role, "onboardingCompleted" = 1
    `;
  }
  const rows = await sql`
    SELECT role, count(*)::int AS count
    FROM users
    WHERE "openId" LIKE 'demo-%'
    GROUP BY role
    ORDER BY role
  `;
  console.log(JSON.stringify({ seeded: demoUsers.length, roles: rows }));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
