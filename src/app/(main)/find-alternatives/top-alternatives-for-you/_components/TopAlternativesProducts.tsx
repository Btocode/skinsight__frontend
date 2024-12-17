import { AlternativesProductCard } from "./AlternativesProductCard";

const TopAlternativesProducts = ({ products }) => {
  return (
    <div className="max-w-[1420px] mx-auto py-4 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
        {products?.map((item, index) => (
          <AlternativesProductCard key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default TopAlternativesProducts;
