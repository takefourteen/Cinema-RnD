"use client";

import { useState } from "react";
import Image from "next/image";

import { IoIosArrowBack } from "react-icons/io";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import ImageDisplay from "../../movie-route/top-section/ImageDisplay";
import CarouselIndicator from "@/components/application-group/discovery-route/carousel/CarouselIndicator";
import CarouselItem from "./CarouselItem";

type CarouselProps = {
  data: TrendingMovie[] | TrendingTVShow[];
};

const Carousel = ({ data }: CarouselProps) => {
  const [activeSlide, setActiveSlide] = useState(0);

  const nextSlide = () => {
    const isFirstSlide = activeSlide === 0;
    const newIndex = isFirstSlide ? data.length - 1 : activeSlide - 1;
    setActiveSlide(newIndex);
  };

  const prevSlide = () => {
    const isLastSlide = activeSlide === data.length - 1;
    const newIndex = isLastSlide ? 0 : activeSlide + 1;
    setActiveSlide(newIndex);
  };

  // fetch the first five carousel items and store them in an array
  const carouselItems = data.map((item) => {
    return <CarouselItem key={item.id} showId={item.id} type={item.media_type} />;
  });

  return (
    <div className="relative min-h-[30rem] sm:min-h-[30rem] md:min-h-[35rem] lg:min-h-[40rem]">
      {carouselItems[activeSlide]}

      {/* slider btns */}
      <button
        onClick={nextSlide}
        className="carousel-btn-switch-card-left carousel-btn-switch-card "
      >
        <IoIosArrowBack />
      </button>

      <button
        onClick={prevSlide}
        className="carousel-btn-switch-card-right carousel-btn-switch-card "
      >
        <IoIosArrowBack
          style={{
            transform: "rotate(180deg)",
          }}
        />
      </button>

      {/* Carousel indicator */}
      <CarouselIndicator
        activeIndex={activeSlide}
        length={data.length}
        onSetActiveIndex={(activeIndex) => {
          setActiveSlide(activeIndex);
        }}
        maxIndicatorVisible={data.length}
      />
    </div>
  );
};

export default Carousel;
