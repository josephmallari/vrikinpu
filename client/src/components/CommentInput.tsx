import Header from "./Header";
import TextArea from "./TextArea";

interface CommentInputProps {
  addComment: (text: string) => void;
}

export default function CommentInput({ addComment }: CommentInputProps) {
  return (
    <>
      <Header />
      <div className="inputContainer my-8">
        <TextArea onSubmit={addComment} placeholder="Add a comment..." rows={4} />
      </div>
    </>
  );
}
