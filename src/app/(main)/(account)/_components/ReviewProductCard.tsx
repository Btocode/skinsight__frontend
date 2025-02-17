"use client";

import Image from "next/image";
import { ReviewProduct } from "../my-reviews/page";

const ReviewProductCard = ({ item }: { item: ReviewProduct }) => {
  return (
    <div
      className="w-[232px] h-[302px] p-5 flex flex-col gap-2.5 rounded-[13px] bg-white"
      style={{
        boxShadow: "0px 5.13px 33.34px 0px #2C2C2C17",
        border: "1px solid #EFEFEF",
      }}
    >
      {/* Product Image Container - Fixed height */}
      <div className="h-[140px] w-full flex items-center justify-center">
        <div className="relative h-[120px] w-[120px]">
          <Image
            src={item.productImage}
            alt={item.productTitle}
            fill
            className="object-contain"
          />
        </div>
      </div>

      {/* Product Info */}
      <div className="flex-1 text-center">
        <h3 className="text-lg font-medium text-[#575656] line-clamp-2">
          {item.productTitle}
        </h3>
      </div>

      {/* Reaction Buttons */}
      <div className="flex justify-center items-center gap-[16px] mt-auto">
        <button className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#E77CCF80] transition-colors text-xl">
          🥰
        </button>
        <button className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#E1E1E1] transition-colors text-xl">
          😔
        </button>
      </div>
    </div>
  );
};

export default ReviewProductCard;
