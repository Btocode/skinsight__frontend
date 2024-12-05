"use client";
import Link from "next/link";

const HomePage = () => {
  return (
    <div className="flex justify-center items-center h-screen gap-2">
      <Link
        href={"/sign-in"}
        className="text-blue-500 font-medium text-xl underline"
      >
        Sign In
      </Link>
      <Link
        href={"/forgot-password"}
        className="text-blue-500 font-medium text-xl underline"
      >
        Forgot Password
      </Link>
      <Link
        href={"/code-validation"}
        className="text-blue-500 font-medium text-xl underline"
      >
        Code Validation
      </Link>
      <Link
        href={"/set-new-password"}
        className="text-blue-500 font-medium text-xl underline"
      >
        Set New Password
      </Link>
    </div>
  );
};

export default HomePage;
