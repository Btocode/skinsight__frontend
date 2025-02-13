import { cn } from "@/lib/utils";

const Skeleton = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "bg-[#fa9bf6] bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 rounded-lg animate-pulse",
        className
      )}
    />
  );
};

export default Skeleton;
