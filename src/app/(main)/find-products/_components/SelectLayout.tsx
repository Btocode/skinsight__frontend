"use client";
import BackButton from "@/components/common/BackButton";
import SelectGender from "./SelectGender";
import SelectSkinType from "./SelectSkinType";
import SelectComplexion from "./SelectComplexion";
import SelectSkinConcern from "./SelectSkinConcern";
import SelectAge from "./SelectAge";
import SelectRegion from "./SelectRegion";
import FindPerfectMatch from "./FindPerfectMatch";
import Image from "next/image";

const SelectLayout = ({ name }: { name: string }) => {
  const getText: { [key: string]: JSX.Element | string } = {
    gender: "What’s your gender?",
    "skin-type": "What’s your skin type?",
    complexion: "What’s your complexion?",
    "skin-concern": "What’s are skin concerns?",
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
    <section className="container flex justify-center items-center min-h-[85svh] relative">
      <div className="flex flex-col gap-8">
        <div className="space-y-6">
          <BackButton />
          {/* range slider */}
          {name === "find-perfect-match" && (
            <div className="h-5 w-full  bg-[#8F80E829] relative rounded-full overflow-hidden">
              <span className="absolute top-0 left-0 w-1/2 h-full rounded-r-full bg-[#8F80E8] "></span>
            </div>
          )}
          <h2 className="heading-primary">{getText[name]}</h2>
        </div>
        {components[name]}
      </div>
      <Image
        src={"/gradient1.png"}
        alt="gradient1"
        width={550}
        height={420}
        className="absolute left-0 -top-20 lg:top-10 -z-10"
      />
      <Image
        src={"/gradient2.png"}
        alt="gradient1"
        width={800}
        height={475}
        className="absolute top-[700px] lg:top-[520px] -right-20 lg:right-64 -z-10"
      />
    </section>
  );
};

export default SelectLayout;
