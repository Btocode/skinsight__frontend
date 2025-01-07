import { cn } from "@/lib/utils";
import { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-xl font-medium disabled:bg-opacity-10 disabled:cursor-default transition-all duration-300 ease-in-out",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-white hover:bg-primary/80 border-2 border-primary ",
        secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
        back: "rounded-md hover:bg-gray-400 hover:bg-clip-padding hover:backdrop-filter hover:backdrop-blur-sm hover:bg-opacity-10",
        outline:
          "border-2 border-primary text-primary text-xl rounded-xl hover:bg-primary/50 transition-colors",
        ghost: "text-gray-800 hover:bg-gray-100",
        icon: "w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100",
      },
      size: {
        small: "text-sm px-4 py-2",
        medium: "text-base px-6 py-3",
        large: "text-lg px-8 py-3",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "medium",
    },
  }
);

type ButtonProps = ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    icon?: React.ReactNode;
    iconPosition?: "left" | "right";
    iconClassName?: string;
  };

const Button = ({
  className,
  variant,
  size,
  icon,
  iconPosition = "left",
  iconClassName,
  type = "button",
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      type={type}
      {...props}
    >
      {icon && iconPosition === "left" && (
        <span className={cn("mr-2", iconClassName)}>{icon}</span>
      )}
      {props.children}
      {icon && iconPosition === "right" && (
        <span className={cn("ml-2", iconClassName)}>{icon}</span>
      )}
    </button>
  );
};

export default Button;
