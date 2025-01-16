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

  const onGenderChange = async (item: Gender) => {
    dispatch(setProductState({ key: "gender", value: item }));
    // push it after 1 second
    setTimeout(() => {
      router.push("/find-products/skin-type");
    }, 1000);
  };

  return (
    <div className="w-full grid grid-cols-2 md:grid-cols-3 mt-[32px] lg:mt-0 gap-5">
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
