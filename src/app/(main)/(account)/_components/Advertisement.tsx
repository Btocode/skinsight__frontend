import Image from "next/image";
import React from "react";

const Advertisement = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-4 bg-[#F5F7F6] rounded-lg p-4 mt-10">
      <div className="h-44 w-60 lg:w-80 relative">
        <Image src={"/ad/insider.png"} alt="insider" fill />
      </div>
      <div className="h-44 w-80 lg:w-[calc(100%-760px)] relative">
        <Image src={"/ad/products.png"} alt="insider" fill />
      </div>
      <div className="h-44 w-44 lg:w-48 relative">
        <Image src={"/ad/discount.png"} alt="insider" fill />
      </div>
    </div>
  );
};

export default Advertisement;
