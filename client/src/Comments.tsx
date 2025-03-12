import { Comment } from "./types";
import { useState } from "react";

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
    <ul className="list-none p-0 m-0">
      {comments.map((c) => (
        <li key={c.id} className="my-4">
          <div className="flex gap-2">
            <div className="flex-1">
              <p className="text-gray-900 mb-2 leading-relaxed">{c.text}</p>
              <div className="flex gap-2 my-1">
                <button
                  onClick={() => setReplyingTo(replyingTo === c.id ? null : c.id)}
                  className="bg-transparent border-none text-gray-500 text-sm px-2 py-1 cursor-pointer hover:text-gray-900 hover:bg-gray-100 rounded"
                >
                  Reply
                </button>
                <button
                  onClick={() => deleteComment(c.id)}
                  className="bg-transparent border-none text-gray-500 text-sm px-2 py-1 cursor-pointer hover:text-gray-900 hover:bg-gray-100 rounded"
                >
                  Delete
                </button>
              </div>
              {replyingTo === c.id && (
                <div className="my-2 ml-6">
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Write a reply..."
                    rows={3}
                    className="w-full max-w-1/3 p-2 mb-2 border border-gray-200 rounded-md text-sm 
                             focus:outline-none focus:ring-2 focus:ring-blue-500 
                             resize-none"
                  />
                  <div className="reply-actions">
                    <button
                      onClick={() => {
                        addReply(replyText, c.id);
                        setReplyText("");
                        setReplyingTo(null);
                      }}
                      className="cursor-pointer inline-block text-white bg-gradient-to-br from-purple-600 
                             to-blue-500 hover:bg-gradient-to-bl focus:ring-4 
                             focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 
                             font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    >
                      Reply
                    </button>
                    <button
                      onClick={() => {
                        setReplyingTo(null);
                      }}
                      className="cursor-pointer inline-block text-white bg-gradient-to-br from-purple-600 
                             to-red-500 hover:bg-gradient-to-bl focus:ring-4 
                             focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 
                             font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
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
