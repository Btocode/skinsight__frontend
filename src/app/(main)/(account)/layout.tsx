import Footer from "@/components/layout/Footer";
import AccountTabs from "./_components/AccountTabs";
import Advertisement from "@/components/common/Advertisement";

const AccountLayout = ({ children }: { children: React.ReactNode }) => {
  const userName = "Miranda";
  return (
    <div className="min-h-svh bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl leading-[54px] tracking-tight text-center mb-8">
          Welcome, <span className="font-bold">{userName}!</span>
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
