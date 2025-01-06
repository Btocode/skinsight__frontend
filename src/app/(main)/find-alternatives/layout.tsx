import Footer from "@/components/layout/Footer";

const FindAlternativesLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <>
      {children}
      <Footer />
    </>
  );
};

export default FindAlternativesLayout;
