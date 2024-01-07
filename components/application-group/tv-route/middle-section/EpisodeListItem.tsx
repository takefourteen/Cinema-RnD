"use client";

import Link from "next/link";
import useSWR from "swr";
import { Session } from "next-auth";
import { useSearchParams, usePathname } from "next/navigation";

import { slugify } from "@/helpers/slugify";
import { calculateDaysFromToday } from "@/helpers/calculateDaysFromToday";
import { hasWatchedTVSeriesEpisode } from "@/lib/mongodb-api/hasWatchedTVSeriesEpisode";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import ImageLoader from "@/components/ImageLoader";
import Overview from "@/components/application-group/Overview";
import AlreadyWatched from "@/components/ui/AlreadyWatched";
import NowPlaying from "@/components/ui/NowPlaying";
import WatchEpisode from "@/components/ui/WatchEpisode";

const BASE_IMG_URL = "https://image.tmdb.org/t/p/w300";

type EpisodeListItemProps = {
  episodeData: EpisodeData;
  tvSeriesId: string;
  tvSeriesTitle: string;
  userSession: Session | null;
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
  userSession,
}: EpisodeListItemProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const currentPath = pathname.split("/")[1];
  const activeSeason: string | null = searchParams.get("season");
  const activeEpisode: string | null = searchParams.get("episode");

  const { data: alreadyWatchedEpisode } = useSWR(
    userSession
      ? [
          tvSeriesId,
          episodeData.season_number,
          episodeData.episode_number,
          userSession?.user?.email,
        ]
      : null,
    () => {
      return hasWatchedTVSeriesEpisode({
        episode: episodeData.episode_number,
        season: episodeData.season_number,
        id: tvSeriesId,
        userEmail: userSession?.user?.email as string,
      });
    },
  );

  // check if the episode is playing, by checking if the pathname is watch-tv, and if the season and episode params match the episode data
  const episodeIsPlaying =
    activeSeason === episodeData.season_number.toString() &&
    activeEpisode === episodeData.episode_number.toString() &&
    currentPath === "watch-tv";

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
        href={episodeIsPlaying ? `#video-frame-player` : episodeUrl}
        shallow={true}
        className={`group relative grid grid-cols-2 sm:flex`}
      >
        <div className="relative w-full">
          <AspectRatio ratio={16 / 9}>
            {episodeIsPlaying ? (
              <NowPlaying />
            ) : alreadyWatchedEpisode ? (
              <AlreadyWatched showCheckMark />
            ) : !episodeIsPlaying ? (
              <WatchEpisode />
            ) : null}

            {/* episode image */}
            <ImageLoader
              loaderType="skeleton"
              src={`${BASE_IMG_URL}${episodeData.still_path}`}
              alt={`${episodeData.name} poster`}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 40vw, 25vw"
              className={`${styles.default.image} object-cover transition-all duration-300 ease-in-out`}
            />

            {/* play icon */}
          </AspectRatio>
        </div>

        <EpisodeDetailsOnSmallScreen episodeData={episodeData} />
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
          <h3 className={`${styles.default.title}`}>
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
};

const EpisodeDetailsOnSmallScreen = ({
  episodeData,
}: EpisodeDetailsOnSmallScreenProps) => {
  return (
    <>
      {/* name and duration of ep */}
      <div className="ml-2 flex flex-1 flex-col justify-center gap-y-1 sm:hidden">
        <h3 className={`} text-lg font-semibold`}>
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
