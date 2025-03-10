import { useState, useEffect } from "react";
import { InputBox } from "@/components/common/InputBox";
import React from "react";
import HeadingPrimary from "../common/HeadingPrimary";
import { useUpdatePasswordMutation } from "@/lib/services/authApi";
import { useRouter } from "next/navigation";

interface ApiError {
  message: string;
  code?: string;
  status?: number;
}

interface SetNewPasswordFormProps {
  onSubmit?: (data: { password: string; repeatPassword: string }) => void;
}

const SetNewPasswordForm: React.FC<SetNewPasswordFormProps> = ({ onSubmit }) => {
  const [updatePassword, { isLoading }] = useUpdatePasswordMutation();
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [passwords, setPasswords] = useState({ password: '', repeatPassword: '' });
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const [subHeader, setSubHeader] = useState("to sign into your skinsight account")
  const router = useRouter();

  useEffect(() => {
    if (passwords.password && passwords.repeatPassword && passwords.password.length >= 6) {
      setPasswordsMatch(passwords.password === passwords.repeatPassword);
      setError(passwords.password === passwords.repeatPassword ? null : "Passwords do not match");
    }
  }, [passwords]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswords(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!passwordsMatch) {
      setError("Passwords do not match");
      return;
    }

    try {
      if (onSubmit) {
        onSubmit(passwords);
        return;
      }

      await updatePassword({ new_password: passwords.password }).unwrap();
      setIsSuccess(true);
      setError(null);
      setSubHeader("Password Updated Successfully.")
      setTimeout(()=> {
        router.push("/")
      }, 2000)
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
          Set your new password
        </HeadingPrimary>
        <p className="text-gray-600 text-base leading-6 tracking-[-2%]">
          {isSuccess ? "Password Updated Successfully" : passwordsMatch ? "Great! The passwords match" : subHeader}
        </p>
      </div>

      <form className="space-y-5 lg:space-y-7" onSubmit={handleSubmit}>
        <InputBox
          type="password"
          placeholder="Enter new password"
          id="password"
          name="password"
          className={isSuccess || passwordsMatch ? "bg-green-50" : ""}
          onChange={handleInputChange}
          value={passwords.password}
          // passwordMatch={passwordsMatch && passwords.password.length >= 6}
        />
        <InputBox
          type="password"
          placeholder="Repeat new password"
          id="repeatPassword"
          name="repeatPassword"
          className={isSuccess || passwordsMatch ? "bg-green-50" : ""}
          onChange={handleInputChange}
          value={passwords.repeatPassword}
          // passwordMatch={passwordsMatch && passwords.password.length >= 6}
        />

        {error && (
          <p className="text-red-500 text-sm text-center m-0">{error}</p>
        )}

        <div className="lg:max-w-[240px] mx-auto">
          <button
            type="submit"
            disabled={isLoading || isSuccess || !passwordsMatch}
            className="w-full bg-[#8599FE] hover:bg-blue-500 text-white rounded-xl py-4 text-lg font-medium transition-colors disabled:opacity-50"
          >
            {isLoading ? "Updating..." : isSuccess ? "Password Updated" : "Update Password"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SetNewPasswordForm;
