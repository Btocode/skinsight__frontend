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
        className
      )}
      onClick={onClick}
    >
      <span
        className={cn(
          "absolute top-4 left-4 inline-block w-8 h-8 rounded-full bg-[#FDFDFF]",
          circleClassName,
          {
            "bg-green-400": checked,
          }
        )}
      ></span>
      <div
        className={cn(
          "absolute bottom-4 left-4 inline-block text-xl font-semibold",
          contentClassName
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default Card;
