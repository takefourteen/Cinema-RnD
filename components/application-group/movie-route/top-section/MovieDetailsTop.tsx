import Image from "next/image";


import {
  MovieDetailsApiResponse,
  fetchMovieDetails,
} from "@/lib/tmdb-api/movies";

import { AiFillStar } from "react-icons/ai";
import { IoMdAdd } from "react-icons/io";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import Chip from "../Chip";
import PlayButton from "@/components/PlayButton";
import MovieOverview from "./MovieOverview";

interface MovieHeaderProps {
  movieId: string;
}

const BASE_IMG_URL = process.env.NEXT_PUBLIC_OG_TMBD_IMG_PATH;

const MovieDetailsTop: React.FC<MovieHeaderProps> = async ({
  movieId,
}) => {
  const movieDetailsPromise: Promise<MovieDetailsApiResponse> = fetchMovieDetails(movieId);
  const { data: movieDetails, error: movieDetailsError } =
    await movieDetailsPromise;

  /*
    if there is an error fetching similarMovies and recommendedMovies, 
    throw an error that will be caught by the ErrorBoundary (error.tsx)
   */
  if (movieDetailsError) {
    throw new Error(`Error fetching movie details: ${movieDetailsError}`);
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
    <div className="relative min-h-[100dvh] sm:min-h-[50rem] md:min-h-[40rem] lg:min-h-[50rem]">
      {" "}
      {/* Backdrop image */}
      <div
        className={`absolute inset-0 bg-cover bg-center bg-no-repeat`}
        style={{
          backgroundImage: `url(${BASE_IMG_URL}${movieDetails.backdrop_path})`,
        }}
      >
        {/* Overlay with movie details */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/70 to-black/60
           lg:from-black/90 lg:via-black/80 lg:to-black/70
        "
        >
          <div className="master-container flex h-full flex-row items-end pb-12 md:items-center md:pb-0 lg:max-w-[80%] lg:justify-center lg:gap-x-8">
            {/* Display relavent information about the movie */}
            <div className="text-start text-white ">
              {/* movie production company logo */}
              {/* see below for code to display the production company logo */}

              {/* movie title with release year*/}
              <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl">
                {movieDetails.original_title}
                {/* add space */}
                &nbsp;
                <span className="ml-2  font-normal tracking-wide text-white/70">
                  {new Date(movieDetails.release_date).getFullYear()}
                </span>
              </h1>

              {/* movie genres */}
              <div className="mt-1 flex flex-wrap gap-1">
                {movieDetails.genres.map((genre, index) => (
                  <Chip key={genre.id}>{genre.name}</Chip>
                ))}
              </div>

              {/* movie overview using the MovieOverview component */}
              <MovieOverview overview={movieDetails.overview} />

              <div className="flex gap-x-4">
                {/* play button */}
                <PlayButton>Play Movie</PlayButton>
                {/* add to library button */}
                <Button
                  variant={"outline"}
                  size={"icon"}
                  className="mt-6 rounded-full text-base font-semibold  text-white lg:mt-8 "
                >
                  <IoMdAdd className=" inline-block h-5 w-5" />
                </Button>
              </div>

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

            {/* poster image on medium screen */}
            <div className="hidden md:block">
              <div className="relative mt-8 h-auto w-[200px] lg:w-[300px]">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsTop;
