import { InputBox } from "@/components/common/InputBox";
import HeadingPrimary from "../common/HeadingPrimary";

/**
 * A form for users to enter their email address and receive a password reset link.
 *
 * This component renders a form with a single input field for the user's email address.
 * When the form is submitted, it will send a password reset link to the user's entered email address.
 *
 * The form will be styled to match the general UI of the application.
 *
 * @returns A JSX element containing the forgot password form.
 */
const ForgotPasswordForm = () => {
  return (
    <div className="bg-white rounded-3xl w-full relative lg:px-[112px] py-4 lg:py-[52px]">
      <div className="text-center mb-8">
        <HeadingPrimary className="text-[28px] leading-8 lg:text-4xl lg:leading-10 lg:tracking-[-3%] ">
          Enter your email address
        </HeadingPrimary>
        <p className="text-gray-600 text-base leading-6 tracking-[-2%]">
          We’ll send you a password reset link
        </p>
      </div>

      {/* Form */}
      <form className=" space-y-5 lg:pace-y-7 lg:px-[20px]">
        <InputBox type="email" placeholder="Enter email address" id="email" />

        <div className="lg:max-w-[240px] mx-auto">
          <button
            type="submit"
            className=" w-full bg-[#8599FE] hover:bg-blue-500 text-white rounded-xl py-4 text-lg font-medium transition-colors"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
