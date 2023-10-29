"use client"

import { useState, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import LoadingSpinner from "./skeletons/LoadingSpinner";
import CardSkeleton from "@/components/skeletons/CardSkeleton";

interface ImageLoaderProps extends React.ComponentPropsWithoutRef<typeof Image> {
  loaderType: "spinner" | "skeleton";
  src: StaticImageData | string;
  alt: string;
}

const ImageLoader = ({ loaderType, src, alt, ...props }: ImageLoaderProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!src) {
      setIsLoading(false);
    }
  }, [src]);

  const handleImageLoad = () => {
    setIsLoading(false);
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
          src={src}
          alt={alt || "image"}
          onLoad={handleImageLoad}
          onError={handleImageLoad}
          {...props}
        />
      )}
    </>
  );
};

export default ImageLoader;
