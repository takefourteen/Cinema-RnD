"use client";

import React from "react";
import { AnimatePresence } from "framer-motion";

import MediaCard from "../MediaCard";
import MotionMediaCard from "./MotionMediaCard";
import SliderHeader from "./SliderHeader";
import SliderBody from "./SliderBody";
import Controls from "./Controls";

type SliderProps = {
  sliderData: MediaCardData[];
  initData: MediaCardData;
};

const Slider = ({ sliderData, initData }: SliderProps) => {
  const [data, setData] = React.useState<MediaCardData[]>(sliderData.slice(1));
  const [transitionData, setTransitionData] = React.useState<MediaCardData>(
    sliderData[0],
  );
  const [currentSlideData, setCurrentSlideData] =
    React.useState<CurrentSlideData>({
      data: initData,
      index: 0,
    });

  return (
    <AnimatePresence>
      <div className=" flex h-full w-full grid-cols-10 flex-col md:grid">
        <SliderHeader
          sectionTitle="Popular Movies"
          viewAllLink="/movies/popular"
        />
        <div className=" col-span-6 mt-4 flex h-full flex-1 flex-col justify-start md:justify-center lg:mt-6 ">
          <SliderBody>
            {data.map((data) => (
              <MotionMediaCard
                key={data.id}
                data={data}
                aspect_ratio="9:16"
                loaderType="spinner"
              />
            ))}
          </SliderBody>

          <Controls
            currentSlideData={currentSlideData}
            data={data}
            transitionData={transitionData}
            initData={initData}
            handleData={setData}
            handleTransitionData={setTransitionData}
            handleCurrentSlideData={setCurrentSlideData}
            sliderData={sliderData}
          />
        </div>
      </div>
    </AnimatePresence>
  );
};

export default Slider;
