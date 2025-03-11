import Database from "better-sqlite3";
const db = new Database("comments.db");

// Create table if not exists
db.prepare(
  `CREATE TABLE IF NOT EXISTS comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT,
    parent_id INTEGER NULL
  )`
).run();

export default db;
