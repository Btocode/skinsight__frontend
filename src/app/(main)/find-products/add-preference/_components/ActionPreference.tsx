"use client";
import Button from "@/components/common/Button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AddProduct from "./AddProduct";

const ActionPreference = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      <div className="flex items-center gap-3 lg:gap-[20px]">
        <Button
          onClick={() => setOpen(true)}
          className="w-[119px] lg:w-[126px] h-[44px] lg:h-[60px] text-base lg:text-xl font-medium leading-[26px]"
        >
          Add
        </Button>
        <Button
          className="w-[109px] lg:w-[126px] h-[44px] lg:h-[60px] border text-base lg:text-xl font-medium leading-[26px]"
          variant={"outline"}
          onClick={() => router.back()}
        >
          Skip
        </Button>
      </div>
      <AddProduct open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default ActionPreference;
