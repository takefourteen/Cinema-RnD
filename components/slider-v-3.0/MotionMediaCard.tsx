"use client";
import { motion } from "framer-motion";
import Link from "next/link";

import { AspectRatio } from "../ui/aspect-ratio";
import ImageLoader from "../ImageLoader";
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
  aspect_ratio?: "16:9" | "2:3";
  loaderType?: "spinner" | "skeleton";
  skeletonLoaderRows?: number;
  priority?: boolean;
}

const MotionMediaCard = ({
  data,
  aspect_ratio = "16:9",
  loaderType = "spinner",
  skeletonLoaderRows = 0,
  priority = false,
}: MediaCardComponentProps) => {
  // determine if this is a movie or tv show
  const isMovie = data.original_title ? true : false;
  const imageSrc =
    aspect_ratio === "16:9" ? imageBaseUrl : orgininalImageBasePath;
  const poster =
    aspect_ratio === "16:9" ? data.backdrop_path : data.poster_path;
  // prepare url path for the media page, depending on whether it is a movie or tv show. the structure is /movie/:id-nameofmovie or /tv/:id-nameoftvshow, the name is seperated by a dash
  const mediaPageUrl = isMovie
    ? `/movie/${data.id}-${data.original_title?.split(" ").join("-")}`
    : `/tv/${data.id}-${data.original_name?.split(" ").join("-")}`;

  // define styles for 16:9(horizontal) and 2:3(vertical) aspect ratios
  const style_16_9 =
    "relative h-auto min-w-[150px] sm:min-w-[175px] md:min-w-[200px] lg:min-w-[250px] xl:min-w-[300px] flex-1 ";
  const style_2_3 =
    "relative h-auto min-w-[150px] sm:min-w-[175px] md:min-w-[200px] lg:min-w-[225px] xl:min-w-[250px] flex-1 cursor-pointer";

  return (
    // only render if there is a poster_path
    data.poster_path ? (
      <motion.li
        className={`${aspect_ratio === "16:9" ? style_16_9 : style_2_3} `}
        layout
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{
          scale: 1,
          opacity: 1,
          transition: {
            duration: 0.4,
          },
        }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{
          type: "spring",
          damping: 20,
          stiffness: 100,
        }}
      >
        <Link
          // href={isMovie ? `/movie/${data.id}` : `/tv/${data.id}`}
          href={mediaPageUrl}
          className=" group transition-colors "
        >
          <AspectRatio ratio={aspect_ratio === "16:9" ? 16 / 9 : 2 / 3}>
            {/* Display the image */}

            <ImageLoader
              loaderType={loaderType}
              src={`${imageBaseUrl}${poster}`}
              alt={data.original_title || data.original_name || "Media"}
              fill
              priority={priority}
              sizes="(max-width: 640px) 300px, (max-width: 1024px) 300px, 250px"
              className=" z-[99] transform  object-cover transition-transform delay-75 group-hover:scale-105  "
            />
          </AspectRatio>
          {/* Display the media title with truncation */}
          <p
            className={`mt-4 truncate text-start text-sm font-normal tracking-wide text-white   lg:text-base `}
          >
            {data.original_title || data.original_name || "Unknown Title"}
          </p>
        </Link>
      </motion.li>
    ) : null
  );
};

export default MotionMediaCard;

/* 
old styles:
const style_16_9 =
  "relative h-auto min-w-[150px] sm:min-w-[175px] md:min-w-[200px] lg:min-w-[250px] xl:min-w-[300px] flex-1 ";

const style_9_16 =
    "relative h-auto min-w-[125px] sm:min-w-[150px] md:min-w-[175px] lg:min-w-[200px] xl:min-w-[225px] flex-1 cursor-pointer";
*/
