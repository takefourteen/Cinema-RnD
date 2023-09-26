import React from "react";
import Link from "next/link";

import { getTvGenres, getMovieGenres } from "@/lib/tmdb-api/genres";
import { fetchMovieDetails } from "@/lib/tmdb-api/movies";

import { IoMdAdd as AddIcon } from "react-icons/io";
import { AiOutlineInfo as InfoIcon } from "react-icons/ai";
import { BsFillPlayFill as PlayIcon } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import BackgroundPoster from "../../BackgroundPoster";
import PlayButton from "@/components/PlayButton";
import { DetailsButton } from "@/components/DetailsButton";

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
  data: CarouselContentProps;
  activeSlide: number;
  type: "movie" | "tv";
};

const CarouselItem = async ({ data, activeSlide, type }: CarouselItemProps) => {
  // get the genres for the movie or tv show
  const { data: genreData, error } =
    type === "movie" ? await getMovieGenres() : await getTvGenres();

  return (
    <div className="">
      {/* Carousel Image */}
      <BackgroundPoster
        poster_path={data.poster_path}
        backdrop_path={data.backdrop_path}
        alt={"Slider Image"}
        imageClassNames="object-cover object-center"
      />

      {/* Overlay with Poster details */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80  via-black/70 to-black/20  md:bg-gradient-to-r">
        <div className="master-container flex h-full flex-col items-center justify-end gap-y-2 pb-8 text-center  lg:max-w-[80%] ">
          {/* Title */}
          <h1 className="text-center text-[32px] font-bold md:text-[36px] lg:text-[40px]">
            {data.original_title || data.original_name}
          </h1>

          {/* Genres with a dot between them */}
          <div className=" flex flex-wrap items-center justify-center gap-1">
            {data.genre_ids.slice(0, 3).map((genre) => (
              <span
                key={genre}
                className="flex items-center gap-1.5 text-primaryWhite/70"
              >
                <span>
                  {genreData?.genres?.find((g) => g.id === genre)?.name}
                </span>
                {genre !== data.genre_ids[2] && (
                  <span className="h-[5px] w-[5px] rounded-full border-primaryRed bg-primaryRed"></span>
                )}
              </span>
            ))}
          </div>

          {/* add, play and info btns */}
          <div className="mt-2 flex h-max items-center justify-center gap-4 lg:mt-4 ">
            {/* add to library button */}
            <DetailsButton
              variant={"outline"}
              size={"icon"}
              className="rounded-full border-none p-0"
            >
              <AddIcon className=" h-8 w-8" />
            </DetailsButton>

            {/* play button */}
            {/* if its a movie, href is movie/:id, if tv, href is tv/:id */}
            <DetailsButton asChild>
              <Link
                href={`/${type}/${data.id}`}
                className="text-lg font-semibold"
              >
                <PlayIcon className="mr-1 h-7 w-7" /> Play
              </Link>
            </DetailsButton>

            {/* info button */}
            <DetailsButton
              asChild
              variant={"outline"}
              size={"icon"}
              className="rounded-full p-0"
            >
              <Link href={`/${type}/${data.id}`}>
                <InfoIcon className="h-6 w-6" />
              </Link>
            </DetailsButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarouselItem;

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
