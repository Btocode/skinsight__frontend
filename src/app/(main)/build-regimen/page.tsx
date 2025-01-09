import BackButton from "@/components/common/BackButton";
import Button from "@/components/common/Button";
import GradientImage from "@/components/common/GradientImage";
import HeadingPrimary from "@/components/common/HeadingPrimary";
import Image from "next/image";
import Link from "next/link";
import BuildRegimenImg from "../../../../public/build-regimen.png";

const BuildRegimenPage = () => {
  return (
    <section className="container min-h-[80svh] lg:flex items-center justify-between py-10">
      <article className="flex-1 space-y-2 lg:space-y-6">
        <BackButton />
        <HeadingPrimary className="leading-[44px]">
          Build your regimen
        </HeadingPrimary>
        <Image
          src={BuildRegimenImg}
          alt="Find Products"
          className="lg:hidden"
        />
        <p className="max-w-xl text-lg lg:text-2xl font-normal leading-[36px] tracking-[-0.03em]">
          Answer a few questions and let us build you your perfect skincare
          regimen
        </p>
        <Link
          href={"/build-regimen/comfortable-products-count"}
          className="w-full inline-block"
        >
          <Button className="px-12">Let&apos;s go</Button>
        </Link>
      </article>
      <div className="hidden lg:block flex-1 relative h-[550px] mt-16 lg:mt-0">
        <Image
          src={"/build-regimen.png"}
          alt="Find Products"
          fill
          priority
          sizes="(100vw, 100vh)"
          className="object-cover"
        />
      </div>
      <GradientImage />
    </section>
  );
};

export default BuildRegimenPage;
