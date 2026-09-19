import { createClerkClient, verifyToken } from "@clerk/backend";
import type { Request, Response } from "express";
import { SignJWT, jwtVerify } from "jose";
import { CLIENT_SESSION_COOKIE, COOKIE_NAME, ONE_HOUR_MS } from "@shared/const";
import * as db from "../db";

/**
 * Local / self-hosted Clerk authentication with 1-hour session expiration.
 *
 * Flow:
 *  1. The browser signs in with Clerk (`<ClerkProvider>` + Clerk-js).
 *  2. The client sends each protected API call with
 *     `Authorization: Bearer <clerk session token>` (see client useAuth).
 *  3. The server verifies the Clerk JWT, upserts the user into Neon, and
 *     issues the 1-hour DocX session cookie (signed with JWT_SECRET).
 *  4. Subsequent requests authenticate via cookie-parser (`req.cookies[COOKIE_NAME]`).
 *  5. Once the 1-hour cookie expires, the user is signed out automatically.
 */

function getClerkClient() {
  const secretKey = process.env.CLERK_SECRET_KEY;
  const publishableKey = process.env.VITE_CLERK_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  if (!secretKey || !publishableKey) {
    throw new Error("CLERK_SECRET_KEY and VITE_CLERK_PUBLISHABLE_KEY are required for authentication");
  }
  return createClerkClient({ secretKey, publishableKey });
}

export function isClerkConfigured(): boolean {
  return Boolean(
    process.env.CLERK_SECRET_KEY &&
    (process.env.VITE_CLERK_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY)
  );
}

function getSessionSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET || "docx-local-dev-secret-change-me-in-production";
  return new TextEncoder().encode(secret);
}

async function verifyDocxSession(token: string): Promise<{ openId: string } | null> {
  try {
    const { payload } = await jwtVerify(token, getSessionSecret(), { algorithms: ["HS256"] });
    if (typeof payload.openId !== "string" || payload.openId.length === 0) return null;
    return { openId: payload.openId };
  } catch {
    return null;
  }
}

async function createDocxSession(openId: string, name: string): Promise<string> {
  return new SignJWT({ openId, appId: "docx-local", name })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setExpirationTime(Math.floor((Date.now() + ONE_HOUR_MS) / 1000))
    .sign(getSessionSecret());
}

/**
 * Resolve the current DocX user from an incoming request.
 * Checks the DocX 1-hour session cookie first, then a Clerk bearer token.
 */
export async function authenticateClerkRequest(req: Request, res?: Response) {
  // 1. Existing DocX 1-hour session cookie (fast path via cookie-parser).
  const cookieToken =
    req.cookies?.[COOKIE_NAME] ||
    (req.headers.cookie ?? "")
      .split(";")
      .map(part => part.trim())
      .find(part => part.startsWith(`${COOKIE_NAME}=`))
      ?.slice(COOKIE_NAME.length + 1);

  if (cookieToken) {
    const session = await verifyDocxSession(cookieToken);
    if (session) {
      const user = await db.getUserByOpenId(session.openId);
      if (user) return user;
    }
  }

  // 2. Clerk bearer token (sent by the client on protected calls).
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ") || !isClerkConfigured()) return null;
  const clerkToken = authHeader.slice(7);

  try {
    const claims = await verifyToken(clerkToken, { secretKey: process.env.CLERK_SECRET_KEY });
    if (!claims?.sub) return null;

    const clerk = getClerkClient();
    const clerkUser = await clerk.users.getUser(claims.sub);
    const email = clerkUser.primaryEmailAddress?.emailAddress ?? clerkUser.emailAddresses[0]?.emailAddress ?? null;
    const phone = clerkUser.primaryPhoneNumber?.phoneNumber ?? clerkUser.phoneNumbers[0]?.phoneNumber ?? null;
    const name = clerkUser.fullName || clerkUser.username || email?.split("@")[0] || null;
    const openId = `clerk_${claims.sub}`;

    const existing = await db.getUserByOpenId(openId);
    const isSpecialAdmin = Boolean(email && email.toLowerCase() === "arkokundu500@gmail.com");

    await db.upsertUser({
      openId,
      name,
      email,
      phone: phone ?? existing?.phone ?? undefined,
      loginMethod: "clerk",
      role: isSpecialAdmin ? "admin" : (existing?.role ?? "user"),
      onboardingCompleted: isSpecialAdmin ? 1 : (existing?.onboardingCompleted ?? 0),
      lastSignedIn: new Date(),
    });

    // Issue the 1-hour DocX session cookie so subsequent requests skip
    // the Clerk verification round-trip.
    if (res) {
      const sessionToken = await createDocxSession(openId, name ?? "");
      res.cookie(COOKIE_NAME, sessionToken, {
        httpOnly: true,
        path: "/",
        sameSite: "lax",
        secure: req.protocol === "https",
        maxAge: ONE_HOUR_MS,
      });
      // Set client-accessible session flag for cookies-next synchronization
      res.cookie(CLIENT_SESSION_COOKIE, "true", {
        httpOnly: false,
        path: "/",
        sameSite: "lax",
        secure: req.protocol === "https",
        maxAge: ONE_HOUR_MS,
      });
    }

    const user = await db.getUserByOpenId(openId);
    return user ?? null;
  } catch (error) {
    console.warn("[Clerk] Authentication failed:", error instanceof Error ? error.message : error);
    return null;
  }
}

/** Clear the DocX session cookies. */
export function clearDocxSessionCookie(res: Response) {
  res.clearCookie(COOKIE_NAME, { httpOnly: true, path: "/", sameSite: "lax", maxAge: -1 });
  res.clearCookie(CLIENT_SESSION_COOKIE, { httpOnly: false, path: "/", sameSite: "lax", maxAge: -1 });
}
