import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Progress from "./Progress";

type Props = {
  currentSlideData: CurrentSlideData;
  sliderData: any[];
  data: MediaCardData[];
  transitionData: MediaCardData;
  handleData: React.Dispatch<React.SetStateAction<MediaCardData[]>>;
  handleTransitionData: React.Dispatch<React.SetStateAction<MediaCardData>>;
  handleCurrentSlideData: React.Dispatch<
    React.SetStateAction<CurrentSlideData>
  >;
  initData: MediaCardData;
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
      index: sliderData.findIndex(
        (ele) => ele.poster_path === data[data.length - 1].poster_path,
      ),
    });
    handleTransitionData(data[data.length - 1]);
  };

  const handleNext = () => {
    handleData((prev) => prev.slice(1));
    handleCurrentSlideData({
      data: transitionData ? transitionData : initData,
      index: sliderData.findIndex(
        (ele) => ele.poster_path === data[0].poster_path,
      ),
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
      <Progress curIndex={currentSlideData.index} length={sliderData.length} />
    </div>
  );
}

export default Controls;

const SliderButton = ({
  children,
  handleClick,
  ...props
}: {
  children: React.ReactNode;
  handleClick: () => void;
}) => {
  return (
    <button
      className=" flex h-10 w-10 items-center justify-center rounded-full border-[1px] border-[#fdfdfd5f] text-white transition duration-300 ease-in-out hover:bg-white hover:text-black md:h-12
md:w-12 lg:h-14 lg:w-14
"
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
};
