"use client";

import Image from "next/image";

import { useBreakpoints } from "@/hooks/useBreakpoints";

type ImageDisplayProps = {
  backdrop_path: string | null;
  poster_path: string | null;
  alt: string;
  backdropBlurDataURL: string | undefined;
  posterBlurDataURL: string | undefined;
};

const BASE_IMG_URL = "https://image.tmdb.org/t/p/original";

const ImageDisplay = ({
  backdrop_path,
  poster_path,
  alt,
  backdropBlurDataURL,
  posterBlurDataURL,
}: ImageDisplayProps) => {
  const { isMd, isLg, isXl } = useBreakpoints();

  return (
    // only if there is a backdrop image, display it
    backdrop_path ? (
      <Image
        src={
          isMd || isLg || isXl
            ? `${BASE_IMG_URL}${backdrop_path}`
            : `${BASE_IMG_URL}${poster_path}`
        }
        alt={alt}
        fill
        sizes="100dvw"
        placeholder="blur"
        blurDataURL={
          isMd || isLg || isXl ? backdropBlurDataURL : posterBlurDataURL
        }
        className="absolute inset-0 bg-no-repeat object-cover object-center md:object-left-top"
      />
    ) : (
      <div className="absolute inset-0 bg-gradient-to-r from-black to-black"></div>
    )
  );
};

export default ImageDisplay;
