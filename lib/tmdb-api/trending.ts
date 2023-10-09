const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

import { filterResultsByLanguage } from "@/helpers/filterResults";
import { getVideoPlayerUrl } from "@/helpers/getVideoPlayerUrl";
import { filterMediaWithVideoUrl } from "@/helpers/filterMediaWithVideoUrl";

export async function fetchTrendingMovies(
  page: number = 1,
  timeWindow: "day" | "week" = "day",
): Promise<TrendingMovie[]> {
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

    return data.results;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";

    return [];
  }
}

export async function fetchTrendingTVShows(
  page: number = 1,
  timeWindow: "day" | "week" = "day",
): Promise<TrendingTVSeries[]> {
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

    return data.results;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";

    return [];
  }
}

export async function fetchMultiplePagesOfTrendingMovies(
  numPages: number,
): Promise<TrendingMovie[]> {
  let finalResults: TrendingMovie[] = [];

  for (let page = 1; page <= numPages; page++) {
    try {
      const intialFetch = await fetchTrendingMovies(page);

      // Filter the results to retain only those with a video URL
      const filteredResults = await filterMediaWithVideoUrl(intialFetch, 0, 0);

      // Put the filtered results into the final results
      finalResults = [...finalResults, ...filteredResults];
    } catch (error) {
      throw new Error(`Error fetching data for page ${page}: ${error}`);
    }
  }

  return finalResults;
}

export async function fetchMultiplePagesOfTrendingTVShows(
  numPages: number,
): Promise<TrendingTVSeries[]> {
  let finalResults: TrendingTVSeries[] = [];

  for (let page = 1; page <= numPages; page++) {
    try {
      const intialFetch = await fetchTrendingTVShows(page);

      // Filter the results to retain only those with a video URL
      const filteredResults = await filterMediaWithVideoUrl(intialFetch, 1, 1);

      // Put the filtered results into the final results
      finalResults = [...finalResults, ...filteredResults];
    } catch (error) {
      throw new Error(`Error fetching data for page ${page}: ${error}`);
    }
  }

  return finalResults;
}
