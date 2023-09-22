import React, { ReactNode, ButtonHTMLAttributes } from "react";
import Link from "next/link";

import { BsFillPlayFill } from "react-icons/bs";
import { Button } from "./ui/button";

interface PlayButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  // Extend the default HTML button props
  children: ReactNode;
}

const PlayButton = ({ children, ...props }: PlayButtonProps) => {
  return (
    <Button
      {...props} // Spread any additional HTML button props here
      className="mt-6 lg:mt-8 flex items-center justify-center rounded-sm bg-white px-8 py-3 text-lg font-semibold tracking-wide text-black shadow-md transition duration-300 ease-in-out hover:bg-gray-200 lg:text-xl"
      type="button"
    >
      <BsFillPlayFill className="mr-2 h-4 w-4 lg:h-6 lg:w-6" />
      {children}
    </Button>
  );
};

export default PlayButton;
