const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

import { filterResultsByLanguage } from "@/helpers/filterResults";
import { filterMediaWithVideoUrl } from "@/helpers/filterMediaWithVideoUrl";

export async function fetchTrendingMovies(
  page: number = 1,
  timeWindow: "day" | "week" = "day",
): Promise<TrendingMovie[]> {
  try {
    const url = `${BASE_URL}/trending/movie/${timeWindow}?api_key=${API_KEY}&language=en-US&page=${page}`;
    const response = await fetch(url);

    if (!response.ok) {
      const errorResponse = await response.json();
      const errorMessage =
        errorResponse?.status_message || "Failed to fetch trending movies";
      throw new Error(errorMessage);
    }

    const data: TrendingMoviesResponse = await response.json();

    // Filter out movies that are not in English
    const englishMovies = filterResultsByLanguage(data.results || [], "en");

    return englishMovies;
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    return [];
  }
}

export async function fetchTrendingTVSeries(
  page: number = 1,
  timeWindow: "day" | "week" = "day",
): Promise<TrendingTVSeries[]> {
  try {
    const url = `${BASE_URL}/trending/tv/${timeWindow}?api_key=${API_KEY}&language=en-US&page=${page}`;
    const response = await fetch(url);

    if (!response.ok) {
      const errorResponse = await response.json();
      const errorMessage =
        errorResponse?.status_message || "Unknown error occurred";
      throw new Error(errorMessage);
    }

    const data: TrendingTVShowsResponse = await response.json();

    // Filter out TV shows that are not in English
    const englishTvShows = filterResultsByLanguage(data.results || [], "en");

    return englishTvShows;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    console.error("Error fetching trending TV shows:", errorMessage);
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
      const filteredResults = await filterMediaWithVideoUrl(intialFetch);

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
      const intialFetch = await fetchTrendingTVSeries(page);

      // Filter the results to retain only those with a video URL
      const filteredResults = await filterMediaWithVideoUrl(intialFetch);

      // Put the filtered results into the final results
      finalResults = [...finalResults, ...filteredResults];
    } catch (error) {
      throw new Error(`Error fetching data for page ${page}: ${error}`);
    }
  }

  return finalResults;
}
