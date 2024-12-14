import BackButton from "@/components/common/BackButton";
import Image from "next/image";
import Link from "next/link";

const FindProductsPage = () => {
  return (
    <section className="container min-h-[90svh] lg:flex items-center justify-between py-10 relative">
      <article className="flex-1 space-y-6">
        <BackButton />
        <h2 className="heading-primary">Find my products</h2>
        <p className="text-2xl leading-[36px] max-w-[600px] tracking-[-3%]">
          Take this small quiz to help us understand your skin and get matched
          with the products most suitable products for your skin
        </p>
        <div className="flex flex-col lg:flex-row items-center gap-4">
          <Link href={`/find-products/gender`}>
            <button className="text-base font-medium rounded-lg px-12 py-3 bg-primary text-white">
              Let&apos;s go
            </button>
          </Link>
        </div>
      </article>
      <div className="flex-1 relative h-[550px] mt-16 lg:mt-0">
        <Image
          src={"/find-products.png"}
          alt="Find Products"
          fill
          priority
          sizes="(100vw, 100vh)"
          className="object-cover"
        />
      </div>

      <Image
        src={"/gradient1.png"}
        alt="gradient1"
        width={550}
        height={420}
        className="absolute -left-56 -top-20 lg:top-20 -z-10"
      />
      <Image
        src={"/gradient2.png"}
        alt="gradient1"
        width={800}
        height={475}
        className="absolute top-[700px] lg:top-[520px] -right-20 lg:right-52 -z-10"
      />
    </section>
  );
};

export default FindProductsPage;
