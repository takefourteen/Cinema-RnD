import { filterOutZeroRatedResults } from "@/helpers/filterResults";
import { filterMediaWithVideoUrl } from "@/helpers/filterMediaWithVideoUrl";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_TV_URL = `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&`;
const BASE_MOVIE_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&`;

/**
 * Fetches movies from TMDB API based on the provided genres, page, and sort order.
 * Filters out movies with zero ratings and no video URL.
 *
 * @param genres - An array of genres to filter by. Can be null.
 * @param page - The page number for pagination.
 * @param sortBy - The sorting order.
 * @param type - explore movies or tv series.
 *
 * @returns A promise that resolves to an array of DiscoverMovieResult objects.
 */
export const explore = async (
  type: "movie" | "tv",
  genres: number[] | null,
  page: number,
  sortBy: string | null
): Promise<DiscoverMovieApiResponse | DiscoverTVSeriesApiResponse> => {
  try {
    // Create a new URLSearchParams object
    const params = new URLSearchParams({
      include_adult: "false",
      include_video: "false",
      language: "en-US",
      page: page.toString(),
      with_original_language: "en",
    });

    // If sortBy is null add default sort order
    if (!sortBy) {
      params.append("sort_by", "popularity.desc");
    } else {
      // if sort by vote_average, add vote_count.gte=200
      if (sortBy === "vote_average.desc") {
        params.append("vote_count.gte", "200");
      }
      // if sort by primary_release_date, add vote_count.gte=50
      if (sortBy === "primary_release_date.desc") {
        params.append("vote_count.gte", "50");
      }

      params.append("sort_by", sortBy);
    }

    // If genres is not null, add genres to params
    if (genres?.length) {
      params.append("with_genres", genres.join(","));
    }

    // Create a new URL object with the base url and the params object
    const url = new URL(
      `${type === "movie" ? BASE_MOVIE_URL : BASE_TV_URL}${params}`
    );

    // Fetch the data
    const response = await fetch(url.toString(), {
      next: { tags: ["explore"] },
    });

    // If the response is not ok, throw an error
    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    // Parse the response body as JSON
    const data: DiscoverMovieApiResponse | DiscoverTVSeriesApiResponse =
      await response.json();

    // Filter out media with zero ratings
    data.results = filterOutZeroRatedResults(data.results);

    // Filter out media with no video url
    data.results = await filterMediaWithVideoUrl(data.results || []);

    // Return the data with its correct type
    if (type === "movie") {
      return data as DiscoverMovieApiResponse;
    } else {
      return data as DiscoverTVSeriesApiResponse;
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    console.error("Error fetching media for explore page:", errorMessage);
    return { page: 0, results: [], total_pages: 0, total_results: 0 };
  }
};
