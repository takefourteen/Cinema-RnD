import React, { ReactNode, ButtonHTMLAttributes } from "react";
import Link from "next/link";

import { Button } from "./ui/button";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  // Extend the default HTML button props
  variant?: "outline" | "default";
  asChild: boolean;
  additionalStyles?: string;
  children: ReactNode;
}

const variantStyles = {
  default:
    "bg-[#e50914] outline outline-0 outline-[#c11119] hover:bg-[#c11119] hover:text-white hover:outline-1",
  outline:
    "bg-transparent hover:bg-[#40445999] hover:text-white outline outline-0 hover:outline-1 transition-all duration-300 ease-in-out",
};

const CustomButton = ({
  variant = "default",
  asChild = false,
  children,
  additionalStyles,
  ...props // Spread any additional HTML button props here
}: ButtonProps) => {
  const baseStyles =
    "px-6 py-2 text-sm h-fit w-max rounded-full font-bold transition-colors uppercase text-white ";

  return (
    <Button
      asChild={asChild}
      variant={variant}
      {...props} // Spread any additional HTML button props here
      className={`${baseStyles} ${variantStyles[variant]} ${additionalStyles}`}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
