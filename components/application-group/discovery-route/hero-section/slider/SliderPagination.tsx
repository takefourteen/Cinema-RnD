import { memo } from "react";

import {
  BsChevronRight as ChevronRight,
  BsChevronLeft as ChevronLeft,
} from "react-icons/bs";

export interface SliderIndicatorsProps {
  activeIndex: number;
  length: number;
  maxIndicatorVisible?: number;
  onSetActiveIndex: (index: number) => void;
}

const SliderPagination = ({
  activeIndex,
  length,
  maxIndicatorVisible = 5,
  onSetActiveIndex,
}: SliderIndicatorsProps) => {
  const maxIndicator =
    length > maxIndicatorVisible ? maxIndicatorVisible : length;

  // function that sets the slideNumber to the index of the indicator that was clicked, wrapped in useCallback
  const handleRightClick = () => {
    if (activeIndex === length - 1) {
      onSetActiveIndex(0);
    } else {
      onSetActiveIndex(activeIndex + 1);
    }
  };

  function handleLeftClick() {
    if (activeIndex === 0) {
      onSetActiveIndex(length - 1);
    } else {
      onSetActiveIndex(activeIndex - 1);
    }
  }

  function handleSetActiveIndex(index: number) {
    onSetActiveIndex(index);
  }

  return (
    <>
      {/* left button */}
      <button
        onClick={handleLeftClick}
        className="absolute left-0 top-1/2  flex h-full w-12 -translate-y-1/2 transform cursor-pointer items-center justify-center text-white transition duration-300 hover:scale-125 "
        title="Previous slide"
        aria-label="Previous slide"
        role="button"
        tabIndex={0}
      >
        <ChevronLeft className="h-8 w-8" />
      </button>
      <div className="absolute bottom-3 left-1/2  flex -translate-x-1/2 transform items-center justify-center space-x-2 ">
        {/* indicators */}
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
              onClick={() => handleSetActiveIndex(index)}
              tabIndex={0}
              role="button"
              aria-label={`Slide ${index + 1}`}
            ></div>
          );
        })}
      </div>
      {/* right button */}
      <button
        className="absolute right-0 top-1/2 flex h-full w-12 -translate-y-1/2 transform cursor-pointer items-center justify-center bg-gradient-to-l from-black/90 via-black/30 to-transparent  text-white transition duration-300 hover:scale-125 "
        onClick={handleRightClick}
        title="Next slide"
        aria-label="Next slide"
        role="button"
        tabIndex={0}
      >
        <ChevronRight className="h-8 w-8" />
      </button>
    </>
  );
};

export default memo(SliderPagination);
