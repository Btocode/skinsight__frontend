"use client";
import Button from "@/components/common/Button";
import SettingsBackButton from "@/components/common/SettingsBackButton";
const DeleteAccount = ({
  onClose,
  setState,
}: {
  onClose: () => void;
  setState: (state: string) => void;
}) => {
  return (
    <div className="w-[380px] lg:w-[550px] py-5 px-3">
      <SettingsBackButton onClick={onClose} />
      <h2 className="text-base lg:text-2xl font-semibold leading-[36px] tracking-[-0.02em] text-[#111111]">
        Delete my account
      </h2>
      <hr className="w-full h-px my-5 bg-[#EFEFEF]" />
      <p className="text-[16px] leading-[24px] tracking-[-3%] text-[#575656]">
        Are you sure you want to delete your account? You will lose access to
        the Skinsight tool and your saved items.
      </p>

      <div className="flex items-center gap-4 mt-6 pb-2">
        <Button
        className="py-3 px-6 text-[20px]"
        onClick={() => setState("delete-success")}>Yes, delete</Button>
        <Button
        className="py-3 px-6 text-[20px] w-[150px] border border-primary rounded-xl text-primary"
        variant={"outline"}>No, cancel</Button>
      </div>
    </div>
  );
};

export default DeleteAccount;
