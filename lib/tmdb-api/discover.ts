const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

import { filterResultsByLanguage } from "@/helpers/filterResults";
import { filterMediaWithVideoUrl } from "@/helpers/filterMediaWithVideoUrl";
import { categories } from "@/constants/categories";

const baseMovieURL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`;
const baseTVSeriesURL = `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}`;

type generateAPIUrl = (category: string, type: string) => string;

const generateAPIUrl: generateAPIUrl = (category, type) => {
  const genreIds = categories[type][category].genreIds.join(",");
  const filterAndSortOptions = categories[type][category].filterAndSortOptions;

  if (type === "movies") {
    return `${baseMovieURL}&include_adult=false&include_video=false&language=en-US&page=1&with_original_language=en&with_genres=${genreIds}${filterAndSortOptions}`;
  } else {
    return `${baseTVSeriesURL}&include_adult=false&include_video=false&language=en-US&page=1&with_original_language=en&with_genres=${genreIds}${filterAndSortOptions}`;
  }
};

type fetchCategory = {
  category:
    | "actionAdventure"
    | "anime"
    | "childrenFamily"
    | "classic"
    | "comedies"
    | "documentaries"
    | "dramas"
    | "topRated";
  type: "movies" | "tvSeries";
};

export const fetchCategory = async ({
  category,
  type,
}: fetchCategory): Promise<
  DiscoverMovieResult[] | DiscoverTVSeriesResult[]
> => {
  try {
    const url = generateAPIUrl(category, type);

    const response = await fetch(url);

    if (!response.ok) {
      // Parse the error response as JSON to extract status_message
      const errorResponse = await response.json();
      const errorMessage =
        errorResponse?.status_message || `Failed to fetch ${category} ${type}`;
      throw new Error(errorMessage);
    }

    const data: DiscoverMovieApiResponse | DiscoverTVSeriesApiResponse =
      await response.json();

    /* 
      filter out movies that are not in English - Not necessay anymore,
      only shows with language in en are fetched
    */
    // data.results = filterResultsByLanguage(data.results || [], "en");

    // filter out movies that don't have a video url
    data.results = await filterMediaWithVideoUrl(data.results || []);

    if (type === "movies") {
      return data.results as DiscoverMovieResult[];
    } else {
      return data.results as DiscoverTVSeriesResult[];
    }
  } catch (error) {
    console.error(`Error fetching ${category} ${type}:`, error);

    return [];
  }
};
