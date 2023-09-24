import React from "react";
import Image from "next/image";

import { fetchMovieDetails } from "@/lib/tmdb-api/movies";

import { AiFillStar } from "react-icons/ai";
import { IoMdAdd } from "react-icons/io";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import Chip from "../Chip";
import MoviePosterWithLoader from "./MoviePosterWithLoader";

type AboutTheMovieProps = {
  movieId: string;
};

const BASE_IMG_URL = process.env.NEXT_PUBLIC_OG_TMBD_IMG_PATH;

const AboutTheMovie = async ({ movieId }: AboutTheMovieProps) => {
  const { data: movieDetails, error } = await fetchMovieDetails(movieId);
  // console.log(movieDetails);

  /*
    if there is an error fetching similarMovies and recommendedMovies, 
    throw an error that will be caught by the ErrorBoundary (error.tsx)
   */
  if (error) {
    throw new Error(`Error fetching movie details: ${error}`);
  }

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
              <MoviePosterWithLoader
                poster_path={movieDetails.poster_path}
                alt={movieDetails.original_title}
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
          <h1 className="text-2xl font-bold md:text-3xl">
            {movieDetails.original_title}
          </h1>

          {/* movie genres */}
          <div className="mt-2 flex flex-wrap gap-1 text-white/70">
            {movieDetails.genres.map((genre, index) => (
              <Chip key={genre.id}>{genre.name}</Chip>
            ))}
          </div>

          {/* ------------------------------------------------ */}
          {/* movie overview */}
          {/* ------------------------------------------------ */}
          <p className="mt-6 text-base tracking-wide text-white lg:mt-8 lg:max-w-[36rem] lg:text-lg">
            {movieDetails.overview}
          </p>

          {/* movie starring, if there is a cast to display */}
          {cast && (
            <div className="mt-6 flex flex-wrap items-baseline tracking-wide lg:mt-8">
              <h3 className=" font-bold">Starring: &nbsp;</h3>
              {cast.map((castMember, index) => (
                <span
                  key={castMember.id}
                  className="font-semibold  text-white/70"
                >
                  {castMember.name}
                  {index < cast.length - 1 ? (
                    <span className="text-white/70">, &nbsp;</span>
                  ) : null}
                </span>
              ))}
            </div>
          )}

          {/* movie director, if there is a director to display */}
          {director && (
            <div className="flex flex-wrap items-baseline tracking-wide lg:mt-1">
              <h3 className=" font-bold">Director: &nbsp;</h3>
              <span className="font-semibold  text-white/70">
                {director.name}
              </span>
            </div>
          )}

          {/* movie rating, movie duration, and release date */}
          <div className="items-cemter mt-4 flex flex-wrap lg:mt-6">
            <span className="flex items-center tracking-wide text-white/70 ">
              <AiFillStar className="mr-1 inline-block h-[14px] w-[14px] text-white/70" />{" "}
              {movieDetails.vote_average}
            </span>
            <span className="mx-2 text-white/70">&bull;</span>
            <span className="font-normal tracking-wide text-white/70">
              {new Date(movieDetails.release_date).getFullYear()}
            </span>
            <span className="mx-2 text-white/70">&bull;</span>
            <span className="font-semibold tracking-wide text-white/70">
              {runtime}
            </span>
          </div>

          {/* add to library button - shows on small screens */}
          <div className="mt-6 lg:hidden">
            <Button
              variant={"outline"}
              className="flex w-full items-center justify-center rounded-sm text-base  font-semibold text-white "
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
