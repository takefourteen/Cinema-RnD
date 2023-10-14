const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

import { filterMediaWithVideoUrl } from "@/helpers/filterMediaWithVideoUrl";

const baseMovieURL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`;
const baseTVSeriesURL = `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}`;

type generateAPIUrl = (genreIds: number[], type: "movies" | "tv") => string;

const generateAPIUrl: generateAPIUrl = (genreIds, type) => {
  if (type === "movies") {
    const generatedMovieUrl = `${baseMovieURL}&include_adult=false&include_video=false&language=en-US&page=1&with_original_language=en&sort_by=popularity.desc&with_genres=${genreIds.join(
      ",",
    )}`;
    return generatedMovieUrl;
  } else {
    const generatedTVSeriesUrl = `${baseTVSeriesURL}&include_adult=false&include_video=false&language=en-US&page=1&with_original_language=en&sort_by=popularity.desc&with_genres=${genreIds.join(
      ",",
    )}`;
    return generatedTVSeriesUrl;
  }
};

type FetchShowsByGenre = (
  genreIds: number[],
  type: "movies" | "tv",
) => Promise<DiscoverMovieResult[] | DiscoverTVSeriesResult[]>;

export const fetchShowsByGenre: FetchShowsByGenre = async (genreIds, type) => {
  try {
    const url = generateAPIUrl(genreIds, type);

    const response = await fetch(url);

    if (!response.ok) {
      // Parse the error response as JSON to extract status_message
      const errorResponse = await response.json();
      const errorMessage =
        errorResponse?.status_message ||
        `Failed to fetch ${type} with genres: ${genreIds}`;
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
    console.error(`Error fetching ${type} with genres: ${genreIds}`, error);

    return [];
  }
};
