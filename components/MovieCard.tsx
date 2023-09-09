import Image from "next/image";

import { getMovieDetails } from "@/lib/tmdbApi";

import { AspectRatio } from "@/components/ui/aspect-ratio";

interface MovieCardProps {
  movie: PopularMovie;
}

const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

const MovieCard = async ({ movie }: MovieCardProps) => {
  const movieDetails = (await getMovieDetails(
    movie.id.toString(),
  )) as MovieDetails;

  return (
    <div className="w-[500px] relative h-28 flex-1 flex">
      {/* <AspectRatio ratio={16 / 9}> */}
        <Image
          src={`${imageBaseUrl}${movieDetails.poster_path}`}
          alt="Movie"
          fill
          className="object-cover"
        />
      {/* </AspectRatio> */}
    </div>
  );
};

export default MovieCard;
