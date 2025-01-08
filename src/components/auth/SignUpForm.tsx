"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import HeadingPrimary from "@/components/common/HeadingPrimary";
import { InputBox } from "@/components/common/InputBox";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRegisterMutation } from "@/lib/services/authApi";

const SignUpForm = () => {
  const router = useRouter();
  const pathname = usePathname();
  
  const [register, { isLoading, error: registerError }] = useRegisterMutation();

  const [formData, setFormData] = useState({
    display_name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await register(formData).unwrap();
      if (result.message === "Sign up successful") {
        router.push(`/${pathname}?auth=sign-in`);
      }
    } catch (err: any) {
      // RTK Query handles the error
      // 422 error is automatically handled and shown in the UI
      console.error('Registration failed:', err);
    }
  };

  return (
    <div className="bg-white rounded-3xl w-full relative lg:px-[136px] py-4 lg:py-[52px]">
      <div className="text-center mb-8">
        <HeadingPrimary className="text-[28px] leading-8 lg:text-4xl lg:leading-10 lg:tracking-[-2%]">
          Create your account
        </HeadingPrimary>
        <p className="text-gray-600 text-base leading-6 tracking-[-2%]">
          Join us to start your skincare journey
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 lg:space-y-7">
        <InputBox
          type="text"
          placeholder="Enter your name"
          id="display_name"
          value={formData.display_name}
          onChange={handleChange}
          required
          disabled={isLoading}
          error={registerError ? " " : undefined}
        />
        <InputBox
          type="email"
          placeholder="Enter email address"
          id="email"
          value={formData.email}
          onChange={handleChange}
          required
          disabled={isLoading}
          error={registerError ? " " : undefined}
        />
        <InputBox
          type="password"
          placeholder="Enter password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          required
          disabled={isLoading}
          error={registerError ? " " : undefined}
        />

        {registerError && (
          <span className="text-red-600">
            {(registerError as any)?.data?.detail || "Registration failed"}
          </span>
        )}

        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#8599FE] hover:bg-blue-500 text-white rounded-xl py-3 text-lg font-medium transition-colors disabled:opacity-50"
          >
            {isLoading ? "Signing up..." : "Sign Up"}
          </button>
        </div>

        <p className="text-center text-lg">
          <span className="text-blue-400">Already have an account? </span>
          <Link
            href={`/${pathname}?auth=sign-in`}
            className="text-blue-500 hover:text-blue-600 font-medium"
          >
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUpForm;
