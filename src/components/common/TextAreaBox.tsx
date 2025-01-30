import { cn } from "@/lib/utils";
import { ComponentProps, forwardRef } from "react";

type TextAreaBoxProps = ComponentProps<"textarea"> & {
  label?: string;
  labelClassName?: string;
  containerClassName?: string;
  boxClassName?: string;
  error?: string;
  helperText?: string;
};

const TextAreaBox = forwardRef<HTMLTextAreaElement, TextAreaBoxProps>(
  (
    {
      label,
      labelClassName,
      containerClassName,
      error,
      helperText,
      disabled,
      boxClassName,
      ...props
    },
    ref
  ) => {
    return (
      <div className={cn("space-y-2", containerClassName)}>
        {label && (
          <label
            htmlFor={props.id}
            className={cn(
              "block text-sm font-medium",
              error ? "text-[#FF2D55]" : "text-gray-700",
              labelClassName
            )}
          >
            {label}
          </label>
        )}

        <div
          className={cn(
            "w-full rounded-xl relative",
            {
              "bg-[#8599FE26]": !error && !disabled,
              "bg-[#FF2D5521]": error,
              "opacity-50": disabled,
            },
            boxClassName
          )}
        >
          <textarea
            {...props}
            ref={ref}
            disabled={disabled}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={props.id ? `${props.id}-error` : undefined}
            className={cn(
              "w-full h-full px-4 py-4 bg-transparent text-xl rounded-xl",
              "focus:outline-none focus:ring-0 focus:border-0",
              "disabled:cursor-not-allowed placeholder-[#2C2C2C]/60",
              error
                ? "text-[#FF2D55] placeholder-[#FF2D55]"
                : "text-[#2C2C2C] placeholder-[#2C2C2C]/60",
              props.className
            )}
            style={{ outline: "none" }}
            rows={props.rows || 4}
          />
        </div>

        {(error || helperText) && (
          <p
            id={props.id ? `${props.id}-error` : undefined}
            className={cn(
              "text-sm",
              error ? "text-[#FF2D55]" : "text-gray-500"
            )}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

TextAreaBox.displayName = "TextAreaBox";

export default TextAreaBox;
