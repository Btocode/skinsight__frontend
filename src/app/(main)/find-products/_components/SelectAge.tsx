"use client";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hook";
import { useRouter } from "next/navigation";
import { setProductState } from "@/redux/slices/productSlice";
import { ages } from "@/utils/products";
import Card from "./Card";

const SelectAge = () => {
  const dispatch = useAppDispatch();
  const age = useAppSelector((state) => state.product.age);
  const router = useRouter();

  const onSkinConcernChange = async (item: string) => {
    dispatch(setProductState({ key: "age", value: item }));
    await new Promise((resolve) => setTimeout(resolve, 1000));

    router.push("/find-products/region");
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 mt-[32px] lg:mt-0 gap-5">
      {ages.map((item, index) => (
        <Card
          key={index}
          onClick={onSkinConcernChange.bind(
            null,
            Array.isArray(item) ? item.join(" ") : item
          )}
          checked={age === item}
          contentClassName="pr-4 lg:pr-0"
        >
          {Array.isArray(item) ? (
            <>
              <h3 className="text-xl font-semibold">{item[0]}</h3>
              <h3 className="text-xl font-semibold">{item[1]}</h3>
            </>
          ) : (
            <h3 className="text-xl font-semibold">{item}</h3>
          )}
        </Card>
      ))}
    </div>
  );
};

export default SelectAge;
