import GradientImage from "@/components/common/GradientImage";
import Footer from "@/components/layout/Footer";

const StaticPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <hr className="w-full h-px my-4 lg:my-8 bg-[#EFEFEF]" />
      <Footer />
      <GradientImage />
    </>
  );
};

export default StaticPageLayout;
