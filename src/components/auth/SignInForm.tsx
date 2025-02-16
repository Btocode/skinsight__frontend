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
import Image from "next/image";
import Button from "../common/Button";

const SignInForm = () => {
  const pathname = usePathname();
  const router = useRouter();
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
  const [loginUser, { isLoading, isError, error: apiError, isSuccess }] =
    useLoginMutation();

  const onSubmit = async (data: LoginSchema) => {
    try {
      await loginUser(data).unwrap();
      // Only redirect if login was successful
      setTimeout(() => {
        router.push(pathname);
      }, 500);
    } catch (err) {
      console.log(err);
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

  const handleSocialLogin = (provider: string) => {
    // redirect to authentication url
    const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/sign_in_with_provider/${provider}`;
    router.push(url);
  };

  return (
    <div className="bg-white lg:px-[112px] lg:pt-[52px] lg:pb-[25px]">
      <form onSubmit={handleSubmit(onSubmit)} className="lg:px-[23.5px]">
        <div className="text-center mb-[19px]">
          <HeadingPrimary className="text-[26px] lg:text-[36px] leading-[30.94px] lg:leading-[42.84px] tracking-[-2%]">
            Log into your account
          </HeadingPrimary>
          <p className="text-accent text-base leading-[24px] tracking-[-3%]">
            View your saved searches, skincare routine and more
          </p>
        </div>
        <div className="space-y-[24px]">
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

          <div className="flex gap-[9px]">
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>

            <Image
              src="/icons/google.png"
              width={56}
              height={56}
              alt="Google"
              className="cursor-pointer transition-colors hover:opacity-80 flex-shrink-0"
              onClick={() => handleSocialLogin("google")}
            />
            <Image
              src="/icons/facebook.png"
              width={56}
              height={56}
              alt="Facebook"
              className="cursor-pointer transition-colors hover:opacity-80 flex-shrink-0"
              onClick={() => handleSocialLogin("facebook")}
            />
            <Image
              src="/icons/apple.png"
              width={56}
              height={56}
              alt="Apple"
              className="cursor-pointer transition-colors hover:opacity-80 flex-shrink-0"
              onClick={() => handleSocialLogin("apple")}
            />
          </div>
        </div>
        <p className="text-center text-lg leading-[26px] text-primary mt-[34px]">
          <span>Don&apos;t have an account? </span>
          <Link href={`${pathname}?auth=sign-up`} className="font-bold">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignInForm;
