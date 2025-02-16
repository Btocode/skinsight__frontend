import Skeleton from "@/components/common/Skeleton";

const Loading = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: 12 }).map((_, index) => (
        <Skeleton className="w-full h-[420px]" key={index} />
      ))}
    </div>
  );
};

export default Loading;
