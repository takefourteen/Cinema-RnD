import React from "react";

export interface SliderIndicatorsProps {
  activeIndex: number;
  length: number;
  maxIndicatorVisible?: number;
  onSetActiveIndex: (index: number) => void;
}

export default function SliderIndicators({
  activeIndex,
  length,
  maxIndicatorVisible = 5,
  onSetActiveIndex,
}: SliderIndicatorsProps) {
  const maxIndicator =
    length > maxIndicatorVisible ? maxIndicatorVisible : length;

  return (
    <div className="absolute bottom-0 left-1/2 flex h-5 w-24 -translate-x-1/2 transform items-center justify-center space-x-1.5 ">
      {Array.from(Array(maxIndicator), (_, index) => {
        return (
          <div
            key={index}
            className={`h-2 w-2 cursor-pointer rounded-full  transition-all duration-500 hover:h-[10px] hover:w-[10px]  hover:opacity-100
            ${
              activeIndex === index
                ? "h-[10px] w-[10px] bg-white/80 opacity-100 "
                : "w-2 bg-gray-400 opacity-50"
            }`}
            onClick={() => {
              onSetActiveIndex(index);
            }}
          ></div>
        );
      })}
    </div>
  );
}
