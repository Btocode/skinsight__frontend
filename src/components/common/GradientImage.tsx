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
        width={firstImage?.width ?? 600}
        height={firstImage?.height ?? 420}
        className={cn(
          "fixed -left-32 top-10 lg:left-0 lg:top-20 -z-10",
          firstImage?.className
        )}
        priority
      />
      <Image
        src={secondImage?.url ?? "/gradient2.png"}
        alt="gradient2"
        width={secondImage?.width ?? 800}
        height={secondImage?.height ?? 475}
        className={cn(
          "fixed top-[500px] -right-36 lg:right-52 lg:top-[520px]  -z-10",
          secondImage?.className
        )}
        priority
      />
    </>
  );
};

export default GradientImage;
