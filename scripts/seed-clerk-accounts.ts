import { createClerkClient } from "@clerk/backend";
import { neon } from "@neondatabase/serverless";
import "dotenv/config";

/**
 * Seed four demo Clerk accounts (patient, admin, doctor, hospital authority)
 * with known usernames + passwords, and mirror them into the Neon `users`
 * table with the matching DocX roles so role-based dashboards resolve.
 *
 * Idempotent: existing accounts are updated (password reset, metadata + DB
 * role re-asserted). Safe to run repeatedly.
 *
 * Usage: pnpm db:seed:accounts
 */

type Account = {
  username: string;
  password: string;
  name: string;
  email: string;
  phone: string;
  role: "user" | "admin" | "doctor" | "hospital_authority";
  roleLabel: string;
};

// `+clerk_test` emails and `+1555xxxxxxx` phones are auto-verified on
// development instances with test mode enabled, so no invitation/verification
// round-trip is needed. The instance requires a phone number on sign-up, so
// every seeded account carries one.
const ACCOUNTS: Account[] = [
  { username: "arkokundu", password: "Arko@#12345", name: "Arko Kundu", email: "arkokundu500@gmail.com", phone: "+15555550100", role: "admin", roleLabel: "Admin (Primary)" },
  { username: "docx-patient", password: "DocxPatient#2026", name: "Riya Kapoor", email: "riya.kapoor+clerk_test@example.com", phone: "+15555550101", role: "user", roleLabel: "Patient" },
  { username: "docx-admin", password: "DocxAdmin#2026", name: "Arvind Sharma", email: "arvind.sharma+clerk_test@example.com", phone: "+15555550102", role: "admin", roleLabel: "Admin" },
  { username: "docx-doctor", password: "DocxDoctor#2026", name: "Dr. Ananya Rao", email: "ananya.rao+clerk_test@example.com", phone: "+15555550103", role: "doctor", roleLabel: "Doctor" },
  { username: "docx-hospital", password: "DocxHospital#2026", name: "Neha Bhatia", email: "neha.bhatia+clerk_test@example.com", phone: "+15555550104", role: "hospital_authority", roleLabel: "Hospital authority" },
];

async function main() {
  const secretKey = process.env.CLERK_SECRET_KEY;
  const publishableKey = process.env.VITE_CLERK_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  if (!secretKey || !publishableKey) throw new Error("CLERK_SECRET_KEY and VITE_CLERK_PUBLISHABLE_KEY are required");

  const clerk = createClerkClient({ secretKey, publishableKey });
  const sql = neon(process.env.DOCX_DATABASE_URL || process.env.DATABASE_URL || "");
  if (!process.env.DOCX_DATABASE_URL && !process.env.DATABASE_URL) throw new Error("DOCX_DATABASE_URL is required");

  const results: Record<string, string> = {};

  for (const account of ACCOUNTS) {
    // 1. Find or create the Clerk user by username.
    const existing = await clerk.users.getUserList({ username: [account.username], limit: 1 });
    let clerkUser = existing.data.find(u => u.username === account.username);

    if (clerkUser) {
      await clerk.users.updateUser(clerkUser.id, {
        password: account.password,
        firstName: account.name.split(" ")[0],
        lastName: account.name.split(" ").slice(1).join(" ") || undefined,
        publicMetadata: { docxRole: account.role, seeded: true },
        unsafeMetadata: { docxRole: account.role },
        skipPasswordChecks: true,
      });
      results[account.username] = `updated (clerk id ${clerkUser.id})`;
    } else {
      clerkUser = await clerk.users.createUser({
        username: account.username,
        password: account.password,
        emailAddress: [account.email],
        phoneNumber: [account.phone],
        firstName: account.name.split(" ")[0],
        lastName: account.name.split(" ").slice(1).join(" ") || undefined,
        publicMetadata: { docxRole: account.role, seeded: true },
        unsafeMetadata: { docxRole: account.role },
        skipPasswordChecks: true,
      });
      results[account.username] = `created (clerk id ${clerkUser.id})`;
    }

    // 2. Mirror into Neon with the DocX role so dashboards + guards resolve.
    const openId = `clerk_${clerkUser.id}`;
    const email = clerkUser.emailAddresses.find(e => e.id === clerkUser.primaryEmailAddressId)?.emailAddress || `${account.username}@docx.demo`;
    await sql`
      INSERT INTO users ("openId", name, email, "loginMethod", role, "onboardingCompleted")
      VALUES (${openId}, ${account.name}, ${email}, 'clerk', ${account.role}, 1)
      ON CONFLICT ("openId") DO UPDATE SET role = EXCLUDED.role, name = EXCLUDED.name, email = EXCLUDED.email, "onboardingCompleted" = 1
    `;
  }

  console.log(JSON.stringify(results, null, 2));
  console.log("\nTest accounts (username / password):");
  for (const a of ACCOUNTS) console.log(`  ${a.roleLabel.padEnd(20)} ${a.username.padEnd(16)} ${a.password}`);
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
