import { Comment } from "./types";
import { useState } from "react";
import "./Comments.css";

interface NestedCommentsProps {
  comments: Comment[];
  setReplyTo: (id: number) => void;
  deleteComment: (id: number) => void;
  addReply: (text: string, parentId: number) => void;
}

export default function NestedComments({ comments, setReplyTo, deleteComment, addReply }: NestedCommentsProps) {
  const [showReply, setShowReply] = useState<boolean>(false);
  const [replyText, setReplyText] = useState<string>("");

  return (
    <ul className="comment-list">
      {comments.map((c) => (
        <li key={c.id}>
          <div className="comment-container">
            <div className="comment-content">
              <p className="comment-text">{c.text}</p>
              <div className="comment-actions">
                <button onClick={() => setShowReply(!showReply)}>↩️ Reply</button>
                <button onClick={() => deleteComment(c.id)}>❌ Delete</button>
              </div>
              {showReply && (
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
                      setShowReply(false);
                    }}
                  >
                    Reply
                  </button>
                </div>
              )}
              {c.replies.length > 0 && (
                <NestedComments
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
