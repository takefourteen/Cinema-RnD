"use client";

import { ReactElement, ReactNode } from "react";
import { AnimatePresence } from "framer-motion";

import SliderBody from "./SliderBody";

type SliderProps = {
  sliderHeaderComponent: ReactNode;
  sliderBodyComponent: ReactElement<typeof SliderBody>;
};

/* 
By specifying the ReactElement<typeof SpecificSliderBody> type for the 
sliderBodyComponent prop in the Slider component, you ensure 
that only the specific type of SliderBody is accepted.
*/

const Slider = ({
  sliderHeaderComponent,
  sliderBodyComponent,
}: SliderProps) => {
  return (
    <AnimatePresence>
      <section className=" master-container pt-[64px] lg:pt-[72px]">
        <div className="flex h-full w-full grid-cols-10 flex-col md:grid">
          {sliderHeaderComponent}

          <div className=" col-span-6 mt-4 flex h-full flex-1 flex-col justify-start md:justify-center lg:mt-6 ">
            {sliderBodyComponent}
          </div>
        </div>
      </section>
    </AnimatePresence>
  );
};

export default Slider;
