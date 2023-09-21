"use client";

import React, {
  useRef,
  useState,
  useEffect,
  ButtonHTMLAttributes,
} from "react";
import Link from "next/link";

import {
  BsChevronRight as ChevronRight,
  BsChevronLeft as ChevronLeft,
  BsArrowRight,
} from "react-icons/bs";
import { Button } from "../ui/button";
import { Separator } from "@/components/ui/separator";

interface SliderProps {
  children: React.ReactNode;
  lengthOfList: number;
  sectionTitle?: string;
  viewAllLink?: string;
}

const Slider: React.FC<SliderProps> = ({
  lengthOfList,
  sectionTitle,
  viewAllLink,
  children,
}) => {
  const listRef = useRef<HTMLUListElement | null>(null);
  const [slideNumber, setSlideNumber] = useState<number>(0);
  const [listWidth, setListWidth] = useState<number>(0);
  const [screenWidth, setScreenWidth] = useState<number>(0);

  useEffect(() => {
    if (listRef.current) {
      setListWidth(listRef.current.scrollWidth);
      setScreenWidth(window.innerWidth);
    }

    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleClick = (direction: "left" | "right"): void => {
    if (direction === "left" && slideNumber > 0) {
      setSlideNumber(slideNumber - 0.5);
    } else if (direction === "right" && slideNumber < lengthOfList - 1) {
      setSlideNumber(slideNumber + 0.5);
    }
  };

  return (
    <section className="w-full overflow-hidden">
      {/* Slider Header */}
      <div className="flex items-baseline justify-between ">
        <h2 className="text-2xl font-bold capitalize text-white md:text-3xl">
          {sectionTitle}
        </h2>

        {/* Show the View All Button if the viewAllLink is provided */}
        {viewAllLink && (
          <Button
            asChild
            variant={"link"}
            className=" group p-0  text-base text-white md:text-lg"
          >
            <Link href={viewAllLink || "#"}>
              View All
              <BsArrowRight className="ml-2 h-4 w-4 font-bold group-hover:scale-[120%] group-hover:transition-all" />
            </Link>
          </Button>
        )}
      </div>

      <Separator className="mb-2 mt-1 bg-white/30 lg:mb-4 lg:mt-2 " />

      {/* Slider Body */}
      <div className={`relative `}>
        <ul
          className="flex transform py-4 transition-transform duration-500 ease-in-out"
          ref={listRef}
          style={{
            transform: `translateX(-${slideNumber * screenWidth}px)`,
            width: `${listWidth}px`,
          }}
        >
          {/* Slider Items */}
          {children}
        </ul>

        {/* Slider Buttons */}
        <div className=" flex items-center gap-3 px-0 py-3 md:px-1 md:py-5">
          <SliderButton
            onClick={() => handleClick("left")}
            disabled={slideNumber === 0 ? true : false}
            style={{
              display: `${slideNumber === 0 ? "none" : "flex"}`,
            }}
          >
            <ChevronLeft className="text-xl" />
          </SliderButton>

          <SliderButton
            onClick={() => handleClick("right")}
            disabled={
              slideNumber >= Math.ceil(listWidth / screenWidth) - 1
                ? true
                : false
            }
            style={{
              display: `${
                slideNumber >= Math.ceil(listWidth / screenWidth) - 1
                  ? "none"
                  : "flex"
              }`,
            }}
          >
            <ChevronRight className="text-xl" />
          </SliderButton>
        </div>
      </div>
    </section>
  );
};

export default Slider;

interface SliderButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const SliderButton = ({
  children,
  ...props // Spread any additional HTML button props here
}: SliderButtonProps) => {
  return (
    <button
      className="flex h-10 w-10 items-center justify-center rounded-full border-[1px] border-[#fdfdfd5f] transition duration-300 ease-in-out hover:bg-white
hover:text-black md:h-14 md:w-14"
      {...props} // Spread any additional HTML button props here
    >
      {children}
    </button>
  );
};
