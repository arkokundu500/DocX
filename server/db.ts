import { neon } from "@neondatabase/serverless";
import { eq, or } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-http";
import { InsertUser, users } from "../drizzle/schema";
import { ENV } from "./_core/env";

let _db: ReturnType<typeof drizzle> | null = null;

function getDatabaseUrl() {
  const configured = process.env.DOCX_DATABASE_URL || process.env.DATABASE_URL || "";
  return configured.startsWith("postgresql://") || configured.startsWith("postgres://") ? configured : "";
}

// Lazily create the Neon Drizzle instance so local tooling can run without a database.
export async function getDb() {
  if (!_db) {
    const databaseUrl = getDatabaseUrl();
    if (!databaseUrl) return null;
    try {
      _db = drizzle(neon(databaseUrl));
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: Neon database not available");
    return;
  }

  try {
    const values: InsertUser = { openId: user.openId };
    const updateSet: Partial<InsertUser> = {};

    const textFields = [
      "name",
      "email",
      "phone",
      "loginMethod",
      "specialty",
      "licenseNumber",
      "hospitalId",
      "hospitalName",
      "designation",
      "gender",
      "bloodGroup",
      "emergencyContact",
      "medicalNotes",
      "city",
    ] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    const intFields = ["onboardingCompleted", "experienceYears", "consultationFee", "age"] as const;
    intFields.forEach((field) => {
      if (user[field] !== undefined) {
        values[field] = (user[field] ?? undefined) as any;
        updateSet[field] = (user[field] ?? undefined) as any;
      }
    });

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    }

    // arkokundu500@gmail.com is always central admin
    if (user.email && user.email.toLowerCase() === "arkokundu500@gmail.com") {
      values.role = "admin";
      updateSet.role = "admin";
      values.onboardingCompleted = 1;
      updateSet.onboardingCompleted = 1;
    }

    if (!values.lastSignedIn) values.lastSignedIn = new Date();
    if (Object.keys(updateSet).length === 0) updateSet.lastSignedIn = new Date();

    await db.insert(users).values(values).onConflictDoUpdate({
      target: users.openId,
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function updateUserProfile(userId: number, update: Partial<InsertUser>) {
  const db = await getDb();
  if (!db) {
    throw new Error("Neon database not available");
  }

  const setObj: Record<string, unknown> = {
    ...update,
    updatedAt: new Date(),
  };

  const result = await db
    .update(users)
    .set(setObj)
    .where(eq(users.id, userId))
    .returning();

  return result[0];
}

export async function getUserById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
  return result[0];
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: Neon database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getUserByEmailOrPhone(identifier: string) {
  const db = await getDb();
  if (!db) return undefined;
  const clean = identifier.trim().toLowerCase();
  const digits = identifier.replace(/\D/g, "");

  const result = await db
    .select()
    .from(users)
    .where(
      or(
        eq(users.email, clean),
        eq(users.phone, identifier),
        digits.length >= 10 ? eq(users.phone, `+91${digits.slice(-10)}`) : undefined,
        digits.length >= 10 ? eq(users.phone, digits.slice(-10)) : undefined
      )
    )
    .limit(1);
  return result[0];
}
