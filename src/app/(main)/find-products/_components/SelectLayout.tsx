"use client";
import BackButton from "@/components/common/BackButton";
import SelectGender from "./SelectGender";
import SelectSkinType from "./SelectSkinType";
import SelectComplexion from "./SelectComplexion";
import SelectSkinConcern from "./SelectSkinConcern";
import SelectAge from "./SelectAge";
import SelectRegion from "./SelectRegion";
import FindPerfectMatch from "./FindPerfectMatch";
import GradientImage from "@/components/common/GradientImage";
import HeadingPrimary from "@/components/common/HeadingPrimary";

const SelectLayout = ({ name }: { name: string }) => {
  const getText: { [key: string]: JSX.Element | string } = {
    gender: "What’s your gender?",
    "skin-type": "What’s your skin type?",
    complexion: "What’s your complexion?",
    "skin-concern": "What are your skin concerns?",
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
    "find-perfect-match": <FindPerfectMatch />,
  };

  return (
    <section className="container flex justify-center lg:items-center min-h-[85svh] py-10 relative">
      <div className="w-full lg:w-auto lg:space-y-8">
        <div className="lg:space-y-6">
          <BackButton />
          {/* range slider */}
          {name === "find-perfect-match" && (
            <div className="h-5 w-full  bg-[#8F80E829] relative rounded-full overflow-hidden mb-1 lg:mb-0">
              <span className="absolute top-0 left-0 w-1/2 h-full rounded-r-full bg-[#8F80E8] "></span>
            </div>
          )}
          <HeadingPrimary className="leading-[44px]">
            {getText[name]}
          </HeadingPrimary>
        </div>
        {components[name]}
      </div>
      <GradientImage />
    </section>
  );
};

export default SelectLayout;
