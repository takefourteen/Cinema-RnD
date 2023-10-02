"use client";

import Image from "next/image";
import { useState } from "react";

import { Spinner } from "@nextui-org/react";
import Skeleton from "@/components/Skeleton";

type ImageLoaderProps = {
  loaderType?: "spinner" | "skeleton";
  src: string;
  alt: string;
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
  className?: string;
  style?: React.CSSProperties;
};

const ImageLoader = ({
  loaderType = "skeleton",
  src,
  alt,
  fill,
  priority,
  sizes,
  className,
  style,
}: ImageLoaderProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleImageLoad = () => {
    // set isLoading to false after a delay
    setIsLoading(false);
  };
  return (
    <>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          {loaderType === "spinner" ? (
            <Spinner color="default" />
          ) : (
            <Skeleton rows={0} showOverlay={false} />
          )}
        </div>
      )}

      <Image
        src={src}
        alt={alt}
        fill={fill}
        priority={priority}
        onLoad={handleImageLoad}
        className={`${className}`}
        style={{
          ...style,
        }}
      />
    </>
  );
};

export default ImageLoader;
