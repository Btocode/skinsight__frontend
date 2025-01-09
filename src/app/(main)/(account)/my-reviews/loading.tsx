import Skeleton from "@/components/common/Skeleton";

const Loading = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <Skeleton className="w-full h-[320px]" key={index} />
      ))}
    </div>
  );
};

export default Loading;
