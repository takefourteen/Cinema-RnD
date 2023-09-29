import Image from "next/image";

import imdbImg from "@/assets/images/imdb-1.svg";

type Props = {
  rating: number;
};

const ImdbRating = ({ rating }: Props) => {
  return (
    <div className="flex items-center gap-1">
      <Image src={imdbImg} alt="imdb logo" width={40} />
      <span className="font-semibold  text-white">{rating}</span>
    </div>
  );
};

export default ImdbRating;
