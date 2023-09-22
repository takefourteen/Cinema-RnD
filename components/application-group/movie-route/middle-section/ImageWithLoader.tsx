"use client";

import Image from "next/image";
import { useState } from "react";

import Skeleton from "@/components/Skeleton";

type ImageWithLoaderProps = {
  src: string;
  alt: string;
};

const ImageWithLoader = ({ src, alt }: ImageWithLoaderProps) => {
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
        src={src}
        alt={alt}
        fill
        priority
        onLoad={handleImageLoad}
        className="rounded-md object-cover transition-all duration-300 ease-in-out group-hover:ring-4 group-hover:ring-slate-950 group-hover:ring-offset-2 group-focus-visible:ring-4  group-focus-visible:ring-slate-950 group-focus-visible:ring-offset-2"
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 40vw, 25vw"
        style={{ filter: "brightness(0.7)" }}
      />
    </>
  );
};

export default ImageWithLoader;
