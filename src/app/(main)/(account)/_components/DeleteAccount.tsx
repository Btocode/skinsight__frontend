import Button from "@/components/common/Button";
import React from "react";

const DeleteAccount = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="w-[550px]">
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
      <h2 className="text-2xl font-semibold leading-[36px] tracking-[-0.02em] text-[#111111]">
        Delete my account
      </h2>
      <hr className="w-full h-px my-6 bg-[#EFEFEF]" />
      <p className="text-[16px] leading-[24px] tracking-[-3%] text-[#575656]">
        Are you sure you want to delete your account? You will lose access to
        the Skinsight tool and your saved items.
      </p>

      <div className="flex items-center gap-4 mt-6 pb-2">
        <Button>Yes, delete</Button>
        <Button variant={"outline"}>No, cancel</Button>
      </div>
    </div>
  );
};

export default DeleteAccount;
