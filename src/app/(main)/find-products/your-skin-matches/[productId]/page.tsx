"use client";

import React, { useState } from "react";
import ProductImageCarousel from "./_components/ProductImageCarousel";
import ProductAccordion from "./_components/ProductAccordion";
import BackButton from "@/components/common/BackButton";
import Button from "@/components/common/Button";
import ProductGallery from "./_components/ProductGallery";
import { Accordion } from "@/components/common/Accordion";
import Image from "next/image";
import ProductTabs from "./_components/ProductTabs";
import Advertisement from "@/components/common/Advertisement";

const ProductDetails = () => {
  const [activeId, setActiveId] = useState("1");

  const handleToggle = (id: string) => {
    setActiveId(id === activeId ? "" : id);
  };

  return (
    <section className="container mt-4 lg:mt-[74px]">
      <div className="lg:flex items-center justify-between gap-4 mb-8">
        <div className="space-y-2">
          <BackButton />
          <p className="text-[15px] lg:text-xl font-medium leading-[17.85px] lg:leading-[23.8px] tracking-[-0.02em]">
            Glow Recipe
          </p>
          <h2 className="text-[28px] lg:text-[42px] font-semibold leading-[33.32px] lg:leading-[49.98px] tracking-[-0.02em]">
            Watermelon Glow PHA+BHA
          </h2>
          <p className="text-[15px] lg:text-xl font-medium leading-[17.85px] lg:leading-[26px] tracking-[-0.02em] lg:tracking-normal">
            Price{" "}
            <span className="text-xl lg:text-2xl font-semibold leading-[26px]">
              $$$
            </span>
          </p>
        </div>
        <div className="flex items-center gap-4 mt-4 lg:mt-0">
          <button
            type="button"
            className="w-[141px] h-[48px] rounded-xl bg-[#8F80E833] flex items-center justify-center"
          >
            <svg width="25" height="24" viewBox="0 0 25 24" fill="none">
              <path
                d="M6.5 7.2002V16.6854C6.5 18.0464 6.5 18.7268 6.70412 19.1433C7.08245 19.9151 7.91157 20.3588 8.76367 20.2454C9.2234 20.1842 9.78964 19.8067 10.9221 19.0518L10.9248 19.0499C11.3737 18.7507 11.5981 18.6011 11.833 18.5181C12.2642 18.3656 12.7348 18.3656 13.166 18.5181C13.4013 18.6012 13.6266 18.7515 14.0773 19.0519C15.2098 19.8069 15.7767 20.1841 16.2364 20.2452C17.0885 20.3586 17.9176 19.9151 18.2959 19.1433C18.5 18.7269 18.5 18.0462 18.5 16.6854V7.19691C18.5 6.07899 18.5 5.5192 18.2822 5.0918C18.0905 4.71547 17.7837 4.40973 17.4074 4.21799C16.9796 4 16.4203 4 15.3002 4H9.7002C8.58009 4 8.01962 4 7.5918 4.21799C7.21547 4.40973 6.90973 4.71547 6.71799 5.0918C6.5 5.51962 6.5 6.08009 6.5 7.2002Z"
                stroke="#8F80E8"
                strokeWidth={2}
              />
            </svg>

            <span className="text-sm font-medium leading-[21px] tracking-[-0.03em] text-[#8F80E8]">
              Save for later
            </span>
          </button>
          <Button
            icon={
              <svg
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.5 3H3.76835C4.24213 3 4.47943 3 4.67267 3.08548C4.84304 3.16084 4.98871 3.28218 5.09375 3.43604C5.21269 3.61026 5.25564 3.8429 5.34137 4.30727L7.50004 16L17.9218 16C18.375 16 18.6023 16 18.79 15.9199C18.9559 15.8492 19.0989 15.7346 19.2051 15.5889C19.3252 15.4242 19.3761 15.2037 19.4777 14.7631L19.4785 14.76L21.0477 7.95996L21.0481 7.95854C21.2023 7.29016 21.2796 6.95515 21.1947 6.69238C21.1202 6.46182 20.9635 6.26634 20.7556 6.14192C20.5184 6 20.1758 6 19.4887 6H6M18.5 21C17.9477 21 17.5 20.5523 17.5 20C17.5 19.4477 17.9477 19 18.5 19C19.0523 19 19.5 19.4477 19.5 20C19.5 20.5523 19.0523 21 18.5 21ZM8.5 21C7.94772 21 7.5 20.5523 7.5 20C7.5 19.4477 7.94772 19 8.5 19C9.05228 19 9.5 19.4477 9.5 20C9.5 20.5523 9.05228 21 8.5 21Z"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
            className="p-0 w-[141px] h-[48px] rounded-xl flex items-center justify-center"
          >
            <span className="text-sm font-medium leading-[21px] tracking-[-3%] text-white">
              Buy now
            </span>
          </Button>
        </div>
      </div>
      <div className="flex flex-col-reverse lg:flex-row justify-between mt-6 lg:mt-0 gap-4 lg:gap-8">
        <div className="mb-8 lg:mb-0">
          <ProductAccordion />
          <ProductGallery />
        </div>
        <ProductImageCarousel />
      </div>

      <br />
      <Accordion
        title="Tonners"
        onToggle={() => handleToggle("1")}
        content="Toners balance your skin's pH levels & help prep skin for optimal absorption of the rest of your skincare routine. Our toners are formulated to multi-task by treating skin with clinically effective actives, while also hydrating & balancing skin with gentle ingredients so you can treat your specific skin concerns without irritating skin or stripping it of moisture."
        isActive={activeId === "1"}
      />
      <div className="h-[160px]  mx-auto my-10 relative">
        <Image src={"/brand.png"} alt="brand" fill />
      </div>
      <ProductTabs />
      <Advertisement />
      {/* <GradientImage secondImage={{ className: "lg:-right-52" }} /> */}
    </section>
  );
};

export default ProductDetails;
