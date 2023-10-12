import { AiFillStar } from "react-icons/ai";
import Chip from "./Chip";

type DetailsOnMediaCardProps = {
  title: string;
  rating: number;
  date: string;
  runtime?: string | null;
  numberOfSeasons?: number | null;
  showRatingAndYear?: boolean;
};

const DetailsOnMediaCard = ({
  title,
  rating,
  date,
  runtime,
  numberOfSeasons,
  showRatingAndYear = true,
}: DetailsOnMediaCardProps) => {
  return (
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
      <h3 className="font-small-text absolute bottom-2  max-w-[70%] font-semibold text-white group-hover:underline group-focus-visible:underline left-2">
        {title}
      </h3>
      <p className="font-small-text absolute bottom-2  w-max text-white/80 right-2 ">
        {runtime
          ? runtime
          : numberOfSeasons && numberOfSeasons > 1
          ? `${numberOfSeasons} Seasons`
          : `${numberOfSeasons} Season`}
      </p>
    </div>
  );
};

export default DetailsOnMediaCard;
