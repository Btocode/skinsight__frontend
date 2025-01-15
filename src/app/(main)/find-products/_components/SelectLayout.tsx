"use client";
import BackButton from "@/components/common/BackButton";
import SelectGender from "./SelectGender";
import SelectSkinType from "./SelectSkinType";
import SelectComplexion from "./SelectComplexion";
import SelectSkinConcern from "./SelectSkinConcern";
import SelectAge from "./SelectAge";
import SelectRegion from "./SelectRegion";
import GradientImage from "@/components/common/GradientImage";
import HeadingPrimary from "@/components/common/HeadingPrimary";

import SectionTransform from "@/components/animations/SectionTransform";
import Progressbar from "./Progressbar";

const SelectLayout = ({ name }: { name: string }) => {
  const getText: { [key: string]: JSX.Element | string } = {
    gender: "What’s your gender?",
    "skin-type": "What’s your skin type?",
    complexion: "What’s your complexion?",
    "skin-concern": "What's are skin concerns?",
    age: "What’s your age?",
    region: "Select your region",
    "find-perfect-match": (
      <span>
        Finding your perfect <br /> match
      </span>
    ),
  };

  const components: { [key: string]: JSX.Element } = {
    gender: <SelectGender />,
    "skin-type": <SelectSkinType />,
    complexion: <SelectComplexion />,
    "skin-concern": <SelectSkinConcern />,
    age: <SelectAge />,
    region: <SelectRegion />,
  };

  return (
    <section className="container lg:flex justify-center lg:items-center min-h-[85svh] px-8 lg:px-4 py-8 lg:py-10 relative">
      <SectionTransform type={name === "gender" ? "left" : "up"}>
        <div className="w-full lg:w-auto lg:space-y-8">
          <div className="space-y-2 lg:space-y-[12px]">
            <BackButton />
            {/* range slider */}
            {name === "find-perfect-match" && <Progressbar name={name} />}
            <HeadingPrimary className="text-[28px] leading-[33.32px] lg:text-[48px] font-semibold lg:leading-[57.12px] tracking-[-2%]">
              {getText[name]}
            </HeadingPrimary>
            {name === "skin-concern" && (
              <p className="hidden lg:block text-xl font-medium leading-[26px] text-accent">
                Select two from the options
              </p>
            )}
            {name === "find-perfect-match" && (
              <p className="text-[15px] font-medium lg:font-normal leading-[17.85px] tracking-[-0.02em] lg:tracking-normal text-xl lg:leading-[26px] text-accent">
                This will only take a few seconds
              </p>
            )}
          </div>
          {components[name]}
        </div>
      </SectionTransform>
      <GradientImage />
    </section>
  );
};

export default SelectLayout;
