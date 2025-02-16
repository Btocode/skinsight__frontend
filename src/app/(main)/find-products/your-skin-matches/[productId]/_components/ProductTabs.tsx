"use client";

import { cn } from "@/lib/utils";
import { useCallback, useState } from "react";
import { MatchesProductCard } from "../../_components/MatchesProductCard";
import { Product } from "@/types/products";

const products: Product[] = [
  {
    productImage: "/find-alternatives/img1.png",
    productTitle: "Bio-lifting cream",
    brand: "CHANTECAILLE",
    price: "$$$",
    matched: true,
    most_viewed: true,
    best_rated: false,
  },
  {
    productImage: "/find-alternatives/img2.png",
    productTitle: "Intensive Age Defying Hydrating Cream",
    brand: "June Jacobs",
    price: "$$$",
    most_viewed: false,
    best_rated: true,
    matched: false,
  },
  {
    productImage: "/find-alternatives/img3.png",
    productTitle: "Collagenesis 24 hr Youth Preservation",
    brand: "SKINN",
    price: "$$$",
    most_viewed: false,
    best_rated: false,
    matched: false,
  },
];

const ProductTabs = () => {
  const [state, setState] = useState("1");
  const isSelected = useCallback(
    (activeTab: string) => activeTab === state,
    [state]
  );

  return (
    <div className="flex flex-col gap-10">
      <div className=" max-w-sm lg:max-w-2xl w-full mx-auto flex items-center justify-center">
        {[
          { id: "1", label: "Top alternatives" },
          { id: "2", label: "Build your regimen" },
        ].map((tab) => {
          return (
            <button
              type="button"
              onClick={() => setState(tab.id)}
              key={tab.id}
              className={cn(
                "inset-0 outline-none border-b w-full text-center relative py-4 px-1 text-xl font-medium tracking-tight transition-colors hover:text-gray-900",
                {
                  "text-gray-900 font-semibold": isSelected(tab.id),
                  "text-gray-500": !isSelected(tab.id),
                }
              )}
            >
              {tab.label}
              {isSelected(tab.id) && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              )}
            </button>
          );
        })}
      </div>
      <div className="max-w-[1420px] mx-auto grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
        {products?.map((item, index) => (
          <MatchesProductCard key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default ProductTabs;
