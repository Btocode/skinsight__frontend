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
import { useAppDispatch, useAppSelector } from "@/lib/redux/hook";
import { updateUserSkinProfile } from "@/redux/slices/productSlice";
import { useRouter } from "next/navigation";
import { UserSkinProfileKey, UserSkinProfileValue } from "@/types/products";

const SelectLayout = ({ name }: { name: string }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const userSkinProfile = useAppSelector(
    (state) => state.product.userSkinProfile
  );

  const onChange = (key: UserSkinProfileKey, value: UserSkinProfileValue) => {
    dispatch(updateUserSkinProfile({ key, value }));
    setTimeout(() => {
      let path = "/find-products/";
      if (key === "gender") {
        path += "skin-type";
      }
      if (key === "skinType") {
        path += "complexion";
      }
      if (key === "complexion") {
        path += "skin-concern";
      }
      if (key === "age") {
        path += "region";
      }
      if (key !== "skinConcern" && key !== "region") {
        router.push(path);
      }
    }, 1000);
  };

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
    gender: <SelectGender value={userSkinProfile.gender} onChange={onChange} />,
    "skin-type": (
      <SelectSkinType value={userSkinProfile.skinType} onChange={onChange} />
    ),
    complexion: (
      <SelectComplexion
        value={userSkinProfile.complexion}
        onChange={onChange}
      />
    ),
    "skin-concern": (
      <SelectSkinConcern
        value={userSkinProfile.skinConcern}
        onChange={onChange}
      />
    ),
    age: <SelectAge value={userSkinProfile.age} onChange={onChange} />,
    region: <SelectRegion value={userSkinProfile.region} onChange={onChange} />,
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
              <p className="text-[15px] font-medium lg:font-normal leading-[17.85px] tracking-[-0.02em] lg:tracking-normal lg:text-xl text-base lg:leading-[26px] text-accent">
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
