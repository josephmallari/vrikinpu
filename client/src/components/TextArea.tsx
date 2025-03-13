import React, { useState } from "react";
import Button from "./Button";

interface TextAreaProps {
  onSubmit: (text: string) => void;
  onCancel?: () => void;
  placeholder?: string;
  rows?: number;
  submitText?: string;
}

export default function TextArea({
  onSubmit,
  onCancel,
  placeholder = "Write a reply...",
  rows = 3,
  submitText = "Save",
}: TextAreaProps) {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (text.trim()) {
      onSubmit(text);
      setText("");
    }
  };

  return (
    <div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full max-w-1/3 p-2 mb-2 border border-gray-200 rounded-md text-sm 
                  focus:outline-none focus:ring-2 focus:ring-blue-500 
                  resize-none"
      />
      <div className="flex gap-2">
        <Button onClick={handleSubmit}>{submitText}</Button>
        {onCancel && (
          <Button onClick={onCancel} variant="danger">
            Cancel
          </Button>
        )}
      </div>
    </div>
  );
}
