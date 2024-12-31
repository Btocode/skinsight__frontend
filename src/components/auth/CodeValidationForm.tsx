import { InputBox } from "@/components/common/InputBox";
import HeadingPrimary from "../common/HeadingPrimary";

const CodeValidationForm = () => {
  return (
    <div className="bg-white rounded-3xl w-full relative lg:px-[112px] py-4 lg:py-[48px]">
      <div className="text-center mb-8">
        <HeadingPrimary className="text-[28px] leading-8 lg:text-4xl lg:leading-10 lg:tracking-[-3%] ">
          Enter the code
        </HeadingPrimary>
        <p className="text-gray-600 text-base leading-6 tracking-[-2%]">
          We’ve sent you a code on mi****@gmail.com
        </p>
      </div>

      {/* Form */}
      <form className=" space-y-5 lg:space-y-7 lg:px-[20px]">
        <InputBox type="text" placeholder="Enter code" id="code" />

        <div className="lg:max-w-[240px] mx-auto">
          <button
            type="submit"
            className=" w-full bg-[#8599FE] hover:bg-blue-500 text-white rounded-xl py-4 text-lg font-medium transition-colors"
          >
            Send
          </button>
        </div>
        <p className="text-center text-lg">
          <span className="text-blue-400">Didn’t receive the code? </span>
          <button className="outline-none border-none bg-transparent text-blue-500 hover:text-blue-600 font-medium">
            Resend
          </button>
        </p>
      </form>
    </div>
  );
};

export default CodeValidationForm;
