"use client";

import { useState } from "react";
import Image from "next/image";

import { getMovieDetails } from "@/lib/tmdbApi";

import { CgSpinner } from "react-icons/cg";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface MediaCardProps {
  id: number;
  poster_path: string | null;
  original_title?: string;
  original_name?: string;
  aspect_ratio?: "16:9" | "9:16"; // Define aspect_ratio as a prop
}

const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
const orgininalImageBasePath = "https://image.tmdb.org/t/p/original";

const MediaCard = ({
  data,
  aspect_ratio = "16:9",
}: {
  data: MediaCardProps;
  aspect_ratio: "16:9" | "9:16";
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const imageSrc =
    aspect_ratio === "16:9" ? imageBaseUrl : orgininalImageBasePath;

  // Handle the image loading
  const handleImageLoad = () => {
    setIsLoading(false);
  };

  // define styles for 16:9(horizontal) and 9:16(vertical) aspect ratios
  const _16_9 = "relative h-auto flex-1 ";
  const _9_16 = "relative h-auto flex-1 ";

  return (
    // only render if there is a poster_path
    data.poster_path ? (
      <div className={aspect_ratio === "16:9" ? _16_9 : _9_16}>
        <AspectRatio ratio={aspect_ratio === "16:9" ? 16 / 9 : 9 / 16}>
          {/* Display the loading spinner while the image is loading */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <CgSpinner className="h-10 w-10 animate-spin text-white" />
            </div>
          )}

          {/* Display the image */}
          <Image
            src={`${imageSrc}/${data.poster_path}`}
            alt={data.original_title || data.original_name || "Media"}
            fill
            className="object-cover"
            onLoad={handleImageLoad}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 40vw, 25vw"
          />
        </AspectRatio>
        {/* Display the media title */}
        <p className="mt-2 text-start text-sm text-white md:text-base">
          {data.original_title || data.original_name || "Unknown Title"}
        </p>
      </div>
    ) : null
  );
};

export default MediaCard;
