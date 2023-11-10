"use client";

import { ReactNode, useEffect, useRef, useState, useCallback } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import SliderButton from "@/components/slider/SliderButton";

type Props = {
  translateSliderBtnBy100?: boolean;
  children: ReactNode;
};

const Carousel = ({ translateSliderBtnBy100, children }: Props) => {
  const scrollContainerRef = useRef<HTMLUListElement>(null);
  const [scrollState, setScrollState] = useState({
    canScrollLeft: false,
    canScrollRight: false,
  });

  const checkScrollability = useCallback(() => {
    if (!scrollContainerRef.current) {
      console.error("No reference to scroll container.");
      return;
    }

    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setScrollState({
      canScrollLeft: scrollLeft > 0,
      canScrollRight: scrollLeft < scrollWidth - clientWidth,
    });
  }, []);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    checkScrollability();
    scrollContainer?.addEventListener("scroll", checkScrollability);
    return () => {
      scrollContainer?.removeEventListener("scroll", checkScrollability);
    };
  }, [checkScrollability]);

  const scrollToNext = useCallback(() => {
    if (!scrollContainerRef.current) {
      console.error("No reference to scroll container.");
      return;
    }

    scrollContainerRef.current.scrollBy({
      left: window.innerWidth * 0.5,
      behavior: "smooth",
    });
  }, []);

  const scrollToPrevious = useCallback(() => {
    if (!scrollContainerRef.current) {
      console.error("No reference to scroll container.");
      return;
    }

    scrollContainerRef.current.scrollBy({
      left: window.innerWidth * -0.5,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className="relative">
      <ul
        ref={scrollContainerRef}
        className=" flex gap-x-2 overflow-y-hidden overflow-x-scroll py-1"
        style={{
          scrollSnapType: "x mandatory",
          scrollPadding: "0 24px",
          scrollBehavior: "smooth",
        }}
      >
        {children}
      </ul>

      {/* Previous and Next Buttons */}
      <div className="hidden  md:flex">
        {/* left btn */}
        {scrollState.canScrollLeft && (
          <SliderButton
            handleClick={scrollToPrevious}
            aria-label="previous slide"
            className={`absolute left-[-20px] top-1/2 z-10 ${
              translateSliderBtnBy100
                ? "translate-y-[-100%]"
                : "translate-y-[-50%]"
            }`}
          >
            <IoIosArrowBack className=" h-[80%] w-[80%]" />
          </SliderButton>
        )}

        {/* right btn */}
        {scrollState.canScrollRight && (
          <SliderButton
            handleClick={scrollToNext}
            aria-label="next slide"
            className={`absolute right-[-20px] top-1/2 z-10 ${
              translateSliderBtnBy100
                ? "translate-y-[-100%]"
                : "translate-y-[-50%]"
            }`}
          >
            <IoIosArrowForward className=" h-[80%] w-[80%]" />
          </SliderButton>
        )}
      </div>
    </div>
  );
};

export default Carousel;
