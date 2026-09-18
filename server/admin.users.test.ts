import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function createContext(role: "admin" | "user"): TrpcContext {
  const now = new Date();
  return {
    user: { id: 999, openId: `test-${role}`, email: `${role}@example.com`, name: role, loginMethod: "test", role, createdAt: now, updatedAt: now, lastSignedIn: now },
    req: {} as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("admin demo users", () => {
  it("rejects demo-user listing for non-admins", async () => {
    const caller = appRouter.createCaller(createContext("user"));
    await expect(caller.admin.demoUsers()).rejects.toMatchObject({ code: "FORBIDDEN" });
  });

  it("lists seeded profiles for admins", async () => {
    const caller = appRouter.createCaller(createContext("admin"));
    const rows = await caller.admin.demoUsers();
    expect(rows).toHaveLength(5);
    expect(rows.filter((row) => row.role === "hospital_authority")).toHaveLength(2);
    expect(rows.filter((row) => row.role === "doctor")).toHaveLength(3);
  }, 20_000);

  it("only accepts demo identities for role assignment", async () => {
    const caller = appRouter.createCaller(createContext("admin"));
    await expect(caller.admin.updateDemoUserRole({ openId: "real-user", role: "doctor" })).rejects.toMatchObject({ code: "BAD_REQUEST" });
  });
});
