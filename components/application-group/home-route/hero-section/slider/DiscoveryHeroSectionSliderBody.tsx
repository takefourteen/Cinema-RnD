import { isMovieDetails } from "@/lib/tmdb-api/movies";

import ShowDetailsSmallScreen from "../../ShowDetailsSmallScreen";
import ShowDetailsLargeScreen from "../../ShowDetailsLargeScreen";
import ImageLoader from "@/components/ImageLoader";

type DiscoveryHeroSectionSliderBodyProps = {
  movieOrTvShowDetails: MovieDetailsData | TVSeriesData;
  priority?: boolean;
};

const BASE_IMG_URL = process.env.NEXT_PUBLIC_OG_TMBD_IMG_PATH;

const DiscoveryHeroSectionSliderBody = ({
  movieOrTvShowDetails,
  priority = false,
}: DiscoveryHeroSectionSliderBodyProps) => {
  const movieOrTvShowTitle = isMovieDetails(movieOrTvShowDetails)
    ? movieOrTvShowDetails.original_title
    : movieOrTvShowDetails.original_name;

  const backdropImgSrc = movieOrTvShowDetails.backdrop_path
    ? `${BASE_IMG_URL}${movieOrTvShowDetails.backdrop_path}`
    : null;

  const posterImgSrc = `${BASE_IMG_URL}${movieOrTvShowDetails.poster_path}`;

  return (
    <li
      className="relative h-[70dvh] w-[100%] flex-shrink-0 grow-0 md:h-[75dvh]"
      style={{
        scrollSnapAlign: "start",
      }}
    >
      {/* Slider Image */}
       <div className="relative ml-auto flex aspect-[2/3] h-full w-full md:w-[60%] lg:aspect-video">
        <ImageLoader
          loaderType="spinner"
          src={`${backdropImgSrc ? backdropImgSrc : posterImgSrc}`}
          alt={movieOrTvShowTitle}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (min-width: 769px) 60vw"
          className={`object-cover object-center`}
        />
      </div>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black  via-black/80 to-transparent  md:w-[80%] md:bg-gradient-to-r md:from-black md:via-black md:to-transparent " />

      {/* Overlay with Poster details */}
      <div className="absolute inset-0 ">
        {/* Poster details component for small screens */}
        <ShowDetailsSmallScreen movieOrTvShowDetails={movieOrTvShowDetails} />

        {/* Poster details component for large screens */}
        <ShowDetailsLargeScreen movieOrTvShowDetails={movieOrTvShowDetails} />
      </div>

      {/* 
        short dark overlay at the bottom of the image to blend into the 
        next section
      */}
      <div className="absolute inset-x-0 bottom-0 hidden h-4 bg-gradient-to-t from-black to-transparent md:flex" />
    </li>
  );
};

export default DiscoveryHeroSectionSliderBody;
