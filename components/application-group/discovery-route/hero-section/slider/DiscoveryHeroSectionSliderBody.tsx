import { isMovieDetails } from "@/lib/tmdb-api/movies";

import ResponsiveBackgroundPoster from "@/components/application-group/ResponsiveBackgroundPoster";
import ShowDetailsSmallScreen from "../../ShowDetailsSmallScreen";

type DiscoveryHeroSectionSliderBodyProps = {
  movieOrTvShowDetails: MovieDetailsData | TVSeriesData;
};

const DiscoveryHeroSectionSliderBody = ({
  movieOrTvShowDetails,
}: DiscoveryHeroSectionSliderBodyProps) => {
  const movieOrTvShowTitle = isMovieDetails(movieOrTvShowDetails)
    ? movieOrTvShowDetails.original_title
    : movieOrTvShowDetails.original_name;

  return (
    <li className="relative  min-h-[30rem] min-w-[100vw] flex-1 sm:min-h-[30rem] md:min-h-[35rem] lg:min-h-[40rem] ">
      {/* Carousel Image */}
      <ResponsiveBackgroundPoster
        poster_path={movieOrTvShowDetails.poster_path}
        backdrop_path={movieOrTvShowDetails.backdrop_path}
        alt={movieOrTvShowTitle}
        imageClassNames="object-cover object-center"
      />

      {/* Overlay with Poster details */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90  via-black/80 to-black/20  md:bg-gradient-to-r">
        <ShowDetailsSmallScreen movieOrTvShowDetails={movieOrTvShowDetails} />
      </div>
    </li>
  );
};

export default DiscoveryHeroSectionSliderBody;

// Poster details component for small screens

// const CarouselItemPlayButton: React.FC = () => {

// }

/* 
display chips
 <div className="flex flex-wrap items-center space-x-4">
                {data.genre_ids.slice(0, 3).map((genre) => (
                  <Chip key={genre}>
                    {genreData?.genres?.find((g) => g.id === genre)?.name}
                  </Chip>
                ))}
              </div>
*/
