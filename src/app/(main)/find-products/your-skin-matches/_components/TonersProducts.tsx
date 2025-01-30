"use client";

import { Product } from "@/types/products";
import { MatchesProductCard } from "./MatchesProductCard";
import { useState, useRef, useEffect } from "react";

const TonersProducts = ({ products }: { products: Product[] }) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [duplicatedProducts, setDuplicatedProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Duplicate the products array three times for smooth infinite scroll
    setDuplicatedProducts([...products, ...products, ...products]);
  }, [products]);

  const handleScroll = () => {
    if (sliderRef.current) {
      const container = sliderRef.current;
      // const cardWidth = container.firstElementChild?.clientWidth || 0;

      if (container.scrollLeft === 0) {
        container.scrollLeft = container.scrollWidth / 3;
      } else if (container.scrollLeft >= (container.scrollWidth * 2) / 3) {
        container.scrollLeft = container.scrollWidth / 3;
      }
    }
  };

  return (
    <section id="toners" className="mt-[27px] lg:mt-[46px]">
      <div className="flex items-center justify-between mb-[17px] lg:mb-[48px] px-4 lg:px-[40px]">
        <h4 className="text-base lg:text-2xl font-semibold leading-[19.04px] lg:leading-[26px] tracking-[-0.02em] lg:tracking-normal text-accent">
          Toners
        </h4>
      </div>

      <div className="px-4 lg:px-[40px]">
        <div
          ref={sliderRef}
          onScroll={handleScroll}
          className="flex overflow-x-scroll snap-x snap-mandatory gap-4 lg:gap-[40px] no-scrollbar"
        >
          {duplicatedProducts.map((item, index) => (
            <div
              key={index}
              className="flex-none w-[85%] md:w-[calc(33.33%-27px)] snap-center"
            >
              <MatchesProductCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TonersProducts;
