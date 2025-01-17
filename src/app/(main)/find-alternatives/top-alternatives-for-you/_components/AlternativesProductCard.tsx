import Image from "next/image";
import Tag from "@/components/common/Tag";
import { FindAlternativesProduct } from "@/types/alternatives";

export function AlternativesProductCard({
  item,
}: {
  item: FindAlternativesProduct;
}) {
  return (
    <div className="lg:w-[340px] lg:h-[397px] rounded-xl bg-white p-[6.69px] lg:p-5 shadow-[0px_5.13px_33.34px_0px_#2C2C2C17] border border-[#EFEFEF]">
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          {item?.matched && <Tag variant="matched">99% matched</Tag>}
          {item?.best_rated && <Tag variant="best_rated">Best rated</Tag>}

          {(!item?.best_rated || !item?.popular || !item?.matched) && (
            <div className="h-[20.08px] lg:h-[30px]" />
          )}
        </div>
        {/* Product Image */}
        <div className="w-[100px] lg:w-[300px] h-[100px] lg:h-[204px] relative mx-auto">
          <Image
            src={item.productImage}
            alt={item.productTitle}
            fill
            className="h-full w-full object-contain"
          />
        </div>
        {/* Product Info */}
        <div className="w-full space-y-[2px]">
          <h2 className="text-xs lg:text-[11.54px] font-normal leading-[18px] lg:leading-[17.31px] tracking-[-0.03em] text-[#575656]">
            {item.brand}
          </h2>
          <h3 className="text-[15px] lg:text-[15.39px] leading-[22.5px] lg:leading-[23.08px] tracking-[-0.03em] font-semibold text-[#575656] truncate">
            {item.productTitle}
          </h3>
          <p className="text-[11.54px] leading-[17.31px] font-normal tracking-[-0.03em] text-[#80E8DE]">
            ${item.price}
          </p>
        </div>
        {/* Buttons */}
        <div className="flex w-full gap-4 mt-1">
          <button
            id="add-favorite"
            type="button"
            className="w-[47.8px] lg:w-[141px] h-[45.89px] lg:h-[48px] flex items-center justify-center gap-[10px] rounded-[11.47px] lg:rounded-[12px] bg-[#8F80E833] transition-colors"
          >
            <svg
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
              className=""
            >
              <path
                d="M6.5 7.2002V16.6854C6.5 18.0464 6.5 18.7268 6.70412 19.1433C7.08245 19.9151 7.91157 20.3588 8.76367 20.2454C9.2234 20.1842 9.78964 19.8067 10.9221 19.0518L10.9248 19.0499C11.3737 18.7507 11.5981 18.6011 11.833 18.5181C12.2642 18.3656 12.7348 18.3656 13.166 18.5181C13.4013 18.6012 13.6266 18.7515 14.0773 19.0519C15.2098 19.8069 15.7767 20.1841 16.2364 20.2452C17.0885 20.3586 17.9176 19.9151 18.2959 19.1433C18.5 18.7269 18.5 18.0462 18.5 16.6854V7.19691C18.5 6.07899 18.5 5.5192 18.2822 5.0918C18.0905 4.71547 17.7837 4.40973 17.4074 4.21799C16.9796 4 16.4203 4 15.3002 4H9.7002C8.58009 4 8.01962 4 7.5918 4.21799C7.21547 4.40973 6.90973 4.71547 6.71799 5.0918C6.5 5.51962 6.5 6.08009 6.5 7.2002Z"
                stroke="#8F80E8"
                strokeWidth={2}
              />
            </svg>
            <span className="hidden lg:inline-block text-sm font-medium leading-[21px] tracking-[-0.03em] text-[#8F80E8]">
              Save for later
            </span>
          </button>
          <button
            type="button"
            id="buy-now"
            className="w-[107.08px] lg:w-[141px] h-[45.89px] lg:h-[48px] flex items-center justify-center gap-[10px] rounded-[9.56px] lg:rounded-[12px] bg-[#EDAFDF4D] transition-colors"
          >
            <svg width="25" height="24" viewBox="0 0 25 24" fill="none">
              <path
                d="M9.5 8C9.5 9.65685 10.8431 11 12.5 11C14.1569 11 15.5 9.65685 15.5 8M3.5 16.8002V7.2002C3.5 6.08009 3.5 5.51962 3.71799 5.0918C3.90973 4.71547 4.21547 4.40973 4.5918 4.21799C5.01962 4 5.58009 4 6.7002 4H18.3002C19.4203 4 19.9796 4 20.4074 4.21799C20.7837 4.40973 21.0905 4.71547 21.2822 5.0918C21.5 5.5192 21.5 6.07899 21.5 7.19691V16.8036C21.5 17.9215 21.5 18.4805 21.2822 18.9079C21.0905 19.2842 20.7837 19.5905 20.4074 19.7822C19.98 20 19.421 20 18.3031 20H6.69691C5.57899 20 5.0192 20 4.5918 19.7822C4.21547 19.5905 3.90973 19.2842 3.71799 18.9079C3.5 18.4801 3.5 17.9203 3.5 16.8002Z"
                stroke="#E77CCF"
                strokeWidth={2}
              />
            </svg>
            <span className="text-[13.38px] lg:text-sm font-medium leading-[20.08px] lg:leading-[21px] tracking-[-0.03em] text-[#E77CCF]">
              Buy now
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
