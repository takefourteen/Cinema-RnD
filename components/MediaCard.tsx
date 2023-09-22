"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { CgSpinner } from "react-icons/cg";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Skeleton from "./Skeleton";
import { Button } from "./ui/button";
interface MediaCardProps {
  id: number;
  poster_path: string | null;
  backdrop_path: string | null;
  original_title?: string;
  original_name?: string;
}

const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
const orgininalImageBasePath = "https://image.tmdb.org/t/p/original";

interface MediaCardComponentProps {
  data: MediaCardProps;
  aspect_ratio?: "16:9" | "9:16";
  loaderType?: "spinner" | "skeleton";
  skeletonLoaderRows?: number;
}

const MediaCard = ({
  data,
  aspect_ratio = "16:9",
  loaderType = "spinner",
  skeletonLoaderRows = 0,
}: MediaCardComponentProps) => {
  // determine if this is a movie or tv show
  const isMovie = data.original_title ? true : false;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const imageSrc =
    aspect_ratio === "16:9" ? imageBaseUrl : orgininalImageBasePath;
  const poster =
    aspect_ratio === "16:9" ? data.backdrop_path : data.poster_path;
  // prepare url path for the media page, depending on whether it is a movie or tv show. the structure is /movie/:id-nameofmovie or /tv/:id-nameoftvshow, the name is seperated by a dash
  const mediaPageUrl = isMovie
    ? `/movie/${data.id}-${data.original_title?.split(" ").join("-")}`
    : `/tv/${data.id}-${data.original_name?.split(" ").join("-")}`;

  // Handle the image loading
  const handleImageLoad = () => {
    setIsLoading(false);
  };

  // define styles for 16:9(horizontal) and 9:16(vertical) aspect ratios
  const style_16_9 =
    "relative h-auto min-w-[150px] sm:min-w-[175px] md:min-w-[200px] lg:min-w-[250px] xl:min-w-[300px] flex-1 ";
  const style_9_16 =
    "relative h-auto min-w-[125px] sm:min-w-[150px] md:min-w-[175px] lg:min-w-[200px] xl:min-w-[225px] flex-1 cursor-pointer";

  return (
    // only render if there is a poster_path
    data.poster_path ? (
      <li className={`${aspect_ratio === "16:9" ? style_16_9 : style_9_16} `}>
        <Link
          // href={isMovie ? `/movie/${data.id}` : `/tv/${data.id}`}
          href={mediaPageUrl}
          className=" group transition-colors focus-visible:outline-none"
        >
          <AspectRatio ratio={aspect_ratio === "16:9" ? 16 / 9 : 9 / 16}>
            {/* Display the loading spinner or skeleton while the image is loading */}
            {isLoading && loaderType === "spinner" ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <CgSpinner className="h-10 w-10 animate-spin text-gray-500" />
              </div>
            ) : isLoading && loaderType === "skeleton" ? (
              <Skeleton rows={skeletonLoaderRows} />
            ) : null}

            {/* Display the image */}

            <Image
              src={`${imageSrc}/${poster}`}
              alt={data.original_title || data.original_name || "Media"}
              fill
              className=" z-[99] transform  object-cover transition-transform delay-75 hover:scale-105 group-focus-visible:scale-105 group-focus-visible:ring-2  group-focus-visible:ring-white "
              onLoad={handleImageLoad}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 40vw, 25vw"
            />
          </AspectRatio>
          {/* Display the media title with truncation */}
          {/* only on 16:9 aspect ratios */}
          {aspect_ratio === "16:9" ? (
            <p
              className={`mt-4 truncate text-start text-sm font-normal tracking-wide text-white group-focus-visible:underline md:text-sm lg:text-base `}
            >
              {data.original_title || data.original_name || "Unknown Title"}
            </p>
          ) : null}
        </Link>
      </li>
    ) : null
  );
};

export default MediaCard;

/* 
old styles:
const style_16_9 =
  "relative h-auto min-w-[150px] sm:min-w-[175px] md:min-w-[200px] lg:min-w-[250px] xl:min-w-[300px] flex-1 ";

const style_9_16 =
    "relative h-auto min-w-[125px] sm:min-w-[150px] md:min-w-[175px] lg:min-w-[200px] xl:min-w-[225px] flex-1 cursor-pointer";
*/
