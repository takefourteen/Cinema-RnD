const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

import { filterResultsByLanguage } from "@/helpers/filterResults";
import { filterMediaWithVideoUrl } from "@/helpers/filterMediaWithVideoUrl";

const baseMovieURL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`;
const baseTVSeriesURL = `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}`;

interface GenreList {
  [key: string]: {
    [key: string]: {
      genreIds: number[];
      filterAndSortOptions: string;
    };
  };
}

const genres: GenreList = {
  movies: {
    actionAdventure: {
      genreIds: [28, 12],
      filterAndSortOptions: "&sort_by=popularity.desc",
    },
    anime: {
      genreIds: [16],
      filterAndSortOptions: "&sort_by=popularity.desc",
    },
    childrenFamily: {
      genreIds: [10751],
      filterAndSortOptions: "&sort_by=popularity.desc",
    },
    classic: {
      genreIds: [],
      filterAndSortOptions: "&sort_by=popularity.desc",
    },
    // You might need a different approach for this, as "classic" isn't a standard genre tag
    comedies: {
      genreIds: [35],
      filterAndSortOptions: "&sort_by=popularity.desc",
    },
    documentaries: {
      genreIds: [99],
      filterAndSortOptions: "&sort_by=popularity.desc",
    },
    dramas: {
      genreIds: [18],
      filterAndSortOptions: "&sort_by=popularity.desc",
    },
    topRated: {
      genreIds: [],
      filterAndSortOptions:
        "&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200",
    },
  },
  tvSeries: {
    actionAdventure: {
      genreIds: [10759, 10762],
      filterAndSortOptions: "&sort_by=popularity.desc",
    },
    anime: {
      genreIds: [16],
      filterAndSortOptions: "&sort_by=popularity.desc",
    },
    childrenFamily: {
      genreIds: [10751],
      filterAndSortOptions: "&sort_by=popularity.desc",
    },
    classic: {
      genreIds: [],
      filterAndSortOptions: "&sort_by=popularity.desc",
    },
    comedies: {
      genreIds: [35],
      filterAndSortOptions: "&sort_by=popularity.desc",
    },
    documentaries: {
      genreIds: [99],
      filterAndSortOptions: "&sort_by=popularity.desc",
    },
    dramas: {
      genreIds: [18],
      filterAndSortOptions: "&sort_by=popularity.desc",
    },
    topRated: {
      genreIds: [],
      filterAndSortOptions: "&sort_by=vote_average.desc&vote_count.gte=200",
    },
  },
};

type generateAPIUrl = (category: string, type: string) => string;

const generateAPIUrl: generateAPIUrl = (category, type) => {
  const genreIds = genres[type][category].genreIds.join(",");
  const filterAndSortOptions = genres[type][category].filterAndSortOptions;

  if (type === "movies") {
    return `${baseMovieURL}&include_adult=false&include_video=false&language=en-US&page=1&with_genres=${genreIds}${filterAndSortOptions}`;
  } else {
    return `${baseTVSeriesURL}&include_adult=false&include_video=false&language=en-US&page=1&with_genres=${genreIds}${filterAndSortOptions}`;
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
