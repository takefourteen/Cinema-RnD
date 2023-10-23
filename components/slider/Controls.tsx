import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
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
    handleData((newData) => [
      ...newData,
      transitionData ? transitionData : initData,
    ]);
  };

  return (
    <div className="flex items-center gap-3 px-0 md:px-1">
      {/* left btn */}
      <SliderButton
        handleClick={handlePrev}
        aria-label="previous slide"
        className="absolute left-[-12px] top-1/2 z-10 translate-y-[-50%]"
      >
        <IoIosArrowBack className=" h-[80%] w-[80%]" />
      </SliderButton>

      {/* right btn */}
      <SliderButton
        handleClick={handleNext}
        aria-label="next slide"
        className="absolute right-[-12px] top-1/2 z-10 translate-y-[-50%]"
      >
        <IoIosArrowForward className=" h-[80%] w-[80%]" />
      </SliderButton>
    </div>
  );
}

export default Controls;
