import { notFound } from "next/navigation";
import MatchesProductFilter from "./_components/MatchesProductFilter";
import MatchesProductHeader from "./_components/MatchesProductHeader";
import TonersProducts from "./_components/TonersProducts";
import CleansersProducts from "./_components/CleansersProducts";
import MoisturisersProducts from "./_components/MoisturisersProducts";
import Image from "next/image";
import Advertisement from "@/components/common/Advertisement";

const getProducts = async () => {
  const response = await fetch("http://localhost:3000/api/your-skin-matches");
  return response.json();
};

const YourSkinMatchesPage = async () => {
  const products = await getProducts();

  if (products?.length === 0) {
    notFound();
  }

  return (
    <div className="container py-10 relative">
      <MatchesProductHeader />
      <div className="flex items-center justify-between mt-[56px]">
        <h4 className="text-2xl font-semibold leading-[26px] text-accent">
          Top products for you
        </h4>
        <MatchesProductFilter />
      </div>
      <TonersProducts products={products[1]} />
      <CleansersProducts products={products[0]} />
      <Advertisement />
      <MoisturisersProducts products={products[2]} />
      <Advertisement />
      <Image
        src={"/gradient1.png"}
        alt="gradient1"
        width={550}
        height={440}
        className="fixed top-40 left-0 -z-10"
      />
      <Image
        src={"/gradient2.png"}
        alt="gradient1"
        width={800}
        height={475}
        className="fixed -bottom-40 -right-40 -z-10"
      />
    </div>
  );
};

export default YourSkinMatchesPage;
