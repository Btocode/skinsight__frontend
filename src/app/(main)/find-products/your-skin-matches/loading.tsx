import { cn } from "@/lib/utils";
import Image from "next/image";

export default function SkeletonLoader() {
  return (
    <div className="w-full container py-10 space-y-10 relative">
      <div className="lg:flex justify-between items-center space-y-2">
        <div className="space-y-4">
          <Skeleton className="w-[100px] h-[30px]" />
          <Skeleton className="w-[500px] h-[50px]" />
          <Skeleton className="w-[450px] h-[40px]" />
        </div>
        <Skeleton className="w-[100px] h-[40px]" />
      </div>

      <Skeleton className="w-[100px] h-[40px] ml-10" />

      {/* Three square skeletons */}
      <div className="max-w-[1420px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="w-full h-[450px]" />
        ))}
      </div>

      <Image
        src={"/gradient1.png"}
        alt="gradient1"
        width={550}
        height={420}
        className="absolute -left-[250px] -top-20 lg:top-10 -z-10"
      />
      <Image
        src={"/gradient2.png"}
        alt="gradient1"
        width={800}
        height={475}
        className="absolute top-[700px] lg:top-[520px] -right-20 lg:right-64 -z-10"
      />
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
