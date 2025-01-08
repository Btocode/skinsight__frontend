"use client";

import { useState, useEffect } from "react";
import { useRegisterMutation } from "@/redux/apis/authApi";
import { registerSchema } from "@/schema/auth";
import type { RegisterSchema } from "@/schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { usePathname, useRouter } from "next/navigation";
import { InputBox } from "@/components/common/InputBox";
import Link from "next/link";
import HeadingPrimary from "../common/HeadingPrimary";

const SignUpForm = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [register, { isLoading, isError, error: apiError }] = useRegisterMutation();

  const { 
    control, 
    handleSubmit,
    formState: { errors: formErrors } 
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      display_name: "",
      email: "",
      password: "",
    },
  });

  const renderError = () => {
    // Show form validation errors first
    if (formErrors.display_name?.message || formErrors.email?.message || formErrors.password?.message) {
      return (
        <span className="text-red-600">
          {formErrors.display_name?.message || formErrors.email?.message || formErrors.password?.message}
        </span>
      );
    }

    // Then show API errors
    if (!isError) return null;

    const is422 = (apiError as any)?.status === 422;

    if (is422) {
      return (
        <span className="text-red-600">
          {(apiError as { data: { detail: string } })?.data?.detail}
        </span>
      );
    }

    return (
      <span className="text-red-600">
        {(apiError as { data: { detail: string } })?.data?.detail || "Registration failed"}
      </span>
    );
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  const onSubmit = async (data: RegisterSchema) => {
    try {
      await register(data).unwrap();
      router.push(`/${pathname}?auth=sign-in`);
    } catch (err) {
      // Error handled by RTK Query
    }
  };

  if (!mounted) {
    return null; // or loading spinner
  }

  return (
    <div className="bg-white rounded-3xl w-full relative lg:px-[100px] py-4 lg:py-[52px]">
      <div className="text-center mb-8 mt-4">
        <HeadingPrimary className="text-[28px] leading-8 lg:text-4xl lg:leading-10 lg:tracking-[-3%]">
          Sign up to get personalized recommendations
        </HeadingPrimary>
        <p className="text-gray-600 text-base leading-6 tracking-[-2%]">
          Join us to start your skincare journey
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="lg:px-[32px] space-y-5 lg:space-y-7">
        <Controller
          name="display_name"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <InputBox
              type="text"
              placeholder="Your name"
              id="display_name"
              value={field.value}
              onChange={field.onChange}
              required
              disabled={isLoading}
              error={error?.message}
            />
          )}
        />

        <Controller
          name="email"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <InputBox
              type="email"
              placeholder="Enter email address"
              id="email"
              value={field.value}
              onChange={field.onChange}
              required
              disabled={isLoading}
              error={error?.message}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <InputBox
              type="password"
              placeholder="Enter password"
              id="password"
              value={field.value}
              onChange={field.onChange}
              required
              disabled={isLoading}
              error={error?.message}
            />
          )}
        />

        {isError && renderError()}

        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#8599FE] hover:bg-blue-500 text-white rounded-xl py-3 text-lg font-medium transition-colors disabled:opacity-50"
          >
            {isLoading ? "Signing up..." : "Sign up"}
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
