import Button from "@/components/common/Button";
import SettingsBackButton from "@/components/common/SettingsBackButton";
import Link from "next/link";
import React from "react";

const DownloadData = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="w-[380px] lg:w-[550px] py-5 px-3">
      <SettingsBackButton onClick={onClose} />
      <h2 className="text-base lg:text-2xl font-semibold leading-[36px] tracking-[-0.02em] text-[#111111]">
        Download my data
      </h2>
      <hr className="w-full h-px my-5 bg-[#EFEFEF]" />
      <p className="text-[16px] leading-[24px] tracking-[-13%] text-[#575656]">
        We will send you a copy of your data on your registered email address.
        Kindly read our{" "}
        <Link href={"/privacy-policy"} className="text-[#8F80E8] font-semibold">
          Terms & conditions{" "}
        </Link>
        before proceeding. You should be able to receive your data within 3
        working days.
      </p>

      <div className="flex items-center gap-4 mt-6 pb-2">
        <Button onClick={onClose} className="py-3 px-6 text-[20px] ">Yes, download</Button>
        <Button variant={"outline"} className="py-3 px-6 text-[20px] border border-primary rounded-xl text-primary">Maybe later</Button>
      </div>
    </div>
  );
};

export default DownloadData;
