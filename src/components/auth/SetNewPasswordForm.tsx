import { InputBox } from "@/components/common/InputBox";
import React from "react";
import HeadingPrimary from "../common/HeadingPrimary";

interface SetNewPasswordFormProps {
  onSubmit: (data: { password: string; repeatPassword: string }) => void;
}

const SetNewPasswordForm: React.FC<SetNewPasswordFormProps> = ({ onSubmit }) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.currentTarget;
    const password = (target.elements.namedItem('password') as HTMLInputElement).value;
    const repeatPassword = (target.elements.namedItem('repeatPassword') as HTMLInputElement).value;

    // Validate that passwords match
    if (password !== repeatPassword) {
      return; // Prevent submission if passwords do not match
    }

    onSubmit({ password, repeatPassword });
  };

  return (
    <div className="bg-white rounded-3xl w-full relative lg:px-[112px] py-4 lg:py-[52px]">
      <div className="text-center mb-8">
        <HeadingPrimary className="text-[28px] leading-8 lg:text-4xl lg:leading-10 lg:tracking-[-3%] ">
          Set your new password
        </HeadingPrimary>
        <p className="text-gray-600 text-base leading-6 tracking-[-2%]">
          to sign into your skinsight account
        </p>
      </div>

      {/* Form */}
      <form className="space-y-5 lg:space-y-7 lg:px-[20px]" onSubmit={handleSubmit}>
        <InputBox type="password" placeholder="Enter password" id="password" name="password" />
        <InputBox
          type="password"
          placeholder="Repeat password"
          id="repeat-password"
          name="repeatPassword"
        />

        <div className="lg:max-w-[240px] mx-auto">
          <button
            type="submit"
            className=" w-full bg-[#8599FE] hover:bg-blue-500 text-white rounded-xl py-4 text-lg font-medium transition-colors"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default SetNewPasswordForm;
