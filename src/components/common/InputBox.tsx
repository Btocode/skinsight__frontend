import { cn } from "@/lib/utils";
import React, { InputHTMLAttributes } from "react";

interface InputBoxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  labelClassName?: string;
  containerClassName?: string;
}

export function InputBox({
  label,
  labelClassName,
  containerClassName,
  ...props
}: InputBoxProps) {
  return (
    <div className={cn("space-y-2", containerClassName)}>
      {label && (
        <label
          htmlFor={props.id}
          className={cn(
            "block text-sm font-medium text-gray-700",
            labelClassName
          )}
        >
          {label}
        </label>
      )}

      <input
        {...props}
        className={cn(
          "w-full px-4 py-4 rounded-xl text-xl bg-[#8599FE26] border-0 focus:ring-2 focus:ring-blue-400 placeholder-[#2C2C2C] text-[#2C2C2C]",
          props.className
        )}
      />
    </div>
  );
}
