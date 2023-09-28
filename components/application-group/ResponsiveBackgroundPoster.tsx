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

const ResponsiveBackgroundPoster = ({
  poster_path,
  backdrop_path,
  alt,
  priority,
  imageClassNames,
}: BackgroundPosterProps) => {
  return (
    <>
      {/* check for backdrop_path, then render lg screen image with loader
       or a div with an overlay color if backdrop_path is null
      */}
      <div className="hidden md:flex">
        {backdrop_path ? (
          <LargeScreenImage
            backdrop_path={backdrop_path}
            alt={alt}
            priority={priority}
            imageClassNames={imageClassNames}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-r from-black to-black"></div>
        )}
      </div>

      {/* Small Screen Image component with loader */}
      <div className="md:hidden">
        <SmallScreenImage
          poster_path={poster_path}
          alt={alt}
          priority={priority}
          imageClassNames={imageClassNames}
        />
      </div>
    </>
  );
};

// small screen image with a skeleton
interface SmallScreenImageProps {
  poster_path: string | null;
  alt: string;
  priority?: boolean;
  imageClassNames?: string;
}

const SmallScreenImage = ({
  poster_path,
  alt,
  priority,
  imageClassNames,
}: SmallScreenImageProps) => {
  const [isSmallImageLoading, setIsSmallImageLoading] = useState<boolean>(true);

  const handleSmallImageLoad = () => {
    setIsSmallImageLoading(false);
  };

  return (
    <>
      {isSmallImageLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Skeleton rows={0} showOverlay={false} />{" "}
        </div>
      )}

      <Image
        src={`${process.env.NEXT_PUBLIC_OG_TMBD_IMG_PATH}${poster_path}`}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority={priority}
        onLoad={handleSmallImageLoad}
        className={`absolute inset-0 bg-no-repeat ${imageClassNames}`}
      />
    </>
  );
};

// large screen image with a skeleton
interface LargeScreenImageProps {
  backdrop_path: string | null;
  alt: string;
  priority?: boolean;
  imageClassNames?: string;
}

const LargeScreenImage = ({
  backdrop_path,
  alt,
  priority,
  imageClassNames,
}: LargeScreenImageProps) => {
  const [isLargeImageLoading, setIsLargeImageLoading] = useState<boolean>(true);

  const handleLargeImageLoad = () => {
    setIsLargeImageLoading(false);
  };

  return (
    <>
      {isLargeImageLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Skeleton rows={0} showOverlay={false} />{" "}
        </div>
      )}

      <Image
        src={`${process.env.NEXT_PUBLIC_OG_TMBD_IMG_PATH}${backdrop_path}`}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority={priority}
        onLoad={handleLargeImageLoad}
        className={`absolute inset-0 bg-no-repeat ${imageClassNames}`}
      />
    </>
  );
};

export default ResponsiveBackgroundPoster;
