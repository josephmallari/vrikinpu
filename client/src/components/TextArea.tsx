import React from "react";

interface TextAreaProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  rows?: number;
}

export default function TextArea({ value, onChange, placeholder = "Write a reply...", rows = 3 }: TextAreaProps) {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      className="w-full max-w-1/3 p-2 mb-2 border border-gray-200 rounded-md text-sm 
                focus:outline-none focus:ring-2 focus:ring-blue-500 
                resize-none"
    />
  );
}
