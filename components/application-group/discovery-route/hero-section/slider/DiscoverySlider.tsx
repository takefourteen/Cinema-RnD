"use client";

import React, {
  useRef,
  useState,
  useEffect,
  ButtonHTMLAttributes,
} from "react";

import {
  BsChevronRight as ChevronRight,
  BsChevronLeft as ChevronLeft,
} from "react-icons/bs";

import SliderIndicators from "./SliderIndicators";

interface SliderProps {
  children: React.ReactNode;
  lengthOfList: number;
}

const DiscoverySlider: React.FC<SliderProps> = ({ lengthOfList, children }) => {
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

  const handleLeftClick = (): void => {
    if (slideNumber > 0) {
      setSlideNumber(slideNumber - 1);
    }
  };

  const handleRightClick = (): void => {
    if (slideNumber < lengthOfList - 1) {
      setSlideNumber(slideNumber + 1);
    }
  };

  // function that sets the slideNumber to the index of the indicator that was clicked
  const handleSetActiveIndex = (index: number) => {
    setSlideNumber(index);
  };

  return (
    <section className="relative h-full w-full overflow-hidden">
      {/* Slider Body */}
      <ul
        className="flex transform transition-transform duration-500 ease-in-out"
        ref={listRef}
        style={{
          transform: `translateX(-${slideNumber * 100}vw)`,
          width: `${listWidth}px`,
        }}
      >
        {/* Slider Items */}
        {children}
      </ul>

      {/* Slider Buttons */}
      <div className=" flex items-center gap-3 px-0 py-3 md:px-1 md:py-5 ">
        <SliderButton
          direction="left"
          onClick={handleLeftClick}
          disabled={slideNumber === 0 ? true : false}
          style={{
            display: `${slideNumber === 0 ? "none" : "flex"}`,
          }}
        >
          <ChevronLeft className="text-xl" />
        </SliderButton>

        <SliderButton
          direction="right"
          onClick={handleRightClick}
          disabled={
            slideNumber >= Math.ceil(listWidth / screenWidth) - 1 ? true : false
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

      {/* Slider Indicators */}
      <SliderIndicators
        activeIndex={slideNumber}
        length={lengthOfList}
        onSetActiveIndex={handleSetActiveIndex}
      />
    </section>
  );
};

export default DiscoverySlider;

interface SliderButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  direction: "left" | "right";
  children: React.ReactNode;
}

const SliderButton = ({
  direction,
  children,
  ...props // Spread any additional HTML button props here
}: SliderButtonProps) => {
  const leftBtnStyle = "carousel-btn-switch-card-left carousel-btn-switch-card";
  const rightBtnStyle =
    "carousel-btn-switch-card-right carousel-btn-switch-card";

  const btnDirectionStyle = direction === "left" ? leftBtnStyle : rightBtnStyle;

  return (
    <button
      className={`${btnDirectionStyle}`}
      {...props} // Spread any additional HTML button props here
    >
      {children}
    </button>
  );
};
