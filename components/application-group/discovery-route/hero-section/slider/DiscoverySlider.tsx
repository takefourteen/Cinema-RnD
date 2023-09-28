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

  useEffect(() => {
    if (listRef.current) {
      setListWidth(listRef.current.scrollWidth);
    }
  }, []);

  // function that sets the slideNumber to the index of the indicator that was clicked
  function handleSetActiveIndex(index: number) {
    setSlideNumber(index);
  }

  return (
    <section className="group relative h-full w-full overflow-hidden">
      {/* Slider Body */}
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

      {/* Slider Indicators */}
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
