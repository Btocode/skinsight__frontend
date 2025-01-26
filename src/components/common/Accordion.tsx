"use client";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function Accordion({
  title,
  content,
  isActive,
  onToggle,
  titleClassName,
  contentClassName,
}: {
  title: string;
  content: string;
  isActive?: boolean;
  onToggle?: () => void;
  titleClassName?: string;
  contentClassName?: string;
}) {
  const [open, setOpen] = useState(false);

  // Determine if the accordion is open
  const isOpen = isActive ?? open;

  // Handle toggle logic
  const toggle = () => {
    if (onToggle) {
      onToggle();
    } else {
      setOpen(!open);
    }
  };

  return (
    <div className="w-full cursor-pointer" onClick={toggle}>
      <div className="text-left items-center py-3 select-none flex justify-between flex-row border-b-2 border-[#EFEFEF]">
        <h3
          className={cn(
            "flex-1 text-base lg:text-xl font-semibold leading-[24px] lg:leading-[30px] tracking-[-0.03em] text-accent",
            titleClassName
          )}
        >
          {title}
        </h3>
        <div
          className={cn(
            "mr-2 h-4 w-4 shrink-0 opacity-50 transition-transform duration-200",
            isOpen && "rotate-180"
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
      </div>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isActive ? "max-h-[1000px]" : "max-h-0"
        }`}
      >
        <div className="font-['DM_Sans'] text-[14px] font-normal leading-[18px] tracking-[-0.03em] text-[#575656] text-left py-4">
          {content}
        </div>
      </div>
    </div>
  );
}
