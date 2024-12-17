import BackButton from "@/components/common/BackButton";
import HeadingPrimary from "@/components/common/HeadingPrimary";
import Image from "next/image";

const PrivacyPolicyPage = () => {
  const styles = {
    heading: "text-2xl font-medium leading-[36px] text-accent",
    body: "text-[#15143966] text-base leading-[26px]",
  };
  return (
    <section className="container py-10">
      <div>
        <BackButton />
        <HeadingPrimary className="lg:text-4xl">Privacy Policy</HeadingPrimary>
        <hr className="w-full h-px my-8 bg-[#EFEFEF]" />
      </div>
      <article className="max-w-[1350px] mx-auto mt-10 flex flex-col gap-8">
        <div className="space-y-8">
          <h4 className={styles.heading}>Privacy Policy</h4>
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
        <h4 className={styles.heading}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry&apos;s standard dummy text
          ever since the 1500s, when an unknown printer took a galley.
        </h4>

        <div className="space-y-8">
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

export default PrivacyPolicyPage;