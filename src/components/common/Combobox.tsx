"use client";

import { cn } from "@/lib/utils";
import { useCallback, useEffect, useRef, useState } from "react";

export interface Option {
  value: string;
  label: string;
}

export interface ComboboxProps {
  options: Option[];
  value?: Option;
  onChange?: (value: Option) => void;
  placeholder?: string;
  className?: string;
  buttonClassName?: string;
  valueClassName?: string;
}

export function Combobox({
  options,
  value,
  onChange,
  placeholder = "Select...",
  className,
  buttonClassName,
  valueClassName,
}: ComboboxProps) {
  const [open, setOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const listRef = useRef<HTMLUListElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          if (!open) {
            setOpen(true);
          }
          setHighlightedIndex((prev) =>
            prev < options.length - 1 ? prev + 1 : prev
          );
          break;
        case "ArrowUp":
          event.preventDefault();
          if (!open) {
            setOpen(true);
          }
          setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : prev));
          break;
        case "Enter":
          event.preventDefault();
          if (open && highlightedIndex !== -1) {
            onChange?.(options[highlightedIndex]);
            setOpen(false);
            setHighlightedIndex(-1);
          } else {
            setOpen(true);
          }
          break;
        case "Escape":
          event.preventDefault();
          setOpen(false);
          setHighlightedIndex(-1);
          break;
        case "Tab":
          if (open) {
            setOpen(false);
            setHighlightedIndex(-1);
          }
          break;
      }
    },
    [open, highlightedIndex, options, onChange]
  );

  useEffect(() => {
    if (open && listRef.current && highlightedIndex !== -1) {
      const element = listRef.current.children[highlightedIndex] as HTMLElement;
      element.scrollIntoView({ block: "nearest" });
    }
  }, [highlightedIndex, open]);

  // useEffect(() => {
  //   if (!open) {
  //     buttonRef.current?.focus();
  //   }
  // }, [open]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
        setHighlightedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div
      className={cn("relative w-full max-w-[540px]", className)}
      ref={containerRef}
    >
      <button
        ref={buttonRef}
        onClick={() => setOpen(!open)}
        onKeyDown={handleKeyDown}
        className={cn(
          "flex h-[60px] w-full items-center justify-between rounded-md border border-input bg-[#8599FE26] px-3 py-3 text-sm ring-offset-[#8599FE26] placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50",
          open && "ring-1 ring-ring ring-offset-1",
          buttonClassName
        )}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={open ? "dropdown-list" : undefined}
        type="button"
      >
        <span className={cn("truncate text-lg", valueClassName)}>
          {value ? value.label : placeholder}
        </span>
        <div
          className={cn(
            "ml-2 h-4 w-4 shrink-0 opacity-50 transition-transform duration-200",
            open && "rotate-180"
          )}
        >
          <svg
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 9.5L12 16.5L5 9.5"
              stroke="#2C2C2C"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </button>
      {open && (
        <ul
          ref={listRef}
          className="absolute z-50 mt-2 max-h-60 w-full overflow-auto rounded-md border bg-white text-popover-foreground shadow-md"
          role="listbox"
          id="dropdown-list"
          tabIndex={-1}
        >
          {options.map((option, index) => (
            <li
              key={option.value}
              className={cn(
                "relative flex cursor-default select-none items-center rounded-sm px-2 py-3 text-base outline-none transition-colors",
                index === highlightedIndex &&
                  "bg-[#EDF0FF] text-accent-foreground",
                value?.value === option.value && "font-medium text-primary"
              )}
              role="option"
              aria-selected={value?.value === option.value}
              onClick={() => {
                onChange?.(option);
                setOpen(false);
                setHighlightedIndex(-1);
              }}
              onMouseEnter={() => setHighlightedIndex(index)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
