import React from "react";

import { getImagePathFromImagesData } from "@/helpers/getImagePathFromImagesData";

import { IoMdAdd } from "react-icons/io";
import { Button } from "@/components/ui/button";
import ResponsiveBackgroundPoster from "../ResponsiveBackgroundPoster";
import TitleLogo from "../TitleLogo";
import ImdbRating from "../ImdbRating";
import Overview from "../Overview";
import PlayButton from "@/components/PlayButton";
import Chip from "../Chip";

type TvSeriesDetailsProps = {
  tvSeriesData: TVSeriesData;
  imagesData: ImagesData;
};

const TvSeriesDetails: React.FC<TvSeriesDetailsProps> = ({
  tvSeriesData,
  imagesData,
}) => {
  /*
    check if the imagesData.backdrops array has at least 3 images
    select the 3rd image from the array or the last image if there are less than 3 images
     */
  //   const backdropPath =
  //     imagesData.backdrops[2]?.file_path ||
  //     imagesData.backdrops[imagesData.backdrops.length - 1]?.file_path;

  const backdropPath = getImagePathFromImagesData(
    "backdropPath",
    imagesData,
    0,
  );

  const titleLogo = imagesData.logos.find((logo) => logo.file_path);

  // get the director name
  const director = tvSeriesData.credits?.crew.find(
    (crew) => crew.job === "Director",
  );

  const directorName = director?.name;
  // get the first few cast members, if they exist
  const cast = tvSeriesData.credits?.cast.slice(0, 3);
  // round the vote average to the nearest 1 decimal place
  tvSeriesData.vote_average = Math.round(tvSeriesData.vote_average * 10) / 10;

  return (
    <div className="relative h-[90dvh] flex-1 sm:h-[90dvh] md:h-[85dvh] lg:h-[85dvh] ">
      {/* Image Display */}

      <ResponsiveBackgroundPoster
        poster_path={tvSeriesData.poster_path}
        backdrop_path={backdropPath}
        alt={tvSeriesData.original_name}
        priority={true}
      />

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black  via-black/80 to-transparent  md:w-[80%] md:bg-gradient-to-r md:from-black md:via-black md:to-transparent " />

      {/* Overlay with tv details */}
      <div className="master-container absolute inset-0 flex h-full items-end pb-8 sm:items-end sm:pb-6 lg:mr-auto lg:max-w-[80%] ">
        {/* Display relavent information about the tv */}
        <div className="text-start text-white ">
          {/* tv title logo or Normal title*/}
          {titleLogo ? (
            <TitleLogo logoData={titleLogo} alt={tvSeriesData.original_name} />
          ) : (
            // tv title
            <h1 className="font-header-2 mb-4 lg:mb-6">
              {tvSeriesData.original_name}
            </h1>
          )}

          {/* tv rating, tv duration and Year */}
          <div className="items-cemter font-small-text mt-4 flex flex-wrap ">
            {/* tv year */}
            <p className="font-semibold tracking-wide text-white/100">
              {new Date(tvSeriesData.first_air_date).getFullYear()}
            </p>
            <span className="mx-2 text-white/70">&bull;</span>
            {/* Number of Seasons */}
            <p className="font-semibold tracking-wide text-white/100">
              {tvSeriesData.number_of_seasons} Seasons
            </p>
            <span className="mx-2 text-white/70">&bull;</span>
            {/* tv rating */}
            <ImdbRating rating={tvSeriesData.vote_average} />
          </div>

          {/* tv overview using the tvOverview component */}
          <div className="mt-6 lg:mt-8">
            <Overview overview={tvSeriesData.overview} />
          </div>

          {/* Btns */}
          <div className="flex gap-x-4">
            {/* play button */}
            <PlayButton className="mt-6 lg:mt-8">Play S1 EP1</PlayButton>
            {/* add to library button */}
            <Button
              variant={"outline"}
              size={"icon"}
              className="mt-6 rounded-full  text-white lg:mt-8 "
              aria-label="Add to library"
            >
              <IoMdAdd className=" inline-block h-5 w-5" />
            </Button>
          </div>

          {/* tv starring, if there is a cast to display */}
          {cast && (
            <div className="font-text-small mt-6 flex flex-wrap items-baseline tracking-wide lg:mt-8">
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

          {/* tv director, if there is a director to display */}
          {directorName && (
            <div className="font-text-small flex flex-wrap items-baseline tracking-wide lg:mt-1">
              <h3 className=" font-bold">Director: &nbsp;</h3>
              <span className="font-semibold  text-white/70">
                {directorName}
              </span>
            </div>
          )}

          {/* tv genres */}
          <div className="mt-6 flex flex-wrap gap-1 font-semibold lg:mt-8">
            {tvSeriesData.genres.map((genre, index) => (
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
    </div>
  );
};

export default TvSeriesDetails;
