import React from 'react'
import './SliderWrapper.scss'

interface SliderWrapperProps {
  children: React.ReactNode;
}

const SliderWrapper = ({ children }: SliderWrapperProps) => (
  <div className="slider-wrapper">
    {children}
  </div>
);

export default SliderWrapper;
