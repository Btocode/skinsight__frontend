import { Product } from "@/types/products";
import { MatchesProductCard } from "./MatchesProductCard";

const TonersProducts = ({ products }: { products: Product[] }) => {
  return (
    <section id="toners" className="lg:container mt-[27px] lg:mt-[46px]">
      <div className="flex items-center justify-between lg:px-[40px] mb-[17px] lg:mb-[48px]">
        <h4 className="text-base lg:text-2xl font-semibold leading-[19.04px] lg:leading-[26px] tracking-[-0.02em] lg:tracking-normal text-accent">
          Toners
        </h4>
        <span className="inline-block text-4xl text-primary cursor-pointer">
          +
        </span>
      </div>
      <div className="lg:px-[43px] grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-[40px]">
        {products?.map((item, index) => (
          <MatchesProductCard key={index} item={item} />
        ))}
      </div>
    </section>
  );
};

export default TonersProducts;
