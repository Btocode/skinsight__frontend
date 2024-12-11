"use client";

import { cn } from "@/lib/utils";

type CardProps = {
  className?: string;
  children: React.ReactNode;
  circleClassName?: string;
};

const Card = ({ children, className, circleClassName }: CardProps) => {
  return (
    <div
      className={cn(
        "w-[200px] h-[180px] rounded-xl bg-[#8599FE26] relative",
        className
      )}
    >
      <span
        className={cn(
          "absolute top-4 left-4 inline-block w-8 h-8 rounded-full bg-[#FDFDFF]",
          circleClassName
        )}
      ></span>
      <div className="absolute bottom-4 left-4 inline-block text-xl font-semibold">
        {children}
      </div>
    </div>
  );
};

export default Card;
