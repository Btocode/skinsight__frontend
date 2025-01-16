import GradientImage from "@/components/common/GradientImage";
import HeadingPrimary from "@/components/common/HeadingPrimary";
import Image from "next/image";
import FindAlternativeImg from "../../../../public/find-alternatives.png";
import SelectYourTargetProduct from "./_components/SelectYourTargetProduct";
import SectionOpacity from "@/components/animations/SectionOpacity";

const FindAlternativesPage = () => {
  return (
    <SectionOpacity>
      <section className="container min-h-[80svh] lg:flex lg:gap-4 items-center justify-center py-8 lg:py-10 relative">
        <article className="lg:basis-[420px] space-y-2">
          <p className="text-lg lg:text-2xl font-semibold leading-[26px] text-accent">
            Find alternatives
          </p>
          <HeadingPrimary className="text-[38px] lg:text-[48px] font-semibold leading-[45.22px] lg:leading-[57.12px] tracking-[-0.02em] pb-4">
            Select your target product
          </HeadingPrimary>
          <Image
            src={FindAlternativeImg}
            alt="Find Products"
            className="lg:hidden"
          />
          <SelectYourTargetProduct />
        </article>
        <Image
          width={614.83}
          height={394.58}
          src={FindAlternativeImg}
          alt="Find Products"
          priority
          className="hidden lg:block"
        />
        <GradientImage />
      </section>
    </SectionOpacity>
  );
};

export default FindAlternativesPage;
