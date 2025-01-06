import { cn } from "@/lib/utils";

type TagProps = {
  className?: string;
  circleClassName?: string;
  variant: "matched" | "best_rated" | "most_viewed" | "popular";
  children: React.ReactNode;
};

const Tag = ({ variant, children }: TagProps) => {
  return (
    <div
      className={cn(
        "flex items-center gap-4 bg-[#13DE9B1A] px-2 lg:px-4 py-2 lg:py-3 rounded-xl bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-60 text-green-500 relative",
        {
          "bg-[#13DE9B1A] text-green-500": variant === "matched",
          "bg-[#8599FE1A] text-purple-500": variant === "most_viewed",
          "bg-[#EDAFDF33] text-pink-500": variant === "best_rated",
          "bg-[#80ADE83D] text-[#80E8DE]": variant === "popular",
        }
      )}
    >
      <span
        className={cn("w-4 h-4  blur-sm rounded-full", {
          "bg-green-300": variant === "matched",
          "bg-purple-300": variant === "most_viewed",
          "bg-pink-300": variant === "best_rated",
          "bg-[#80E8DE]": variant === "popular",
        })}
      ></span>
      <span className="text-sm lg:text-base">{children}</span>
    </div>
  );
};

export default Tag;
