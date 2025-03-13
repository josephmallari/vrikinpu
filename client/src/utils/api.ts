import { Comment } from "../types/types";

export async function fetchComments(): Promise<Comment[]> {
  const res = await fetch("http://localhost:5001/comments");
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  return res.json();
}

export async function handleAddComment(text: string, parent_id: number | null): Promise<void> {
  const res = await fetch("http://localhost:5001/comments", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, parent_id }),
  });
  await res.json();
  // server will emit to all clients
}

export async function addReply(text: string, parentId: number): Promise<void> {
  await fetch("http://localhost:5001/comments", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, parent_id: parentId }),
  });
  // server will emit to all clients
}

export async function deleteComment(id: number): Promise<void> {
  await fetch(`http://localhost:5001/comments/${id}`, { method: "DELETE" });
}
