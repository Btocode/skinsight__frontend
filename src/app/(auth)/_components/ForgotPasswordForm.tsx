import { InputBox } from "@/components/common/InputBox";

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
    <div className="bg-white rounded-3xl w-full lg:w-[500px] mx-auto p-6 relative">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-semibold mb-4 bg-gradient-to-r from-blue-400 to-violet-400 text-transparent bg-clip-text">
          Enter your email address
        </h1>
        <p className="text-gray-600 text-base">
          We’ll send you a password reset link
        </p>
      </div>

      {/* Form */}
      <form className="space-y-5">
        <InputBox type="email" placeholder="Enter email address" id="email" />

        <button
          type="submit"
          className="w-full bg-[#8599FE] hover:bg-blue-500 text-white rounded-xl py-3 text-lg font-medium transition-colors"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
