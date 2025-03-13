import { useState, useEffect } from "react";
import Comments from "./components/Comments";
import { Comment } from "./types/types";
import CommentInput from "./components/CommentInput";
import { io } from "socket.io-client";
import { updateNestedComments, removeComment } from "./utils/commentTree";
import Header from "./components/Header";
import { fetchComments, handleAddComment, addReply, deleteComment } from "./utils/api.ts"; // Import the API functions

export default function CommentApp() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [replyTo, setReplyTo] = useState<number | null>(null);

  useEffect(() => {
    async function loadComments() {
      try {
        const data = await fetchComments();
        setComments(data);
      } catch (error) {
        console.error("Failed to fetch comments:", error);
      }
    }

    loadComments();

    // socket setup
    const socket = io("http://localhost:5001");
    // listen for updates
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

  function handleSetReplyTo(id: number | null) {
    setReplyTo(id);
  }

  return (
    <div className="p-8">
      <Header />
      <CommentInput addComment={(text) => handleAddComment(text, replyTo)} />
      <Comments comments={comments} setReplyTo={handleSetReplyTo} deleteComment={deleteComment} addReply={addReply} />
    </div>
  );
}
