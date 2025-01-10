"use client";
import { complexionOptions } from "@/utils/products";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hook";
import { useRouter } from "next/navigation";
import { setProductState } from "@/redux/slices/productSlice";
import { cn } from "@/lib/utils";
import { useCallback } from "react";

const SelectComplexion = () => {
  const dispatch = useAppDispatch();
  const complexion = useAppSelector((state) => state.product.complexion);
  const router = useRouter();

  const onComplexionChange = (item: string) => {
    dispatch(setProductState({ key: "complexion", value: item }));
    // push it after 1 second
    // router.push("/find-products/skin-concern");
    setTimeout(() => {
      router.push("/find-products/skin-concern");
    }, 1000);
  };

  const isChecked = useCallback(
    (item: string) => {
      return complexion === item;
    },
    [complexion]
  );

  return (
    <>
      <div className="max-w-max grid grid-cols-2 md:grid-cols-3 gap-5">
        {complexionOptions.map((item, index) => (
          <div
            key={index}
            className={cn(
              "w-full lg:w-[200px] lg:h-[180px] rounded-xl bg-[#8599FE26] relative pt-[11px] px-[13px] pb-2",
              {
                "bg-primary": isChecked(item.title),
              }
            )}
            onClick={onComplexionChange.bind(null, item.title)}
          >
            <div
              className={cn(
                "w-6 h-6 flex items-center justify-center rounded-full bg-[#FDFDFF]",
                {
                  "bg-transparent border-2": isChecked(item.title),
                }
              )}
            >
              {isChecked(item.title) && (
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
            </div>

            <div className="space-y-0 mt-5">
              <span>{item.icon}</span>
              <h2
                className={cn("text-lg font-semibold leading-[26px]", {
                  "text-white": isChecked(item.title),
                })}
              >
                {item.title}
              </h2>
              <p
                className={cn("text-sm font-normal leading-[22px] ", {
                  "text-white": isChecked(item.title),
                })}
              >
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default SelectComplexion;
