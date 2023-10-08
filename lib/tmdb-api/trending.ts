const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

import { filterResultsByLanguage } from "@/helpers/filterResults";
import { getVideoPlayerUrl } from "@/helpers/getVideoPlayerUrl";

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

export async function fetchMultipleTrendingMoviesPages(
  numPages: number,
): Promise<TrendingMovie[]> {
  let finalResults: TrendingMovie[] = [];

  let finalError: string = "";

  for (let page = 1; page <= numPages; page++) {
    try {
      const intialFetch = await fetchTrendingMovies(page);

      // put the intial fetch data into the final results
      finalResults = [...finalResults, ...intialFetch];
    } catch (error) {
      throw new Error(`Error fetching data for page ${page}: ${error}`);
    }
  }

  return finalResults;
}

export async function fetchMultipleTrendingTVShowsPages(
  numPages: number,
): Promise<TrendingTVSeries[]> {
  let finalResults: TrendingTVSeries[] = [];

  for (let page = 1; page <= numPages; page++) {
    try {
      const intialFetch = await fetchTrendingTVShows(page);

      // put the intial fetch data into the final results
      finalResults = [...finalResults, ...intialFetch];
    } catch (error) {
      throw new Error(`Error fetching data for page ${page}: ${error}`);
    }
  }

  return finalResults;
}

export async function fetchTrendingMoviesWithVideoPlayerUrls(
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

    // get video player urls for each movie
    const moviesWithVideoPlayerUrls = await Promise.all(
      data.results.map(async (movie) => {
        const videoPlayerUrl = await getVideoPlayerUrl(
          movie.id.toString(),
          1,
          1,
          1,
        );

        return {
          ...movie,
          videoPlayerUrl,
        };
      }),
    );

    return moviesWithVideoPlayerUrls;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";

    // throw new Error(errorMessage);

    return [];
  }
}

export async function fetchTrendingTVShowsWithVideoPlayerUrls(
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

    // get video player urls for each TV show
    const tvShowsWithVideoPlayerUrls = await Promise.all(
      data.results.map(async (tvShow) => {
        const videoPlayerUrl = await getVideoPlayerUrl(
          tvShow.id.toString(),
          1,
          1,
          1,
        );

        return {
          ...tvShow,
          videoPlayerUrl,
        };
      }),
    );

    return tvShowsWithVideoPlayerUrls;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";

    // throw new Error(errorMessage);

    return [];
  }
}
