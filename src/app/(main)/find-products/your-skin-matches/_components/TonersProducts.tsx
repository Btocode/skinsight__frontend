"use client";

import { Product } from "@/types/products";
import { MatchesProductCard } from "./MatchesProductCard";
import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const TonersProducts = ({ products }: { products: Product[] }) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [duplicatedProducts, setDuplicatedProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Duplicate the products array three times for smooth infinite scroll
    setDuplicatedProducts([...products, ...products, ...products]);
  }, [products]);


  useEffect(() => {
    if (sliderRef.current) {
      // Set the initial scroll position to the middle of the duplicated content
      const container = sliderRef.current;
      container.scrollLeft = container.scrollWidth / 3;
    }
  }, [duplicatedProducts]); // Run this effect once duplicated products are set

  const handleScroll = () => {
    if (sliderRef.current) {
      const container = sliderRef.current;
      if (container.scrollLeft === 0) {
        container.scrollLeft = container.scrollWidth / 3;
      } else if (container.scrollLeft >= (container.scrollWidth * 2) / 3) {
        container.scrollLeft = container.scrollWidth / 3;
      }
    }
  };

  const slide = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const container = sliderRef.current;
      const cardWidth = container.firstElementChild?.clientWidth || 0;
      const scrollAmount = cardWidth + 20; // Adjust for gap between cards

      if (direction === "left") {
        container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  return (
    <section id="toners" className="mt-[27px] lg:mt-[46px] relative">
      <div className="flex items-center justify-between mb-[17px] lg:mb-[48px] px-4 lg:px-[40px]">
        <h4 className="text-base lg:text-2xl font-semibold leading-[19.04px] lg:leading-[26px] tracking-[-0.02em] lg:tracking-normal text-accent">
          Toners
        </h4>
      </div>

      <div className="px-4 lg:px-[40px] relative">
        <button
          onClick={() => slide("left")}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white shadow-md p-2 rounded-full z-10"
        >
          <ChevronLeft size={24} />
        </button>

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

        <button
          onClick={() => slide("right")}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white shadow-md p-2 rounded-full z-10"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </section>
  );
};

export default TonersProducts;
