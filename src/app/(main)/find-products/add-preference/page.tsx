import BackButton from "@/components/common/BackButton";
import Image from "next/image";
import ActionPreference from "./_components/ActionPreference";

const AddPreferencePage = () => {
  return (
    <section className="max-w-lg mx-auto flex justify-center items-center min-h-[85svh] relative">
      <div className="flex flex-col gap-8">
        <BackButton buttonProps={{ className: "self-start" }} />
        <div className="space-y-1">
          <h2 className="heading-primary">Current product preferences</h2>
          <p className="text-xl leading-[26px] text-accent">
            Get better results by adding at least 5 products you love and hate
            using and rate them
          </p>
        </div>
        <ActionPreference />
      </div>
      <Image
        src={"/gradient1.png"}
        alt="gradient1"
        width={550}
        height={420}
        className="fixed top-10 left-0 -z-10"
      />
      <Image
        src={"/gradient2.png"}
        alt="gradient1"
        width={800}
        height={475}
        className="fixed -bottom-40 -right-40 -z-10"
      />
    </section>
  );
};

export default AddPreferencePage;
