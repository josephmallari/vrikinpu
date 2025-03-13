import Header from "./Header";
import Button from "./Button";
import TextArea from "./TextArea";

interface CommentInputProps {
  addComment: () => void;
  text: string;
  setText: (text: string) => void;
}

export default function CommentInput({ addComment, text, setText }: CommentInputProps) {
  return (
    <>
      <Header />
      <div className="inputContainer my-8">
        <TextArea value={text} onChange={(e) => setText(e.target.value)} placeholder="Add a comment..." rows={4} />
        <div>
          <Button onClick={addComment}>Save</Button>
        </div>
      </div>
    </>
  );
}
