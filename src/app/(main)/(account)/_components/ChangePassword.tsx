import Button from "@/components/common/Button";
import { InputBox } from "@/components/common/InputBox";

const ChangePassword = ({ onClose }: { onClose: () => void }) => {
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
        Change password
      </h2>
      <hr className="w-full h-px my-6 bg-[#EFEFEF]" />
      <p className="text-[16px] leading-[24px] tracking-[-3%] text-[#575656]">
        To change your password, please enter your old password then create a
        new one and repeat it.
      </p>
      <form action="" className="space-y-6 mt-6">
        <InputBox placeholder="Enter you old password" />
        <InputBox placeholder="Enter you new password" />
        <InputBox placeholder="Repeat new password" />
        <div className="flex items-center gap-4">
          <Button>Save</Button>
          <Button variant={"outline"}>Cancel</Button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
