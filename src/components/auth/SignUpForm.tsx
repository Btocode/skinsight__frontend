"use client";

import { useRegisterMutation } from "@/lib/services/authApi";
import { registerSchema, RegisterSchema } from "@/schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { usePathname, useRouter } from "next/navigation";
import { InputBox } from "@/components/common/InputBox";
import Link from "next/link";
import HeadingPrimary from "../common/HeadingPrimary";
import Image from "next/image";
import Button from "../common/Button";

const SignUpForm = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [registerUser, { isLoading, isError, error: apiError }] =
    useRegisterMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
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
      const registerData = { ...data };
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
          {(apiError as { data: { detail: string } })?.data?.detail ||
            "Registration failed"}
        </span>
      );
    }
    return null;
  };

  const handleSocialLogin = (provider: string) => {
    // redirect to authentication url
    const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/sign_in_with_provider/${provider}`;
    router.push(url);
  };

  return (
    <div className="bg-white lg:px-[100px] pt-[23px] lg:pt-[80px] lg:pb-[25px]">
      <div className="text-center mb-[19px]">
        <HeadingPrimary className="text-[26px] lg:text-[36px] leading-[30.94px] lg:leading-[42.84px] tracking-[-2%]">
          Sign up to get personalized recommendations
        </HeadingPrimary>
        <p className="text-accent text-base leading-[24px] tracking-[-3%]">
          Discover products that work for you - no more guessing!
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="lg:px-[23.5px]">
        <div className="space-y-[24px]">
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

          <div className="flex gap-[9px]">
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? "Signing up..." : "Sign up"}
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
          <span>Already have an account? </span>
          <Link href={`${pathname}?auth=sign-in`} className="font-bold">
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUpForm;
