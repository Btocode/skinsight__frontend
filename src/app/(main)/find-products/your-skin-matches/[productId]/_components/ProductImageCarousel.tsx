"use client";

import Button from "@/components/common/Button";
import Tag from "@/components/common/Tag";
import Image from "next/image";
import { useState, useCallback } from "react";

const images = [
  "/products/product1.png",
  "/products/product2.png",
  "/products/product3.png",
];

const ProductImageCarousel = () => {
  const [index, setIndex] = useState(0);

  const onNext = useCallback(() => {
    setIndex((prev) => (prev + 1) % images.length);
  }, []);

  const onPrev = useCallback(() => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  }, []);

  return (
    <div className="w-full lg:mx-0 lg:w-[600px] bg-white border rounded-xl p-4 space-y-4">
      <div className="flex items-center gap-2">
        <Tag variant="matched">99% matched</Tag>
        <Tag variant="best_rated">Most loved by your skintwins</Tag>
      </div>

      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {images.map((src, i) => (
            <div key={i} className="w-full flex-shrink-0">
              <div className="relative mx-auto w-[300px] h-[320px] lg:h-[500px]">
                <Image
                  src={src}
                  alt={`product ${i + 1}`}
                  fill
                  className="object-cover rounded-xl"
                />
              </div>
            </div>
          ))}
        </div>

        <Button
          onClick={onPrev}
          variant="icon"
          size="small"
          className="absolute left-2 top-1/2 -translate-y-1/2 p-2"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="rotate-90"
          >
            <path
              d="M19 9L12 16L5 9"
              stroke="#2C2C2C"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Button>

        <Button
          onClick={onNext}
          variant="icon"
          size="small"
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="-rotate-90"
          >
            <path
              d="M19 9L12 16L5 9"
              stroke="#2C2C2C"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Button>
      </div>

      <div className="flex justify-center gap-2 mt-4">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-2 h-2 rounded-full transition-colors duration-200 ${
              i === index ? "bg-gray-800" : "bg-gray-300"
            }`}
          />
        ))}
      </div>

      <button
        type="button"
        className="flex px-6 py-4  items-center justify-center gap-2 rounded-xl font-medium bg-[#EDAFDF29] text-[#E77CCF]"
      >
        <svg
          width="25"
          height="24"
          viewBox="0 0 25 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.5 7.69334C10.5 2.9989 3.5 3.4989 3.5 9.49893C3.5 15.499 12.5 20.4991 12.5 20.4991C12.5 20.4991 21.5 15.499 21.5 9.49893C21.5 3.4989 14.5 2.9989 12.5 7.69334Z"
            stroke="#E77CCF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <span className="font-medium">Save for later</span>
      </button>
    </div>
  );
};

export default ProductImageCarousel;
