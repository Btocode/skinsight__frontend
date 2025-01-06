import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

type HeadingPrimaryProps = ComponentProps<"h2">;

const HeadingPrimary = ({ className, children }: HeadingPrimaryProps) => {
  return (
    <h2
      className={cn(
        "text-4xl lg:text-6xl lg:leading-[70px] font-semibold mb-4 bg-gradient-to-r from-blue-400 to-violet-400 text-transparent bg-clip-text",
        className
      )}
    >
      {children}
    </h2>
  );
};

export default HeadingPrimary;
