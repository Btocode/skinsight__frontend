"use client";
import GradientImage from "@/components/common/GradientImage";
import HeadingPrimary from "@/components/common/HeadingPrimary";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const ComfortableProductCount = () => {
  const router = useRouter();
  return (
    <div className="max-w-2xl w-full space-y-6">
      <HeadingPrimary className="lg:text-[50px] leading-[44px] lg:leading-[52px]">
        How many products are you comfortable using{" "}
        <br className="hidden lg:block" /> in a regimen?
      </HeadingPrimary>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-8">
        {["3-4", "5-6", "7+"].map((i) => {
          return (
            <div
              onClick={() =>
                router.push(`/build-regimen/using-products-selection`)
              }
              key={i}
              className={cn(
                "lg:w-[200px] h-[180px] rounded-xl bg-[#8599FE26] relative"
              )}
            >
              <span
                className={cn(
                  "absolute top-4 left-4 inline-block w-8 h-8 rounded-full bg-[#FDFDFF]"
                )}
              ></span>
              <div className="absolute bottom-4 left-4 inline-block text-xl font-semibold">
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
