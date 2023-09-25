"use client";

import { useState } from "react";
import Image from "next/image";

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
    <div className=" relative min-h-[40rem] bg-gradient-to-r from-black to-black sm:min-h-[50rem] md:min-h-[40rem] lg:min-h-[50rem]">
      <ImageDisplay
        poster_path={data[0].poster_path}
        backdrop_path={data[0].backdrop_path}
        alt={"Slider Image"}
      />
    </div>
  );
};

export default Slider;
