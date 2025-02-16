import Button from "@/components/common/Button";
import { InputBox } from "@/components/common/InputBox";
import SettingsBackButton from "@/components/common/SettingsBackButton";

const ChangePassword = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="w-[380px] lg:w-[550px] py-5 px-3">
      <SettingsBackButton onClick={onClose} />
      <h2 className="text-base lg:text-2xl font-semibold leading-[36px] tracking-[-0.02em] text-[#111111]">
        Change password
      </h2>
      <hr className="w-full h-px my-4 bg-[#EFEFEF]" />
      <p className="text-[16px] leading-[24px] tracking-[-3%] text-[#575656]">
        To change your password, please enter your old password then create a
        new one and repeat it.
      </p>
      <form action="" className="space-y-4 mt-6">
        <InputBox placeholder="Enter you old password" />
        <InputBox placeholder="Enter you new password" />
        <InputBox placeholder="Repeat new password" />
        <div className="flex items-center gap-4">
        <Button className="py-3 px-6 text-[20px] w-[130px]">Save</Button>
        <Button variant={"outline"} className="py-3 px-6 text-[20px] w-[130px] border border-primary rounded-xl text-primary">Cancel</Button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
