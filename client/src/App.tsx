import { useState, useEffect } from "react";
import Comments from "./components/Comments";
import { Comment } from "./types";
import CommentInput from "./components/CommentInput";
import { io } from "socket.io-client";

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
        // Handle error appropriately (e.g., show error message to user)
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
   * Recursively updates the comments tree with a new comment
   * @param comments - Current array of comments
   * @param newComment - New comment to be inserted
   * @returns Updated array of comments with the new comment in correct position
   */
  function updateNestedComments(comments: Comment[], newComment: Comment): Comment[] {
    if (!newComment.parent_id) return [...comments, newComment];

    return comments.map((c) => {
      if (c.id === newComment.parent_id) {
        return { ...c, replies: [...c.replies, newComment] };
      }
      return { ...c, replies: updateNestedComments(c.replies, newComment) };
    });
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
   * Recursively removes a comment from the comments tree
   * @param comments - Current array of comments
   * @param id - ID of the comment to remove
   * @returns Updated array of comments with the specified comment removed
   */
  function removeComment(comments: Comment[], id: number): Comment[] {
    return comments.filter((c) => c.id !== id).map((c) => ({ ...c, replies: removeComment(c.replies, id) }));
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
      <CommentInput addComment={handleAddComment} />
      <Comments comments={comments} setReplyTo={handleSetReplyTo} deleteComment={deleteComment} addReply={addReply} />
    </div>
  );
}
