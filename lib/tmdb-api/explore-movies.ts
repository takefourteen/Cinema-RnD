import { filterOutZeroRatedResults } from "@/helpers/filterResults";
import { filterMediaWithVideoUrl } from "@/helpers/filterMediaWithVideoUrl";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&`;

/**
 * Fetches movies from TMDB API based on the provided genres, page, and sort order.
 * Filters out movies with zero ratings and no video URL.
 *
 * @param genres - An array of genres to filter by. Can be null.
 * @param page - The page number for pagination.
 * @param sortBy - The sorting order.
 *
 * @returns A promise that resolves to an array of DiscoverMovieResult objects.
 */
export const exploreMovies = async (
  genres: number[] | null,
  page: number,
  sortBy: "popularity.desc" | "vote_average.desc" | "primary_release_date.desc",
): Promise<DiscoverMovieApiResponse> => {
  try {
    // Create a new URLSearchParams object
    const params = new URLSearchParams({
      include_adult: "false",
      include_video: "false",
      language: "en-US",
      page: page.toString(),
      with_original_language: "en",
      sort_by: sortBy,
    });

    // If genres is not null, add genres to params
    if (genres?.length) {
      params.append("with_genres", genres.join(","));
    }

    // Create a new URL object with the base url and the params object
    const url = new URL(`${BASE_URL}${params}`);

    // Fetch the data
    const response = await fetch(url.toString(), {
      next: { tags: ["explore-movies"] },
    });

    // If the response is not ok, throw an error
    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    // Parse the response body as JSON
    const data: DiscoverMovieApiResponse = await response.json();

    // Filter out movies with zero ratings
    data.results = filterOutZeroRatedResults(data.results);

    // Filter out movies with no video url
    data.results = await filterMediaWithVideoUrl(data.results || []);

    // Return the data
    return data;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    console.error("Error fetching movies:", errorMessage);
    return { page: 0, results: [], total_pages: 0, total_results: 0 };
  }
};
