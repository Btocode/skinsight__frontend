"use client";

import { useAppSelector } from "@/lib/redux/hook";
import { useMakeRecommendationMutation } from "@/lib/services/productApi";
import { motion, useAnimation } from "motion/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Progressbar = ({ name }: { name: string }) => {
  const router = useRouter();
  const controls = useAnimation();
  const userSkinProfile = useAppSelector(
    (state) => state.product.userSkinProfile
  );
  const [makeRecommendation, { isLoading, data }] =
    useMakeRecommendationMutation();


  // Step 1: Make the recommendation API call when component mounts
  useEffect(() => {
    if (userSkinProfile && name === "find-perfect-match" && !localStorage.getItem('quizId')) {
      makeRecommendation({
        gender: userSkinProfile.gender || "male",
        skin_type: userSkinProfile.skin_type || "combination",
        skin_complexion: userSkinProfile.skin_complexion || "pale",
        concern_acne: userSkinProfile.skin_concern.includes("acne"),
        concern_dark_spots: userSkinProfile.skin_concern.includes("dark spots"),
        concern_pores: userSkinProfile.skin_concern.includes("pores"),
        concern_wrinkles: userSkinProfile.skin_concern.includes("wrinkles"),
        concern_dryness: userSkinProfile.skin_concern.includes("dryness"),
        concern_sensitivity: userSkinProfile.skin_concern.includes("sensitivity"),
        age_group: userSkinProfile.age_group || "13-17",
        country: userSkinProfile.region?.split(",")[0] || "string",
        region: userSkinProfile.region?.split(",")[1]?.trim() || "string",
      });
    }
  }, [makeRecommendation, userSkinProfile, name]);

  // Step 2: When recommendation data is received, save ID and mark as complete
  useEffect(() => {
    if (data) {
      localStorage.setItem('quizId', data);
    }
  }, [data]);

  // Step 3: Handle progress bar animation and navigation
  useEffect(() => {
    if (name !== "find-perfect-match") return;

    const animateProgress = async () => {
      await controls.start({ width: "50%" });
      await new Promise((resolve) => setTimeout(resolve, 500));
      await controls.start({ width: "100%" });
      // Uncomment the following line when you're ready to navigate
      if (localStorage.getItem('quizId')) {
        router.push("/find-products/your-skin-matches");
      }
      else {
        animateProgress();
      }
    };

    animateProgress();

    // Cleanup function
    return () => {
      controls.stop();
    };
  }, [controls, router, data, name]);

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
