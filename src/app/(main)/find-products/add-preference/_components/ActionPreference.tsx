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
      <div className="flex items-center gap-5 pt-2">
        <Button
          onClick={() => setOpen(true)}
          className="w-[126px] h-[60px] text-xl font-medium leading-[26px]"
        >
          Add
        </Button>
        <Button
          className="w-[126px] h-[60px] border text-xl font-medium leading-[26px]"
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
