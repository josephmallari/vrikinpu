interface ActionButtonsProps {
  onReply: () => void;
  onDelete: () => void;
}

export default function ActionButtons({ onReply, onDelete }: ActionButtonsProps) {
  console.log("action button component");
  return (
    <div className="flex gap-2 my-1">
      <button
        onClick={onReply}
        className="bg-transparent border-none text-gray-500 text-sm px-2 py-1 
                 cursor-pointer hover:text-gray-900 hover:bg-gray-100 rounded"
      >
        Reply
      </button>
      <button
        onClick={onDelete}
        className="bg-transparent border-none text-gray-500 text-sm px-2 py-1 
                 cursor-pointer hover:text-gray-900 hover:bg-gray-100 rounded"
      >
        Delete
      </button>
    </div>
  );
}
