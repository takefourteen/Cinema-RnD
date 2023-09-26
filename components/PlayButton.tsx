import React, { ReactNode, ButtonHTMLAttributes } from "react";
import Link from "next/link";

import { BsFillPlayFill } from "react-icons/bs";
import { Button } from "./ui/button";

interface PlayButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  size?: "sm" | "lg";
  asLink?: boolean;
  href?: string;
}

const PlayButton = ({
  children,
  size = "lg",
  className = "",
  asLink = false,
  href,
  ...props
}: PlayButtonProps) => {
  const baseClassName =
    "bg-white text-black hover:bg-gray-200 flex items-center justify-start rounded-sm  text-lg font-semibold tracking-wide shadow-md transition duration-300 ease-in-out";
  const sizeClassName =
    size === "sm" ? "px-6 py-2 lg:px-8 lg:py-2" : "px-8 py-2";
  const finalClassName = `${baseClassName} ${sizeClassName} ${className}`;

  return (
    <Button
      {...props}
      className={finalClassName}
      type="button"
      asChild={asLink}
    >
      {/* if asLink is true wrap icon and children aroung Link */}
      {asLink ? (
        <Link href={`${href}`}>
          <BsFillPlayFill
            className={`mr-2 h-6 w-6 ${
              size === "sm" ? "lg:h-5 lg:w-5" : "lg:h-8 lg:w-8"
            }`}
          />
          {children}
        </Link>
      ) : (
        <>
          <BsFillPlayFill
            className={`mr-2 h-6 w-6 ${
              size === "sm" ? "lg:h-5 lg:w-5" : "lg:h-8 lg:w-8"
            }`}
          />
          {children}
        </>
      )}
    </Button>
  );
};

export default PlayButton;
