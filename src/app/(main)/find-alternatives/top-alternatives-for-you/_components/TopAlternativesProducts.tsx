import Image from "next/image";
import { AlternativesProductCard } from "./AlternativesProductCard";
import AdImg from "../../../../../../public/ad.png";

const TopAlternativesProducts = ({ products }) => {
  return (
    <div className="max-w-[1400px] mx-auto py-4 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-10">
        {products?.map((item, index) => (
          <AlternativesProductCard key={index} item={item} />
        ))}
        <Image src={AdImg} alt="ad" className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

export default TopAlternativesProducts;
