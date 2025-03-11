import { Comment } from "./App";

interface CommentListProps {
  comments: Comment[];
  setReplyTo: (id: number) => void;
  deleteComment: (id: number) => void;
}

export default function CommentList({ comments, setReplyTo, deleteComment }: CommentListProps) {
  return (
    <ul>
      {comments.map((c) => (
        <li key={c.id}>
          {c.text}
          <button onClick={() => setReplyTo(c.id)}>↩️ Reply</button>
          <button onClick={() => deleteComment(c.id)}>❌ Delete</button>
          {c.replies.length > 0 && (
            <CommentList comments={c.replies} setReplyTo={setReplyTo} deleteComment={deleteComment} />
          )}
        </li>
      ))}
    </ul>
  );
}
