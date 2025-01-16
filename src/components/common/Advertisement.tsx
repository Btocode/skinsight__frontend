import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

const Advertisement = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:flex-row items-center justify-between gap-4 bg-[#F5F7F6] rounded-lg p-4 mt-10",
        className
      )}
    >
      <div className="h-44 w-60 lg:w-80 relative">
        <Image src={"/ad/insider.png"} alt="insider" fill />
      </div>
      <Image src={"/ad/products.png"} alt="insider" width={500} height={180} />
      <div className="h-44 w-44 lg:w-48 relative">
        <Image src={"/ad/discount.png"} alt="insider" fill />
      </div>
    </div>
  );
};

export default Advertisement;
