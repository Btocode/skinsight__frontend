/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import BackButton from "@/components/common/BackButton";
import Button from "@/components/common/Button";
import { Combobox, Option } from "@/components/common/Combobox";
import HeadingPrimary from "@/components/common/HeadingPrimary";
import Modal from "@/components/common/Modal";
import { useAppDispatch } from "@/lib/redux/hook";
import {
  useGetProductsBrandsQuery,
  useGetProductsByBrandQuery,
} from "@/lib/services/productApi";
import { updatePersonalRegimen } from "@/redux/slices/regimenSlice";
import Image from "next/image";
import { useState } from "react";

const categories = [
  { value: "1", label: "treat" },
  { value: "2", label: "moisturize" },
  { value: "3", label: "protect" },
  { value: "4", label: "cleanse" },
  { value: "5", label: "exfoliate" },
  { value: "6", label: "serum" },
  { value: "7", label: "mask" },
  { value: "8", label: "toner" },
];

const titles = {
  cleanser: "Add a cleanser",
  spf: "Add a SPF",
  moisturiser: "Add a moisturiser",
  "missing-something": "Missing something?",
};

type SelectProductForSkinRegimenProps = {
  regimenType: string;
  onClose: () => void;
};

const SelectProductForSkinRegimen = ({
  regimenType,
  onClose,
}: SelectProductForSkinRegimenProps) => {
  const [selectedProduct, setSelectedProduct] = useState<{
    brandId: string;
    productId: string;
    productImage: string;
    categoryId?: string;
  } | null>(null);
  const dispatch = useAppDispatch();
  const open = Boolean(regimenType);

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
      <div className="w-[368px] lg:w-[690px]  flex items-center justify-center gap-[25px] lg:px-[25px] lg:py-[36px]">
        <div className="w-full flex flex-col gap-[28px] p-5 lg:p-0">
          <div className="lg:space-y-3">
            <BackButton buttonProps={{ className: "self-start" }} />
            <HeadingPrimary className="text-xl lg:text-[38px] font-semibold leading-[23.8px] lg:leading-[45.22px] tracking-[-0.02em] ">
              {titles[regimenType as keyof typeof titles] ??
                "Select a product you currently use"}
            </HeadingPrimary>
            <p className="hidden lg:block text-base font-medium leading-[24px] tracking-[-0.03em] text-accent">
              {regimenType === "missing-something"
                ? "Add a category and then add the product you are looking for"
                : `Select a ${regimenType} you already use in your regimen or one you
              wish to choose`}
            </p>
            <div className="flex lg:hidden w-[136.5px] mx-auto h-[168px] border border-dashed border-primary items-center justify-center rounded-xl">
              {selectedProduct &&
              selectedProduct?.productImage !== null &&
              selectedProduct?.productImage !== "" ? (
                <Image
                  src={selectedProduct.productImage}
                  width={136}
                  height={168}
                  alt="product"
                  className="p-2"
                />
              ) : null}
            </div>
          </div>
          {regimenType === "missing-something" && (
            <Combobox
              options={categories as Option[]}
              value={categories.find(
                (b) => b.value === selectedProduct?.categoryId
              )}
              onChange={(value) => {
                setSelectedProduct({
                  categoryId: value.value,
                  brandId: "",
                  productId: "",
                  productImage: "",
                });
              }}
              placeholder="Select category"
              className="max-w-full "
              buttonClassName="border-0"
              valueClassName="text-xl font-normal leading-[26px] text-accent"
            />
          )}
          <Combobox
            options={
              brandsData?.map((item) => ({ label: item, value: item })) ?? []
            }
            disabled={isLoadingBrands}
            value={getBrandValue(selectedProduct?.brandId || "")}
            onChange={(value) => {
              setSelectedProduct((prev) => ({
                ...prev,
                brandId: value.value,
                productId: "",
                productImage: "",
              }));
            }}
            placeholder="Select brand"
            className="max-w-full "
            buttonClassName="border-0"
            valueClassName="text-xl font-normal leading-[26px] text-accent"
          />
          <Combobox
            options={
              productsData?.map((item) => ({
                label: item?.product_name,
                value: item?.product_id,
              })) ?? []
            }
            disabled={isLoadingProducts || !selectedProduct?.brandId}
            value={getProductValue(selectedProduct?.productId || "")}
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
                if (selectedProduct) {
                  dispatch(
                    updatePersonalRegimen({
                      type: regimenType,
                      regimen: {
                        brandId: selectedProduct.brandId,
                        productId: selectedProduct.productId,
                        productImage: selectedProduct.productImage,
                      },
                    })
                  );
                  onClose();
                }
              }}
              className="w-[126px] h-[60px] rounded-xl text-xl font-medium leading-[26px]"
            >
              Next
            </Button>
            <Button
              onClick={() => {
                setSelectedProduct(null);
                onClose();
              }}
              className="w-[126px] h-[60px] border rounded-xl text-xl font-medium leading-[26px]"
              variant="outline"
            >
              Cancel
            </Button>
          </div>
        </div>
        <div className="hidden px-4 w-[280px] h-[250px] border border-dashed border-primary lg:flex items-center justify-center rounded-xl">
          {selectedProduct &&
          selectedProduct?.productImage !== null &&
          selectedProduct?.productImage !== "" ? (
            <Image
              src={selectedProduct.productImage}
              alt="product"
              width={200}
              height={260}
              className="p-2"
            />
          ) : null}
        </div>
      </div>
    </Modal>
  );
};

export default SelectProductForSkinRegimen;
