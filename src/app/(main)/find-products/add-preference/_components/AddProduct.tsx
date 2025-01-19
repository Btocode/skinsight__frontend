"use client";
import BackButton from "@/components/common/BackButton";
import Button from "@/components/common/Button";
import { Combobox } from "@/components/common/Combobox";
import HeadingPrimary from "@/components/common/HeadingPrimary";
import Modal from "@/components/common/Modal";
import Image from "next/image";
import { useState } from "react";

type AddProductProps = {
  open: boolean;
  onClose: () => void;
};

const AddProduct = ({ open, onClose }: AddProductProps) => {
  const [file] = useState<File | null>(null);

  return (
    <Modal
      isOpen={open}
      onClose={onClose}
      isCloseIconVisible={false}
      contentClassName="p-0 lg:p-0"
    >
      <div className="max-w-[690px] flex items-center justify-center gap-[25px] lg:px-[25px] lg:py-[36px]">
        <div className="flex-1 flex flex-col gap-[28px]">
          <BackButton buttonProps={{ className: "self-start -mb-[18px]" }} />
          <HeadingPrimary className="lg:text-[38px] font-semibold lg:leading-[45.22px] tracking-[-0.02em] -mb-2">
            Select a product you currently use
          </HeadingPrimary>
          <label
            htmlFor="add-product-image"
            className="w-[150px] lg:w-[200px] mx-auto h-[200px] lg:h-[260px] border border-dashed border-primary lg:hidden flex items-center justify-center rounded-xl cursor-pointer"
          >
            <span className="itext-4xl text-primary w-10 h-10 rounded-full border border-primary flex items-center justify-center">
              +
            </span>
            <input type="file" id="add-product-image" hidden />
          </label>
          <Combobox
            options={[
              { label: "Brand 1", value: "brand1" },
              { label: "Brand 2", value: "brand2" },
              { label: "Brand 3", value: "brand3" },
              { label: "Brand 4", value: "brand4" },
              { label: "Brand 5", value: "brand5" },
            ]}
            placeholder="Select brand"
            className="max-w-full"
            buttonClassName="border-0"
            valueClassName="text-xl font-normal leading-[26px] text-accent"
          />
          <Combobox
            options={[
              { label: "Product 1", value: "product1" },
              { label: "Product 2", value: "product2" },
              { label: "Product 3", value: "product3" },
              { label: "Product 4", value: "product4" },
            ]}
            placeholder="Select product"
            className="max-w-full"
            buttonClassName="border-0"
            valueClassName="text-xl font-normal leading-[26px] text-accent"
          />
          <div className="flex items-center gap-4">
            <Button className="w-[126px] h-[60px] rounded-xl text-xl font-medium leading-[26px]">
              Next
            </Button>
            <Button
              onClick={onClose}
              className="w-[126px] h-[60px] border rounded-xl text-xl font-medium leading-[26px]"
              variant="outline"
            >
              Cancel
            </Button>
          </div>
        </div>
        <div className="hidden px-4 w-[182px] h-[224px] border border-dashed border-primary lg:flex items-center justify-center rounded-xl">
          {file ? (
            <Image
              src={URL.createObjectURL(file)}
              alt="product"
              width={200}
              height={260}
              className="p-2"
            />
          ) : (
            <svg
              width="41"
              height="40"
              viewBox="0 0 41 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.1667 20H20.5M20.5 20H28.8333M20.5 20V28.3333M20.5 20V11.6667M20.5 38.75C10.1447 38.75 1.75 30.3553 1.75 20C1.75 9.64466 10.1447 1.25 20.5 1.25C30.8553 1.25 39.25 9.64466 39.25 20C39.25 30.3553 30.8553 38.75 20.5 38.75Z"
                stroke="#8599FE"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default AddProduct;
