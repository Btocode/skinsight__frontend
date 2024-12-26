import { Combobox } from "@/components/common/Combobox";
import HeadingPrimary from "@/components/common/HeadingPrimary";
import Image from "next/image";
import React from "react";
import TopAlternativesProducts from "./_components/TopAlternativesProducts";
import { notFound } from "next/navigation";
import Advertisement from "@/components/common/Advertisement";
import GradientImage from "@/components/common/GradientImage";

const getProducts = async () => {
  const response = await fetch("http://localhost:3000/api/find-alternatives");
  return await response.json();
};

const TopAlternativesForYouPage = async () => {
  const products = await getProducts();
  if (products?.length === 0) {
    notFound();
  }

  return (
    <section className="container py-10">
      <div className="flex flex-col lg:flex-row justify-between gap-4">
        <article className=" space-y-6">
          <p className="text-2xl font-semibold leading-[26px]">
            Find alternatives
          </p>
          <HeadingPrimary className="lg:text-[34px] leading-[34px]">
            Select your target product
          </HeadingPrimary>
          <Combobox
            options={[
              { label: "Brand 1", value: "brand1" },
              { label: "Brand 2", value: "brand2" },
              { label: "Brand 3", value: "brand3" },
            ]}
            placeholder="Select brand"
          />
          <Combobox
            options={[
              { label: "Product 1", value: "Product1" },
              { label: "Product 2", value: "Product2" },
              { label: "Product 3", value: "Product3" },
            ]}
            placeholder="Select product"
          />
        </article>
        <div className="relative w-[300px] h-[250px] mt-16 lg:mt-0">
          <Image
            src={"/find-alternatives/bannerimg.png"}
            alt="Find Products"
            fill
            priority
            sizes="(100vw, 100vh)"
            className="object-cover"
          />
        </div>
      </div>
      <div className="pt-10 space-y-6">
        <p className="text-2xl font-semibold leading-[26px]">
          Top alternatives for you
        </p>
        <TopAlternativesProducts products={products} />
      </div>
      <Advertisement />

      <GradientImage
        secondImage={{ url: "/gradient3.png", width: 400, height: 375 }}
      />
    </section>
  );
};

export default TopAlternativesForYouPage;
