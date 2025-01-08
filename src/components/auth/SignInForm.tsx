"use client";
import HeadingPrimary from "@/components/common/HeadingPrimary";
import { InputBox } from "@/components/common/InputBox";
import { useLoginMutation } from "@/redux/apis/authApi";
import { loginSchema } from "@/schema/auth";
import { LoginSchema } from "@/types/auth";
import { setStorageItem } from "@/utils/storage";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";

const SignInForm = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { control, handleSubmit } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [loginUser, { isLoading, isError, error }] = useLoginMutation();

  const onSubmit = async (data: LoginSchema) => {
    const response = await loginUser(data).unwrap();
    setStorageItem("token", response?.access_token);
    router.push(pathname);
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

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5 lg:space-y-7"
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
              error={error ? " " : undefined}
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
              error={error ? " " : undefined}
            />
          )}
        />

        {isError && (
          <span className="text-red-600">
            {(error as { data: { detail: string } })?.data?.detail}
          </span>
        )}

        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#8599FE] hover:bg-blue-500 text-white rounded-xl py-3 text-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Signing in..." : "Sign In"}
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
