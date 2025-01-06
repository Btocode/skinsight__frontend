"use client";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hook";
import { useRouter } from "next/navigation";
import { setProductState } from "@/redux/slices/productSlice";
import { cn } from "@/lib/utils";
import { ages } from "@/utils/products";

const SelectAge = () => {
  const dispatch = useAppDispatch();
  const age = useAppSelector((state) => state.product.age);
  const router = useRouter();

  const onSkinConcernChange = (item: string) => {
    dispatch(setProductState({ key: "age", value: item }));
    router.push("/find-products/region");
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
      {ages.map((item, index) => (
        <div
          key={index}
          className={
            "w-full lg:w-[200px] h-[180px] rounded-xl bg-[#8599FE26] relative pt-[11px] px-[13px] pb-[13px]"
          }
          onClick={onSkinConcernChange.bind(
            null,
            Array.isArray(item) ? item.join(" ") : item
          )}
        >
          <div
            className={cn("w-6 h-6 rounded-full bg-[#FDFDFF]", {
              "bg-green-400": Array.isArray(item)
                ? item.join(" ") === age
                : item === age,
            })}
          />
          <div className="absolute bottom-3 left-4">
            {Array.isArray(item) ? (
              <>
                <h3 className="text-xl font-semibold">{item[0]}</h3>
                <h3 className="text-xl font-semibold">{item[1]}</h3>
              </>
            ) : (
              <h3 className="text-xl font-semibold">{item}</h3>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SelectAge;
