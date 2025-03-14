import TextInput from "./TextInput";

interface CommentInputProps {
  addComment: (text: string) => void;
}

// input for top level comments
export default function CommentInput({ addComment }: CommentInputProps) {
  return (
    <div>
      <p className="pt-4 max-w-2xl">
        We are building software for ambitious and efficient heating companies to bring climate-neutral heating to the
        broad masses of the population. We support both newly founded companies as well as highly scalable companies
      </p>
      <div className="my-8">
        <TextInput onSubmit={addComment} placeholder="Add a comment..." rows={4} />
      </div>
    </div>
  );
}
