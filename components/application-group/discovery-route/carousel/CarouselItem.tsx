import React from "react";
import { Suspense } from "react";

import { getTvGenres, getMovieGenres } from "@/lib/tmdb-api/genres";
import { fetchMovieDetails, isMovieDetails } from "@/lib/tmdb-api/movies";
import {
  fetchTvSeriesDetails,
  isTVSeriesDetails,
} from "@/lib/tmdb-api/tv-series";

import BackgroundPoster from "../../BackgroundPoster";

import ShowDetailsSmallScreen from "./ShowDetailsSmallScreen";

type CarouselContentProps = {
  id: number;
  poster_path: string | null;
  backdrop_path: string | null;
  original_title?: string;
  original_name?: string;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
  genre_ids: number[];
};

type CarouselItemProps = {
  showId: number;
  type: string;
};

const CarouselItem = async ({ showId, type }: CarouselItemProps) => {
  // get the genres for the movie or tv show
  // const { data: genreData, error } =
  //   type === "movie" ? await getMovieGenres() : await getTvGenres();

  // fetch the movie or tv show details based on the type
  const { data, error } =
    type === "movie"
      ? await fetchMovieDetails(showId)
      : await fetchTvSeriesDetails(showId);

  console.log("carousel item data", {data});

  // if there is an error, throw it
  if (error) {
    throw new Error(error);
  }

  // if there is no data, return loading
  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="">
      {/* Carousel Image */}
      <Suspense fallback={<div>Loading...</div>}>
        <BackgroundPoster
          poster_path={data.poster_path}
          backdrop_path={data.backdrop_path}
          alt={`${
            isMovieDetails(data)
              ? data.original_title + " slider image"
              : data.original_name + " slider image"
          }`}
          imageClassNames="object-cover object-center"
        />
      </Suspense>

      {/* Overlay with Poster details */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80  via-black/70 to-black/20  md:bg-gradient-to-r">
        <ShowDetailsSmallScreen data={data} type={type} />
      </div>
    </div>
  );
};

export default CarouselItem;

// Poster details component for small screens

// const CarouselItemPlayButton: React.FC = () => {

// }

/* 
display chips
 <div className="flex flex-wrap items-center space-x-4">
                {data.genre_ids.slice(0, 3).map((genre) => (
                  <Chip key={genre}>
                    {genreData?.genres?.find((g) => g.id === genre)?.name}
                  </Chip>
                ))}
              </div>
*/
