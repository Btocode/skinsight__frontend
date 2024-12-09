const loading = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse bg-gradient-to-t from-blue-200 to-purple-100 h-72 w-full rounded"
        ></div>
      ))}
    </div>
  );
};

export default loading;
