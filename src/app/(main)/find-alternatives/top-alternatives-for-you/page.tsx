export const dynamic = 'force-dynamic';
export const generateStaticParams = () => [];

import HeadingPrimary from "@/components/common/HeadingPrimary";
import Image from "next/image";
import TopAlternativesProducts from "./_components/TopAlternativesProducts";
import { notFound } from "next/navigation";
import Advertisement from "@/components/common/Advertisement";
import GradientImage from "@/components/common/GradientImage";
import FindAlternativesBannerImg from "../../../../../public//find-alternatives/bannerimg.png";
import SelectYourTargetProduct from "../_components/SelectYourTargetProduct";
import { FindAlternativesProduct } from "@/types/alternatives";

const getProducts = async (): Promise<FindAlternativesProduct[]> => {
  const response = await fetch("http://localhost:3000/api/find-alternatives");
  return await response.json();
};

const TopAlternativesForYouPage = async () => {
  const products = await getProducts();
  if (products?.length === 0) {
    notFound();
  }

  return (
    <section className="container py-4 lg:py-[60px]">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
        <article className="">
          <p className="text-lg lg:text-2xl font-semibold leading-[26px] text-accent mb-2">
            Find alternatives
          </p>
          <HeadingPrimary className="text-[38px] lg:text-[38px] font-semibold leading-[45.22px] lg:leading-[45.22px] tracking-[-0.02em]">
            Select your target product
          </HeadingPrimary>
          <Image
            src={FindAlternativesBannerImg}
            alt="Find Products"
            width={247}
            height={240}
            className="lg:hidden mx-auto border-[1.17px] rounded-[15.27px] overflow-hidden border-[#EFEFEF] shadow-[0px_6.02px_39.14px_0px_#4848480A] my-5"
          />
          <SelectYourTargetProduct />
        </article>
        <div className="hidden lg:block relative w-[211.35px] h-[209px] border-[1.17px] rounded-[15.27px] overflow-hidden border-[#EFEFEF] shadow-[0px_6.02px_39.14px_0px_#4848480A] mt-16 lg:mt-0">
          <Image
            src={"/find-alternatives/bannerimg.png"}
            alt="Find Products"
            fill
            priority
            sizes="(100vw, 100vh), (min-width: 768px) 50vw, 33vw"
            className="object-contain"
          />
        </div>
      </div>
      <div className="pt-[35px]">
        <p className="text-2xl font-semibold leading-[26px] text-accent">
          Top alternatives for you
        </p>
        <TopAlternativesProducts products={products} />
      </div>
      <Advertisement className="hidden lg:flex" />

      <GradientImage
        secondImage={{ url: "/gradient3.png", width: 400, height: 375 }}
      />
    </section>
  );
};

export default TopAlternativesForYouPage;
