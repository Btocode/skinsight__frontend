import { notFound } from "next/navigation";
import MatchesProductFilter from "./_components/MatchesProductFilter";
import MatchesProductHeader from "./_components/MatchesProductHeader";
import TonersProducts from "./_components/TonersProducts";
import CleansersProducts from "./_components/CleansersProducts";
import MoisturisersProducts from "./_components/MoisturisersProducts";
import Advertisement from "@/components/common/Advertisement";
import GradientImage from "@/components/common/GradientImage";
import AddFavorite from "./_components/AddFavorite";
import Button from "@/components/common/Button";
import Link from "next/link";

const getProducts = async () => {
  const response = await fetch("http://localhost:3000/api/your-skin-matches");
  return await response.json();
};

const YourSkinMatchesPage = async () => {
  const products = await getProducts();

  if (products?.length === 0) {
    notFound();
  }

  return (
    <div className="container relative mt-4 lg:mt-[40px]">
      <MatchesProductHeader />
      <div className="flex items-center justify-between mt-[30px] lg:mt-[54px]">
        <h4 className="text-base lg:text-2xl font-semibold leading-[19.04px] lg:leading-[26px] tracking-[-0.02em] lg:tracking-normal text-accent">
          Top products for you
        </h4>
        <div className="flex items-center gap-4">
          <MatchesProductFilter />
          <Link href={"/find-products/gender"}>
            <Button
              icon={
                <svg
                  width="17"
                  height="20"
                  viewBox="0 0 17 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.5 14H1.5V19M10.5 6H15.5V1M1.08301 7.0034C1.64369 5.61566 2.58244 4.41304 3.79255 3.53223C5.00266 2.65141 6.43686 2.12752 7.92975 2.02051C9.42265 1.9135 10.9147 2.2274 12.2381 2.92661C13.5615 3.62582 14.6612 4.68254 15.4141 5.97612M15.9176 12.9971C15.3569 14.3848 14.4181 15.5874 13.208 16.4682C11.9979 17.3491 10.5652 17.8723 9.07227 17.9793C7.57937 18.0863 6.08606 17.7725 4.7627 17.0732C3.43933 16.374 2.33882 15.3175 1.58594 14.0239"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="stroke-white"
                  />
                </svg>
              }
              className="h-[40px] px-4"
            >
              Retake
            </Button>
          </Link>
        </div>
      </div>
      <TonersProducts products={products[1]} />
      <CleansersProducts products={products[0]} />
      <Advertisement />
      <MoisturisersProducts products={products[2]} />
      <Advertisement />
      <GradientImage secondImage={{ className: "lg:-right-52" }} />
      <AddFavorite />
    </div>
  );
};

export default YourSkinMatchesPage;
