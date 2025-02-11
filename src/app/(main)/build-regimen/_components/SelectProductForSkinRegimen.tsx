"use client";
import BackButton from "@/components/common/BackButton";
import Button from "@/components/common/Button";
import { Combobox, Option } from "@/components/common/Combobox";
import HeadingPrimary from "@/components/common/HeadingPrimary";
import Modal from "@/components/common/Modal";
import { useAppDispatch } from "@/lib/redux/hook";
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

const brands = [
  { value: "1", label: "Sensibio" },
  { value: "2", label: "La Roche-Posay" },
  { value: "3", label: "Good Genes" },
  { value: "4", label: "C-Firma" },
  { value: "5", label: "Neutrogena" },
  { value: "6", label: "The Ordinary" },
  { value: "7", label: "CeraVe" },
  { value: "8", label: "Eucerin" },
  { value: "9", label: "Aveeno" },
  { value: "10", label: "Vichy" },
];

const products = [
  {
    id: "1",
    productTitle: "Sensibio H2O Micellar Water",
    productImage: "/products/product1.png",
    brandId: "1",
  },
  {
    id: "2",
    productTitle: "Ultra Repair Cream",
    productImage: "/products/product2.png",
    brandId: "2",
  },
  {
    id: "3",
    productTitle: "Good Genes All-In-One Lactic Acid Treatment",
    productImage: "/products/product3.png",
    brandId: "3",
  },
  {
    id: "4",
    productTitle: "C-Firma Fresh Day Serum",
    productImage: "/products/product1.png",
    brandId: "4",
  },
  {
    id: "5",
    productTitle: "Neutrogena Hydro Boost Water Gel",
    productImage: "/products/product2.png",
    brandId: "5",
  },
  {
    id: "6",
    productTitle: "The Ordinary Niacinamide 10% + Zinc 1%",
    productImage: "/products/product3.png",
    brandId: "6",
  },
  {
    id: "7",
    productTitle: "CeraVe Moisturizing Cream",
    productImage: "/products/product2.png",
    brandId: "7",
  },
  {
    id: "8",
    productTitle: "Eucerin Advanced Repair Lotion",
    productImage: "/products/product3.png",
    brandId: "8",
  },
  {
    id: "9",
    productTitle: "Aveeno Daily Moisturizing Lotion",
    productImage: "/products/product1.png",
    brandId: "9",
  },
  {
    id: "10",
    productTitle: "Vichy Mineral 89 Hyaluronic Acid Face Serum",
    productImage: "/products/product2.png",
    brandId: "10",
  },
  {
    id: "11",
    productTitle: "Sensibio Eye Contour Gel",
    productImage: "/products/product3.png",
    brandId: "1",
  },
  {
    id: "12",
    productTitle: "La Roche-Posay Toleriane Double Repair Moisturizer",
    productImage: "/products/product1.png",
    brandId: "2",
  },
  {
    id: "13",
    productTitle: "Good Genes Glycolic Acid Treatment",
    productImage: "/products/product2.png",
    brandId: "3",
  },
  {
    id: "14",
    productTitle: "C-Firma Day Serum",
    productImage: "/products/product3.png",
    brandId: "4",
  },
  {
    id: "15",
    productTitle: "Neutrogena Rapid Wrinkle Repair Retinol Oil",
    productImage: "/products/product2.png",
    brandId: "5",
  },
  {
    id: "16",
    productTitle: "The Ordinary Hyaluronic Acid 2% + B5",
    productImage: "/products/product1.png",
    brandId: "6",
  },
  {
    id: "17",
    productTitle: "CeraVe Hydrating Cleanser",
    productImage: "/products/product3.png",
    brandId: "7",
  },
  {
    id: "18",
    productTitle: "Eucerin Roughness Relief Lotion",
    productImage: "/products/product1.png",
    brandId: "8",
  },
  {
    id: "19",
    productTitle: "Aveeno Positively Radiant Daily Moisturizer",
    productImage: "/products/product2.png",
    brandId: "9",
  },
  {
    id: "20",
    productTitle: "Vichy LiftActiv Vitamin C Brightening Skin Corrector",
    productImage: "/products/product3.png",
    brandId: "10",
  },
  {
    id: "21",
    productTitle: "Sensibio AR Anti-Redness Cream",
    productImage: "/products/product2.png",
    brandId: "1",
  },
  {
    id: "22",
    productTitle: "La Roche-Posay Anthelios Melt-in Milk Sunscreen",
    productImage: "/products/product3.png",
    brandId: "2",
  },
  {
    id: "23",
    productTitle: "Good Genes Clarifying Cleanser",
    productImage: "/products/product2.png",
    brandId: "3",
  },
  {
    id: "24",
    productTitle: "C-Firma Vitamin C Day Cream",
    productImage: "/products/product3.png",
    brandId: "4",
  },
  {
    id: "25",
    productTitle: "Neutrogena Ultra Sheer Dry-Touch Sunscreen",
    productImage: "/products/product25.png",
    brandId: "5",
  },
  {
    id: "26",
    productTitle: "The Ordinary Salicylic Acid 2% Solution",
    productImage: "/products/product1.png",
    brandId: "6",
  },
  {
    id: "27",
    productTitle: "CeraVe Renewing SA Cleanser",
    productImage: "/products/product2.png",
    brandId: "7",
  },
  {
    id: "28",
    productTitle: "Eucerin Daily Protection Face Lotion",
    productImage: "/products/product3.png",
    brandId: "8",
  },
  {
    id: "29",
    productTitle: "Aveeno Clear Complexion Foaming Cleanser",
    productImage: "/products/product1.png",
    brandId: "9",
  },
  {
    id: "30",
    productTitle: "Vichy Normaderm Anti-Acne Treatment",
    productImage: "/products/product3.png",
    brandId: "10",
  },
];

const formattedProducts = products.map((p) => ({
  value: p.id,
  label: p.productTitle,
}));

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
            options={brands as Option[]}
            value={brands.find((b) => b.value === selectedProduct?.brandId)}
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
            options={formattedProducts}
            value={formattedProducts.find(
              (p) => p.value === selectedProduct?.productId
            )}
            onChange={(value) => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              setSelectedProduct((prev: any) => ({
                ...prev,
                productId: value.value,
                productImage:
                  products.find((p) => p.id === value.value)!.productImage ??
                  "",
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
