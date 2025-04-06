"use client";
import { Combobox } from "@/components/common/Combobox";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hook";
import {
  useGetProductsBrandsQuery,
  useGetProductsByBrandQuery,
} from "@/lib/services/productApi";
import { setFindAlternatives } from "@/redux/slices/productSlice";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const SelectYourTargetProduct = () => {
  const state = useAppSelector((state) => state.product.findAlternatives);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { isLoading: isLoadingBrands, data: brandsData } =
    useGetProductsBrandsQuery(undefined);
  const { isLoading: isLoadingProducts, data: productsData } =
    useGetProductsByBrandQuery(
      {
        brand_name: state.brand,
      },
      {
        skip: !state.brand,
      }
    );

  const getBrandValue = (_brand: string) => {
    const data = brandsData?.find((brand) => brand === _brand);
    return data ? { label: data, value: data } : null;
  };

  const getProductValue = (_product: string) => {
    const data = productsData?.find(
      (product) => product?.product_id === _product
    );
    return data ? { label: data?.product_name, value: data?.product_id } : null;
  };

  useEffect(() => {
    if (!state.brand || !state.product) return;

    router.push("/find-alternatives/top-alternatives-for-you");
  }, [router, state]);

  console.log(productsData);

  return (
    <div className="space-y-6">
      <Combobox
        options={
          brandsData?.map((item) => ({ label: item, value: item })) || []
        }
        placeholder="Select brand"
        value={getBrandValue(state.brand)}
        onChange={(brand) => {
          dispatch(setFindAlternatives({ key: "brand", value: brand.value }));
        }}
        endIcon={
          isLoadingBrands ? <Loader className="animate-spin" /> : undefined
        }
      />
      <Combobox
        options={
          productsData?.map((item) => ({
            label: item?.product_name,
            value: item?.product_id,
          })) || []
        }
        placeholder="Select product"
        value={getProductValue(state.product)}
        onChange={(product) => {
          dispatch(
            setFindAlternatives({ key: "product", value: product.value })
          );
        }}
        endIcon={
          isLoadingProducts ? <Loader className="animate-spin" /> : undefined
        }
        disabled={!state.brand}
      />
    </div>
  );
};

export default SelectYourTargetProduct;
