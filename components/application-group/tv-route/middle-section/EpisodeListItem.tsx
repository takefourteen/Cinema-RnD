import Link from "next/link";

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

const EpisodeListItem = ({
  episodeData,
  tvSeriesId,
  tvSeriesTitle,
}: EpisodeListItemProps) => {
  const daysFromToday = calculateDaysFromToday(episodeData.air_date);

  /* if ep is less then 3 days old
    or the air date is from three days ago into the future,
    return null
  */
  if (daysFromToday >= 0) return null;

  // url to link episode to
  const episodeUrl = `
  /watch-tv/${slugify(tvSeriesTitle)}-${tvSeriesId.trimEnd()}/?season=${
    episodeData.season_number
  }&episode=${episodeData.episode_number}`;

  return (
    <li className="group relative w-full ">
      <AspectRatio ratio={16 / 9}>
        <Link href={episodeUrl}>
          <ImageLoader
            loaderType="skeleton"
            src={`${BASE_IMG_URL}${episodeData.still_path}`}
            alt={`${episodeData.name} poster`}
            fill
            priority={false}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 40vw, 25vw"
            className="object-cover transition-all duration-300 ease-in-out group-hover:ring-2 group-hover:ring-slate-950 group-hover:ring-offset-2  group-focus-visible:ring-2 group-focus-visible:ring-slate-950 group-focus-visible:ring-offset-2"
            // style={{ filter: "brightness(0.9)" }}
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
            <PlayIcon />
          </div>
        </Link>
      </AspectRatio>

      <div className="flex flex-col gap-y-2 pe-1 lg:pe-2">
        {/* name and duration of ep */}
        <div className="mt-2 flex justify-between">
          <h3 className="font-small-text max-w-[80%] font-bold">
            {episodeData.episode_number}. &nbsp;{episodeData.name}
          </h3>
          <p className="font-extra-small-text text-gray-400">
            {episodeData.runtime} min
          </p>
        </div>
        {/* overview of ep */}
        <Overview
          overview={episodeData.overview}
          intialOverviewLength={50}
          size="small" // size of overview text
        />
      </div>
    </li>
  );
};

export default EpisodeListItem;
