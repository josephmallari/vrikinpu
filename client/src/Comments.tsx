import { Comment } from "./types";
import { useState } from "react";
import "./Comments.css";

interface CommentsProps {
  comments: Comment[];
  setReplyTo: (id: number) => void;
  deleteComment: (id: number) => void;
  addReply: (text: string, parentId: number) => void;
}

export default function Comments({ comments, setReplyTo, deleteComment, addReply }: CommentsProps) {
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyText, setReplyText] = useState<string>("");

  return (
    <ul className="comment-list">
      {comments.map((c) => (
        <li key={c.id}>
          <div className="comment-container">
            <div className="comment-content">
              <p className="comment-text">{c.text}</p>
              <div className="comment-actions">
                <button onClick={() => setReplyingTo(replyingTo === c.id ? null : c.id)}>Reply</button>
                <button onClick={() => deleteComment(c.id)}>Delete</button>
              </div>
              {replyingTo === c.id && (
                <div className="reply-form">
                  <input
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Write a reply..."
                  />
                  <button
                    onClick={() => {
                      addReply(replyText, c.id);
                      setReplyText("");
                      setReplyingTo(null);
                    }}
                  >
                    Reply
                  </button>
                </div>
              )}
              {c.replies.length > 0 && (
                <Comments
                  comments={c.replies}
                  setReplyTo={setReplyTo}
                  deleteComment={deleteComment}
                  addReply={addReply}
                />
              )}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
