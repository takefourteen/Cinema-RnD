const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export interface TrendingApiResponse<T> {
  data: T | null;
  error: string | null;
}

export async function fetchTrendingMovies(
  page: number = 1,
  timeWindow: "day" | "week" = "week",
): Promise<TrendingApiResponse<TrendingMovie[]>> {
  try {
    const response = await fetch(
      `${BASE_URL}/trending/movie/${timeWindow}?api_key=${API_KEY}&language=en-US&page=${page}`,
      {
        cache: "force-cache",
      },
    );

    if (!response.ok) {
      // Parse the error response as JSON to extract status_message
      const errorResponse = await response.json();
      const errorMessage =
        errorResponse?.status_message || "Unknown error occurred";
      throw new Error(errorMessage);
    }

    const data: TrendingMoviesResponse = await response.json();

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
  timeWindow: "day" | "week" = "week",
): Promise<TrendingApiResponse<TrendingTVShow[]>> {
  try {
    const response = await fetch(
      `${BASE_URL}/trending/tv/${timeWindow}?api_key=${API_KEY}&language=en-US&page=${page}`,
      {
        cache: "force-cache",
      },
    );

    if (!response.ok) {
      // Parse the error response as JSON to extract status_message
      const errorResponse = await response.json();
      const errorMessage =
        errorResponse?.status_message || "Unknown error occurred";
      throw new Error(errorMessage);
    }

    const data: TrendingTVShowsResponse = await response.json();

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
