import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname } from "path";
import db from "./database.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// Get all comments
app.get("/comments", (req, res) => {
  const comments = db.prepare("SELECT * FROM comments").all();
  res.json(comments);
});

// Add a new comment
app.post("/comments", (req, res) => {
  const { text, parent_id } = req.body;
  const stmt = db.prepare("INSERT INTO comments (text, parent_id) VALUES (?, ?)");
  const result = stmt.run(text, parent_id || null);
  res.json({ id: result.lastInsertRowid, text, parent_id });
});

// Delete a comment
app.delete("/comments/:id", (req, res) => {
  db.prepare("DELETE FROM comments WHERE id = ?").run(req.params.id);
  res.sendStatus(200);
});

app.listen(5001, () => console.log("Server running on port 5001"));
