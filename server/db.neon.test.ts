import { describe, expect, it } from "vitest";
import { getUserByOpenId } from "./db";

describe("DocX Neon Drizzle adapter", () => {
  it("queries the migrated users table through the app database helper", async () => {
    await expect(getUserByOpenId("__docx_neon_health_probe__")).resolves.toBeUndefined();
  }, 20_000);
});
