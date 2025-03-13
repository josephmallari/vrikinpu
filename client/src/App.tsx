import { useState, useEffect } from "react";
import Comments from "./components/Comments";
import { Comment } from "./types/types";
import CommentInput from "./components/CommentInput";
import { io } from "socket.io-client";
import { updateNestedComments, removeComment } from "./utils/commentTree";
import Header from "./components/Header";

export default function CommentApp() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [replyTo, setReplyTo] = useState<number | null>(null);

  useEffect(() => {
    async function fetchComments() {
      try {
        const res = await fetch("http://localhost:5001/comments");
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setComments(data);
      } catch (error) {
        console.error("Failed to fetch comments:", error);
      }
    }

    fetchComments();

    // socket setup
    const socket = io("http://localhost:5001");

    // sisten for updates
    socket.on("commentAdded", (newComment: Comment) => {
      setComments((prev) => updateNestedComments(prev, newComment));
    });

    socket.on("commentDeleted", (id: number) => {
      setComments((prev) => removeComment(prev, id));
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  async function handleAddComment(text: string) {
    try {
      const res = await fetch("http://localhost:5001/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, parent_id: replyTo }),
      });
      await res.json();
      // server will emit to all clients
    } catch (error) {
      console.error("Failed to add comment:", error);
    }
  }

  async function addReply(text: string, parentId: number) {
    try {
      await fetch("http://localhost:5001/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, parent_id: parentId }),
      });
      // server will emit to all clients
    } catch (error) {
      console.error("Failed to add reply:", error);
    }
  }

  async function deleteComment(id: number) {
    try {
      await fetch(`http://localhost:5001/comments/${id}`, { method: "DELETE" });
    } catch (error) {
      console.error("Failed to delete comment:", error);
    }
  }

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
