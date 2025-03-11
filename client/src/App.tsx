import React, { useState, useEffect } from "react";

export default function CommentApp() {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  // Fetch comments on load
  useEffect(() => {
    fetch("http://localhost:5001/comments")
      .then((res) => res.json())
      .then(setComments);
  }, []);

  const addComment = async () => {
    const res = await fetch("http://localhost:5001/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    const newComment = await res.json();
    setComments([...comments, newComment]);
    setText("");
  };

  const deleteComment = async (id) => {
    await fetch(`http://localhost:5001/comments/${id}`, { method: "DELETE" });
    setComments(comments.filter((c) => c.id !== id));
  };

  return (
    <div>
      <h2>Comments</h2>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={addComment}>Add Comment</button>
      <ul>
        {comments.map((c) => (
          <li key={c.id}>
            {c.text} <button onClick={() => deleteComment(c.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
