"use client";
import { useRouter } from "next/navigation";
import { ComponentProps } from "react";
import Button from "./Button";
import { cn } from "@/lib/utils";

type BackButtonProps = {
  buttonProps?: ComponentProps<"button">;
  svgProps?: ComponentProps<"svg">;
  onClick?: () => void;
};

const BackButton = (props: BackButtonProps) => {
  const router = useRouter();
  return (
    <Button
      variant={"back"}
      {...props.buttonProps}
      className={cn("px-4", props.buttonProps?.className)}
      onClick={() => (props.onClick ? props.onClick() : router.back())}
      icon={
        <svg
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          {...props.svgProps}
        >
          <path
            d="M3 12.5L8 17.5M3 12.5L8 7.5M3 12.5H21"
            stroke="#2C2C2C"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      }
    >
      Back
    </Button>
  );
};

export default BackButton;
