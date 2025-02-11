"use client";

import { Product } from "@/types/products";
import { MatchesProductCard } from "./MatchesProductCard";

const TonersProducts = ({ products }: { products: Product[] }) => {
  return (
    <section id="toners" className="mt-[27px] lg:mt-[46px]">
      <div className="flex items-center justify-between mb-[17px] lg:mb-[48px] px-4 lg:px-[40px]">
        <h4 className="text-base lg:text-2xl font-semibold leading-[19.04px] lg:leading-[26px] tracking-[-0.02em] lg:tracking-normal text-accent">
          Toners
        </h4>
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
