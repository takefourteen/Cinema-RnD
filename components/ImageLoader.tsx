"use client";

import Image, { StaticImageData } from "next/image";
import { useState } from "react";

import LoadingSpinner from "./loadingStateComponents/LoadingSpinner";
import Skeleton from "@/components/loadingStateComponents/Skeleton";

interface ImageLoaderProps
  extends React.ComponentPropsWithoutRef<typeof Image> {
  loaderType: "spinner" | "skeleton";
  src: StaticImageData | string;
  alt: string;
}

const ImageLoader = ({ loaderType, src, alt, ...props }: ImageLoaderProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleImageLoad = () => {
    // set isLoading to false after a delay
    setIsLoading(false);
  };

  // if src is null, return null
  if (!src) return null;

  return (
    <>
      {isLoading && (
        <div className="absolute inset-0">
          {loaderType === "skeleton" && (
            <Skeleton rows={0} showOverlay={false} />
          )}
          {loaderType === "spinner" && <LoadingSpinner />}
        </div>
      )}

      <Image
        src={src}
        alt={alt !== "" ? alt : "image"}
        onLoad={handleImageLoad}
        // when image does not load
        onError={handleImageLoad}
        {...props}
      />
    </>
  );
};

export default ImageLoader;
