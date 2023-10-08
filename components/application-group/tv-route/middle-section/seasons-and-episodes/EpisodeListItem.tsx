import ImageLoader from "@/components/ImageLoader";
import { AspectRatio } from "@/components/ui/aspect-ratio";

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
  return (
    <li className="group relative w-full transition-all duration-300 ease-in-out hover:ring-2 hover:ring-slate-950 hover:ring-offset-1  focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-1">
      <AspectRatio ratio={16 / 9}>
        <ImageLoader
          loaderType="skeleton"
          src={`${BASE_IMG_URL}${episodeData.still_path}`}
          alt={`${episodeData.name} poster`}
          fill
          priority={false}
          className="object-cover "
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 40vw, 25vw"
          // style={{ filter: "brightness(0.9)" }}
        />
      </AspectRatio>

      <div className="flex flex-col gap-y-2 px-1">
        {/* name and duration of ep */}
        <div className="mt-2 flex justify-between">
          <h3 className="font-small-text font-bold ">
            {episodeData.episode_number}. {episodeData.name}
          </h3>
          <p className="font-extra-small-text text-gray-400">
            {episodeData.runtime} min
          </p>
        </div>
        {/* overview of ep */}
        <p className="font-extra-small-text text-gray-400">
          {episodeData.overview}
        </p>
      </div>
    </li>
  );
};

export default EpisodeListItem;
