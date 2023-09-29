"use client";

import { useState } from "react";
import Image from "next/image";

import Skeleton from "@/components/Skeleton";

type BackgroundPosterProps = {
  poster_path: string | null;
  backdrop_path: string | null;
  alt: string;
  priority?: boolean;
  imageClassNames?: string;
};

const BASE_IMG_URL = process.env.NEXT_PUBLIC_OG_TMBD_IMG_PATH;

const ResponsiveBackgroundPoster = ({
  poster_path,
  backdrop_path,
  alt,
  priority,
  imageClassNames,
}: BackgroundPosterProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Skeleton rows={0} showOverlay={false} />{" "}
        </div>
      )}

      {/* show the backdrop_path img on larger screens or a div with an
        overlay color if backdrop_path is null
      */}
      <div className="hidden md:flex">
        {backdrop_path ? (
          <Image
            src={`${BASE_IMG_URL}${backdrop_path}`}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={priority}
            onLoad={handleImageLoad}
            className={`absolute inset-0 bg-no-repeat ${imageClassNames}`}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-r from-black to-black"></div>
        )}
      </div>

      {/* show the poster_path img on smaller screens */}
      <div className="md:hidden">
        <Image
          src={`${BASE_IMG_URL}${poster_path}`}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={priority}
          onLoad={handleImageLoad}
          className={`absolute inset-0 bg-no-repeat ${imageClassNames}`}
        />
      </div>
    </>
  );
};

export default ResponsiveBackgroundPoster;
