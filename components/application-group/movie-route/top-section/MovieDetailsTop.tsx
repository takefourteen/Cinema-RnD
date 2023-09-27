import Image from "next/image";

import {
  MovieDetailsApiResponse,
  fetchMovieDetails,
} from "@/lib/tmdb-api/movies";

import { AiFillStar } from "react-icons/ai";
import { IoMdAdd } from "react-icons/io";
import { Button } from "@/components/ui/button";
import Chip from "../Chip";
import PlayButton from "@/components/PlayButton";
import MovieOverview from "./MovieOverview";
import ImageDisplay from "./ImageDisplay";

interface MovieHeaderProps {
  movieId: string;
}

const MovieDetailsTop: React.FC<MovieHeaderProps> = async ({ movieId }) => {
  const movieDetailsPromise: Promise<MovieDetailsApiResponse> =
    fetchMovieDetails(movieId);
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
    <div className=" from-black to-black relative min-h-[40rem] bg-gradient-to-r sm:min-h-[50rem] md:min-h-[40rem] lg:min-h-[50rem]">
      {/* Image Display */}
      <ImageDisplay
        poster_path={movieDetails.poster_path}
        backdrop_path={movieDetails.backdrop_path}
        alt={movieDetails.original_title}
      />

      {/* Overlay with movie details */}
      <div className="from-black/80 via-black/60 to-black/20 absolute  inset-0 bg-gradient-to-t  md:bg-gradient-to-r">
        <div className="master-container flex h-full items-end pb-8 sm:items-center sm:p-0 lg:max-w-[80%]">
          {/* Display relavent information about the movie */}
          <div className="text-white text-start ">
            {/* movie production company logo */}
            {/* see below for code to display the production company logo */}

            {/* movie title with release year*/}
            <h1 className="text-[32px] font-bold md:text-[36px] lg:text-[40px]">
              {movieDetails.original_title}
              {/* add space */}
              &nbsp;
              <span className="text-white/70  ml-2 font-normal tracking-wide">
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
              <PlayButton className="mt-6 lg:mt-8">Play Movie</PlayButton>
              {/* add to library button */}
              <Button
                variant={"outline"}
                size={"icon"}
                className="text-white mt-6 rounded-full text-base  font-semibold lg:mt-8 "
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
                    className="text-white/70  font-semibold"
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
                <span className="text-white/70  font-semibold">
                  {director.name}
                </span>
              </div>
            )}

            {/* movie rating and movie duration */}
            <div className="items-cemter mt-4 flex flex-wrap lg:mt-6">
              <span className="text-white/70 flex items-center tracking-wide ">
                <AiFillStar className="text-white/70 mr-1 inline-block h-[14px] w-[14px]" />{" "}
                {movieDetails.vote_average}
              </span>
              <span className="text-white/70 mx-2">&bull;</span>
              <span className="text-white/70 font-semibold tracking-wide">
                {runtime}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsTop;

/* 
 Display the image if it exists 
{productionCompany?.logo_path ? (
                <div>
                  <div className="relative min-h-[40px] w-[150px] lg:h-[100px] lg:w-[200px]">
                    <Image
                      src={`${BASE_IMG_URL}${productionCompany.logo_path}`}
                      alt={productionCompany.name}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 40vw, 25vw"
                      className="object-contain"
                    />
                  </div>
                </div>
              ) : (
                // Display the name if image doesn't exist
                productionCompany?.name && (
                  <h2 className="text-2xl font-bold">
                    {productionCompany.name}
                  </h2>
                )
              )}
*/
