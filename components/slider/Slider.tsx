"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";

import "./list.scss";

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
  const listRef = useRef<HTMLDivElement | null>(null);
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
    // Adjust the item width and factor as needed
    const itemsPerPage = lengthOfList
      ? Math.floor(screenWidth / lengthOfList)
      : Math.floor(screenWidth / 200); // Adjust the item width as needed
    const itemWidth = listWidth / lengthOfList;
    const maxSlideNumber = Math.floor(listWidth / (itemsPerPage * itemWidth));

    // console log slide number and screen width
    console.log("slideNumber: ", slideNumber);
    console.log("screenWidth: ", screenWidth);
    console.log("listWidth: ", listWidth);
    console.log("TranslateX: ", slideNumber * screenWidth);

    if (direction === "left" && slideNumber > 0) {
      setSlideNumber(slideNumber - 0.5);
    } else if (direction === "right" && slideNumber < lengthOfList - 1) {
      setSlideNumber(slideNumber + 0.5);
    }
  };

  return (
    <section className="list">
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

      <Separator className="mb-2 mt-1 bg-white/30 lg:mb-4 lg:mt-2" />

      {/* Slider Body */}
      <div className="wrapper relative mt-8">
        <ChevronLeft
          className="sliderArrow left h-8  w-8 border-y-2 border-s-2 border-[#c11119] md:h-10 md:w-10"
          onClick={() => handleClick("left")}
          style={{
            display: slideNumber === 0 ? "none" : undefined,
          }}
        />
        <div
          className="flex w-max transform gap-10 overflow-hidden py-4 transition-transform duration-500 ease-in-out"
          ref={listRef}
          style={{
            transform: `translateX(-${slideNumber * screenWidth}px)`,
          }}
        >
          {/* Slider Items */}
          {children}
        </div>
        <ChevronRight
          className="sliderArrow right h-8 w-8 border-y-2 border-e-2 border-[#c11119] md:h-10 md:w-10"
          onClick={() => handleClick("right")}
          style={{
            display:
              slideNumber >= Math.ceil(listWidth / screenWidth) - 1
                ? "none"
                : undefined,
          }}
        />
      </div>
    </section>
  );
};

export default Slider;
