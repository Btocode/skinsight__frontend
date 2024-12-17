"use client";
import { Accordion } from "@/components/common/Accordion";
import Button from "@/components/common/Button";
import HeadingPrimary from "@/components/common/HeadingPrimary";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const faqs = [
  {
    question: "how to get personalized recommendations",
    answer:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries",
  },
  {
    question: "can i find alternatives to my discontinued products",
    answer:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries",
  },
  {
    question: "how to find products that work for my skin",
    answer:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries",
  },
  {
    question: "how can i find new products that work for me",
    answer:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries",
  },
  {
    question: "can i build my skincare regimen",
    answer:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries",
  },
];

const HelpPage = () => {
  const [activeId, setActiveId] = useState("0"); // Start with the first accordion open

  const handleToggle = (id: string) => {
    setActiveId(id === activeId ? "" : id); // Toggle the active accordion
  };

  const styles = {
    heading: "text-2xl font-medium leading-[36px] text-accent",
    body: "text-[#15143966] text-base leading-[26px]",
  };
  return (
    <section className="container py-10">
      <div>
        <p className="text-accent text-[24px] leading-[26px] font-semibold mb-2">
          Learn more about
        </p>
        <HeadingPrimary className="lg:text-4xl">Skinsight</HeadingPrimary>
        <hr className="w-full h-px my-8 bg-[#EFEFEF]" />
      </div>
      <article className="max-w-[1350px] mx-auto mt-10 flex flex-col gap-8">
        <div className="space-y-2">
          <h4 className={styles.heading}>Help</h4>
          <p className={styles.body}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry&apos;s standard dummy
            text ever since the 1500s, when an unknown printer took a galley of
            type and scrambled it to make a type specimen book. It has survived
            not only five centuries, but also the leap into electronic
            typesetting, remaining essentially unchanged.Lorem Ipsum is simply
            dummy text of the printing and typesetting industry. Lorem Ipsum has
            been the industry&apos;s standard dummy text ever since the 1500s,
            when an unknown printer took a galley of type and scrambled it to
            make a type specimen book. It has survived not only five centuries,
            but also the leap into electronic typesetting, remaining essentially
            unchanged.
          </p>
        </div>
        <div className="space-y-2">
          <h4 className={styles.heading}>Terms and conditions</h4>
          <p className={styles.body}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry&apos;s standard dummy
            text ever since the 1500s, when an unknown printer took a galley of
            type and scrambled it to make a type specimen book. It has survived
            not only five centuries, but also the leap into electronic
            typesetting, remaining essentially unchanged.Lorem Ipsum is simply
            dummy text of the printing and typesetting industry. Lorem Ipsum has
            been the industry&apos;s standard dummy text ever since the 1500s,
            when an unknown printer took a galley of type and scrambled it to
            make a type specimen book. It has survived not only five centuries,
            but also the leap into electronic typesetting, remaining essentially
            unchanged.
          </p>
        </div>

        <div className="space-y-4">
          <h4 className={styles.heading}>Frequently asked questions</h4>
          <div className="flex  items-center gap-10">
            <div className="space-y-2 lg:w-2/3">
              {faqs.map((item, _idx) => (
                <Accordion
                  key={_idx}
                  isActive={activeId === `${_idx}`}
                  onToggle={() => handleToggle(`${_idx}`)}
                  title={item.question}
                  content={item.answer}
                  titleClassName="text-[14px] font-bold leading-[26px] tracking-[2px] text-[#1E0E62] uppercase"
                  contentClassName="text-[16px] leading-[26px] text-[#2C2C2C]"
                />
              ))}
            </div>
            <div className="w-[222px] ml-auto space-y-2">
              <h2 className="text-[14px] font-bold leading-[26px] tracking-[2px] text-[#15143966] uppercase">
                Have more Questions?
              </h2>

              <p className="text-[18px] leading-[28px] font-medium text-[#8F80E8]">
                Reach out to us on help@skinsight.me
              </p>
              <Button className="bg-[#E77CCF] hover:bg-[#E77CCF]/90 rounded-full">
                Email us
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className={styles.heading}>Disclaimers</h4>
          <p className={styles.body}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry&apos;s standard dummy
            text ever since the 1500s, when an unknown printer took a galley of
            type and scrambled it to make a type specimen book. It has survived
            not only five centuries, but also the leap into electronic
            typesetting, remaining essentially unchanged.Lorem Ipsum is simply
            dummy text of the printing and typesetting industry. Lorem Ipsum has
            been the industry&apos;s standard dummy text ever since the 1500s,
            when an unknown printer took a galley of type and scrambled it to
            make a type specimen book. It has survived not only five centuries,
            but also the leap into electronic typesetting, remaining essentially
            unchanged.
          </p>
        </div>
        <p className={styles.body}>
          You can read more about our{" "}
          <Link
            href={"/privacy-policy"}
            className="font-medium text-[#8F80E8] underline"
          >
            Privacy Policy and Terms and Conditions here
          </Link>
        </p>
      </article>
      <Image
        src={"/gradient1.png"}
        alt="gradient1"
        width={700}
        height={500}
        className="fixed -left-20 -top-20 lg:top-10 -z-10"
      />
      <Image
        src={"/gradient2.png"}
        alt="gradient3"
        width={800}
        height={200}
        className="fixed top-[700px] lg:top-[500px] -right-32 -z-10"
      />
    </section>
  );
};
export default HelpPage;
