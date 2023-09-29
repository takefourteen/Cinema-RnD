import Image from "next/image";

import imdbImg from "@/assets/images/imdb-1.svg";

type Props = {
  rating: number;
};

const ImdbRating = ({ rating }: Props) => {
  return (
    <div className="flex items-center gap-1">
      <Image src={imdbImg} alt="imdb logo" width={40} />
      <span className="font-semibold  tracking-wide text-white">
        {rating}
        <span className="text-sm text-gray-400">/10</span>
      </span>
    </div>
  );
};

export default ImdbRating;
