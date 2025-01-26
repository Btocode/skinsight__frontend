"use client";

import Footer from "@/components/layout/Footer";
import AccountTabs from "./_components/AccountTabs";
import Advertisement from "@/components/common/Advertisement";
import { useAppSelector } from "@/lib/redux/hook";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AccountLayout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const userName = user?.display_name;
  const router = useRouter();


  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  return (
    <div className="min-h-svh bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:w-[90%]">
        <h1 className="text-4xl leading-[54px] tracking-tight text-center mb-8">
          Welcome, <span className="font-bold">{userName?.split(" ")[0]}!</span>
        </h1>
        <AccountTabs />
        {children}
        <Advertisement />
      </div>
      <Footer />
    </div>
  );
};

export default AccountLayout;
