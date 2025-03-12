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
      <div className="inputContainer">
        <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Add a comment..." rows={4} />
        <button style={{ display: "block" }} onClick={addComment}>
          Save
        </button>
      </div>
    </>
  );
}
