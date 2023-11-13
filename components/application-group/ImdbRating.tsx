import Image from "next/image";
import imdbImg from "@/assets/images/imdb-1.svg";
type Props = {
  rating: number;
  showFullRating?: boolean;
  size?: "default" | "small";
};

const ImdbRating = ({ rating, showFullRating, size = "default" }: Props) => {
  const imgSize = size === "default" ? 40 : 30;

  return (
    <div className="flex items-center gap-1">
      {/* <Image src={imdbImg} alt="imdb logo" width={40} /> */}
      <Image
        src={imdbImg}
        alt="imdb logo"
        width={imgSize}
      />
      <span className="font-small-text font-semibold  tracking-wide text-white">
        {rating}

        {showFullRating && <span className="text-sm text-gray-400">/10</span>}
      </span>
    </div>
  );
};

export default ImdbRating;
