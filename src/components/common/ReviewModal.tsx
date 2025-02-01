"use client";

import React from "react";
import Modal from "./Modal";
import { InputBox } from "./InputBox";
import Image from "next/image";
import Button from "./Button";
import TextAreaBox from "./TextAreaBox";
interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  item: any;
}

const ReviewModal: React.FC<ReviewModalProps> = ({ isOpen, onClose, item }) => {
  if (!isOpen) return null;

  const handleReaction = (reaction: string) => {
    console.log(reaction);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="bg-white rounded-lg p-6 flex flex-col gap-3">
        <h2 className="text-[16px] text-[#2C2C2C]">
          Tell us how you feel about
        </h2>
        <h3 className="text-[30px] font-semibold mb-4 bg-[linear-gradient(90deg,#8F80E8_0%,#80ADE8_100%)] text-transparent bg-clip-text">
          Take the Day Off Makeup Remover
        </h3>
        <div className="flex gap-6">
          <div className="flex flex-col gap-6 w-[400px]">
            <InputBox placeholder="Write a headline (optional)" />
            <TextAreaBox
              placeholder="Write your review"
              rows={5}
              className="mb-4"
            />
          </div>
          {/* Product container */}
          <div
            className="w-[232px] h-[280px] p-5 flex flex-col gap-2.5 rounded-[13px] bg-white"
            style={{
              boxShadow: "0px 5.13px 33.34px 0px #2C2C2C17",
              border: "1px solid #EFEFEF",
            }}
          >
            {/* Product Image Container - Fixed height */}
            <div className="h-[140px] w-full flex items-center justify-center">
              <div className="relative h-[120px] w-[120px]">
                <Image
                  src={item.productImage}
                  alt={item.productTitle}
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Product Info */}
            <div className="flex-1 text-center">
              <h3 className="text-lg font-medium text-[#575656] line-clamp-2">
                {item.productTitle}
              </h3>
            </div>

            {/* Reaction Buttons */}
            <div className="flex justify-center items-center gap-2 mt-auto">
              <button
                onClick={() => handleReaction("1")}
                className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#E77CCF80] transition-colors text-xl"
              >
                🥰
              </button>
              <button
                onClick={() => handleReaction("2")}
                className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#E1E1E1] transition-colors text-xl"
              >
                😔
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-5 pt-2 mt-4">
          <Button className="w-[136px] h-[60px] text-xl font-medium leading-[26px]">
            Submit
          </Button>
          <Button
            onClick={onClose}
            className="w-[136px] h-[60px] border text-xl font-medium leading-[26px]"
            variant={"outline"}
          >
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ReviewModal;
