import { InputBox } from "@/components/common/InputBox";

const CodeValidationForm = () => {
  return (
    <div className="bg-white rounded-3xl w-full lg:w-[500px] mx-auto p-6 relative">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-semibold mb-4 bg-gradient-to-r from-blue-400 to-violet-400 text-transparent bg-clip-text">
          Enter the code
        </h1>
        <p className="text-gray-600 text-base">
          We’ve sent you a code on mi****@gmail.com
        </p>
      </div>

      {/* Form */}
      <form className="space-y-5">
        <InputBox type="text" placeholder="Enter code" id="code" />

        <button
          type="submit"
          className="w-full bg-[#8599FE] hover:bg-blue-500 text-white rounded-xl py-3 text-lg font-medium transition-colors"
        >
          Send
        </button>
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
