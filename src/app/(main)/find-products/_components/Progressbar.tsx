"use client";

import { useAppSelector } from "@/lib/redux/hook";
import { useMakeRecommendationMutation } from "@/lib/services/productApi";
import { motion, useAnimation } from "motion/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Progressbar = ({ name }: { name: string }) => {
  const router = useRouter();
  const controls = useAnimation();
  const userSkinProfile = useAppSelector(
    (state) => state.product.userSkinProfile
  );
  const [makeRecommendation, { isLoading, data }] =
    useMakeRecommendationMutation();

  useEffect(() => {
    if (userSkinProfile) {
      makeRecommendation({
        gender: "male",
        skin_type: "combination",
        skin_complexion: "pale",
        concern_acne: true,
        concern_dark_spots: true,
        concern_pores: true,
        concern_wrinkles: true,
        concern_dryness: true,
        concern_sensitivity: true,
        age_group: "13-17",
        country: "string",
        region: "string",
      });
    }
  }, [makeRecommendation, userSkinProfile]);

  // useEffect(() => {
  //   if (name !== "find-perfect-match") return;

  //   const animateProgress = async () => {
  //     await controls.start({ width: "50%" });
  //     await new Promise((resolve) => setTimeout(resolve, 500));
  //     await controls.start({ width: "100%" });
  //     // Uncomment the following line when you're ready to navigate
  //     router.push("/find-products/your-skin-matches");
  //   };

  //   animateProgress();

  //   // Cleanup function
  //   return () => {
  //     controls.stop();
  //   };
  // }, [name, controls, router]);

  console.log(data);

  return (
    <div className="h-[10px] lg:h-[18px] w-full lg:w-[550px] bg-[#8F80E829] relative rounded-[20px] overflow-hidden mb-1 lg:mb-0">
      <motion.span
        className="absolute top-0 left-0 h-full rounded-r-[20px] bg-[#8F80E8]"
        initial={{ width: "0%" }}
        animate={controls}
        transition={{
          duration: 1.5,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

export default Progressbar;
