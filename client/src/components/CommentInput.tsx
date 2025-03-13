import TextArea from "./TextArea";

interface CommentInputProps {
  addComment: (text: string) => void;
}

export default function CommentInput({ addComment }: CommentInputProps) {
  return (
    <>
      <p className="pt-4 max-w-1/2">
        We are building software for ambitious and efficient heating companies to bring climate-neutral heating to the
        broad masses of the population. We support both newly founded companies as well as highly scalable companies
      </p>
      <div className="inputContainer my-8">
        <TextArea onSubmit={addComment} placeholder="Add a comment..." rows={4} />
      </div>
    </>
  );
}
