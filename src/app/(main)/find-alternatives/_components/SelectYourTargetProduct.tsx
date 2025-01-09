"use client";
import { Combobox } from "@/components/common/Combobox";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hook";
import { setFindAlternatives } from "@/redux/slices/productSlice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const brands = [
  { label: "Brand 1", value: "brand1" },
  { label: "Brand 2", value: "brand2" },
  { label: "Brand 3", value: "brand3" },
];

const products = [
  { label: "Product 1", value: "Product1" },
  { label: "Product 2", value: "Product2" },
  { label: "Product 3", value: "Product3" },
];

const SelectYourTargetProduct = () => {
  const state = useAppSelector((state) => state.product.findAlternatives);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const getBrandValue = (_brand: string) => {
    return brands.find((brand) => brand.value === _brand);
  };

  const getProductValue = (_product: string) => {
    return products.find((product) => product.value === _product);
  };

  useEffect(() => {
    if (!state.brand || !state.product) return;

    router.push("/find-alternatives/top-alternatives-for-you");
  }, [router, state]);

  return (
    <div className="space-y-6">
      <Combobox
        options={[
          { label: "Brand 1", value: "brand1" },
          { label: "Brand 2", value: "brand2" },
          { label: "Brand 3", value: "brand3" },
        ]}
        placeholder="Select brand"
        value={getBrandValue(state.brand)}
        onChange={(brand) => {
          dispatch(setFindAlternatives({ key: "brand", value: brand.value }));
        }}
      />
      <Combobox
        options={[
          { label: "Product 1", value: "Product1" },
          { label: "Product 2", value: "Product2" },
          { label: "Product 3", value: "Product3" },
        ]}
        placeholder="Select product"
        value={getProductValue(state.product)}
        onChange={(product) => {
          dispatch(
            setFindAlternatives({ key: "product", value: product.value })
          );
        }}
      />
    </div>
  );
};

export default SelectYourTargetProduct;
