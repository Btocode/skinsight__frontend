import BackButton from "@/components/common/BackButton";
import GradientImage from "@/components/common/GradientImage";
import Image from "next/image";
import Link from "next/link";
import FindProductImg from "../../../../public/find-products.png";
import HeadingPrimary from "@/components/common/HeadingPrimary";

const FindProductsPage = () => {
  return (
    <section className="container min-h-[85svh] lg:flex items-center justify-between py-10 relative">
      <article className="flex-1 space-y-0 lg:space-y-6">
        <BackButton />
        <HeadingPrimary>Find my products</HeadingPrimary>
        <Image src={FindProductImg} alt="Find Products" className="lg:hidden" />
        <p className="text-base leading-[24px] lg:text-2xl lg:leading-[36px] max-w-[600px] tracking-[-3%]">
          Take this small quiz to help us understand your skin and get matched
          with the products most suitable products for your skin
        </p>
        <br />
        <Link href={`/find-products/gender`} className="w-full block">
          <button className="text-base font-medium rounded-lg px-12 py-3 bg-primary text-white">
            Let&apos;s go
          </button>
        </Link>
      </article>
      <div className="hidden lg:block flex-1 relative h-[550px] mt-16 lg:mt-0">
        <Image
          src={"/find-products.png"}
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

export default FindProductsPage;
