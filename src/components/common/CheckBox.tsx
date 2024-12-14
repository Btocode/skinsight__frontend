import React, { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type CheckboxProps = ComponentProps<"input"> & {
  label?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked,
  onChange,
  className,
  ...props
}) => {
  return (
    <label className={cn("flex items-center cursor-pointer", className)}>
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          {...props}
        />
        <div
          className={cn(
            "w-6 h-6 border-2 rounded-md transition-all duration-200 ease-in-out",
            checked ? "bg-primary border-primary" : "bg-white border-gray-300"
          )}
        />
        {checked && (
          <svg
            className="absolute top-1 left-1 text-white w-4 h-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </div>
      {label && <span className="ml-3 text-accent">{label}</span>}
    </label>
  );
};

export default Checkbox;
