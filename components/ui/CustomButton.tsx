import React, { ReactNode, ButtonHTMLAttributes } from "react";
import Link from "next/link";

import { Button } from "./button";

interface CtaButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>   // Extend the default HTML button props
{

  variant?: "outline" | "default";
  asChild: boolean;
  children: ReactNode;
}

const variantStyles = {
  outline:
    "bg-transparent hover:bg-[#40445999] hover:text-white outline outline-0 hover:outline-1",
  default:
    "bg-[#e50914] outline outline-0 outline-[#c11119] hover:bg-[#c11119] hover:text-white hover:outline-1",
};

const CustomButton = ({
  variant = "default",
  asChild = false,
  children,
  ...props // Spread any additional HTML button props here
}: CtaButtonProps) => {
  const defaultStyles =
    "px-6 py-2 text-sm h-fit w-max rounded-full font-bold uppercase text-white ";

  return (
    <Button
      asChild={asChild}
      variant={variant}
      {...props} // Spread any additional HTML button props here
      className={`${defaultStyles} ${variantStyles[variant]}`}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
