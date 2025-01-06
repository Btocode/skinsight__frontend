"use client";
import { complexionOptions } from "@/utils/products";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hook";
import { useRouter } from "next/navigation";
import { setProductState } from "@/redux/slices/productSlice";
import { cn } from "@/lib/utils";

const SelectComplexion = () => {
  const dispatch = useAppDispatch();
  const complexion = useAppSelector((state) => state.product.complexion);
  const router = useRouter();

  const onComplexionChange = (item: string) => {
    dispatch(setProductState({ key: "complexion", value: item }));
    router.push("/find-products/skin-concern");
  };

  return (
    <>
      <div className="max-w-max grid grid-cols-2 md:grid-cols-3 gap-5">
        {complexionOptions.map((item, index) => (
          <div
            key={index}
            className={
              "w-full lg:w-[200px] h-[180px] rounded-xl bg-[#8599FE26] relative pt-[11px] px-[13px] pb-2"
            }
            onClick={onComplexionChange.bind(null, item.title)}
          >
            <div
              className={cn("w-6 h-6 rounded-full bg-[#FDFDFF]", {
                "bg-green-400": complexion === item.title,
              })}
            />

            <div className="space-y-0 mt-5">
              <span>{item.icon}</span>
              <h2 className="text-lg font-semibold leading-[26px]">
                {item.title}
              </h2>
              <p className="text-sm font-normal leading-[22px] ">
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
