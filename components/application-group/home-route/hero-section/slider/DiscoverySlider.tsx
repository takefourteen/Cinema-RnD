"use client";

import { useRef, useState, useEffect, memo, useCallback } from "react";

import SliderPagination from "./SliderPagination";

interface SliderProps {
  children: React.ReactNode;
  lengthOfList: number;
}

const AUTO_SCROLL_INTERVAL = 3500;

const DiscoverySlider: React.FC<SliderProps> = ({ lengthOfList, children }) => {
  const scrollContainerRef = useRef<HTMLUListElement>(null);
  const [slideNumber, setSlideNumber] = useState(0);

  const handleSetActiveIndex = useCallback((index: number) => {
    if (!scrollContainerRef.current) {
      console.error("No reference to scroll container");
      return;
    }
    setSlideNumber(index);
    scrollContainerRef.current.scrollLeft = index * window.innerWidth;
  }, []);

  // auto scroll
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) {
      console.error("No reference to scroll container");
      return;
    }
    const interval = setInterval(() => {
      if (slideNumber === lengthOfList - 1) {
        scrollContainer.scrollLeft = 0;
        setSlideNumber(0);
      } else {
        scrollContainer.scrollLeft += window.innerWidth;
        setSlideNumber(slideNumber + 1);
      }
    }, AUTO_SCROLL_INTERVAL);
    return () => clearInterval(interval);
  }, [slideNumber, lengthOfList]);

  return (
    <section className="group relative h-full w-full overflow-hidden">
      <ul
        ref={scrollContainerRef}
        className=" flex gap-x-0 overflow-y-hidden overflow-x-scroll "
        style={{
          scrollSnapType: "x mandatory",
          scrollBehavior: "smooth",
        }}
      >
        {children}
      </ul>

      {/* Pagination */}
      <div className="master-container hidden h-full opacity-0 transition-opacity group-hover:opacity-100 md:flex">
        <SliderPagination
          activeIndex={slideNumber}
          lengthOfList={lengthOfList}
          onSetActiveIndex={handleSetActiveIndex}
        />
      </div>
    </section>
  );
};

export default memo(DiscoverySlider);
