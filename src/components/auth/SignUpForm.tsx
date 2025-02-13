"use client";

import { useState, useEffect } from "react";
import { useRegisterMutation } from "@/lib/services/authApi";
import { registerSchema, RegisterSchema } from "@/schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { usePathname, useRouter } from "next/navigation";
import { InputBox } from "@/components/common/InputBox";
import Link from "next/link";
import HeadingPrimary from "../common/HeadingPrimary";
import Image from "next/image";

const SignUpForm = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [registerUser, { isLoading, isError, error: apiError }] = useRegisterMutation();

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      display_name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  });

  const onSubmit = async (data: RegisterSchema) => {
    try {
      const { confirm_password, ...registerData } = data;
      await registerUser(registerData).unwrap();
      router.replace(pathname);
      setTimeout(() => {
        router.push(`${pathname}?auth=sign-in`);
      }, 100);
    } catch (err) {
      console.log(err);
    }
  };

  const renderError = () => {
    // Show API errors if any
    if (isError) {
      return (
        <span className="text-red-600">
          {(apiError as { data: { detail: string } })?.data?.detail || "Registration failed"}
        </span>
      );
    }
    return null;
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // or loading spinner
  }

  const handleSocialLogin = (provider: string) => {
    // redirect to authentication url
    const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/sign_in_with_provider/${provider}`;
    window.location.href = url;
  };

  return (
    <div className="bg-white w-[620px] mx-auto rounded-[12px] flex flex-col gap-[10px] lg:px-[70px] py-4 lg:py-[50px]">
      <div className="text-center mb-4">
        <HeadingPrimary className="text-[28px] leading-8 lg:text-4xl lg:leading-10 lg:tracking-[-3%]">
          Sign up to get personalized recommendations
        </HeadingPrimary>
        <p className="text-[#2C2C2C] text-base leading-6 tracking-[-0.5px]">
          Discover products that work for you - no more guessing!
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="lg:px-[32px] space-y-5 lg:space-y-7"
      >
        <Controller
          name="display_name"
          control={control}
          render={({ field }) => (
            <InputBox
              type="text"
              placeholder="Your name"
              id="display_name"
              {...field}
              required
              disabled={isLoading}
              error={errors.display_name?.message}
            />
          )}
        />

        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <InputBox
              type="email"
              placeholder="Enter email address"
              id="email"
              {...field}
              required
              disabled={isLoading}
              error={errors.email?.message}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <InputBox
              type="password"
              placeholder="Enter password"
              id="password"
              {...field}
              required
              disabled={isLoading}
              error={errors.password?.message}
            />
          )}
        />

        <Controller
          name="confirm_password"
          control={control}
          render={({ field }) => (
            <InputBox
              type="password"
              placeholder="Confirm password"
              id="confirm_password"
              {...field}
              required
              disabled={isLoading}
              error={errors.confirm_password?.message}
            />
          )}
        />

        {renderError()}

        <div className="flex gap-4 w-full">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-[#8599FE] hover:bg-blue-500 text-white rounded-xl text-lg font-medium transition-colors disabled:opacity-50 w-[50%]"
          >
            {isLoading ? "Signing up..." : "Sign up"}
          </button>
          <div className="flex w-[50%] gap-4 justify-end">
            <Image
              src="/icons/google.png"
              width={56}
              height={56}
              alt="Google"
              className="cursor-pointer transition-colors hover:opacity-80"
              onClick={() => handleSocialLogin("google")}
            />
            <Image
              src="/icons/facebook.png"
              width={56}
              height={56}
              alt="Facebook"
              className="cursor-pointer transition-colors hover:opacity-80"
              onClick={() => handleSocialLogin("facebook")}
            />
            <Image
              src="/icons/apple.png"
              width={56}
              height={56}
              alt="Apple"
              className="cursor-pointer transition-colors hover:opacity-80"
              onClick={() => handleSocialLogin("apple")}
            />
          </div>
        </div>

        <p className="text-center text-lg">
          <span className=" text-[18px] leading-[26px] font-medium text-[#8599FE]">
            Already have an account?{" "}
            <Link
              href={`/${pathname}?auth=sign-in`}
              className="text-[#8599FE] hover:text-blue-600 decoration-skip-ink-none font-bold"
            >
              Sign In
            </Link>
          </span>
        </p>
      </form>
    </div>
  );
};

export default SignUpForm;