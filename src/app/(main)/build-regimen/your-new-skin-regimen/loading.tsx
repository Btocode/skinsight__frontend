import GradientImage from "@/components/common/GradientImage";
import { cn } from "@/lib/utils";

const Loading = () => {
  return (
    <div className="container py-10 relative space-y-4">
      <div className="space-y-4">
        <Skeleton className="w-[100px] h-[50px]" />
        <Skeleton className="w-[200px] h-[20px]" />
        <Skeleton className="w-[220px] h-[20px]" />
        <Skeleton className="w-[420px] h-[40px]" />

        <div className="max-w-[1420px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="w-full h-[450px]" />
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Skeleton className="w-[100px] h-[30px]" />
          <Skeleton className="w-[100px] h-[30px]" />
        </div>
      </div>

      <Skeleton className="w-full h-[100px]" />

      <GradientImage />
    </div>
  );
};

export default Loading;

function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "bg-gray-500 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 rounded-lg animate-pulse",
        className
      )}
    />
  );
}
