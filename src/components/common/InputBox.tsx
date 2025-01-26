"use client";

import { cn } from "@/lib/utils";
import React, { useState, forwardRef } from "react";

interface InputBoxProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label?: string;
  labelClassName?: string;
  containerClassName?: string;
  boxClassName?: string;
  error?: string;
  helperText?: string;
  type?: "text" | "textarea" | "password";
  rows?: number;
}

export const InputBox = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputBoxProps>(
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
    const [type, setType] = useState(props.type || "text");

    const togglePasswordVisibility = () => {
      setType(type === "password" ? "text" : "password");
    };

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
          {type === "textarea" ? (
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
          ) : (
            <input
              {...props}
              ref={ref}
              type={type}
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
                { "pr-12": props.type === "password" },
                props.className
              )}
              style={{ outline: "none" }}
            />
          )}

          {props.type === "password" && (
            <button
              type="button"
              className={cn(
                "absolute top-1/2 right-4 transform -translate-y-1/2",
                "focus:outline-none",
                { "cursor-not-allowed": disabled }
              )}
              onClick={togglePasswordVisibility}
              disabled={disabled}
              aria-label={
                type === "password" ? "Show password" : "Hide password"
              }
            >
              {type === "password" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={error ? "#FF2D55" : "#2C2C2C80"}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={error ? "#FF2D55" : "#2C2C2C80"}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" />
                  <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" />
                  <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" />
                  <path d="m2 2 20 20" />
                </svg>
              )}
            </button>
          )}
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

InputBox.displayName = "InputBox";
