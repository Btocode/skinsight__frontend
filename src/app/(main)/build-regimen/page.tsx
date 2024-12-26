import BackButton from "@/components/common/BackButton";
import Button from "@/components/common/Button";
import GradientImage from "@/components/common/GradientImage";
import HeadingPrimary from "@/components/common/HeadingPrimary";
import Image from "next/image";
import Link from "next/link";

const BuildRegimenPage = () => {
  return (
    <section className="container min-h-[80svh] lg:flex items-center justify-between py-10">
      <article className="flex-1 space-y-6">
        <BackButton />
        <HeadingPrimary>Build your regimen</HeadingPrimary>
        <p className="max-w-xl text-2xl font-normal leading-[36px] tracking-[-0.03em]">
          Answer a few questions and let us build you your perfect skincare
          regimen
        </p>
        <Link
          href={"/build-regimen/comfortable-products-count"}
          className="w-full inline-block"
        >
          <Button>Let&apos;s go</Button>
        </Link>
      </article>
      <div className="flex-1 relative h-[550px] mt-16 lg:mt-0">
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
