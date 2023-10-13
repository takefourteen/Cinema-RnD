import { AiFillStar } from "react-icons/ai";
import Chip from "./Chip";

type DetailsOnMediaCardProps = {
  title: string;
  rating: number;
  date: string;
  runtime?: string | null;
  numberOfSeasons?: number | null;
  showRating?: boolean;
  showYear?: boolean;
  showTitle?: boolean;
};

const DetailsOnMediaCard = ({
  title,
  rating,
  date,
  runtime,
  numberOfSeasons,
  showRating = false,
  showYear = true,
  showTitle = true,
}: DetailsOnMediaCardProps) => {
  return (
    <div className="absolute inset-0 h-full">
      {/*
     the movie rating and release date as Chip
     components, if they should be displayed
    */}
      <div className="absolute left-0 right-0 top-0 mx-2 mt-2 flex flex-wrap justify-end gap-1">
        {showRating && (
          <Chip borderStyle="border border-white/10">
            <span className="flex items-center">
              <AiFillStar className="mr-1 inline-block fill-yellow-500 text-yellow-600" />
              {rating}
            </span>
          </Chip>
        )}

        {showYear && (
          <Chip borderStyle="border border-white/10">
            {new Date(date).getFullYear()}
          </Chip>
        )}
      </div>

      {/* the movie title if true */}
      {showTitle && (
        <h3 className="font-small-text absolute bottom-2  left-2 max-w-[70%] font-semibold text-white group-hover:underline group-focus-visible:underline">
          {title}
        </h3>
      )}

      {/* the movie runtime or number of seasons */}
      <p className="font-small-text absolute bottom-2  right-2 w-max text-white ">
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
