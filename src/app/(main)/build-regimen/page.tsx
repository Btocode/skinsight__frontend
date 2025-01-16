import BackButton from "@/components/common/BackButton";
import Button from "@/components/common/Button";
import GradientImage from "@/components/common/GradientImage";
import HeadingPrimary from "@/components/common/HeadingPrimary";
import Image from "next/image";
import Link from "next/link";
import BuildRegimenImg from "../../../../public/build-regimen.png";
import SectionOpacity from "@/components/animations/SectionOpacity";

const BuildRegimenPage = () => {
  return (
    <SectionOpacity>
      <section className="container min-h-[80svh] lg:flex items-center justify-between py-10">
        <article className="flex-1 space-y-2 lg:space-y-3">
          <BackButton />
          <HeadingPrimary className="lg:text-[48px] font-semibold lg:leading-[57.12px] tracking-[-0.02em]">
            Build your regimen
          </HeadingPrimary>
          <Image
            src={BuildRegimenImg}
            alt="Find Products"
            className="lg:hidden"
          />
          <p className="max-w-xl text-base lg:text-2xl font-normal leading-[24px] lg:leading-[36px] tracking-[-0.03em] text-accent">
            Answer a few questions and let us build you your perfect skincare
            regimen
          </p>
          <Link href={"/build-regimen/comfortable-products-count"}>
            <Button className="mt-5 p-0 w-[184px] h-[60px] rounded-xl text-xl font-medium leading-[26px]">
              Let&apos;s go
            </Button>
          </Link>
        </article>
        <Image
          src={BuildRegimenImg}
          alt="Build Regimen"
          width={614.83}
          height={394.58}
          className="hidden lg:block"
          priority
        />
        <GradientImage />
      </section>
    </SectionOpacity>
  );
};

export default BuildRegimenPage;
