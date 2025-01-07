"use client";
import BackButton from "@/components/common/BackButton";
import Button from "@/components/common/Button";
import { Combobox } from "@/components/common/Combobox";
import HeadingPrimary from "@/components/common/HeadingPrimary";
import Modal from "@/components/common/Modal";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hook";
import { setAddPreference } from "@/redux/slices/productSlice";
import Image from "next/image";
import { useState } from "react";

type AddProductProps = {
  open: boolean;
  onClose: () => void;
};

const AddProduct = ({ open, onClose }: AddProductProps) => {
  const [attachments, setAttachments] = useState<File[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const preference = useAppSelector((state) => state.product.addPreference);
  const dispatch = useAppDispatch();

  return (
    <Modal isOpen={open} onClose={onClose}>
      <div className="max-w-2xl flex items-center justify-center min-h-[450px] gap-6">
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex flex-col lg:gap-4">
            <BackButton buttonProps={{ className: "self-start" }} />
            <HeadingPrimary className="leading-[44px] text-[22px] lg:text-4xl">
              Select a product you currently use
            </HeadingPrimary>
          </div>
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
          />
          <div className="flex items-center gap-4">
            <Button className="px-8">Next</Button>
            <Button onClick={onClose} className="px-8" variant="outline">
              Cancel
            </Button>
          </div>
        </div>
        <label
          htmlFor={"add-product-image"}
          id="add-product-image"
          className="hidden  w-[200px] h-[260px] border border-primary lg:flex items-center justify-center rounded-xl mt-4 cursor-pointer"
        >
          <input
            type="file"
            id="add-product-image"
            className="absolute opacity-0"
            onChange={(e) => {
              if (e.target.files) {
                setFile(e.target.files[0]);
              }
            }}
          />
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
        </label>
      </div>
    </Modal>
  );
};

export default AddProduct;
