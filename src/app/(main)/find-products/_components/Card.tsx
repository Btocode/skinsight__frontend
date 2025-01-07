"use client";

import { cn } from "@/lib/utils";

type CardProps = {
  className?: string;
  children: React.ReactNode;
  circleClassName?: string;
  contentClassName?: string;
  onClick?: () => void;
  checked?: boolean;
};

const Card = ({
  children,
  className,
  circleClassName,
  onClick,
  checked,
  contentClassName,
}: CardProps) => {
  return (
    <div
      className={cn(
        "w-full lg:w-[200px] h-[180px] rounded-xl bg-[#8599FE26] relative",
        className,
        { "bg-primary": checked }
      )}
      onClick={onClick}
    >
      <span
        className={cn(
          "absolute top-4 left-4 flex items-center justify-center w-8 h-8 rounded-full bg-[#FDFDFF]",
          circleClassName,
          {
            "bg-transparent border-2": checked,
          }
        )}
      >
        {checked && (
          <svg
            width="12"
            height="9"
            viewBox="0 0 12 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11 1L4.33333 7.75L1 4.375"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
      <div
        className={cn("absolute bottom-4 left-4", contentClassName, {
          "text-white": checked,
        })}
      >
        {children}
      </div>
    </div>
  );
};

export default Card;
