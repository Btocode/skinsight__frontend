import Image from "next/image";
import { AlternativesProductCard } from "./AlternativesProductCard";
import AdImg from "../../../../../../public/ad.png";
import { FindAlternativesProduct } from "@/types/alternatives";

const TopAlternativesProducts = ({
  products,
}: {
  products: FindAlternativesProduct[];
}) => {
  return (
    <div className="lg:px-[43px] mt-[46px]">
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-x-[15px] lg:gap-x-[40px] gap-y-[16px] lg:gap-y-[70px]">
        {products?.map((item, index) => (
          <AlternativesProductCard key={index} item={item} />
        ))}
        <Image
          src={AdImg}
          alt="ad"
          className="w-[331px] h-[265px] lg:h-[397px] rounded-[13px] border-[1.08px] border-[#EFEFEF]"
        />
      </div>
    </div>
  );
};

export default TopAlternativesProducts;
