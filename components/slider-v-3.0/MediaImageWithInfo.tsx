import { AiFillStar } from "react-icons/ai";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Chip from "../application-group/Chip";
import ImageLoader from "@/components/ImageLoader";

type MediaImageWithInfo = {
  id: number;
  imagePath: string;
  title: string;
  rating: number;
  date: string;
  runtime?: string | null;
  numberOfSeasons?: number | null;
  showRatingAndYear?: boolean;
  priority: boolean;
};

const MediaImageWithInfo = ({
  id,
  imagePath,
  title,
  rating,
  date,
  runtime,
  numberOfSeasons,
  showRatingAndYear = true,
  priority,
}: MediaImageWithInfo) => {
  return (
    <AspectRatio ratio={4 / 3}>
      <ImageLoader
        loaderType="skeleton"
        src={imagePath}
        alt={`${title} poster`}
        fill
        priority={priority}
        className="object-cover transition-all duration-300 ease-in-out group-hover:ring-4 group-hover:ring-slate-950 group-hover:ring-offset-2 group-focus-visible:ring-4  group-focus-visible:ring-slate-950 group-focus-visible:ring-offset-2"
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 40vw, 25vw"
        style={{ filter: "brightness(0.9)" }}
      />

      {/* overlay the image with a grain texture */}
      {/* <div className="absolute inset-0 bg-[url('/grain-texture-image.svg')] opacity-30" /> */}

      {/* small dark overlay over the top and bottom of img to make the info readable */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

      {/* overlay the image with some info */}
      <div className="absolute inset-0 h-full">
        {/*
         the movie rating and release date as Chip
         components, if they should be displayed
        */}
        {showRatingAndYear && (
          <div className="absolute left-0 right-0 top-0 mx-2 mt-2 flex flex-wrap justify-end gap-1">
            <Chip borderStyle="border border-white/10">
              <span className="flex items-center">
                <AiFillStar className="mr-1 inline-block fill-yellow-500 text-yellow-600" />
                {rating}
              </span>
            </Chip>
            <Chip borderStyle="border border-white/10">
              {new Date(date).getFullYear()}
            </Chip>
          </div>
        )}

        {/* the movie title and runtime */}
        <h3 className="font-small-text absolute bottom-2 left-1 lg:left-2 max-w-[70%] font-semibold text-white group-hover:underline group-focus-visible:underline">
          {title}
        </h3>
        <p className="font-small-text absolute bottom-2 right-1 lg:right-2 w-max text-white/80 ">
          {runtime ? runtime : `${numberOfSeasons} Seasons`}
        </p>
      </div>
    </AspectRatio>
  );
};

export default MediaImageWithInfo;
