import React from "react";

type SliderButtonProps = {
  children: React.ReactNode;
  handleClick: () => void;
};

const SliderButton = ({
  children,
  handleClick,
  ...props
}: SliderButtonProps) => {
  return (
    <button
      className=" flex h-10 w-10 items-center justify-center rounded-full border-[1px] border-[#fdfdfd5f] text-white transition duration-300 ease-in-out hover:bg-white hover:text-black md:h-12
md:w-12 lg:h-14 lg:w-14
"
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default SliderButton;
