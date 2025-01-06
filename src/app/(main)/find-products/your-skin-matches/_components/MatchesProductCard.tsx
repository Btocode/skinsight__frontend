"use client";
import Image from "next/image";
import AddFavorite from "./AddFavorite";
import Tag from "@/components/common/Tag";
import { useRouter } from "next/navigation";
import { useRef } from "react";
type ProductDetailsHandler = (
  e: React.MouseEvent<HTMLDivElement, MouseEvent>
) => void;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function MatchesProductCard({ item }: { item: any }) {
  const router = useRouter();
  const cardRef = useRef<HTMLDivElement>(null);
  const onProductDetails: ProductDetailsHandler = () => {
    router.push(`/find-products/your-skin-matches/${item.productTitle}`);
  };

  return (
    <div
      onClick={onProductDetails}
      ref={cardRef}
      className="w-full rounded-xl bg-white p-6 shadow-[0px_5.13px_33.34px_0px_#2C2C2C17] border border-[#EFEFEF]"
    >
      <div className="flex flex-col gap-6 h-[450px]">
        <div className="flex items-center gap-4">
          {item?.matched && <Tag variant="matched">99% matched</Tag>}
          {item?.best_rated && <Tag variant="best_rated">Best rated</Tag>}
          {item?.most_viewed && <Tag variant="most_viewed">Most reviewed</Tag>}
        </div>
        {/* Product Image */}
        <div className="h-60 w-48 relative mx-auto">
          <Image
            src={item.productImage}
            alt={item.productTitle}
            fill
            className="h-full w-full object-contain"
          />
        </div>

        {/* Product Info */}
        <div className="flex-1 w-full space-y-2">
          <h2 className="text-sm text-accent">{item.brandName}</h2>
          <h3 className="text-xl font-semibold text-accent">
            {item.productTitle}
          </h3>
          <p className="text-base text-cyan-500 font-medium">${item.price}</p>
        </div>

        {/* Buttons */}
        <div className="flex w-full gap-4">
          <AddFavorite />
          <button
            type="button"
            id="buy-now"
            className="flex flex-1 items-center justify-center gap-2 rounded-[10px] bg-pink-100 py-4 text-pink-600 transition-colors hover:bg-pink-200"
          >
            <svg width="25" height="24" viewBox="0 0 25 24" fill="none">
              <path
                d="M9.5 8C9.5 9.65685 10.8431 11 12.5 11C14.1569 11 15.5 9.65685 15.5 8M3.5 16.8002V7.2002C3.5 6.08009 3.5 5.51962 3.71799 5.0918C3.90973 4.71547 4.21547 4.40973 4.5918 4.21799C5.01962 4 5.58009 4 6.7002 4H18.3002C19.4203 4 19.9796 4 20.4074 4.21799C20.7837 4.40973 21.0905 4.71547 21.2822 5.0918C21.5 5.5192 21.5 6.07899 21.5 7.19691V16.8036C21.5 17.9215 21.5 18.4805 21.2822 18.9079C21.0905 19.2842 20.7837 19.5905 20.4074 19.7822C19.98 20 19.421 20 18.3031 20H6.69691C5.57899 20 5.0192 20 4.5918 19.7822C4.21547 19.5905 3.90973 19.2842 3.71799 18.9079C3.5 18.4801 3.5 17.9203 3.5 16.8002Z"
                stroke="currentColor"
                strokeWidth={2}
              />
            </svg>
            <span>Buy now</span>
          </button>
        </div>
      </div>
    </div>
  );
}
