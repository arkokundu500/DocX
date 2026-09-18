import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function createContext(role: "admin" | "user", id = 999): TrpcContext {
  const now = new Date();
  return {
    user: {
      id,
      openId: `test-${role}-${id}`,
      email: `${role}@example.com`,
      name: `Test ${role}`,
      loginMethod: "test",
      role,
      createdAt: now,
      updatedAt: now,
      lastSignedIn: now,
    },
    req: {} as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("Patients Directory and Central Admin Isolation", () => {
  it("rejects listPatients for non-admin users", async () => {
    const caller = appRouter.createCaller(createContext("user"));
    await expect(caller.admin.listPatients()).rejects.toMatchObject({ code: "FORBIDDEN" });
  });

  it("allows central admin to list patient users", async () => {
    const caller = appRouter.createCaller(createContext("admin"));
    const patients = await caller.admin.listPatients();
    expect(Array.isArray(patients)).toBe(true);
  }, 20_000);

  it("rejects patientAppointments query for non-admin users", async () => {
    const caller = appRouter.createCaller(createContext("user"));
    await expect(caller.admin.patientAppointments({ userId: 1 })).rejects.toMatchObject({ code: "FORBIDDEN" });
  });

  it("allows central admin to query patient appointments history", async () => {
    const caller = appRouter.createCaller(createContext("admin"));
    const appts = await caller.admin.patientAppointments({ userId: 999999 });
    expect(Array.isArray(appts)).toBe(true);
    expect(appts).toHaveLength(0);
  }, 20_000);
});

describe("Realtime Voice Reminder & Appointments Actions", () => {
  it("allows a logged-in user to query their appointments", async () => {
    const caller = appRouter.createCaller(createContext("user", 123));
    const appts = await caller.appointments.mine();
    expect(Array.isArray(appts)).toBe(true);
  }, 20_000);

  it("allows a patient to confirm an appointment", async () => {
    const caller = appRouter.createCaller(createContext("user", 123));
    const res = await caller.appointments.confirm({ bookingId: "DX-NONEXISTENT" });
    expect(res).toEqual({ success: true });
  }, 20_000);

  it("allows a patient to cancel an appointment", async () => {
    const caller = appRouter.createCaller(createContext("user", 123));
    const res = await caller.appointments.cancel({ bookingId: "DX-NONEXISTENT" });
    expect(res).toEqual({ success: true });
  }, 20_000);
});
