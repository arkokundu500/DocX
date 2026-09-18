import { createHash } from "node:crypto";
import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import { neon } from "@neondatabase/serverless";
import "dotenv/config";

async function main() {
  const connectionString = process.env.DOCX_DATABASE_URL || process.env.DATABASE_URL;
  if (!connectionString?.startsWith("postgres")) throw new Error("A Postgres DOCX_DATABASE_URL is required");
  const sql = neon(connectionString);

  await sql`CREATE TABLE IF NOT EXISTS "__drizzle_migrations" ("id" serial PRIMARY KEY NOT NULL, "hash" text NOT NULL, "created_at" bigint)`;
  const applied = await sql`SELECT hash FROM "__drizzle_migrations"`;
  const appliedHashes = new Set(applied.map((row) => String(row.hash)));
  const migrationDirectory = join(process.cwd(), "drizzle");
  const files = (await readdir(migrationDirectory)).filter((file) => file.endsWith(".sql")).sort();

  for (const file of files) {
    const migration = await readFile(join(migrationDirectory, file), "utf8");
    const hash = createHash("sha256").update(migration).digest("hex");
    if (appliedHashes.has(hash)) continue;

    const statements = migration.split(/--> statement-breakpoint/g).map((statement) => statement.trim()).filter(Boolean);
    for (const statement of statements) {
      try {
        await sql.query(statement);
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        if (!message.includes("already exists")) throw error;
      }
    }
    await sql`INSERT INTO "__drizzle_migrations" ("hash", "created_at") VALUES (${hash}, ${Date.now()})`;
    appliedHashes.add(hash);
    console.log(`Applied ${file}`);
  }

  const rows = await sql`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'users'`;
  console.log(JSON.stringify({ usersTablePresent: rows.length === 1, migrationCount: appliedHashes.size }));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
