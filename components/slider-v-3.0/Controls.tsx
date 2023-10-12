import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Progress from "./Progress";
import SliderButton from "./SliderButton";

type Props = {
  currentSlideData: CurrentSlideData;
  sliderData: any[];
  data: any[];
  transitionData: any;
  handleData: React.Dispatch<React.SetStateAction<any[]>>;
  handleTransitionData: React.Dispatch<React.SetStateAction<any>>;
  handleCurrentSlideData: React.Dispatch<
    React.SetStateAction<CurrentSlideData>
  >;
  initData: any;
  showSliderProgress?: boolean;
};

function Controls({
  sliderData,
  data,
  transitionData,
  currentSlideData,
  handleData,
  handleTransitionData,
  handleCurrentSlideData,
  initData,
  showSliderProgress = true,
}: Props) {
  const handlePrev = () => {
    handleData((prevData) => [
      transitionData ? transitionData : initData,
      ...prevData.slice(0, prevData.length - 1),
    ]);
    handleCurrentSlideData({
      data: transitionData ? transitionData : sliderData[0],
      index: sliderData.findIndex((ele) => ele.id === data[data.length - 1].id),
    });
    handleTransitionData(data[data.length - 1]);
  };

  const handleNext = () => {
    handleData((prev) => prev.slice(1));
    handleCurrentSlideData({
      data: transitionData ? transitionData : initData,
      index: sliderData.findIndex((ele) => ele.id === data[0].id),
    });
    handleTransitionData(data[0]);
    setTimeout(() => {
      handleData((newData) => [
        ...newData,
        transitionData ? transitionData : initData,
      ]);
    }, 500);
  };

  return (
    <div className="mt-4 flex items-center gap-3 px-0 md:px-1 lg:mt-6">
      <SliderButton handleClick={handlePrev} aria-label="previous slide">
        <IoIosArrowBack className=" text-xl" />
      </SliderButton>
      <SliderButton handleClick={handleNext} aria-label="next slide">
        <IoIosArrowForward className=" text-xl" />
      </SliderButton>

      {/* show progress if showSliderProgress is true */}
      {showSliderProgress && (
        <Progress
          curIndex={currentSlideData.index}
          length={sliderData.length}
        />
      )}
    </div>
  );
}

export default Controls;
