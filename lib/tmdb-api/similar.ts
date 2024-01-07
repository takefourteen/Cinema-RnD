import { filterResultsByLanguage } from "@/helpers/filterResults";
import { filterOutZeroRatedResults } from "@/helpers/filterResults";
import { filterMediaWithVideoUrl } from "@/helpers/filterMediaWithVideoUrl";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

// fetch similar movies for a movie using fetch
export async function fetchSimilarMovies(
  movieId: string,
  page: number = 1,
): Promise<SimilarMovie[]> {
  const apiUrl = `${BASE_URL}/movie/${movieId}/similar?api_key=${API_KEY}&language=en-US&page=${page}`;

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

    // filter out zero or null ratings
    data.results = filterOutZeroRatedResults(data.results || []);

    // filter out movies that are not in English
    const filteredByLanguage: SimilarMovie[] = filterResultsByLanguage(
      data.results,
      "en",
    );

    // filter out movies that don't have a video url
    const filteredByVideoUrl: SimilarMovie[] =
      await filterMediaWithVideoUrl(filteredByLanguage);

    return filteredByVideoUrl;

    // return data.results;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    throw new Error(errorMessage);
  }
}

// fetch similar tv series for a tv series using fetch
export async function fetchSimilarTvSeries(
  tvSeriesId: string,
  page: number = 1,
): Promise<SimilarTvSeries[]> {
  const apiUrl = `${BASE_URL}/tv/${tvSeriesId}/similar?api_key=${API_KEY}&language=en-US&page=${page}`;

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

    // filter out tv series that are not in English
    const filteredByLanguage: SimilarTvSeries[] = filterResultsByLanguage(
      data.results,
      "en",
    );

    // filter out tv series that don't have a video url
    const filteredByVideoUrl: SimilarTvSeries[] =
      await filterMediaWithVideoUrl(filteredByLanguage);

    return filteredByVideoUrl;

    // return data.results;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    throw new Error(errorMessage);
  }
}
