import Image from "next/image";
import { ReviewProduct } from "../my-reviews/page";

const ReviewProductCard = ({ item }: { item: ReviewProduct }) => {
  return (
    <div className="w-full rounded-xl bg-white p-6 shadow-[0px_5.13px_33.34px_0px_#2C2C2C17] border border-[#EFEFEF]">
      <div className="flex flex-col gap-6 h-72 items-center">
        {/* Product Image */}
        <div className="h-44 w-44 relative">
          <Image
            src={item.productImage}
            alt={item.productTitle}
            fill
            className="h-full w-full object-contain"
          />
        </div>

        {/* Product Info */}
        <div className="flex-1 text-center">
          <h3 className="text-lg font-medium text-accent">
            {item.productTitle}
          </h3>
        </div>

        {/* Buttons */}
        <div className="flex justify-center items-center w-full gap-4">
          <span className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#E77CCF80]">
            🥰
          </span>
          <span className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#E1E1E1]">
            😔
          </span>
        </div>
      </div>
    </div>
  );
};

export default ReviewProductCard;
