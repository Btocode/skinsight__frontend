import { Combobox } from "@/components/common/Combobox";
import HeadingPrimary from "@/components/common/HeadingPrimary";
import Image from "next/image";

const FindAlternativesPage = () => {
  return (
    <section className="container min-h-[80svh] lg:flex items-center justify-between py-10 relative">
      <article className="flex-1 space-y-6">
        <p className="text-2xl font-semibold leading-[26px]">
          Find alternatives
        </p>
        <HeadingPrimary>Select your target product</HeadingPrimary>
        <Combobox
          options={[
            { label: "Brand 1", value: "brand1" },
            { label: "Brand 2", value: "brand2" },
            { label: "Brand 3", value: "brand3" },
          ]}
          placeholder="Select brand"
        />
        <Combobox
          options={[
            { label: "Product 1", value: "Product1" },
            { label: "Product 2", value: "Product2" },
            { label: "Product 3", value: "Product3" },
          ]}
          placeholder="Select product"
        />
      </article>
      <div className="flex-1 relative h-[550px] mt-16 lg:mt-0">
        <Image
          src={"/find-alternatives.png"}
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
        src={"/gradient3.png"}
        alt="gradient3"
        width={400}
        height={375}
        className="absolute top-[700px] lg:top-[620px] -right-20 -z-10"
      />
    </section>
  );
};

export default FindAlternativesPage;
