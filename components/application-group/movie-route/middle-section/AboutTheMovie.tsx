import React from "react";

import { fetchMovieDetails } from "@/lib/tmdb-api/movies";

import { AiFillStar } from "react-icons/ai";
import { IoMdAdd } from "react-icons/io";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import Chip from "../../Chip";
import ImageLoader from "@/components/ImageLoader";
import ImdbRating from "../../ImdbRating";

type AboutTheMovieProps = {
  mediaId: string;
};

const BASE_IMG_URL = "https://image.tmdb.org/t/p/w500";

const AboutTheMovie = async ({ mediaId: movieId }: AboutTheMovieProps) => {
  const movieDetails = await fetchMovieDetails(movieId);

  if (!movieDetails) {
    return <div>Loading...</div>;
  }

  // look for the first production company that has a logo path
  const productionCompany = movieDetails.production_companies.find(
    (company) => company.logo_path,
  );

  // get the director name
  const director = movieDetails.credits?.crew.find(
    (crew) => crew.job === "Director",
  );
  // get the first few cast members, if they exist
  const cast = movieDetails.credits?.cast.slice(0, 3);
  // round the vote average to the nearest 1 decimal place
  movieDetails.vote_average = Math.round(movieDetails.vote_average * 10) / 10;
  // change the time format from minutes to hours and minutes
  const runtime = `${Math.floor(movieDetails.runtime / 60)}h ${
    movieDetails.runtime % 60
  }m`;

  return (
    <section>
      <div className="flex h-full flex-row items-start justify-start  lg:gap-x-8">
        {/* -------------------------------------------- */}
        {/* Display relavent information about the movie */}
        {/* -------------------------------------------- */}

        {/* poster image on large screens and above */}
        <div className="hidden lg:block">
          <div className="relative h-auto w-[200px] lg:w-[300px]">
            <AspectRatio ratio={2 / 3}>
              <ImageLoader
                loaderType="spinner"
                src={`${BASE_IMG_URL}${movieDetails.poster_path}`}
                alt={movieDetails.original_title}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 40vw, 25vw"
                className="object-contain"
              />
            </AspectRatio>
          </div>

          {/* add to library button - shows on large screens */}
          <div className="mt-6">
            <Button
              variant={"outline"}
              className="flex w-full items-center justify-center rounded-sm text-base font-semibold text-white "
            >
              <IoMdAdd className="mr-2 inline-block h-5 w-5" /> Add to Library
            </Button>
          </div>
        </div>

        <div className="text-start text-white ">
          {/* movie title with release year*/}
          <h2 className="font-header-2 ">{movieDetails.original_title}</h2>

          {/* movie genres */}
          <div className="mt-2 flex flex-wrap gap-1 text-white/70">
            {movieDetails.genres.map((genre, index) => (
              <Chip key={genre.id}>{genre.name}</Chip>
            ))}
          </div>

          {/* ------------------------------------------------ */}
          {/* movie overview */}
          {/* ------------------------------------------------ */}
          <p className="font-body-text mt-6 tracking-wide text-white lg:mt-8 lg:max-w-[36rem] ">
            {movieDetails.overview}
          </p>

          {/* movie starring, if there is a cast to display */}
          {cast && (
            <div className="mt-6 flex flex-wrap items-baseline tracking-wide lg:mt-8">
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

          {/* movie director, if there is a director to display */}
          {director && (
            <div className="flex flex-wrap items-baseline tracking-wide lg:mt-1">
              <h3 className="font-small-text font-bold">Director: &nbsp;</h3>
              <p className="font-small-text font-semibold text-white/70">
                {director.name}
              </p>
            </div>
          )}

          {/* movie rating, movie duration, and release date */}
          <div className="items-cemter font-small-text mt-4 flex flex-wrap lg:mt-6">
            {/* <p className="flex items-center tracking-wide text-white/70 ">
              <AiFillStar className="mr-1 inline-block h-[14px] w-[14px] text-white/70" />{" "}
              {movieDetails.vote_average}
            </p> */}

            <p className="font-normal tracking-wide text-white/70">
              {new Date(movieDetails.release_date).getFullYear()}
            </p>

            <span className="mx-2 text-white/70">&bull;</span>
            <p className="font-semibold tracking-wide text-white/70">
              {runtime}
            </p>

            <span className="mx-2 text-white/70">&bull;</span>

            <ImdbRating rating={Number(movieDetails.vote_average)} />
          </div>

          {/* add to library button - shows on small screens */}
          <div className="mt-6 lg:hidden">
            <Button
              variant={"outline"}
              className="font-button-text flex w-full items-center justify-center rounded-sm  text-white "
            >
              <IoMdAdd className="mr-2 inline-block h-5 w-5" /> Add to Library
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutTheMovie;
