import { useState, useEffect } from "react";
import Comments from "./components/Comments";
import { Comment } from "./types";
import CommentInput from "./components/CommentInput";
import { io } from "socket.io-client";
import { updateNestedComments, removeComment } from "./utils/commentTree";
import Header from "./components/Header";

export default function CommentApp() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [replyTo, setReplyTo] = useState<number | null>(null);

  console.log(comments);

  // gets all comments on mount
  useEffect(() => {
    async function fetchComments() {
      try {
        const res = await fetch("http://localhost:5001/comments");
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setComments(data);
      } catch (error) {
        console.error("Failed to fetch comments:", error);
      }
    }

    fetchComments();

    const socket = io("http://localhost:5001");

    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  /**
   * Creates a new comment or reply
   * Sends POST request to server and updates local state
   */
  async function handleAddComment(text: string) {
    const res = await fetch("http://localhost:5001/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, parent_id: replyTo }),
    });

    const newComment = await res.json();
    setComments((prev) => updateNestedComments(prev, newComment));
    setReplyTo(null);
  }

  /**
   * Creates a new reply
   * Sends POST request to server and updates local state
   */
  async function addReply(text: string, parentId: number) {
    const res = await fetch("http://localhost:5001/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, parent_id: parentId }),
    });

    const newComment = await res.json();
    setComments((prev) => updateNestedComments(prev, newComment));
  }

  /**
   * Deletes a comment by ID
   * Sends DELETE request to server and updates local state
   * @param id - ID of the comment to delete
   */
  async function deleteComment(id: number) {
    await fetch(`http://localhost:5001/comments/${id}`, { method: "DELETE" });
    setComments((prev) => removeComment(prev, id));
  }

  /**
   * Sets the ID of the comment being replied to
   * @param id - ID of the parent comment or null for top-level comment
   */
  function handleSetReplyTo(id: number | null) {
    setReplyTo(id);
  }

  return (
    <div className="p-8">
      <Header />
      <CommentInput addComment={handleAddComment} />
      <Comments comments={comments} setReplyTo={handleSetReplyTo} deleteComment={deleteComment} addReply={addReply} />
    </div>
  );
}
