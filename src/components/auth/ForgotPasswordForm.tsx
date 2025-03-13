import { useState } from "react";
import { InputBox } from "@/components/common/InputBox";
import React from "react";
import HeadingPrimary from "../common/HeadingPrimary";
import { useForgotPasswordMutation } from "@/lib/services/authApi";

interface ApiError {
  message: string;
  code?: string;
  status?: number;
}

interface ForgotPasswordFormProps {
  onSubmit?: (data: { email: string }) => void;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ onSubmit }) => {
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [email, setEmail] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // If onSubmit prop is provided, call it with the form data
      if (onSubmit) {
        onSubmit({ email });
        return;
      }

      // Original form submission logic
      await forgotPassword({ email }).unwrap();
      setIsSuccess(true);
      setError(null);
    } catch (err: unknown) {
      if (typeof err === 'object' && err !== null && 'message' in err) {
        const apiError = err as ApiError;
        setError(apiError.message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
      setIsSuccess(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl w-full relative lg:px-[112px] py-4 lg:py-[52px]">
      <div className="text-center mb-8">
        <HeadingPrimary className="text-[28px] leading-8 lg:text-4xl lg:leading-10 lg:tracking-[-3%]">
          Forgot your password?
        </HeadingPrimary>
        <p className="text-gray-600 text-base leading-6 tracking-[-2%]">
          {isSuccess
            ? "Check your email for a link to reset your password."
            : "Enter your email address and we'll send you a link to reset your password."}
        </p>
      </div>

      <form className="space-y-5 lg:space-y-7" onSubmit={handleSubmit}>
        <InputBox
          type="email"
          placeholder="Enter your email"
          id="email"
          name="email"
          onChange={handleInputChange}
          value={email}
        />

        {error && (
          <p className="text-red-500 text-sm text-center m-0">{error}</p>
        )}

        <div className="lg:max-w-[240px] mx-auto">
          <button
            type="submit"
            disabled={isLoading || isSuccess}
            className="w-full bg-[#8599FE] hover:bg-blue-500 text-white rounded-xl py-4 text-lg font-medium transition-colors disabled:opacity-50"
          >
            {isLoading ? "Sending..." : isSuccess ? "Email Sent" : "Send Reset Link"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
