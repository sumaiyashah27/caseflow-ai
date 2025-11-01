import { Pool } from "pg";
import bcrypt from "bcryptjs";

export const pool = new Pool({
  host: process.env.PGHOST || "localhost",
  port: Number(process.env.PGPORT || 5432),
  database: process.env.PGDATABASE || "caseflow",
  user: process.env.PGUSER || "admin",
  password: process.env.PGPASSWORD || "password",
});

export async function initDb() {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        role TEXT NOT NULL DEFAULT 'admin'
      );
      CREATE TABLE IF NOT EXISTS cases (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'open'
      );
      CREATE TABLE IF NOT EXISTS documents (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'unclassified',
        case_id INTEGER REFERENCES cases(id)
      );
    `);

    const { rows } = await client.query(
      "SELECT COUNT(*)::int AS count FROM users"
    );
    if (rows[0].count === 0) {
      const hash = await bcrypt.hash("admin123", 10);
      await client.query(
        "INSERT INTO users (email, password_hash, role) VALUES ($1,$2,$3)",
        ["admin@caseflow.ai", hash, "admin"]
      );
      await client.query(
        "INSERT INTO cases (name, status) VALUES ('Acme vs Globex', 'open'), ('In re: Example', 'open')"
      );
      await client.query(
        "INSERT INTO documents (title, content, status, case_id) VALUES         ('NDA Contract', 'This Non-Disclosure Agreement between...', 'contract', 1),         ('Motion to Dismiss', 'Comes now the Defendant...', 'motion', 1)"
      );
    }
  } finally {
    client.release();
  }
}
