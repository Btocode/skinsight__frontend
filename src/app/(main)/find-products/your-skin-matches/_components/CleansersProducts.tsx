import { MatchesProductCard } from "./MatchesProductCard";

const CleansersProducts = ({ products }) => {
  return (
    <section id="cleansers" className="max-w-[1420px] mx-auto py-4 space-y-4">
      <div className="flex items-center justify-between mt-[36px] mb-[48px]">
        <h4 className="text-2xl font-semibold text-accent">Cleansers</h4>
        <span className="inline-block text-4xl">+</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
        {products?.map((item, index) => (
          <MatchesProductCard key={index} item={item} />
        ))}
      </div>
    </section>
  );
};

export default CleansersProducts;