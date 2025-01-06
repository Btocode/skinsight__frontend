"use client";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hook";
import Card from "./Card";
import { setProductState } from "@/redux/slices/productSlice";
import { genders } from "@/utils/products";
import { useRouter } from "next/navigation";
import { Gender } from "@/types/products";

const SelectGender = () => {
  const dispatch = useAppDispatch();
  const gender = useAppSelector((state) => state.product.gender);
  const router = useRouter();

  const onGenderChange = (item: Gender) => {
    dispatch(setProductState({ key: "gender", value: item }));
    router.push("/find-products/skin-type");
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-x-4 lg:gap-y-8">
      {genders.map((item, index) => (
        <Card
          key={index}
          onClick={onGenderChange.bind(null, item)}
          checked={gender === item}
        >
          <h3 className="text-xl font-semibold">{item}</h3>
        </Card>
      ))}
    </div>
  );
};

export default SelectGender;
