const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

import { filterResultsByLanguage } from "@/helpers/filterResults";
import { filterMediaWithVideoUrl } from "@/helpers/filterMediaWithVideoUrl";

const baseMovieURL = "https://api.themoviedb.org/3/discover/movie";
const baseTVSeriesURL = "https://api.themoviedb.org/3/discover/tv";

interface GenreList {
  [key: string]: {
    [key: string]: number[];
  };
}

const genres: GenreList = {
  movies: {
    actionAdventure: [28, 12],
    anime: [16],
    childrenFamily: [10751],
    classic: [], // You might need a different approach for this, as "classic" isn't a standard genre tag
    comedies: [35],
    documentaries: [99],
    dramas: [18],
  },
  tvSeries: {
    actionAdventure: [10759],
    anime: [16],
    childrenFamily: [10751],
    classic: [], // You might need a different approach for this, as "classic" isn't a standard genre tag
    comedies: [35],
    documentaries: [99],
    dramas: [18],
  },
};

const generateAPIUrl = (category: string, type: string): string => {
  const genreIds = genres[type][category].join(",");
  const baseUrl = type === "movies" ? baseMovieURL : baseTVSeriesURL;
  return `${baseUrl}?api_key=${API_KEY}&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genreIds}`;
};

type fetchCategory = {
  category:
    | "actionAdventure"
    | "anime"
    | "childrenFamily"
    | "classic"
    | "comedies"
    | "documentaries"
    | "dramas";
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

    // filter out movies that are not in English
    data.results = filterResultsByLanguage(data.results || [], "en");

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

