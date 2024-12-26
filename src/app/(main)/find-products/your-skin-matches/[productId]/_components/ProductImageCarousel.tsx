"use client";
import Button from "@/components/common/Button";
import Tag from "@/components/common/Tag";
import Image from "next/image";
import { useState } from "react";

const images = [
  "/products/product1.png",
  "/products/product2.png",
  "/products/product3.png",
];

const ProductImageCarousel = () => {
  const [index, setIndex] = useState(0);

  const onNext = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  const onPrev = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="w-full lg:mx-0 lg:w-[600px] bg-white border rounded-xl p-4 space-y-4">
      <div className="flex items-center gap-2">
        <Tag variant="matched">99% matched</Tag>
        <Tag variant="best_rated">Most loved by your skintwins</Tag>
      </div>

      <div className="flex justify-between items-center gap-4">
        <Button
          onClick={onPrev}
          variant={"icon"}
          size={"small"}
          className="rotate-90 p-0"
        >
          <svg
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 9.5L12 16.5L5 9.5"
              stroke="#2C2C2C"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Button>

        <div className="relative w-[300px] h-[320px] lg:h-[500px]">
          <Image
            src={images[index]}
            alt="product"
            fill
            className="object-cover rounded-xl"
          />
        </div>

        <Button
          onClick={onNext}
          variant={"icon"}
          size={"small"}
          className="-rotate-90 p-0"
        >
          <svg
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 9.5L12 16.5L5 9.5"
              stroke="#2C2C2C"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Button>
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
