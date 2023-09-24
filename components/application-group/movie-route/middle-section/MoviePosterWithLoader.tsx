"use client";

import { useState } from "react";
import Image from "next/image";

import Skeleton from "@/components/Skeleton";

type MoviePosterWithLoaderProps = {
  poster_path: string;
  alt: string;
};

const BASE_IMG_URL = "https://image.tmdb.org/t/p/original";

const MoviePosterWithLoader = ({
  poster_path,
  alt,
}: MoviePosterWithLoaderProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleImageLoad = () => {
    // set isLoading to false after a delay
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Skeleton rows={0} showOverlay={false} />{" "}
        </div>
      )}
      <Image
        src={`${BASE_IMG_URL}${poster_path}`}
        alt={alt}
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 40vw, 25vw"
        onLoad={handleImageLoad}
        className="object-contain"
      />
    </>
  );
};

export default MoviePosterWithLoader;
