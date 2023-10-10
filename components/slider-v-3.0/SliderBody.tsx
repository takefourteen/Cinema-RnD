"use client";

import { Fragment, ReactNode, useState } from "react";

import Controls from "./Controls";

interface DataWithId {
  id?: string | number; // Make id optional
  [key: string]: any; // Allow additional properties
}

type Props = {
  sliderData: DataWithId[];
  initData: DataWithId;
  showProgress?: boolean;
  classNames?: {
    ulList: string;
  };
  renderSliderList: (item: any) => ReactNode; // Function to render slider list
};

function SliderBody({
  sliderData,
  initData,
  showProgress,
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
    <>
      <ul className={`${classNames?.ulList} flex`}>
        {/* Slider Header -- See Below */}
        {data.map((data) => (
          <Fragment key={data.id}>{renderSliderList(data)}</Fragment>
        ))}
      </ul>

      {/* Slider Controls */}
      <Controls
      showProgress={showProgress}
        currentSlideData={currentSlideData}
        data={data}
        transitionData={transitionData}
        initData={initData}
        handleData={setData}
        handleTransitionData={setTransitionData}
        handleCurrentSlideData={setCurrentSlideData}
        sliderData={sliderData}
      />
    </>
  );
}

export default SliderBody;
