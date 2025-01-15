"use client";
import { cn } from "@/lib/utils";
import { setProductState } from "@/redux/slices/productSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hook";
import { useRouter } from "next/navigation";
import { skinConcerns } from "@/utils/products";
import Button from "@/components/common/Button";
import { useCallback } from "react";

const SelectSkinConcern = () => {
  const dispatch = useAppDispatch();
  const skinConcern = useAppSelector((state) => state.product.skinConcern);
  const router = useRouter();

  const onSkinConcernChange = (item: string) => {
    dispatch(setProductState({ key: "skinConcern", value: item }));
  };

  const isChecked = useCallback(
    (item: string) => {
      return skinConcern?.includes(item);
    },
    [skinConcern]
  );

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 mt-[32px] lg:mt-0 gap-5">
        {skinConcerns.map((item, index) => (
          <div
            key={index}
            className={cn(
              "w-full lg:w-[200px] h-[180px] rounded-xl bg-[#8599FE26] relative pt-[11px] px-[13px] pb-[13px]",
              {
                "bg-primary": isChecked(item.join(" & ")),
              }
            )}
            onClick={onSkinConcernChange.bind(null, item.join(" & "))}
          >
            <div
              className={cn(
                "w-6 h-6 flex items-center justify-center rounded-[3px] bg-[#FDFDFF]",
                {
                  "bg-white": skinConcern?.includes(item.join(" & ")),
                }
              )}
            >
              {/* generate custom checkbox */}
              {isChecked(item.join(" & ")) && (
                <svg
                  width="12"
                  height="9"
                  viewBox="0 0 12 9"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`${
                    skinConcern?.includes(item.join(" & "))
                      ? "stroke-primary"
                      : "stroke-current"
                  }`}
                >
                  <path
                    d="M11 1L4.33333 7.75L1 4.375"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>

            <div
              className={cn("mt-[80.5px]", {
                "text-white": isChecked(item.join(" & ")),
              })}
            >
              <h3 className="text-xl font-semibold">{item[0]} &</h3>
              <h3 className="text-xl font-semibold">{item[1]}</h3>
            </div>
          </div>
        ))}
      </div>
      <Button
        onClick={() => router.push("/find-products/age")}
        className="w-[126px] h-[60px] p-0 mt-4 lg:mt-0"
      >
        <span className="hidden lg:block text-xl font-medium leading-[26px]">
          Next
        </span>
        <span className="lg:hidden text-xl font-medium leading-[26px]">
          Let&apos;s go
        </span>
      </Button>
    </>
  );
};

export default SelectSkinConcern;
