"use client";

import { Fragment, ReactNode, useState } from "react";

import Controls from "./Controls";
import Progress from "./Progress";

interface DataWithId {
  id?: string | number; // Make id optional
  [key: string]: any; // Allow additional properties
}

type Props = {
  sliderData: DataWithId[];
  initData: DataWithId;
  showSliderProgress?: boolean;
  classNames?: {
    ulList: string;
  };
  renderSliderList: (item: any) => ReactNode; // Function to render slider list
};

function SliderBody({
  sliderData,
  initData,
  showSliderProgress,
  classNames,
  renderSliderList,
}: Props) {
  const [data, setData] = useState<any[]>(sliderData.slice(1));
  const [transitionData, setTransitionData] = useState<any>(sliderData[0]);
  const [currentSlideData, setCurrentSlideData] = useState<CurrentSlideData>({
    data: initData,
    index: 0,
  });
  return (
    <Fragment>
      <div className="relative">
        {/* Slider Controls */}
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

        {/* Slider Body */}
        <ul
          className={`${classNames?.ulList} flex overflow-x-scroll`}
          // width of the slider should always end at the right-end screen width
          style={{ scrollSnapType: "x mandatory" }}
        >
          {/* Slider Header -- See Below */}
          {data.map((data) => (
            <Fragment key={data.id}>{renderSliderList(data)}</Fragment>
          ))}
        </ul>
      </div>

      {/* Slider Progress */}
      {/* {showSliderProgress && (
        <Progress
          curIndex={currentSlideData.index}
          length={sliderData.length}
        />
      )} */}
    </Fragment>
  );
}

export default SliderBody;
