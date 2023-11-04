"use client";

import { ReactElement, ReactNode, memo } from "react";
import { AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

import SliderBody from "./SliderBody";

type SliderProps = {
  sliderHeaderComponent: ReactNode;
  sliderBodyComponent: ReactElement<typeof SliderBody>;
};

/**
 * Slider component.
 * This component displays a slider with a header and a body.
 * The body is only displayed when it's in view.
 *
 * @param {ReactNode} sliderHeaderComponent - The component to be displayed as the header of the slider.
 * @param {ReactElement<typeof SliderBody>} sliderBodyComponent - The component to be displayed as the body of the slider.
 */
const Slider = memo(
  ({ sliderHeaderComponent, sliderBodyComponent }: SliderProps) => {
    const [ref, inView] = useInView({
      triggerOnce: true,
      rootMargin: "100px 0px",
    });

    return (
      <AnimatePresence>
        <div className="flex h-full w-full flex-col " ref={ref}>
          {sliderHeaderComponent}

          {inView && (
            <div className=" mt-4 flex h-full flex-1 flex-col justify-start md:justify-center ">
              {sliderBodyComponent}
            </div>
          )}
        </div>
      </AnimatePresence>
    );
  },
);

// display name
Slider.displayName = "Slider";

export default Slider;
