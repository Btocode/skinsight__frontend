import GradientImage from "@/components/common/GradientImage";
import { cn } from "@/lib/utils";

export default function SkeletonLoader() {
  return (
    <div className="w-full container py-10 space-y-10 relative">
      <div className="lg:flex justify-between items-center space-y-2">
        <div className="space-y-4">
          <Skeleton className="w-[100px] h-[30px]" />
          <Skeleton className="w-[500px] h-[50px]" />
          <Skeleton className="w-[450px] h-[40px]" />
        </div>
        <Skeleton className="w-[250px] h-[240px]" />
      </div>

      <Skeleton className="w-[100px] h-[40px] ml-10" />

      {/* Three square skeletons */}
      <div className="max-w-[1420px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="w-full h-[450px]" />
        ))}
      </div>

      <GradientImage />
    </div>
  );
}

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
