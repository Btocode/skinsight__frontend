import Button from "@/components/common/Button";
import Link from "next/link";
import React from "react";

const DownloadData = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="w-[380px] lg:w-[550px]">
      <Button
        variant={"back"}
        onClick={onClose}
        icon={
          <svg
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 12.5L8 17.5M3 12.5L8 7.5M3 12.5H21"
              stroke="#2C2C2C"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        }
      >
        Back
      </Button>
      <h2 className="text-base lg:text-xl font-semibold leading-[36px] tracking-[-0.02em] text-[#111111]">
        Download my data
      </h2>
      <hr className="w-full h-px my-6 bg-[#EFEFEF]" />
      <p className="text-[16px] leading-[24px] tracking-[-3%] text-[#575656]">
        We will send you a copy of your data on your registered email address.
        Kindly read our{" "}
        <Link href={"/privacy-policy"} className="text-primary">
          Terms & conditions{" "}
        </Link>
        before proceeding. You should be able to receive your data within 3
        working days.
      </p>

      <div className="flex items-center gap-4 mt-6 pb-2">
        <Button>Yes, download</Button>
        <Button variant={"outline"}>Maybe later</Button>
      </div>
    </div>
  );
};

export default DownloadData;
