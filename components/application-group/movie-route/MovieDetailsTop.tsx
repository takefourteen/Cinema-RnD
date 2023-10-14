import Link from "next/link";

import { slugify } from "@/helpers/slugify";
import { fetchMovieDetails } from "@/lib/tmdb-api/movies";
import { fetchImages } from "@/lib/tmdb-api/images";

import { IoMdAdd } from "react-icons/io";
import { BsFillPlayFill as PlayIcon } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import { DetailsButton } from "@/components/DetailsButton";
import Chip from "../Chip";
import Overview from "../Overview";
import ResponsiveBackgroundPoster from "../ResponsiveBackgroundPoster";
import ImdbRating from "../ImdbRating";
import TitleLogo from "../TitleLogo";

interface MovieHeaderProps {
  movieId: string;
}

const MovieDetailsTop: React.FC<MovieHeaderProps> = async ({ movieId }) => {
  // fetch the movie details and images
  const movieDetailsPromise = fetchMovieDetails(movieId);
  const imagesPromise = fetchImages(movieId, "movie");

  // wait for both promises to resolve
  const [movieDetailsResponse, imagesResponse] = await Promise.all([
    movieDetailsPromise,
    imagesPromise,
  ]);

  // destructure the data and error from the responses
  const movieDetails = movieDetailsResponse;
  const images = imagesResponse;

  /*
    check if the imagesData.backdrops array has at least 3 images
    select the 3rd image from the array or the last image if there are less than 3 images
     */
  const backdropPath =
    images.backdrops[2]?.file_path ||
    images.backdrops[images.backdrops.length - 1]?.file_path;

  // look for the first images.logos with a file_path
  const titleLogo = images.logos.find((logo) => logo.file_path);

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

  // url encoded link to the watch-movie page
  // const watchMovieUrl = `/watch-movie/${movieDetails.id}-${encodeURIComponent(
  //   movieDetails.original_title,
  // )}`;

  const watchMovieUrl = `/watch-movie/${slugify(movieDetails.original_title)}-${
    movieDetails.id
  }`;

  return (
    <>
      {/* Image Display */}
      <ResponsiveBackgroundPoster
        poster_path={movieDetails.poster_path}
        backdrop_path={backdropPath}
        alt={movieDetails.original_title}
        priority={true}
      />

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black  via-black/80 to-transparent  md:w-[80%] md:bg-gradient-to-r md:from-black md:via-black md:to-transparent " />

      {/* Overlay with movie details */}
      <div className="master-container absolute inset-0 flex h-full items-end pb-8 sm:items-end sm:pb-6 lg:mr-auto lg:max-w-[80%] ">
        {/* Display relavent information about the movie */}
        <div className="text-start text-white ">
          {/* movie production company logo */}
          {/* see below for code to display the production company logo */}

          {/* movie title logo or Normal title*/}
          {titleLogo?.file_path ? (
            <TitleLogo logoData={titleLogo} alt={movieDetails.original_title} />
          ) : (
            // movie title
            <h1 className="font-header-2 mb-4 lg:mb-6">
              {movieDetails.original_title}
            </h1>
          )}

          {/* movie rating, movie duration and Year */}
          <div className="items-cemter font-small-text mt-2 flex flex-wrap ">
            {/* movie year */}
            <p className="font-semibold tracking-wide text-white/100">
              {new Date(movieDetails.release_date).getFullYear()}
            </p>
            <span className="mx-2 text-white/70">&bull;</span>
            {/* movie duration */}
            <p className="font-semibold tracking-wide text-white/100">
              {runtime}
            </p>
            <span className="mx-2 text-white/70">&bull;</span>
            {/* movie rating */}
            <ImdbRating rating={movieDetails.vote_average} />
          </div>

          {/* movie overview using the MovieOverview component */}
          <div className="mt-6 lg:mt-8">
            <Overview overview={movieDetails.overview} />
          </div>

          {/* Btns */}
          <div className="flex gap-x-4">
            {/* play button */}
            {/* <PlayButton className="mt-6 lg:mt-8">Play Movie</PlayButton> */}
            <DetailsButton
              asChild
              className=" font-button-text mt-6 h-10 lg:mt-8"
            >
              <Link href={`${watchMovieUrl}`}>
                <PlayIcon className="mr-1 h-8 w-8" /> Play
              </Link>
            </DetailsButton>
            {/* add to library button */}
            <Button
              variant={"outline"}
              size={"icon"}
              className="mt-6 rounded-full text-white lg:mt-8 "
              aria-label="Add to library"
            >
              <IoMdAdd className=" inline-block h-5 w-5" />
            </Button>
          </div>

          {/* movie starring, if there is a cast to display */}
          {cast && (
            <div className="font-text-small mt-6 flex flex-wrap items-baseline tracking-wide lg:mt-8">
              <h3 className="font-bold">Starring: &nbsp;</h3>
              {cast.map((castMember, index) => (
                <p key={castMember.id} className="font-semibold  text-white/70">
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
            <div className="font-text-small flex flex-wrap items-baseline tracking-wide lg:mt-1">
              <h3 className=" font-bold">Director: &nbsp;</h3>
              <p className="font-semibold  text-white/70">{director.name}</p>
            </div>
          )}

          {/* movie genres */}
          <div className="mt-6 flex flex-wrap gap-1 font-semibold lg:mt-8">
            {movieDetails.genres.map((genre, index) => (
              <Chip key={genre.id}>{genre.name}</Chip>
            ))}
          </div>
        </div>
      </div>

      {/* 
        short dark overlay at the bottom of the image to blend into the 
        next section
      */}
      <div className="absolute inset-x-0 bottom-0 hidden h-4 bg-gradient-to-t from-black to-transparent md:flex" />
    </>
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
