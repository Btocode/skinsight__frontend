"use client";
import HeadingPrimary from "@/components/common/HeadingPrimary";
import { InputBox } from "@/components/common/InputBox";
import { useLoginMutation } from "@/lib/services/authApi";
import { loginSchema } from "@/schema/auth";
import { LoginSchema } from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Image from "next/image";

const SignInForm = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [loginUser, { isLoading, isError, error: apiError }] =
    useLoginMutation();

  const onSubmit = async (data: LoginSchema) => {
    try {
      await loginUser(data).unwrap();
      setIsSuccess(true);
      // Only redirect if login was successful
      setTimeout(() => {
        router.push(pathname);
      }, 500);
    } catch (err) {
      console.log(err);
      setIsSuccess(false);
      // Don't redirect or change URL on error
    }
  };

  const renderError = () => {
    // Show form validation errors first
    if (formErrors.email?.message || formErrors.password?.message) {
      return (
        <span className="text-red-600">
          {formErrors.email?.message || formErrors.password?.message}
        </span>
      );
    }

    // Then show API errors
    if (!isError) return null;

    const is401 = (apiError as { status: number })?.status === 401;

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
        {(apiError as { data: { detail: string } })?.data?.detail ||
          "Login failed"}
      </span>
    );
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleSocialLogin = (provider: string) => {
    // redirect to authentication url
    const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/sign_in_with_provider/${provider}`;
    window.location.href = url;
  };

  return (
    <div className="bg-white h-[460px] mx-auto rounded-[12px] flex flex-col gap-[10px] lg:px-[60px] py-4 lg:py-[40px]">
      <div className="text-center mb-4">
        <HeadingPrimary className="text-[28px] leading-8 lg:text-4xl lg:leading-10 lg:tracking-[-2%]">
          Log into your account
        </HeadingPrimary>
        <p className="text-[#2C2C2C] text-base leading-6 tracking-[-3%]">
          View your saved searches, skincare <br className="lg:hidden" />{" "}
          routine and more
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="lg:px-[50px] space-y-5 lg:space-y-7"
      >
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
              className={isSuccess ? "bg-green-50" : ""}
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
              className={isSuccess ? "bg-green-50" : ""}
            />
          )}
        />

        {isError && renderError()}

        <div className="flex gap-4 w-full">
          <button
            type="submit"
            disabled={isLoading}
            className="w-[155px] lg:w-[243px] bg-[#8599FE] hover:bg-blue-500 text-white rounded-xl text-lg font-medium transition-colors disabled:opacity-50 "
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </button>

          <div className="flex  gap-3 justify-end">
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
          <span className="text-[18px] leading-[26px] font-medium text-[#8599FE]">
            Don&apos;t have an account?{" "}
            <Link
              href={`/${pathname}?auth=sign-up`}
              className="text-[#8599FE] hover:text-blue-600 decoration-skip-ink-none font-bold"
            >
              Sign Up
            </Link>
          </span>
        </p>
      </form>
    </div>
  );
};

export default SignInForm;
