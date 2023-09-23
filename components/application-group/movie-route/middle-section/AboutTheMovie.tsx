import React from "react";
import Image from "next/image";

import { fetchMovieDetails } from "@/lib/tmdb-api/movies";

import Chip from "../Chip";
import { AiFillStar } from "react-icons/ai";
import { AspectRatio } from "@/components/ui/aspect-ratio";

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
      <h2 className="mb-4 text-2xl font-bold text-white/70 md:text-3xl">
        About this movie
      </h2>

      <div className="flex h-full flex-row items-start justify-start  lg:gap-x-8">
        {/* -------------------------------------------- */}
        {/* Display relavent information about the movie */}
        {/* -------------------------------------------- */}

        {/* poster image on medium screens and above */}
        <div className="hidden md:block">
          <div className="relative h-auto w-[200px] lg:w-[300px]">
            <AspectRatio ratio={2 / 3}>
              <Image
                src={`${BASE_IMG_URL}${movieDetails.poster_path}`}
                alt={movieDetails.original_title}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 40vw, 25vw"
                className="object-contain"
              />
            </AspectRatio>
          </div>
        </div>

        <div className="text-start text-white ">
          {/* movie production company logo */}
          {/* see below for code to display the production company logo */}

          {/* movie title with release year*/}
          <h1 className="text-2xl font-bold md:text-3xl">
            {movieDetails.original_title}
            {/* add space */}
            &nbsp;
            <span className="ml-2  font-normal tracking-wide text-white/70">
              {new Date(movieDetails.release_date).getFullYear()}
            </span>
          </h1>

          {/* movie genres */}
          <div className="flex flex-wrap gap-1 lg:mt-1">
            {movieDetails.genres.map((genre, index) => (
              <Chip key={genre.id}>{genre.name}</Chip>
            ))}
          </div>

          {/* ------------------------------------------------ */}
          {/* movie overview using the MovieOverview component */}
          {/* ------------------------------------------------ */}
          <p className="mt-6 text-base tracking-wide text-white lg:mt-8 lg:text-lg">
            {movieDetails.overview}
          </p>

          {/* add to library button */}

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

          {/* movie rating and movie duration */}
          <div className="items-cemter mt-4 flex flex-wrap lg:mt-6">
            <span className="flex items-center tracking-wide text-white/70 ">
              <AiFillStar className="mr-1 inline-block h-[14px] w-[14px] text-white/70" />{" "}
              {movieDetails.vote_average}
            </span>
            <span className="mx-2 text-white/70">&bull;</span>
            <span className="font-semibold tracking-wide text-white/70">
              {runtime}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutTheMovie;
