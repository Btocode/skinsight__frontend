import React, { InputHTMLAttributes } from "react";

interface InputBoxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function InputBox({ label, ...props }: InputBoxProps) {
  return (
    <div className="space-y-2">
      {label && (
        <label
          htmlFor={props.id}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <input
        {...props}
        className="w-full px-4 py-4 rounded-xl bg-blue-50/80 border-0 focus:ring-2 focus:ring-blue-400 placeholder-gray-500"
      />
    </div>
  );
}
