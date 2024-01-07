import { filterMediaWithVideoUrl } from "@/helpers/filterMediaWithVideoUrl";

const BEARER_TOKEN = process.env.NEXT_PUBLIC_TMDB_BEARER_TOKEN;
const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

if (!BEARER_TOKEN || !TMDB_API_KEY) {
  throw new Error("Missing required environment variables");
}

const baseMovieURL = `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&`;
const baseTVSeriesURL = `https://api.themoviedb.org/3/discover/tv?api_key=${TMDB_API_KEY}&`;

export type FilterOptions = {
  sort_by?: "popularity.desc" | "vote_average.desc";
  "vote_average.gte"?: string;
  "vote_count.gte"?: string;
  with_genres?: string;
  without_genres?: string;
  with_keywords?: string;
};

type MediaType = "movie" | "tvSeries" | "movieAndTVSeries";

type generateAPIUrl = (type: MediaType, filterOptions: FilterOptions) => string;

const generateAPIUrl: generateAPIUrl = (type, filterOptions) => {
  const baseAPIUrl = type === "movie" ? baseMovieURL : baseTVSeriesURL;

  const params = new URLSearchParams({
    include_adult: "false",
    include_video: "false",
    language: "en-US",
    page: "1",
    with_original_language: "en",
    ...filterOptions,
  });

  return `${baseAPIUrl}${params.toString()}`;
};

type fetchCategoryParams = {
  type: MediaType;
  categoryTitle: string;
  movieFilterOptions?: FilterOptions;
  tvSeriesFilterOptions?: FilterOptions;
};

/**
 * Fetches a category of media from the TMDB API.
 *
 * @param {Object} params - The parameters for fetching the category.
 * @param {MediaType} params.type - The type of media to fetch. Can be "movie", "tvSeries", or "movieAndTVSeries".
 * @param {string} params.categoryTitle - The title of the category.
 * @param {FilterOptions} [params.movieFilterOptions={}] - The filter options for fetching movies. Defaults to an empty object.
 * @param {FilterOptions} [params.tvSeriesFilterOptions={}] - The filter options for fetching TV series. Defaults to an empty object.
 *
 * @returns {Promise<{
 *   title: string;
 *   results: (DiscoverMovieResult | DiscoverTVSeriesResult)[];
 *  }>} A promise that resolves to an object containing the title of the category and the results of the fetch.
 * The results are an array of media objects. If an error occurs during the fetch, the promise resolves to an object with the title and an empty results array.
 */
export const fetchCategory = async ({
  type,
  categoryTitle,
  movieFilterOptions = {}, // default to empty object
  tvSeriesFilterOptions = {}, // default to empty object
}: fetchCategoryParams): Promise<{
  title: string;
  results: (DiscoverMovieResult | DiscoverTVSeriesResult)[];
}> => {
  try {
    const urls = {
      movie: generateAPIUrl("movie", movieFilterOptions),
      tvSeries: generateAPIUrl("tvSeries", tvSeriesFilterOptions),
    };

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${BEARER_TOKEN}`,
      },
    };

    // add an artificial delay to prevent hitting the API too quickly
    await new Promise((resolve) => setTimeout(resolve, 125));

    let response;
    if (type === "movie" || type === "tvSeries") {
      response = await fetch(urls[type], options);
    } else {
      const [movieResponse, tvSeriesResponse] = await Promise.all([
        fetch(urls.movie, options),
        fetch(urls.tvSeries, options),
      ]);

      const movieData: DiscoverMovieApiResponse = await movieResponse.json();
      const tvSeriesData: DiscoverTVSeriesApiResponse =
        await tvSeriesResponse.json();

      // merge the results from both movie and tvSeries, with the type of both in one array
      const combinedResults: (DiscoverMovieResult | DiscoverTVSeriesResult)[] =
        [...movieData.results, ...tvSeriesData.results];

      // filter out movies that don't have a video url
      const filteredResults = await filterMediaWithVideoUrl(combinedResults);

      return {
        title: categoryTitle,
        results: filteredResults,
      };
    }

    if (!response.ok) {
      // Parse the error response as JSON to extract status_message
      const errorResponse = await response.json();
      const errorMessage =
        errorResponse?.status_message ||
        `Failed to fetch Discovery ${type} Data.`;
      throw new Error(errorMessage);
    }

    const data: DiscoverMovieApiResponse | DiscoverTVSeriesApiResponse =
      await response.json();

    // filter out movies that don't have a video url
    data.results = await filterMediaWithVideoUrl(data.results || []);

    return {
      title: categoryTitle,
      results: data.results as DiscoverMovieResult[] | DiscoverTVSeriesResult[],
    };
  } catch (error) {
    console.error(`Error fetching discovery ${type}:`, error);

    return { title: categoryTitle, results: [] };
  }
};
