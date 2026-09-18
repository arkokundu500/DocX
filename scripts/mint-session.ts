import { SignJWT } from "jose";

/**
 * Mint a local DocX session cookie for endpoint testing without the browser.
 *
 * Usage: pnpm exec tsx scripts/mint-session.ts <openId> [role]
 * The openId must already exist in the Neon `users` table (e.g. a `clerk_*`
 * row created by a real sign-in, or a `demo-*` seeded profile).
 */

async function main() {
  const openId = process.argv[2];
  if (!openId) {
    console.error("Usage: tsx scripts/mint-session.ts <openId>");
    process.exit(1);
  }

  const secret = process.env.JWT_SECRET || "docx-local-dev-secret-change-me-in-production";
  const token = await new SignJWT({ openId, appId: "docx-local", name: openId })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setExpirationTime(Math.floor((Date.now() + 1000 * 60 * 60 * 24) / 1000))
    .sign(new TextEncoder().encode(secret));

  console.log(token);
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
