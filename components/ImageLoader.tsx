"use client";

import { useState } from "react";
import Image, { StaticImageData } from "next/image";
import LoadingSpinner from "./skeletons/LoadingSpinner";
import CardSkeleton from "@/components/skeletons/CardSkeleton";

import fallbackSrc from "@/assets/images/error/fallback.jpg";

interface ImageLoaderProps
  extends React.ComponentPropsWithoutRef<typeof Image> {
  loaderType: "spinner" | "skeleton";
  src: StaticImageData | string;
  alt: string;
}

const ImageLoader = ({ loaderType, src, alt, ...props }: ImageLoaderProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false); // new state for error tracking

  const handleImageLoad = () => {
    setIsLoading(false);
    setHasError(false); // reset error state on successful load
  };

  const handleImageError = () => {
    setIsLoading(false);
    setHasError(true); // set error state on image load failure
  };

  return (
    <>
      {isLoading && (
        <div className="absolute inset-0">
          {loaderType === "skeleton" && (
            <CardSkeleton rows={0} showOverlay={false} />
          )}
          {loaderType === "spinner" && <LoadingSpinner />}
        </div>
      )}

      {src && (
        <Image
          src={hasError ? fallbackSrc : src} // use fallback image if main image fails to load
          alt={alt || "image"}
          onLoad={handleImageLoad}
          onError={handleImageError} // handle image load failure
          {...props}
        />
      )}
    </>
  );
};

export default ImageLoader;
