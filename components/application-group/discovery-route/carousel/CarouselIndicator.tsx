import React from "react";

export interface CarouselIndicatorProps {
  activeIndex: number;
  length: number;
  maxIndicatorVisible?: number;
  onSetActiveIndex: (index: number) => void;
}

export default function CarouselIndicator({
  activeIndex,
  length,
  maxIndicatorVisible = 5,
  onSetActiveIndex,
}: CarouselIndicatorProps) {
  const maxIndicator =
    length > maxIndicatorVisible ? maxIndicatorVisible : length;

  return (
    <div className="absolute bottom-0 left-1/2 flex h-5 w-24 -translate-x-1/2 transform items-center justify-center space-x-1.5 md:-bottom-10">
      {Array.from(Array(maxIndicator), (_, index) => {
        return (
          <div
            key={index}
            className={`h-2 w-2 cursor-pointer rounded-full bg-white  transition-all duration-500 hover:w-4 hover:opacity-100
            ${activeIndex === index ? "w-3 opacity-100 " : "w-2 bg-gray-400 opacity-50"}`}
            onClick={() => {
              onSetActiveIndex(index);
            }}
          ></div>
        );
      })}
    </div>
  );
}
