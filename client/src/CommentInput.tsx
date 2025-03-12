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
          className="block mt-4 text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Save
        </button>
      </div>
    </>
  );
}
