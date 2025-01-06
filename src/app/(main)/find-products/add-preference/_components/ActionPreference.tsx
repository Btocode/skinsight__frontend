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
      <div className="flex items-center gap-4 mt-2 lg:mt-0">
        <Button onClick={() => setOpen(true)} className="px-8">
          Add
        </Button>
        <Button
          className="px-8"
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
