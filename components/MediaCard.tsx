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
}

const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
const orgininalImageBasePath = "https://image.tmdb.org/t/p/original";

const MediaCard = ({ media }: { media: MediaCardProps }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Handle the image loading
  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <div
      key={media.id}
      className="relative h-auto w-[125px] justify-self-center md:w-[175px] lg:w-[200px]"
    >
      <AspectRatio ratio={2 / 3}>
        {/* Display the loading spinner while the image is loading */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <CgSpinner className="h-10 w-10 animate-spin text-white" />
          </div>
        )}

        {/* Display the image */}
        <Image
          src={`${orgininalImageBasePath}/${media.poster_path}`}
          alt={media.original_title || media.original_name || "Media"}
          fill
          className="object-cover"
          onLoad={handleImageLoad}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 40vw, 25vw"
        />
      </AspectRatio>
      {/* Display the media title */}
      <p className="mt-2 text-start text-sm text-white md:text-base">
        {media.original_title || media.original_name || "Unknown Title"}
      </p>
    </div>
  );
};

export default MediaCard;
