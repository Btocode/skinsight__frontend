import { notFound } from "next/navigation";
import MatchesProductFilter from "./_components/MatchesProductFilter";
import MatchesProductHeader from "./_components/MatchesProductHeader";
import TonersProducts from "./_components/TonersProducts";
import CleansersProducts from "./_components/CleansersProducts";
import MoisturisersProducts from "./_components/MoisturisersProducts";
import Advertisement from "@/components/common/Advertisement";
import GradientImage from "@/components/common/GradientImage";
import AddFavorite from "./_components/AddFavorite";

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
        <MatchesProductFilter />
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
