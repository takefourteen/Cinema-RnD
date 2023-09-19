import React from "react";

type Props = {
  children: React.ReactNode;
};

function SliderBody({ children }: Props) {
  return (
    <ul className="flex w-full gap-x-6">
      {/* Slider Header -- See Below */}

      {children}
    </ul>
  );
}

export default SliderBody;

/* 
  
*/
