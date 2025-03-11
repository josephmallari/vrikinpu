import { useState, useEffect } from "react";
import CommentList from "./CommentList";

/** Represents a comment with nested replies */
export interface Comment {
  id: number;
  text: string;
  parent_id: number | null;
  replies: Comment[];
}

export default function CommentApp() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [text, setText] = useState("");
  const [replyTo, setReplyTo] = useState<number | null>(null);

  console.log(comments);

  /** Fetches all comments from the server on component mount */
  useEffect(() => {
    fetch("http://localhost:5001/comments")
      .then((res) => res.json())
      .then(setComments);
  }, []);

  /**
   * Creates a new comment or reply
   * Sends POST request to server and updates local state
   */
  async function addComment() {
    const res = await fetch("http://localhost:5001/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, parent_id: replyTo }),
    });
    const newComment = await res.json();
    setComments((prev) => updateNestedComments(prev, newComment));
    setText("");
    setReplyTo(null);
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
    <div>
      <h2>Comments</h2>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={replyTo ? "Replying..." : "Write a comment..."}
      />
      <button onClick={addComment}>{replyTo ? "Reply" : "Add Comment"}</button>
      <CommentList comments={comments} setReplyTo={handleSetReplyTo} deleteComment={deleteComment} />
    </div>
  );
}
