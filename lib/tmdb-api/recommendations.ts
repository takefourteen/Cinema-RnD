import { filterResultsByLanguage } from "./filterResults";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

// fetch recommendations for a movie using fetch
export async function fetchMovieRecommendations(
  movieId: string,
  page: number = 1,
): Promise<RecommendedMovie[]> {
  const apiUrl = `${BASE_URL}/movie/${movieId}/recommendations?api_key=${API_KEY}&language=en-US&page=${page}`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      // Parse the error response as JSON to extract status_message
      const errorResponse = await response.json();
      const errorMessage =
        errorResponse?.status_message || "Unknown error occurred";
      throw new Error(errorMessage);
    }

    const data = await response.json();

    // filter out results that are not in English
    return filterResultsByLanguage(data.results);

    // return data.results;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    throw new Error(errorMessage);
  }
}

// fetch recommendations for a tv series using fetch
export async function fetchTVSeriesRecommendations(
  tvSeriesId: string,
  page: number = 1,
): Promise<RecommendedTvSeries[]> {
  const apiUrl = `${BASE_URL}/tv/${tvSeriesId}/recommendations?api_key=${API_KEY}&language=en-US&page=${page}`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      // Parse the error response as JSON to extract status_message
      const errorResponse = await response.json();
      const errorMessage =
        errorResponse?.status_message || "Unknown error occurred";
      throw new Error(errorMessage);
    }

    const data = await response.json();

    // filter out results that are not in English
    return filterResultsByLanguage(data.results);

    // return data.results;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    throw new Error(errorMessage);
  }
}
