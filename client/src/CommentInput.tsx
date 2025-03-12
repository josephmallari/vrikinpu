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
      <div className="inputContainer my-8">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a comment..."
          rows={4}
          className="p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 max-w-1/3"
        />
        <button
          onClick={addComment}
          type="button"
          className="block focus:outline-none mt-4 text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
        >
          Save
        </button>
      </div>
    </>
  );
}
