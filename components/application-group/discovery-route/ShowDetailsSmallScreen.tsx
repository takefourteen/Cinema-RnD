import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";

import { isMovieDetails } from "@/lib/tmdb-api/movies";

import { IoMdAdd as AddIcon } from "react-icons/io";
import { AiOutlineInfo as InfoIcon } from "react-icons/ai";
import { BsFillPlayFill as PlayIcon } from "react-icons/bs";
import { DetailsButton } from "@/components/DetailsButton";

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

  // link href to the details page of the movie or tv show
  const linkHref = `/${isMovieDetails(movieOrTvShowDetails) ? "movie" : "tv"}/${
    movieOrTvShowDetails.id
  }`;

  //   get the runtime for the movie or tv show in the format of 1h 30m, or 1h, or 30m
  let runtime = "";
  if (isMovieDetails(movieOrTvShowDetails)) {
    const hours = Math.floor(movieOrTvShowDetails.runtime / 60);
    const minutes = movieOrTvShowDetails.runtime % 60;
    runtime = `${hours}h ${minutes}m`;
  } else {
    const hours = Math.floor(movieOrTvShowDetails.episode_run_time[0] / 60);
    const minutes = movieOrTvShowDetails.episode_run_time[0] % 60;
    runtime = `${hours}h ${minutes}m`;
  }

  return (
    <div className="master-container flex h-full flex-col items-start justify-end gap-y-2 pb-8 text-center  lg:max-w-[80%] ">
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
        <h1 className="max-w-[32rem] text-start text-[32px] font-bold md:text-[36px] lg:text-[40px]">
          {movieOrTvShowTitle}
        </h1>
      </div>

      {/* Genres and runtime with a dot between them */}
      <div className=" flex flex-wrap items-center justify-center gap-1">
        {movieOrTvShowDetails.genres.slice(0, 2).map((genre) => (
          <span
            key={genre.id}
            className="flex items-center gap-1.5 text-primaryWhite/70"
          >
            <span>{genre.name}</span>
            <span className="h-[5px] w-[5px] rounded-full border-primaryRed bg-primaryRed"></span>
          </span>
        ))}

        {/* runtime */}
        <span className="flex items-center gap-1.5 text-primaryWhite">
          <span>{runtime}</span>
        </span>
      </div>

      {/* play and info btns */}
      <div className="mt-2 flex h-max  items-center justify-center gap-4 lg:mt-4 ">
        {/* add to library button */}
        <DetailsButton
          variant={"outline"}
          size={"icon"}
          className="rounded-full border-white/70 p-0 "
        >
          <AddIcon className=" h-6 w-6" />
        </DetailsButton>

        {/* play button */}
        {/* if its a movie, href is movie/:id, if tv, href is tv/:id */}
        <DetailsButton asChild className="text-lg font-semibold">
          <Link href={linkHref}>
            <PlayIcon className="mr-1 h-7 w-7" /> Play
          </Link>
        </DetailsButton>

        {/* info button */}
        <DetailsButton
          asChild
          variant={"outline"}
          size={"icon"}
          className=" rounded-full border-white/70 "
        >
          <Link href={linkHref}>
            <InfoIcon className="h-8 w-8" />
          </Link>
        </DetailsButton>
      </div>
    </div>
  );
};

export default ShowDetailsSmallScreen;
