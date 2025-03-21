"use client";
import GradientImage from "@/components/common/GradientImage";
import HeadingPrimary from "@/components/common/HeadingPrimary";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hook";
import { cn } from "@/lib/utils";
import { setRegimenState } from "@/redux/slices/regimenSlice";
import { useRouter } from "next/navigation";

const ComfortableProductCount = () => {
  const productCount = useAppSelector((state) => state.regimen.productCount);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const onSelectProductCount = async (item: string) => {
    dispatch(setRegimenState({ productCount: item }));
    await new Promise((resolve) => setTimeout(resolve, 1000));
    router.push(`/build-regimen/using-products-selection`);
  };

  return (
    <div className="max-w-2xl w-full mt-3">
      <HeadingPrimary className="text-[38px] lg:text-[48px] leading-[45.22px] lg:leading-[57.12px] font-semibold tracking-[-0.02em]">
        How many products are you comfortable using{" "}
        <br className="hidden lg:block" /> in a regimen?
      </HeadingPrimary>
      <div className="grid grid-cols-2 md:grid-cols-3 mt-5 gap-5">
        {["3-4", "5-6", "7+"].map((i) => {
          const checked = productCount === i;
          return (
            <div
              onClick={onSelectProductCount.bind(null, i)}
              key={i}
              className={cn(
                "lg:w-[200px] h-[180px] rounded-xl bg-[#8599FE26] relative",
                { "bg-primary": checked }
              )}
            >
              <span
                className={cn(
                  "absolute top-4 left-4 flex justify-center items-center w-8 h-8 rounded-full bg-[#FDFDFF]",
                  {
                    "bg-transparent border-2": checked,
                  }
                )}
              >
                {checked && (
                  <svg
                    width="12"
                    height="9"
                    viewBox="0 0 12 9"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11 1L4.33333 7.75L1 4.375"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </span>
              <div
                className={cn(
                  "absolute bottom-4 left-4 inline-block text-xl font-semibold",
                  {
                    "text-white": checked,
                  }
                )}
              >
                {i}
              </div>
            </div>
          );
        })}
      </div>
      <GradientImage />
    </div>
  );
};

export default ComfortableProductCount;
