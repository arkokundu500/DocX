import { describe, expect, it } from "vitest";

describe("database configuration", () => {
  it("accepts a server-only Neon URL and local Redis URL", () => {
    const databaseUrl = process.env.DOCX_DATABASE_URL || process.env.DATABASE_URL;
    const redisUrl = process.env.DOCX_REDIS_URL || "redis://localhost:6379";
    expect(databaseUrl).toMatch(/^postgresql:\/\//);
    expect(databaseUrl).not.toContain("localhost");
    expect(redisUrl).toMatch(/^redis:\/\//);
  });
});
