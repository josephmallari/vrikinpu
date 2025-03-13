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

const queries = {
  getAllComments: db.prepare("SELECT * FROM comments"),
  clearComments: db.prepare("DELETE FROM comments"),
};

console.log(queries.getAllComments.all());

export default db;
