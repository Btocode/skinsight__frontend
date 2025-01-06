"use client";
import { cn } from "@/lib/utils";
import React, { InputHTMLAttributes, useState } from "react";

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
  const [type, setType] = useState(props.type || "text");

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

      <div className=" w-full rounded-xl  bg-[#8599FE26] focus:ring-2 focus:ring-blue-400 relative">
        <input
          {...props}
          type={type}
          className={cn(
            "w-full h-full px-4 py-4 bg-transparent text-xl border-0 placeholder-[#2C2C2C] text-[#2C2C2C]",
            props.className,
            {
              "pr-12": props.type === "password",
            }
          )}
        />

        {props.type === "password" && (
          <span
            className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
            onClick={() => {
              setType(type === "password" ? "text" : "password");
            }}
          >
            {type === "password" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
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
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" />
                <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" />
                <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" />
                <path d="m2 2 20 20" />
              </svg>
            )}
          </span>
        )}
      </div>
    </div>
  );
}
