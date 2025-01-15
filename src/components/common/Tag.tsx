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
        "h-[20.08px] lg:h-[30px] rounded-[9.56px] lg:rounded-[10px] flex items-center justify-center px-2 gap-2",
        {
          "bg-[#13DE9B1A]": variant === "matched",
          "bg-[#8599FE1A]": variant === "most_viewed",
          "bg-[#EDAFDF33]": variant === "best_rated",
        }
      )}
    >
      <div
        className={cn("w-[7px] h-[7px] backdrop-filter blur-[4px] ", {
          "bg-[#13DE9B]": variant === "matched",
          "bg-[#8599FE]": variant === "most_viewed",
          "bg-[#FF9FC1]": variant === "best_rated",
        })}
      />
      <span
        className={cn(
          "text-[11.47px] lg:text-[13px] font-normal leading-[17.21px] lg:leading-[19.5px] tracking-[-0.03em]",
          {
            "text-[#13DE9B]": variant === "matched",
            "text-[#8599FE]": variant === "most_viewed",
            "text-[#FF9FC1]": variant === "best_rated",
          }
        )}
      >
        {children}
      </span>
    </div>
  );
};

export default Tag;
