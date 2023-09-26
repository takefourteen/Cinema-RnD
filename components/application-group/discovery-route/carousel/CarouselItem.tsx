import Link from "next/link";

import { getTvGenres, getMovieGenres } from "@/lib/tmdb-api/genres";

import { IoMdAdd as AddIcon } from "react-icons/io";
import { AiOutlineInfo as InfoIcon } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import BackgroundPoster from "../../BackgroundPoster";
import PlayButton from "@/components/PlayButton";
import React from "react";

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
      <div className="from-black/80 via-black/70 to-black/20 absolute  inset-0 bg-gradient-to-t  md:bg-gradient-to-r">
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
                className="text-primaryWhite/70 flex items-center gap-1.5"
              >
                <span>
                  {genreData?.genres?.find((g) => g.id === genre)?.name}
                </span>
                {genre !== data.genre_ids[2] && (
                  <span className="bg-primaryRed border-primaryRed h-[5px] w-[5px] rounded-full"></span>
                )}
              </span>
            ))}
          </div>

          {/* add, play and info btns */}
          <div className="mt-2 flex h-max items-center justify-center gap-4 lg:mt-4 ">
            {/* add to library button */}
            <Button
              variant={"outline"}
              size={"icon"}
              className="text-white  rounded-full border-none text-base  font-semibold  "
            >
              <AddIcon className=" inline-block h-8 w-8" />
            </Button>
            {/* play button */}
            <PlayButton asLink={true} size="sm" href={`/${type}/${data.id}`}>
              {/* if its a movie, href is movie/:id, if tv, href is tv/:id */}
              Play
            </PlayButton>
            {/* info button */}
            <Button 
              variant={"outline"}
              size={"icon"}
              className="text-white rounded-full text-base  font-bold"
            >
              <InfoIcon className=" inline-block h-5 w-5" />
            </Button>
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
