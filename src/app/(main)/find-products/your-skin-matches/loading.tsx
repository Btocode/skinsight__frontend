import GradientImage from "@/components/common/GradientImage";
import Skeleton from "@/components/common/Skeleton";

export default function SkeletonLoader() {
  return (
    <div className="w-full container py-10 space-y-10 relative">
      <div className="lg:flex justify-between items-center space-y-2">
        <div className="space-y-4">
          <Skeleton className="w-[100px] h-[30px]" />
          <Skeleton className="w-9/12 lg:w-[500px] h-[50px]" />
          <Skeleton className="w-4/5 lg:w-[450px] h-[40px]" />
        </div>
        <Skeleton className="w-[100px] h-[40px]" />
      </div>

      <Skeleton className="w-[100px] h-[40px] ml-4 lg:ml-8" />

      {/* Three square skeletons */}
      <div className="lg:px-[43px] grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-[40px]">
        {[...Array(6)].map((_, i) => (
          <Skeleton
            key={i}
            className="w-full lg:w-[340px] h-[260px] lg:h-[410px]"
          />
        ))}
      </div>

      <GradientImage />
    </div>
  );
}
