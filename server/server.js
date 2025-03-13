import express from "express";
import cors from "cors";
import db from "./database.js";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);

app.use(cors());
app.use(express.json());

// socket logic setup
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE"],
  },
});

io.on("connection", (socket) => {
  console.log("socket connected");
});

// get all comments
app.get("/comments", (req, res) => {
  const comments = db.prepare("SELECT * FROM comments").all();

  // convert flat list into nested structure
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

// add new comment
app.post("/comments", (req, res) => {
  const { text, parent_id } = req.body;
  const stmt = db.prepare("INSERT INTO comments (text, parent_id) VALUES (?, ?)");
  const result = stmt.run(text, parent_id || null);
  res.json({ id: result.lastInsertRowid, text, parent_id, replies: [] });
});

// delete comment
app.delete("/comments/:id", (req, res) => {
  db.prepare("DELETE FROM comments WHERE id = ?").run(req.params.id);
  res.sendStatus(200);
});

server.listen(5001, () => console.log("Server running on port 5001"));
