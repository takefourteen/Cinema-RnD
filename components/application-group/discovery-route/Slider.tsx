"use client";

import { useState } from "react";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";

import ImageDisplay from "../movie-route/top-section/ImageDisplay";

type SliderProps<
  T extends {
    poster_path: string | null;
    backdrop_path: string | null;
  },
> = {
  data: T[];
};

const Slider = <
  T extends {
    poster_path: string | null;
    backdrop_path: string | null;
  },
>({
  data,
}: SliderProps<T>) => {
  return (
    <div className=" relative min-h-[40rem] sm:min-h-[40rem] md:min-h-[40rem] lg:min-h-[40rem]">
        <ImageDisplay
          poster_path={data[0].poster_path}
          backdrop_path={data[0].backdrop_path}
          alt={"Slider Image"}
        />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80  via-black/60 to-black/20  md:bg-gradient-to-r" />
    </div>
  );
};

export default Slider;
