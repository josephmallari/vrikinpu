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

  // Convert flat list into nested structure
  const commentMap = {};
  comments.forEach((c) => (commentMap[c.id] = { ...c, replies: [] }));

  const rootComments = [];
  comments.forEach((c) => {
    if (c.parent_id) {
      commentMap[c.parent_id]?.replies.push(commentMap[c.id]);
    } else {
      rootComments.push(commentMap[c.id]);
    }
  });

  res.json(rootComments);
});

// Add a new comment
app.post("/comments", (req, res) => {
  const { text, parent_id } = req.body;
  const stmt = db.prepare("INSERT INTO comments (text, parent_id) VALUES (?, ?)");
  const result = stmt.run(text, parent_id || null);
  res.json({ id: result.lastInsertRowid, text, parent_id, replies: [] });
});

// Delete a comment
app.delete("/comments/:id", (req, res) => {
  db.prepare("DELETE FROM comments WHERE id = ?").run(req.params.id);
  res.sendStatus(200);
});

app.listen(5001, () => console.log("Server running on port 5001"));
