import { InputBox } from "@/components/common/InputBox";
import React from "react";

const SetNewPasswordForm = () => {
  return (
    <div className="bg-white rounded-3xl w-full lg:w-[500px] mx-auto p-6 relative">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-semibold mb-4 bg-gradient-to-r from-blue-400 to-violet-400 text-transparent bg-clip-text">
          Set your new password
        </h1>
        <p className="text-gray-600 text-base">
          to sign into your skinsight account
        </p>
      </div>

      {/* Form */}
      <form className="space-y-5">
        <InputBox type="password" placeholder="Enter password" id="password" />
        <InputBox
          type="password"
          placeholder="Repeat password"
          id="repeat-password"
        />

        <button
          type="submit"
          className="w-full bg-[#8599FE] hover:bg-blue-500 text-white rounded-xl py-3 text-lg font-medium transition-colors"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default SetNewPasswordForm;
