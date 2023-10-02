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
  classNames?: {
    ulList: string;
  };
  renderChild: (item: any) => ReactNode; // Function to render child components
};

function SliderBody({ sliderData, initData, classNames, renderChild }: Props) {
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
          <Fragment key={data.id}>{renderChild(data)}</Fragment>
        ))}
      </ul>

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
    </>
  );
}

export default SliderBody;
