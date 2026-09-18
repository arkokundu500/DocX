import { beforeAll, afterAll, describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import { getDb } from "./db";
import { users } from "../drizzle/schema";
import { eq } from "drizzle-orm";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

let testUserId: number = 1;

beforeAll(async () => {
  const db = await getDb();
  if (db) {
    // Delete any leftover from previous runs
    await db.delete(users).where(eq(users.openId, "test-onboarding-vitest-user"));
    const inserted = await db
      .insert(users)
      .values({
        openId: "test-onboarding-vitest-user",
        name: "Test Vitest User",
        email: "test.vitest@docx.example",
        loginMethod: "test",
        role: "user",
        onboardingCompleted: 0,
      })
      .returning();
    if (inserted[0]) {
      testUserId = inserted[0].id;
    }
  }
});

afterAll(async () => {
  const db = await getDb();
  if (db && testUserId) {
    await db.delete(users).where(eq(users.id, testUserId));
  }
});

function createAuthContext(userOverrides: Partial<AuthenticatedUser> = {}): TrpcContext {
  const user: AuthenticatedUser = {
    id: testUserId,
    openId: "test-onboarding-vitest-user",
    email: "test.vitest@docx.example",
    name: "Test Vitest User",
    phone: null,
    loginMethod: "clerk",
    role: "user",
    onboardingCompleted: 0,
    specialty: null,
    licenseNumber: null,
    experienceYears: 0,
    consultationFee: 0,
    hospitalId: null,
    hospitalName: null,
    designation: null,
    age: null,
    gender: null,
    bloodGroup: null,
    emergencyContact: null,
    medicalNotes: null,
    city: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
    ...userOverrides,
  };

  return {
    user,
    req: { protocol: "http", headers: {} } as TrpcContext["req"],
    res: { clearCookie: () => {} } as unknown as TrpcContext["res"],
  };
}

describe("auth.completeOnboarding", () => {
  it("rejects unauthorized admin role claims", async () => {
    const ctx = createAuthContext({ email: "randomuser@example.com" });
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.auth.completeOnboarding({
        role: "admin",
        name: "Malicious User",
        phone: "+919876543210",
      })
    ).rejects.toThrow("restricted");
  });

  it("permits admin role for arkokundu500@gmail.com", async () => {
    const ctx = createAuthContext({
      email: "arkokundu500@gmail.com",
      name: "Arko Kundu",
    });
    const caller = appRouter.createCaller(ctx);

    const result = await caller.auth.completeOnboarding({
      role: "admin",
      name: "Arko Kundu",
      phone: "+917439817750",
    });

    expect(result.success).toBe(true);
    expect(result.role).toBe("admin");
  });

  it("permits admin role with valid admin secret key", async () => {
    const ctx = createAuthContext({ email: "ops@docx.health" });
    const caller = appRouter.createCaller(ctx);

    const result = await caller.auth.completeOnboarding({
      role: "admin",
      name: "Ops Lead",
      phone: "+919876543210",
      adminSecretKey: "Arko@#12345",
    });

    expect(result.success).toBe(true);
    expect(result.role).toBe("admin");
  });

  it("completes onboarding for a Patient", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.auth.completeOnboarding({
      role: "user",
      name: "Rahul Verma",
      phone: "+919876543211",
      city: "Bengaluru",
      age: 32,
      gender: "Male",
      bloodGroup: "B+",
      emergencyContact: "Anita Verma (+919876543212)",
      medicalNotes: "No known allergies",
    });

    expect(result.success).toBe(true);
    expect(result.role).toBe("user");
    expect(result.user?.onboardingCompleted).toBe(1);
  });

  it("completes onboarding for a Hospital Authority with hospital details", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.auth.completeOnboarding({
      role: "hospital_authority",
      name: "Dr. Suresh Reddy",
      phone: "+919876543215",
      designation: "Medical Superintendent",
      hospitalId: "apollo-green",
      hospitalName: "Apollo Green Hospital",
    });

    expect(result.success).toBe(true);
    expect(result.role).toBe("hospital_authority");
    expect(result.user?.role).toBe("hospital_authority");
    expect(result.user?.onboardingCompleted).toBe(1);
  });

  it("completes onboarding for a Doctor and registers credentials", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.auth.completeOnboarding({
      role: "doctor",
      name: "Dr. Sandeep Sen",
      phone: "+919876543220",
      specialty: "Cardiology",
      licenseNumber: "NMC-2015-8842",
      experienceYears: 12,
      consultationFee: 900,
      hospitalId: "apollo-green",
    });

    expect(result.success).toBe(true);
    expect(result.role).toBe("doctor");
    expect(result.user?.role).toBe("doctor");
    expect(result.user?.onboardingCompleted).toBe(1);
  });
});
