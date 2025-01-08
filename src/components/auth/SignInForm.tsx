"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import HeadingPrimary from "@/components/common/HeadingPrimary";
import { InputBox } from "@/components/common/InputBox";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLoginMutation } from "@/lib/services/authApi";

const SignInForm = () => {
  const router = useRouter();
  const pathname = usePathname();
  
  const [login, { isLoading, error: loginError }] = useLoginMutation();

  const [formData, setFormData] = useState({
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
      await login(formData).unwrap();
      router.push("/");
    } catch (err) {
      // Error handling done by RTK Query
    }
  };

  const renderError = () => {
    if (!loginError) return null;

    const is401 = (loginError as any)?.status === 401;
    
    if (is401) {
      return (
        <span className="text-red-600">
          Oops! that is not the right password.{" "}
          <Link
            href="/?auth=forgot-password"
            className="font-bold hover:text-red-700"
          >
            Want to reset?
          </Link>
        </span>
      );
    }

    return (
      <span className="text-red-600">
        {(loginError as any)?.data?.message || "Invalid credentials"}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-3xl w-full relative lg:px-[136px] py-4 lg:py-[52px]">
      <div className="text-center mb-8">
        <HeadingPrimary className="text-[28px] leading-8 lg:text-4xl lg:leading-10 lg:tracking-[-2%]">
          Log into your account
        </HeadingPrimary>
        <p className="text-gray-600 text-base leading-6 tracking-[-2%]">
          View your saved searches, skincare routine and more
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 lg:space-y-7">
        <InputBox
          type="email"
          placeholder="Enter email address"
          id="email"
          value={formData.email}
          onChange={handleChange}
          required
          disabled={isLoading}
          error={loginError ? " " : undefined}
        />
        <InputBox
          type="password"
          placeholder="Enter password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          required
          disabled={isLoading}
          error={loginError ? " " : undefined}
        />

        {renderError()}

        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#8599FE] hover:bg-blue-500 text-white rounded-xl py-3 text-lg font-medium transition-colors disabled:opacity-50"
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </div>

        <p className="text-center text-lg">
          <span className="text-blue-400">Don&apos;t have an account? </span>
          <Link
            href={`/${pathname}?auth=sign-up`}
            className="text-blue-500 hover:text-blue-600 font-medium"
          >
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignInForm;
