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
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const SelectLayout = ({ name }: { name: string }) => {
  const [progress, setProgress] = useState(0);
  const router = useRouter();
  const totalDuration = 3000; // 3 seconds

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
    "find-perfect-match": <FindPerfectMatch />,
  };

  useEffect(() => {
    if (name !== "find-perfect-match") return;

    const start = performance.now();
    let animationFrameId: number;

    const updateProgress = (currentTime: number) => {
      const elapsedTime = currentTime - start;
      const nextProgress = Math.min((elapsedTime / totalDuration) * 100, 100);

      setProgress(nextProgress);

      if (nextProgress < 100) {
        animationFrameId = requestAnimationFrame(updateProgress);
      } else {
        router.push("/find-products/your-skin-matches");
      }
    };

    animationFrameId = requestAnimationFrame(updateProgress);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [router, name]);

  return (
    <section className="container flex justify-center lg:items-center min-h-[85svh] py-10 relative">
      <div className="w-full lg:w-auto lg:space-y-8">
        <div>
          <BackButton />
          {/* range slider */}
          {name === "find-perfect-match" && (
            <div className="h-5 w-full  bg-[#8F80E829] relative rounded-full overflow-hidden mb-1 lg:mb-0">
              <span
                className={`absolute top-0 left-0 h-full rounded-r-full bg-[#8F80E8] `}
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
          <HeadingPrimary className="lg:text-[48px] lg:font-semibold lg:leading-[57.12px] lg:tracking-[-0.02em]">
            {getText[name]}
          </HeadingPrimary>
          {name === "skin-concern" && (
            <p className="hidden lg:block text-xl font-medium leading-[26px]">
              Select two from the options
            </p>
          )}
        </div>
        {components[name]}
      </div>
      <GradientImage />
    </section>
  );
};

export default SelectLayout;
