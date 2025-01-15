import BackButton from "@/components/common/BackButton";
import GradientImage from "@/components/common/GradientImage";
import Image from "next/image";
import Link from "next/link";
import FindProductsImg from "../../../../public/find-products.png";
import HeadingPrimary from "@/components/common/HeadingPrimary";
import Button from "@/components/common/Button";
import SectionOpacity from "@/components/animations/SectionOpacity";

const FindProductsPage = () => {
  return (
    <SectionOpacity>
      <section className="container min-h-[85svh] lg:flex items-center justify-between py-10 relative">
        <article className="basis-[514px]">
          <div className="space-y-2 lg:space-y-[12px]">
            <BackButton />
            <HeadingPrimary className="text-[28px] leading-[33.32px] lg:text-[42px] lg:leading-[49.98px] font-semibold tracking-[-0.02em]">
              Find my products
            </HeadingPrimary>
            <Image
              src={FindProductsImg}
              alt="Find Products"
              className="lg:hidden"
            />
            <p className="text-base text-accent leading-[24px] lg:text-2xl lg:leading-[36px] tracking-[-0.03em]">
              Take this small quiz to help us understand your skin and get
              matched with the products most suitable products for your skin
            </p>
          </div>
          <Link
            href={`/find-products/gender`}
            className="w-full inline-block cursor-pointer mt-[48px] lg:mt-[20px]"
          >
            <Button className="w-[140px] lg:w-[184px] h-[50px] lg:h-[60px] p-0 text-[18px] lg:text-xl font-medium leading-[26px]">
              Let&apos;s go
            </Button>
          </Link>
        </article>
        <Image
          src={FindProductsImg}
          width={614.83}
          height={394.58}
          alt="Find Products"
          className="hidden lg:block"
        />

        <GradientImage />
      </section>
    </SectionOpacity>
  );
};

export default FindProductsPage;
