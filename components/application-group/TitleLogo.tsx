"use client";

import Image from "next/image";
import { useState } from "react";

import { convertAspectRatioToFraction } from "@/helpers/convertAspectRatioToFraction";

import { AspectRatio } from "../ui/aspect-ratio";
import LoadingSpinner from "../LoadingSpinner";

type Props = {
  logoData: {
    aspect_ratio: number;
    height: number;
    iso_639_1?: string;
    file_path: string;
    vote_average?: number;
    vote_count?: number;
    width: number;
  };
  alt: string;
};

const BASE_IMG_URL = process.env.NEXT_PUBLIC_OG_TMBD_IMG_PATH;

const TitleLogo = ({ logoData, alt }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const ratioNumerator = convertAspectRatioToFraction(
    logoData.aspect_ratio,
  ).numerator;
  const ratioDenominator = convertAspectRatioToFraction(
    logoData.aspect_ratio,
  ).denominator;

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <LoadingSpinner />}

      <div className="relative w-[300px] md:w-[325px] lg:w-[350px]">
        <AspectRatio
          ratio={
            ratioNumerator && ratioDenominator
              ? ratioNumerator / ratioDenominator
              : 1.84 / 1
          }
        >
          <Image
            src={`${BASE_IMG_URL}${logoData.file_path}`}
            alt={alt}
            fill
            sizes="400px"
            onLoad={handleImageLoad}
            className=" object-contain"
          />
        </AspectRatio>
      </div>
    </>
  );
};

export default TitleLogo;
