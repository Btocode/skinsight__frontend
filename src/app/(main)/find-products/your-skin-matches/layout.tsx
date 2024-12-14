import Footer from "@/components/layout/Footer";

const YourSkinMatchesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      {children}
      <Footer />
    </div>
  );
};

export default YourSkinMatchesLayout;
