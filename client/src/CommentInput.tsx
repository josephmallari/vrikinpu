import Header from "./Header";

interface TopLevelCommentsProps {
  addComment: () => void;
  text: string;
  setText: (text: string) => void;
}

export default function TopLevelComments({ addComment, text, setText }: TopLevelCommentsProps) {
  return (
    <>
      <Header />
      <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Add a comment..." />
      <button onClick={addComment}>Save</button>
    </>
  );
}
