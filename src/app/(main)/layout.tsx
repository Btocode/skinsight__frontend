import { Header } from "@/components/layout/Header";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />

      {children}
    </div>
  );
};

export default MainLayout;
