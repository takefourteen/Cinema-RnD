"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { slugify } from "@/helpers/slugify";
import { calculateDaysFromToday } from "@/helpers/calculateDaysFromToday";
import { getVideoPlayerUrl } from "@/helpers/getVideoPlayerUrl";
import { fetchTvSeriesExternalIds } from "@/lib/tmdb-api/external-ids";

import { PlayIcon } from "@/components/ui/icons/Icons";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import ImageLoader from "@/components/ImageLoader";
import Overview from "@/components/application-group/Overview";

const BASE_IMG_URL = process.env.NEXT_PUBLIC_OG_TMBD_IMG_PATH;

type EpisodeListItemProps = {
  episodeData: EpisodeData;
  tvSeriesId: string;
  tvSeriesTitle: string;
};

type Styles = {
  default: {
    image: string;
    title: string;
  };
  active: {
    image: string;
    title: string;
  };
};

const styles: Styles = {
  default: {
    image:
      "group-hover:ring-2 group-hover:ring-slate-950 group-hover:ring-offset-2  group-focus-visible:ring-2 group-focus-visible:ring-slate-950 group-focus-visible:ring-offset-2",
    title: "font-small-text max-w-[80%] font-bold ",
  },
  active: {
    image:
      "group-focus:ring-1 group-focus:ring-offset-1 group-focus:ring-[#7e1de0] ring-1 ring-offset-1 ring-offset-[#7e1de0] ring-[#7e1de0]",
    title: "font-small-text max-w-[80%] font-bold tracking-wide text-[#7e1de0]",
  },
};

const EpisodeListItem = ({
  episodeData,
  tvSeriesId,
  tvSeriesTitle,
}: EpisodeListItemProps) => {
  const searchParams = useSearchParams();
  const activeSeason: string | null = searchParams.get("season");
  const activeEpisode: string | null = searchParams.get("episode");

  const episodeIsPlaying =
    activeSeason === episodeData.season_number.toString() &&
    activeEpisode === episodeData.episode_number.toString();

  // calculate the number of days from today's date to the air date of the episode
  const daysFromToday = calculateDaysFromToday(episodeData.air_date);

  /* check if the air date is from today into the future,
    return null
  */
  if (daysFromToday >= 0) return null;

  // url to link episode to
  const episodeUrl = `
  /watch-tv/${slugify(tvSeriesTitle)}-${tvSeriesId.trimEnd()}/?season=${
    episodeData.season_number
  }&episode=${episodeData.episode_number}`;

  return (
    <li className="w-full">
      <Link
        href={episodeIsPlaying ? `#video-player` : episodeUrl}
        shallow={true}
        className={`group relative grid grid-cols-2 sm:flex`}
      >
        <div className="relative w-full">
          <AspectRatio ratio={16 / 9}>
            {/* now playing design */}
            {/* {episodeIsPlaying && (
            <div className="absolute top-0 z-10 h-[30px] w-full bg-primaryBlue">
            <p className="text-center font-small-text font-semibold text-gray-400">
            Now Playing
            </p>
            </div>
          )} */}

            {/* episode poster */}

            <ImageLoader
              loaderType="skeleton"
              src={`${BASE_IMG_URL}${episodeData.still_path}`}
              alt={`${episodeData.name} poster`}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 40vw, 25vw"
              className={`${
                episodeIsPlaying ? styles.active.image : styles.default.image
              } object-cover transition-all duration-300 ease-in-out`}
            />

            {/* play icon */}
            <div
              className={`absolute  inset-0 flex items-center justify-center bg-black bg-opacity-10 `}
            >
              {!episodeIsPlaying && <PlayIcon />}
            </div>
          </AspectRatio>
        </div>

        <EpisodeDetailsOnSmallScreen
          episodeData={episodeData}
          episodeIsPlaying={episodeIsPlaying}
        />
      </Link>

      {/* overview of ep */}
      <div className="mt-4 sm:hidden">
        <Overview
          overview={episodeData.overview}
          intialOverviewLength={125}
          size="small" // size of overview text
        />
      </div>

      {/* episode details - BIGGER SCCREEN SIZES */}
      <div className="hidden flex-col gap-y-2 pe-1 sm:flex lg:pe-2">
        {/* name and duration of ep */}
        <div className="mt-2  flex justify-between ">
          <h3
            className={`${
              episodeIsPlaying ? styles.active.title : styles.default.title
            }`}
          >
            {episodeData.episode_number}. &nbsp;{episodeData.name}
          </h3>
          <p className="font-extra-small-text text-gray-400">
            {episodeData.runtime} min
          </p>
        </div>
        {/* overview of ep */}
        <Overview
          overview={episodeData.overview}
          intialOverviewLength={75}
          size="small" // size of overview text
        />
      </div>
    </li>
  );
};

type EpisodeDetailsOnSmallScreenProps = {
  episodeData: EpisodeData;
  episodeIsPlaying: boolean;
};

const EpisodeDetailsOnSmallScreen = ({
  episodeData,
  episodeIsPlaying,
}: EpisodeDetailsOnSmallScreenProps) => {
  return (
    <>
      {/* name and duration of ep */}
      <div className="ml-2 flex flex-1 flex-col justify-center gap-y-1 sm:hidden">
        <h3
          className={`text-lg font-semibold ${
            episodeIsPlaying && "text-[#7e1de0]"
          }`}
        >
          {episodeData.episode_number}. &nbsp;{episodeData.name}
        </h3>
        <p className="font-small-text text-gray-400">
          {episodeData.runtime} min
        </p>
      </div>
    </>
  );
};

export default EpisodeListItem;
