import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";

import { isMovieDetails } from "@/lib/tmdb-api/movies";

import { IoMdAdd as AddIcon } from "react-icons/io";
// import { AiOutlineInfo as InfoIcon } from "react-icons/ai";
import { IoInformation as InfoIcon } from "react-icons/io5";
import { BsFillPlayFill as PlayIcon } from "react-icons/bs";
import { DetailsButton } from "@/components/DetailsButton";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import ImdbRating from "../ImdbRating";
import Chip from "../Chip";

type ShowDetailsSmallScreenProps = {
  movieOrTvShowDetails: MovieDetailsData | TVSeriesData;
};

const BASE_IMG_URL = process.env.NEXT_PUBLIC_OG_TMBD_IMG_PATH;

const ShowDetailsSmallScreen = ({
  movieOrTvShowDetails,
}: ShowDetailsSmallScreenProps) => {
  // look for the first production company that has a logo path
  const productionCompany = movieOrTvShowDetails.production_companies.find(
    (company) => company.logo_path,
  );

  /*
  use type guard functions to determine if the data is of movieDetails.
  then get the title of the movie or tv show 
  */
  const movieOrTvShowTitle = isMovieDetails(movieOrTvShowDetails)
    ? movieOrTvShowDetails.original_title
    : movieOrTvShowDetails.original_name;

  /* 
    use type guard functions to determine if the data is of movieDetails.
    then get the release date in the format of 2021
    */
  const releaseDate = isMovieDetails(movieOrTvShowDetails)
    ? movieOrTvShowDetails.release_date
    : movieOrTvShowDetails.first_air_date;

  // link href to the details page of the movie or tv show
  const linkHref = `/${isMovieDetails(movieOrTvShowDetails) ? "movie" : "tv"}/${
    movieOrTvShowDetails.id
  }`;

  //   get the runtime for the movie or tv show in the format of 1h 30m, or 1h, or 30m
  let runtime;
  if (isMovieDetails(movieOrTvShowDetails)) {
    // if the runtime is NaN, set it to an empty string
    runtime = isNaN(movieOrTvShowDetails.runtime)
      ? ""
      : `${Math.floor(movieOrTvShowDetails.runtime / 60)}h ${
          movieOrTvShowDetails.runtime % 60
        }m`;
  } else {
    // if the runtime is NaN, set it to an empty string
    runtime = isNaN(movieOrTvShowDetails.episode_run_time[0])
      ? ""
      : `${Math.floor(movieOrTvShowDetails.episode_run_time[0] / 60)}h ${
          movieOrTvShowDetails.episode_run_time[0] % 60
        }m`;
  }

  // vote average rounded to one decimal place
  const voteAverage = Math.round(movieOrTvShowDetails.vote_average * 10) / 10;

  return (
    <div className="master-container flex h-full flex-col items-center justify-end gap-y-2 pb-12 text-center sm:items-start sm:text-start  md:hidden ">
      {/* Production company logo */}
      {productionCompany?.logo_path ? (
        <div>
          <div className="relative min-h-[40px] w-[150px] lg:h-[100px] lg:w-[200px]">
            <Suspense>
              <Image
                src={`${BASE_IMG_URL}${productionCompany.logo_path}`}
                alt={productionCompany.name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 40vw, 25vw"
                className="object-contain"
              />
            </Suspense>
          </div>
        </div>
      ) : (
        // Display the name if image doesn't exist
        productionCompany?.name && (
          <h2 className="text-2xl font-bold">{productionCompany.name}</h2>
        )
      )}

      {/* Title and add to library button */}
      <div className="flex items-center gap-x-2">
        {/* Title */}
        <h1 className="max-w-[32rem] text-[32px] font-bold md:text-[36px] lg:text-[40px]">
          {movieOrTvShowTitle}
        </h1>
      </div>

      {/* Year, runtime, and Rating */}
      <div className=" flex flex-wrap items-center justify-center gap-2 tracking-wide">
        {/* Year */}
        <p className="rounded-sm border border-white/30 px-1 text-primaryWhite">
          {new Date(releaseDate).getFullYear()}
        </p>

        {/* display runtime, if it is not NaN, */}
        {runtime && (
          <span className="flex items-center gap-2">
            <span className=" h-[5px] w-[5px] rounded-full bg-white/80" />
            <p className="rounded-sm border border-white/30 px-1 text-primaryWhite">
              {runtime}
            </p>
          </span>
        )}

        {/* if it is a series, display no. of seasons */}
        {!isMovieDetails(movieOrTvShowDetails) && (
          <span className="flex items-center gap-2">
            <span className=" h-[5px] w-[5px] rounded-full bg-white/80" />
            <p className="rounded-sm border border-white/30 px-1 text-primaryWhite">
              {/* 1 Season or Seasons if more than 1 */}
              {movieOrTvShowDetails.number_of_seasons}{" "}
              {movieOrTvShowDetails.number_of_seasons > 1
                ? "Seasons"
                : "Season"}
            </p>
          </span>
        )}

        {/* Rating */}
        <span className=" h-[5px] w-[5px] rounded-full bg-white/80" />
        <ImdbRating rating={voteAverage} />
      </div>

      {/* play and info btns */}
      <div className="mt-2 flex h-max  items-center justify-center gap-x-8 lg:mt-4 ">
        {/* add to library button */}
        <DetailsButton
          variant={"outline"}
          className="flex flex-col items-center justify-center gap-y-1 border-none p-0   text-white transition-colors hover:bg-transparent hover:text-white/70"
        >
          <AddIcon className=" h-6 w-6" /> <span>Library</span>
        </DetailsButton>

        {/* play button */}
        {/* if its a movie, href is movie/:id, if tv, href is tv/:id */}
        <DetailsButton asChild className="text-lg font-semibold">
          <Link href={`${linkHref}`}>
            <PlayIcon className="mr-1 h-7 w-7" /> Play
          </Link>
        </DetailsButton>

        {/* info button */}
        <Link href={`${linkHref}`}>
          <DetailsButton
            variant={"outline"}
            className="flex flex-col items-center justify-center gap-y-1 border-none p-0   text-white transition-colors hover:bg-transparent hover:text-white/70"
          >
            <InfoIcon className=" h-6 w-6 rounded-full border-1 border-white/70 p-0.5 " />{" "}
            <span>Info</span>
          </DetailsButton>
        </Link>
      </div>
    </div>
  );
};

export default ShowDetailsSmallScreen;

/*
<span className="mx-1 h-[5px] w-[5px] rounded-full bg-white/80" />

{movieOrTvShowDetails.genres.slice(0, 2).map((genre, index) => (
  <Chip key={genre.id}>{genre.name}</Chip>
))}
*/