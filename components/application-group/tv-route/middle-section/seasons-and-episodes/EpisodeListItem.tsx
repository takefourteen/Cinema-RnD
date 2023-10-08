import { PlayIcon } from "@/components/Icons";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import ImageLoader from "@/components/ImageLoader";
import Overview from "@/components/application-group/Overview";

const episode = {
  air_date: "2021-06-09",
  episode_number: 1,
  episode_type: "standard",
  id: 2534997,
  name: "Glorious Purpose",
  overview:
    'After stealing the Tesseract in "Avengers: Endgame," Loki lands before the Time Variance Authority.',
  production_code: "",
  runtime: 53,
  season_number: 1,
  show_id: 84958,
  still_path: "/gxh0k3aADsYkt9tgkfm2kGn2qQj.jpg",
  vote_average: 7.143,
  vote_count: 122,
};

const BASE_IMG_URL = process.env.NEXT_PUBLIC_OG_TMBD_IMG_PATH;

type EpisodeListItemProps = {
  episodeData: EpisodeData;
};

const EpisodeListItem = ({ episodeData }: EpisodeListItemProps) => {
  // if episodeData.overview is empty, return a null
  if (episodeData.overview === "") return null;

  return (
    <li className="relative w-full ">
      <AspectRatio ratio={16 / 9}>
        <div className="group">
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
          <div className="absolute inset-0 flex items-center bg-black bg-opacity-40 justify-center">
            <PlayIcon />
          </div>
        </div>
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
