import { cn } from "@/lib/utils";
import Image from "next/image";

const Skeleton = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "relative rounded-lg opacity-10 overflow-hidden",
        className
      )}
    >
      <Image
        src="/skeleton.gif"
        alt="skeleton gif"
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
};

export default Skeleton;
