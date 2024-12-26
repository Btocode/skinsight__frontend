import { cn } from "@/lib/utils";
import Image from "next/image";

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
  return (
    <>
      <Image
        src={firstImage?.url ?? "/gradient1.png"}
        alt="gradient1"
        width={firstImage?.width ?? 600}
        height={firstImage?.height ?? 420}
        className={cn(
          "fixed left-0 -top-20 lg:top-20 -z-10",
          firstImage?.className
        )}
      />
      <Image
        src={secondImage?.url ?? "/gradient2.png"}
        alt="gradient2"
        width={secondImage?.width ?? 800}
        height={secondImage?.height ?? 475}
        className={cn(
          "fixed top-[700px] lg:top-[520px] -right-20 lg:right-52 -z-10",
          secondImage?.className
        )}
      />
    </>
  );
};

export default GradientImage;
