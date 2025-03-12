import { Comment } from "./App";
import { useState } from "react";

interface CommentListProps {
  comments: Comment[];
  setReplyTo: (id: number) => void;
  deleteComment: (id: number) => void;
  addReply: (text: string, parentId: number) => void;
}

export default function CommentList({ comments, setReplyTo, deleteComment, addReply }: CommentListProps) {
  const [showReply, setShowReply] = useState<number | null>(null);
  const [replyText, setReplyText] = useState<string>("");

  return (
    <ul>
      {comments.map((c) => (
        <li key={c.id}>
          {c.text}
          <button onClick={() => setShowReply(c.id)}>↩️ Reply</button>
          <button onClick={() => deleteComment(c.id)}>❌ Delete</button>
          {showReply === c.id && (
            <div>
              <input value={replyText} onChange={(e) => setReplyText(e.target.value)} placeholder="Write a reply..." />
              <button
                onClick={() => {
                  addReply(replyText, c.id);
                  setReplyText("");
                  setShowReply(null);
                }}
              >
                Submit
              </button>
            </div>
          )}
          {c.replies.length > 0 && (
            <CommentList
              comments={c.replies}
              setReplyTo={setReplyTo}
              deleteComment={deleteComment}
              addReply={addReply}
            />
          )}
        </li>
      ))}
    </ul>
  );
}
