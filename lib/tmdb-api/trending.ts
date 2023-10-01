const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

import { filterResultsByLanguage } from "./filterResults";

export interface TrendingApiResponse<T> {
  data: T | null;
  error: string | null;
}

export async function fetchTrendingMovies(
  page: number = 1,
  timeWindow: "day" | "week" = "day",
): Promise<TrendingApiResponse<TrendingMovie[]>> {
  try {
    const response = await fetch(
      `${BASE_URL}/trending/movie/${timeWindow}?api_key=${API_KEY}&language=en-US&page=${page}`,
    );

    if (!response.ok) {
      // Parse the error response as JSON to extract status_message
      const errorResponse = await response.json();
      const errorMessage =
        errorResponse?.status_message || "Unknown error occurred";
      throw new Error(errorMessage);
    }

    const data: TrendingMoviesResponse = await response.json();

    // console.log("Trending movies data", data);

    // filter out movies that are not in English
    data.results = filterResultsByLanguage(data.results || [], "en");

    return {
      data: data.results,
      error: null,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";

    return {
      data: null,
      error: errorMessage,
    };
  }
}

export async function fetchTrendingTVShows(
  page: number = 1,
  timeWindow: "day" | "week" = "day",
): Promise<TrendingApiResponse<TrendingTVSeries[]>> {
  try {
    const response = await fetch(
      `${BASE_URL}/trending/tv/${timeWindow}?api_key=${API_KEY}&language=en-US&page=${page}`,
    );

    if (!response.ok) {
      // Parse the error response as JSON to extract status_message
      const errorResponse = await response.json();
      const errorMessage =
        errorResponse?.status_message || "Unknown error occurred";
      throw new Error(errorMessage);
    }

    const data: TrendingTVShowsResponse = await response.json();

    // console.log("Trending TV shows data", data);

    // filter out TV shows that are not in English
    data.results = filterResultsByLanguage(data.results || [], "en");

    return {
      data: data.results,
      error: null,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";

    return {
      data: null,
      error: errorMessage,
    };
  }
}

export async function fetchMultipleTrendingMoviesPages(
  numPages: number,
): Promise<TrendingApiResponse<TrendingMovie[]>> {
  let finalResults: TrendingMovie[] = [];

  let finalError: string = "";

  for (let page = 1; page <= numPages; page++) {
    try {
      const intialFetch = await fetchTrendingMovies(page);

      if (intialFetch.error) {
        finalError = intialFetch.error;
        throw new Error(finalError);
      }

      if (intialFetch?.data) {
        // put the intial fetch data into the final results
        finalResults = [...finalResults, ...intialFetch.data];
      }
    } catch (error) {
      console.error(`Error fetching data for page ${page}: ${error}`);
    }
  }

  return {
    data: finalResults,
    error: finalError,
  };
}

export async function fetchMultipleTrendingTVShowsPages(
  numPages: number,
): Promise<TrendingApiResponse<TrendingTVSeries[]>> {
  let finalResults: TrendingTVSeries[] = [];

  let finalError: string = "";

  for (let page = 1; page <= numPages; page++) {
    try {
      const intialFetch = await fetchTrendingTVShows(page);

      if (intialFetch.error) {
        finalError = intialFetch.error;
        throw new Error(finalError);
      }

      if (intialFetch?.data) {
        // put the intial fetch data into the final results
        finalResults = [...finalResults, ...intialFetch.data];
      }
    } catch (error) {
      console.error(`Error fetching data for page ${page}: ${error}`);
    }
  }

  return {
    data: finalResults,
    error: finalError,
  };
}
