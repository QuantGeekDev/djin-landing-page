import { neon } from "@neondatabase/serverless";
import { readFileSync } from "fs";
import { resolve } from "path";

async function migrate() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    console.error("DATABASE_URL is not set");
    process.exit(1);
  }

  const sql = neon(databaseUrl);
  const schemaPath = resolve(__dirname, "../app/lib/schema.sql");
  const schema = readFileSync(schemaPath, "utf-8");

  console.log("Running migration...");
  // Use sql.query() for raw SQL strings (tagged template only accepts template literals)
  await sql.query(schema);
  console.log("Migration complete");
}

migrate().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
