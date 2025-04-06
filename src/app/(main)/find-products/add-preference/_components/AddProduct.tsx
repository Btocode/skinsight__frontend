/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import BackButton from "@/components/common/BackButton";
import Button from "@/components/common/Button";
import { Combobox } from "@/components/common/Combobox";
import HeadingPrimary from "@/components/common/HeadingPrimary";
import Modal from "@/components/common/Modal";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hook";
import {
  useGetProductsBrandsQuery,
  useGetProductsByBrandQuery,
} from "@/lib/services/productApi";
import { cn } from "@/lib/utils";
import { setPreference } from "@/redux/slices/productSlice";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

type AddProductProps = {
  open: boolean;
  onClose: () => void;
};

const AddProduct = ({ open, onClose }: AddProductProps) => {
  const [selectedProduct, setSelectedProduct] = useState<{
    brandId: string;
    productId: string;
    productImage: string;
    reaction: string;
  } | null>(null);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const preferences = useAppSelector((state) => state.product.preferences);

  const { isLoading: isLoadingBrands, data: brandsData } =
    useGetProductsBrandsQuery(undefined);
  const { isLoading: isLoadingProducts, data: productsData } =
    useGetProductsByBrandQuery(
      {
        brand_name: selectedProduct?.brandId || "",
      },
      {
        skip: !selectedProduct?.brandId,
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

  return (
    <Modal
      isOpen={open}
      onClose={onClose}
      isCloseIconVisible={false}
      contentClassName="p-0 lg:p-0"
    >
      <div className=" max-w-[690px] flex items-center justify-center gap-[25px] lg:px-[25px] lg:py-[36px]">
        <div className="w-[368px] lg:w-[416px] flex flex-col gap-[28px] p-5 lg:p-0">
          <BackButton
            onClick={onClose}
            buttonProps={{ className: "self-start lg:-mb-[18px]" }}
          />
          <div className="flex items-center gap-4">
            {preferences.length > 0 &&
              preferences.map((preference) => {
                const selectedPreference = productsData?.find(
                  (product) => product?.product_id === preference.productId
                );
                return (
                  <div
                    key={preference.id}
                    className="w-[51.19px] h-[63.41px] border-[0.58px] bg-[#E1E1E1] rounded-[6.98px] relative"
                  >
                    <Image
                      src={
                        preference?.productImage ||
                        "/product-placeholder-image.png"
                      }
                      alt={selectedPreference?.product_name || "Product"}
                      fill
                      priority
                    />
                    <div
                      className={cn(
                        "w-[27.96px] h-[26.96px] rounded-[6.98px] flex items-center justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
                        {
                          "bg-[#E77CCF75]": preference?.reaction === "like",
                          "bg-[#e1e1e194]": preference?.reaction === "dislike",
                        }
                      )}
                    >
                      {preference?.reaction === "like" ? "🥰" : "😔"}
                    </div>
                  </div>
                );
              })}
          </div>
          <HeadingPrimary className="text-[20px] leading-[23.8px] lg:text-[38px] font-semibold lg:leading-[45.22px] tracking-[-0.02em] -mb-2">
            Select a product you currently use
          </HeadingPrimary>
          <div className="lg:hidden">
            <div className="flex  w-[136.5px] mx-auto h-[168px] border border-dashed border-primary items-center justify-center rounded-xl">
              {selectedProduct ? (
                <Image
                  src={
                    selectedProduct?.productImage ||
                    "/product-placeholder-image.png"
                  }
                  width={136}
                  height={168}
                  alt="product"
                  className="p-2"
                />
              ) : null}
            </div>
            {selectedProduct?.brandId && selectedProduct?.productId && (
              <div className="flex items-center justify-center gap-4 mt-[25px]">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedProduct((prev: any) => ({
                      ...prev,
                      reaction: "like",
                    }));
                  }}
                  className={cn(
                    "w-[48px] h-[46px] rounded-[12px] bg-[#EDAFDF4D]",
                    {
                      " bg-[#E77CCF80]": selectedProduct?.reaction === "like",
                    }
                  )}
                >
                  🥰
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedProduct((prev: any) => ({
                      ...prev,
                      reaction: "dislike",
                    }));
                  }}
                  className={cn(
                    "w-[48px] h-[46px] rounded-[12px] bg-[#e1e1e194] ",
                    {
                      "bg-[#E1E1E1]": selectedProduct?.reaction === "dislike",
                    }
                  )}
                >
                  😔
                </button>
              </div>
            )}
          </div>
          <Combobox
            options={
              brandsData?.map((item) => ({ label: item, value: item })) || []
            }
            value={getBrandValue(selectedProduct?.brandId || "")}
            disabled={isLoadingBrands}
            onChange={(value) => {
              setSelectedProduct((prev: any) => ({
                ...prev,
                brandId: value.value,
                productId: "",
                productImage: "",
              }));
            }}
            placeholder="Select brand"
            className="max-w-full"
            buttonClassName="border-0"
            valueClassName="text-xl font-normal leading-[26px] text-accent"
          />
          <Combobox
            options={
              productsData?.map((item) => ({
                label: item?.product_name,
                value: item?.product_id,
              })) || []
            }
            value={getProductValue(selectedProduct?.productId || "")}
            disabled={isLoadingProducts || !selectedProduct?.brandId}
            onChange={(value) => {
              const selectedProduct = productsData?.find(
                (product) => product?.product_id === value.value
              );
              if (!selectedProduct) return;

              setSelectedProduct((prev: any) => ({
                ...prev,
                productId: value.value,
                productImage: selectedProduct?.image_url ?? "",
              }));
            }}
            placeholder="Select product"
            className="max-w-full"
            buttonClassName="border-0"
            valueClassName="text-xl font-normal leading-[26px] text-accent"
          />
          <div className="flex items-center gap-4">
            <Button
              onClick={() => {
                dispatch(setPreference(selectedProduct));
                setSelectedProduct(null);
              }}
              disabled={preferences.length === 3 || !selectedProduct}
              className="w-auto h-[44px] lg:h-[60px] rounded-xl text-xl font-medium leading-[26px]"
            >
              Add another
            </Button>
            <Button
              onClick={() => {
                router.push("/find-products/your-skin-matches");
              }}
              className="w-[119px] lg:w-[126px] h-[44px] lg:h-[60px] border rounded-xl text-xl font-medium leading-[26px]"
              variant="outline"
            >
              Done
            </Button>
          </div>
        </div>
        <section className="hidden lg:block">
          <div className=" px-4 w-[182px] h-[224px] border border-dashed border-primary flex items-center justify-center rounded-xl">
            {selectedProduct ? (
              <Image
                src={
                  selectedProduct?.productImage ||
                  "/product-placeholder-image.png"
                }
                alt="product"
                width={200}
                height={260}
                className="p-2"
              />
            ) : null}
          </div>
          {selectedProduct?.brandId && selectedProduct?.productId && (
            <div className="flex items-center justify-center gap-4 mt-[25px]">
              <button
                type="button"
                onClick={() => {
                  setSelectedProduct((prev: any) => ({
                    ...prev,
                    reaction: "like",
                  }));
                }}
                className={cn(
                  "w-[48px] h-[46px] rounded-[12px] bg-[#EDAFDF4D]",
                  {
                    " bg-[#E77CCF80]": selectedProduct?.reaction === "like",
                  }
                )}
              >
                🥰
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedProduct((prev: any) => ({
                    ...prev,
                    reaction: "dislike",
                  }));
                }}
                className={cn(
                  "w-[48px] h-[46px] rounded-[12px] bg-[#e1e1e194] ",
                  {
                    "bg-[#E1E1E1]": selectedProduct?.reaction === "dislike",
                  }
                )}
              >
                😔
              </button>
            </div>
          )}
        </section>
      </div>
    </Modal>
  );
};

export default AddProduct;
