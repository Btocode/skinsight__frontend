import Footer from "@/components/layout/Footer";

const StaticPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <Footer />
    </>
  );
};

export default StaticPageLayout;
