const configuredDatabaseUrl = process.env.DOCX_DATABASE_URL || process.env.DATABASE_URL || "";

export const ENV = {
  appId: "docx-local",
  cookieSecret: process.env.JWT_SECRET ?? "",
  databaseUrl: configuredDatabaseUrl,
  redisUrl: process.env.DOCX_REDIS_URL || process.env.REDIS_URL || "redis://localhost:6379",
  isProduction: process.env.NODE_ENV === "production",
};
