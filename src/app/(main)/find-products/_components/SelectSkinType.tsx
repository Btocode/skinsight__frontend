import { useAppDispatch, useAppSelector } from "@/lib/redux/hook";
import Card from "./Card";
import { useRouter } from "next/navigation";
import { skinTypes } from "@/utils/products";
import { setProductState } from "@/redux/slices/productSlice";

const SelectSkinType = () => {
  const dispatch = useAppDispatch();
  const skinType = useAppSelector((state) => state.product.skinType);
  const router = useRouter();

  const onSkinTypeChange = async (item: string) => {
    dispatch(setProductState({ key: "skinType", value: item }));
    // router.push("/find-products/complexion");
    setTimeout(() => {
      router.push("/find-products/complexion");
    }, 1000);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 mt-[32px] lg:mt-0 gap-5">
      {skinTypes.map((item, index) => (
        <Card
          key={index}
          onClick={onSkinTypeChange.bind(null, item)}
          checked={skinType === item}
        >
          <h3 className="text-xl font-semibold">{item}</h3>
        </Card>
      ))}
    </div>
  );
};

export default SelectSkinType;
