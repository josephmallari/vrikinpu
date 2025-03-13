import { Comment } from "../types/types";
import { useState } from "react";
import TextInput from "./TextInput";
import ActionButtons from "./ActionButtons";

interface CommentsProps {
  comments: Comment[];
  setReplyTo: (id: number) => void;
  deleteComment: (id: number) => void;
  addReply: (text: string, parentId: number) => void;
}

export default function Comments({ comments, setReplyTo, deleteComment, addReply }: CommentsProps) {
  const [replyingTo, setReplyingTo] = useState<number | null>(null);

  console.log("comments component");

  return (
    <ul className="list-none p-0 m-0">
      {comments.map((c) => (
        <li key={c.id} className="my-4">
          <div className="flex gap-2">
            <div className="flex-1">
              <p className="text-gray-900 mb-2 leading-relaxed">{c.text}</p>
              <ActionButtons
                onReply={() => setReplyingTo(replyingTo === c.id ? null : c.id)}
                onDelete={() => deleteComment(c.id)}
              />

              {/* set reply to specific id/comment */}
              {replyingTo === c.id && (
                <div className="my-2 ml-6">
                  <TextInput
                    onSubmit={(text) => {
                      addReply(text, c.id);
                      setReplyingTo(null);
                    }}
                    onCancel={() => setReplyingTo(null)}
                    submitText="Reply"
                  />
                </div>
              )}

              {/* render if parent has children replies */}
              {c.replies.length > 0 && (
                <div className="ml-6 border-l-2 border-gray-200 pl-4">
                  <Comments
                    comments={c.replies}
                    setReplyTo={setReplyTo}
                    deleteComment={deleteComment}
                    addReply={addReply}
                  />
                </div>
              )}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
