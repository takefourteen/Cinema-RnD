"use client";

import React, { useRef, useState, useEffect } from "react";

import SliderPagination from "./SliderPagination";

interface SliderProps {
  children: React.ReactNode;
  lengthOfList: number;
}

const DiscoverySlider: React.FC<SliderProps> = ({ lengthOfList, children }) => {
  const listRef = useRef<HTMLUListElement | null>(null);
  const [slideNumber, setSlideNumber] = useState<number>(0);
  const [listWidth, setListWidth] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  useEffect(() => {
    if (listRef.current) {
      setListWidth(listRef.current.scrollWidth);
    }
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (!isPaused) {
      interval = setInterval(() => {
        setSlideNumber((slideNumber + 1) % lengthOfList);
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [slideNumber, isPaused, lengthOfList]);

  function handleSetActiveIndex(index: number) {
    setSlideNumber(index);
  }

  function handleMouseEnter() {
    setIsPaused(true);
  }

  function handleMouseLeave() {
    setIsPaused(false);
  }

  return (
    <section
      className="group relative h-full w-full overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <ul
        className="flex  transform transition-transform duration-500 ease-in-out"
        ref={listRef}
        style={{
          transform: `translateX(-${slideNumber * 100}vw)`,
          width: `${listWidth}px`,
        }}
      >
        {/* Slider Items */}
        {children}
      </ul>

      {/* Pagination */}
      <div className="master-container relative opacity-0 transition-opacity  group-hover:opacity-100">
        <SliderPagination
          activeIndex={slideNumber}
          length={lengthOfList}
          onSetActiveIndex={handleSetActiveIndex}
        />
      </div>
    </section>
  );
};

export default DiscoverySlider;
