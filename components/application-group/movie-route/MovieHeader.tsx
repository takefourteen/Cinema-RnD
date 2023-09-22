import Image from "next/image";

import { BsFillPlayFill } from "react-icons/bs";
import { AiFillStar } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import PlayButton from "@/components/PlayButton";
import MovieOverview from "./MovieOverview";

interface MovieHeaderProps {
  movieDetails: MovieDetailsData;
}

const BASE_IMG_URL = process.env.NEXT_PUBLIC_OG_TMBD_IMG_PATH;

const MovieHeader: React.FC<MovieHeaderProps> = ({ movieDetails }) => {
  // console.log(movieDetails);

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
    <div className="relative h-[70dvh] md:h-[80dvh] lg:h-[90dvh]">
      {/* Backdrop image */}
      <div
        className={`absolute inset-0 bg-cover bg-center bg-no-repeat`}
        style={{
          backgroundImage: `url(${BASE_IMG_URL}${movieDetails.backdrop_path})`,
        }}
      >
        {/* Overlay with movie details */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/70 to-black/60">
          <div className="master-container flex h-full flex-col justify-end pb-8 md:justify-center md:pb-0 lg:max-w-[80%]">
            <div className="text-start text-white">
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
              <div className="flex lg:mt-1 flex-wrap">
                {movieDetails.genres.map((genre, index) => (
                  <span
                    key={genre.id}
                    className="font-semibold tracking-wide text-white/70"
                  >
                    {genre.name}
                    {index < movieDetails.genres.length - 1 ? (
                      <span className="mx-2 text-white/70">&bull;</span>
                    ) : null}
                  </span>
                ))}
              </div>

              {/* movie overview using the MovieOverview component */}
              <MovieOverview overview={movieDetails.overview} />

              {/* play button */}
              <PlayButton>Play Movie</PlayButton>

              {/* movie starring, if there is a cast to display */}
              {cast && (
                <div className="mt-6 lg:mt-8 flex flex-wrap items-baseline tracking-wide">
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
                <div className="flex lg:mt-1 flex-wrap items-baseline tracking-wide">
                  <h3 className=" font-bold">Director: &nbsp;</h3>
                  <span className="font-semibold  text-white/70">
                    {director.name}
                  </span>
                </div>
              )}

              {/* movie rating and movie duration */}
              <div className="items-cemter mt-4 lg:mt-6 flex flex-wrap">
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
        </div>
      </div>
    </div>
  );
};

export default MovieHeader;

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
