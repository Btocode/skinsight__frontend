import BackButton from "@/components/common/BackButton";
import ActionPreference from "./_components/ActionPreference";
import GradientImage from "@/components/common/GradientImage";
import HeadingPrimary from "@/components/common/HeadingPrimary";

const AddPreferencePage = () => {
  return (
    <section className="max-w-lg mx-auto flex justify-center lg:items-center min-h-[85svh] py-10 relative">
      <div className="flex flex-col lg:gap-3">
        <BackButton buttonProps={{ className: "self-start" }} />
        <div className="space-y-3">
          <HeadingPrimary className="lg:text-[42px] lg:leading-[49.98px] tracking-[-0.02em] font-semibold">
            Current product preferences
          </HeadingPrimary>
          <p className="text-xl font-medium leading-[26px] text-accent">
            Get better results by adding at least 5 products you love and hate
            using and rate them
          </p>
        </div>
        <ActionPreference />
      </div>
      <GradientImage />
    </section>
  );
};

export default AddPreferencePage;
