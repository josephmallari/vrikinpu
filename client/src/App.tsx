import { useState, useEffect } from "react";
import Comments from "./components/Comments";
import { Comment } from "./types/types";
import CommentInput from "./components/CommentInput";
import { io } from "socket.io-client";
import { updateNestedComments, removeComment } from "./utils/commentTree";
import Header from "./components/Header";
import { fetchComments } from "./utils/api.ts"; // import the API function

export default function CommentApp() {
  const [comments, setComments] = useState<Comment[]>([]);

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

  return (
    <div className="p-8">
      <Header />
      <CommentInput />
      <Comments comments={comments} />
    </div>
  );
}
