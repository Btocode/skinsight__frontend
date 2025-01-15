import GradientImage from "@/components/common/GradientImage";
import HeadingPrimary from "@/components/common/HeadingPrimary";
import Image from "next/image";
import FindAlternativeImg from "../../../../public/find-alternatives.png";
import SelectYourTargetProduct from "./_components/SelectYourTargetProduct";
import SectionOpacity from "@/components/animations/SectionOpacity";

const FindAlternativesPage = () => {
  return (
    <SectionOpacity>
      <section className="container min-h-[80svh] lg:flex items-center justify-between py-10 relative">
        <article className="flex-1 space-y-2 lg:space-y-6">
          <p className="text-lg lg:text-2xl font-semibold leading-[26px]">
            Find alternatives
          </p>
          <HeadingPrimary className="leading-[44px]">
            Select your target product
          </HeadingPrimary>
          <Image
            src={FindAlternativeImg}
            alt="Find Products"
            className="lg:hidden"
          />
          <SelectYourTargetProduct />
        </article>
        <div className="hidden lg:block flex-1 relative h-[550px] mt-16 lg:mt-0">
          <Image
            src={"/find-alternatives.png"}
            alt="Find Products"
            fill
            priority
            sizes="(100vw, 100vh)"
            className="object-cover"
          />
        </div>

        <GradientImage
          firstImage={{ url: "/gradient2.png", className: "lg:-left-[100px]" }}
          secondImage={{ url: "/gradient3.png", width: 400, height: 375 }}
        />
      </section>
    </SectionOpacity>
  );
};

export default FindAlternativesPage;
