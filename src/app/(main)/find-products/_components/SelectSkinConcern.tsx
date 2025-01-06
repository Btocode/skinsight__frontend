"use client";
import { cn } from "@/lib/utils";
import { setProductState } from "@/redux/slices/productSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hook";
import { useRouter } from "next/navigation";
import { skinConcerns } from "@/utils/products";
import Button from "@/components/common/Button";

const SelectSkinConcern = () => {
  const dispatch = useAppDispatch();
  const skinConcern = useAppSelector((state) => state.product.skinConcern);
  const router = useRouter();

  const onSkinConcernChange = (item: string) => {
    dispatch(setProductState({ key: "skinConcern", value: item }));
  };

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-x-4 lg:gap-y-8">
        {skinConcerns.map((item, index) => (
          <div
            key={index}
            className={
              "w-full lg:w-[200px] h-[180px] rounded-xl bg-[#8599FE26] relative pt-[11px] px-[13px] pb-[13px]"
            }
            onClick={onSkinConcernChange.bind(null, item.join(" & "))}
          >
            <div
              className={cn("w-6 h-6 rounded-[3px] bg-[#FDFDFF]", {
                "bg-green-400": skinConcern?.includes(item.join(" & ")),
              })}
            >
              {/* generate custom checkbox */}
              {skinConcern.includes(item.join(" & ")) && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`${
                    skinConcern?.includes(item.join(" & "))
                      ? "stroke-gray-50"
                      : "stroke-current"
                  }`}
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              )}
            </div>

            <div className="mt-[80.5px]">
              <h3 className="text-xl font-semibold">{item[0]} &</h3>
              <h3 className="text-xl font-semibold">{item[1]}</h3>
            </div>
          </div>
        ))}
      </div>
      <Button
        onClick={() => router.push("/find-products/age")}
        className="px-8"
      >
        <span>Next</span>
      </Button>
    </>
  );
};

export default SelectSkinConcern;
