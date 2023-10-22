import Link from "next/link";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import ImageLoader from "../ImageLoader";

interface MediaCardProps {
  id: number;
  poster_path: string | null;
  backdrop_path: string | null;
  original_title?: string;
  original_name?: string;
}

const imageBaseUrl = "https://image.tmdb.org/t/p/original";

interface MediaCardComponentProps {
  data: MediaCardProps;
  aspect_ratio?: "4:3" | "2:3";
}

const MediaCard = ({ data, aspect_ratio }: MediaCardComponentProps) => {
  // determine if this is a movie or tv show
  const isMovie = data.original_title ? true : false;
  const poster = aspect_ratio === "4:3" ? data.backdrop_path : data.poster_path;

  // prepare url path for the media page, depending on whether it is a movie or tv show. the structure is /movie/:id-nameofmovie or /tv/:id-nameoftvshow, the name is seperated by a dash
  const mediaPageUrl = isMovie
    ? `/movie/${data.id}-${encodeURIComponent(data.original_title || "")}`
    : `/tv/${data.id}-${encodeURIComponent(data.original_name || "")}`;

  // define styles for 16:9(horizontal) and 2:3(vertical) aspect ratios
  const style_16_9 =
    "relative h-auto min-w-[150px] sm:min-w-[175px] md:min-w-[200px] lg:min-w-[250px] xl:min-w-[300px] flex-1 ";
  const style_2_3 =
    "relative h-auto min-w-[125px] sm:min-w-[150px] md:min-w-[175px] lg:min-w-[200px] xl:min-w-[225px] flex-1 cursor-pointer";

  return (
    // only render if there is a poster_path
    data.poster_path ? (
      <li className={`${aspect_ratio === "4:3" ? style_16_9 : style_2_3} `}>
        <Link
          href={mediaPageUrl}
          className=" group transition-colors focus-visible:outline-none"
        >
          <AspectRatio ratio={aspect_ratio === "4:3" ? 16 / 9 : 2 / 3}>
            {/* Display the image */}

            <ImageLoader
              loaderType="spinner"
              src={`${imageBaseUrl}/${poster}`}
              alt={data.original_title || data.original_name || "Media"}
              fill
              sizes="
                (max-width: 640px) 150px, (max-width: 768px) 175px, (max-width: 1024px) 200px, (max-width: 1280px) 250px, (max-width: 1536px) 300px, (max-width: 1920px) 350px,
              "
              className=" z-[99] transform  object-cover transition-transform delay-75 hover:scale-105 group-focus-visible:scale-105 group-focus-visible:ring-2  group-focus-visible:ring-white "
            />
          </AspectRatio>

          {/* Display the media title with truncation */}
          {/* only on 16:9 aspect ratios */}
          {aspect_ratio === "4:3" ? (
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
