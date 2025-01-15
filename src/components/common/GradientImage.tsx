"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
// import { useEffect, useState } from "react";

type ImageProps = {
  className?: string;
  url?: string;
  width?: number;
  height?: number;
};

type GradientImageProps = {
  firstImage?: ImageProps;
  secondImage?: ImageProps;
};

const GradientImage = ({ firstImage, secondImage }: GradientImageProps) => {
  // const [mediaScreen] = useState(() =>
  //   window.matchMedia("(min-width: 1024px)")
  // );
  // console.log(mediaScreen);

  // useEffect(() => {
  //   console.log(window.matchMedia("(min-width: 1024px)"));
  // }, []);

  return (
    <>
      <Image
        src={firstImage?.url ?? "/gradient1.png"}
        alt="gradient1"
        width={firstImage?.width ?? 1000}
        height={firstImage?.height ?? 620}
        className={cn(
          "fixed -left-32 top-10 lg:-left-60 lg:-top-12 -z-10",
          firstImage?.className
        )}
        priority
        style={{ opacity: 0.8, width: "auto", height: "auto" }}
      />
      <Image
        src={secondImage?.url ?? "/gradient2.png"}
        alt="gradient2"
        width={secondImage?.width ?? 1200}
        height={secondImage?.height ?? 675}
        className={cn(
          "fixed top-[500px] -right-36 lg:right-56 lg:top-[420px]  -z-10",
          secondImage?.className
        )}
        priority
        style={{ opacity: 0.8, width: "auto", height: "auto" }}
      />
    </>
  );
};

export default GradientImage;
