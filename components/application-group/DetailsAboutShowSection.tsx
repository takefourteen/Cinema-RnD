import React from "react";

import { fetchMovieDetails } from "@/lib/tmdb-api/movies";
import {
  fetchTvSeriesDetails,
  isTVSeriesDetails,
} from "@/lib/tmdb-api/tv-series";
import { isMovieDetails } from "@/lib/tmdb-api/movies";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import Chip from "./Chip";
import ImageLoader from "@/components/ImageLoader";
import ImdbRating from "./ImdbRating";

type AboutTheMovieProps = {
  mediaId: string;
  mediaType: "movie" | "tv";
};

const BASE_IMG_URL = "https://image.tmdb.org/t/p/w500";

const DetailsAboutShowSection = async ({
  mediaId,
  mediaType,
}: AboutTheMovieProps) => {
  const showDetails =
    mediaType === "movie"
      ? await fetchMovieDetails(mediaId)
      : await fetchTvSeriesDetails(mediaId);

  // set title to original_title if it's a movie, original_name if it's a tv series
  const title = isMovieDetails(showDetails)
    ? showDetails.original_title
    : showDetails.original_name;

  // set date to release_date if it's a movie, first_air_date if it's a tv series
  const date = isMovieDetails(showDetails)
    ? showDetails.release_date
    : showDetails.first_air_date;

  // look for the first production company that has a logo path
  const productionCompany = showDetails.production_companies.find(
    (company) => company.logo_path,
  );

  // get the director name
  const director = showDetails.credits?.crew.find(
    (crew) => crew.job === "Director",
  );
  // get the first few cast members, if they exist
  const cast = showDetails.credits?.cast.slice(0, 3);

  // round the vote average to the nearest 1 decimal place
  showDetails.vote_average = Math.round(showDetails.vote_average * 10) / 10;

  //   only format the runtime for movies
  const runtime = isMovieDetails(showDetails)
    ? `${Math.floor(showDetails.runtime / 60)}h ${
        showDetails.runtime % 60 || "" // if the remainder is 0, don't show it
      }m`
    : null;

  // only get numberOfSeasons for tv series
  const numberOfSeasons = isTVSeriesDetails(showDetails)
    ? showDetails.number_of_seasons
    : null;

  return (
    <section>
      <div className="flex h-full flex-row items-center justify-start  md:gap-x-8">
        {/* -------------------------------------------- */}
        {/* Display relavent information about the movie */}
        {/* -------------------------------------------- */}

        {/* poster image on large screens and above */}
        <div className="relative hidden h-auto w-[200px] md:block md:w-[250px] lg:w-[300px]">
          <AspectRatio ratio={2 / 3}>
            <ImageLoader
              loaderType="spinner"
              src={`${BASE_IMG_URL}${showDetails.poster_path}`}
              alt={`${title} poster`}
              fill
              sizes="(max-width: 768px) 200px, (max-width: 1024px) 250px, 300px"
              className="object-contain"
            />
          </AspectRatio>
        </div>

        <div className="flex flex-col gap-y-6 text-start text-white ">
          {/* title and genres*/}
          <div className="flex flex-col gap-y-2">
            <h2 className="font-header-2 ">{title}</h2>

            <div className="flex flex-wrap gap-1 text-white/70">
              {showDetails.genres.map((genre, index) => (
                <Chip key={genre.id}>{genre.name}</Chip>
              ))}
            </div>
          </div>

          {/* ------------------------------------------------ */}
          {/* movie overview */}
          {/* ------------------------------------------------ */}
          <p className="font-body-text md:font-small-text max-w-[32rem] tracking-wide text-white md:max-w-[36rem] lg:max-w-[42rem]">
            {showDetails.overview}
          </p>

          {/* ------------------------------------------------ */}
          {/* cast, and director */}
          {/* ------------------------------------------------ */}
          <div className="flex flex-col gap-y-0">
            {cast && (
              <div className="flex flex-wrap items-baseline tracking-wide ">
                <p className="font-small-text font-bold">Starring: &nbsp;</p>
                {cast.map((castMember, index) => (
                  <p
                    key={castMember.id}
                    className="font-small-text font-semibold text-white/70"
                  >
                    {castMember.name}
                    {index < cast.length - 1 ? (
                      <span className="text-white/70">, &nbsp;</span>
                    ) : null}
                  </p>
                ))}
              </div>
            )}

            {director && (
              <div className="flex flex-wrap items-baseline tracking-wide">
                <h3 className="font-small-text font-bold">Director: &nbsp;</h3>
                <p className="font-small-text font-semibold text-white/70">
                  {director.name}
                </p>
              </div>
            )}
          </div>

          {/* rating, duration or num of seasons, release date*/}
          <div className="items-cemter font-small-text flex flex-wrap ">
            <p className="font-normal tracking-wide text-white/70">
              {new Date(date).getFullYear()}
            </p>
            <span className="mx-2 text-white/70">&bull;</span>
            <p className="font-semibold tracking-wide text-white/70">
              {runtime ? runtime : `${numberOfSeasons} Seasons`}
            </p>
            <span className="mx-2 text-white/70">&bull;</span>
            <ImdbRating rating={Number(showDetails.vote_average)} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailsAboutShowSection;
