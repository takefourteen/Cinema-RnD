import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

export async function searchTVShows(
  query: string,
  page: number,
): Promise<ApiResponse<SearchResults<TvShowSearchResult[]>>> {
  const apiUrl = `${BASE_URL}/search/tv`;

  const params = {
    api_key: API_KEY,
    query,
    language: "en-US",
    page,
  };

  const apiResponse: ApiResponse<SearchResults<TvShowSearchResult[]>> = {
    data: null,
    error: null,
  };

  try {
    const response = await axios.get(apiUrl, { params });
    apiResponse.data = response.data;
  } catch (error) {
    apiResponse.error = "Error searching TV shows.";
  }

  return apiResponse;
}

export async function searchMovies(
  query: string,
  page: number,
  region: string = "US",
): Promise<ApiResponse<SearchResults<MovieSearchResult[]>>> {
  const apiUrl = `${BASE_URL}/search/movie`;

  const params = {
    api_key: API_KEY,
    query,
    include_adult: false,
    language: "en-US",
    page,
    region,
  };

  const apiResponse: ApiResponse<SearchResults<MovieSearchResult[]>> = {
    data: null,
    error: null,
  };

  try {
    const response = await axios.get(apiUrl, { params });
    apiResponse.data = response.data;
  } catch (error) {
    apiResponse.error = "Error searching movies.";
  }

  return apiResponse;
}

// Define the SearchResult type to represent both MovieSearchResult and TvShowSearchResult
type SearchResult = MovieSearchResult[] | TvShowSearchResult[];

export async function searchAll(
  query: string,
  page: number,
  region: string = "US",
): Promise<ApiResponse<SearchResults<SearchResult>>> {
  const movieResults = await searchMovies(query, page, region);
  const tvResults = await searchTVShows(query, page);

  // Use optional chaining to safely access the 'data' property
  const allMovieResults = movieResults?.data?.results || [];
  const allTVResults = tvResults?.data?.results || [];

  const allResults: SearchResult[] = [...allMovieResults, ...allTVResults];

  const searchResults: SearchResults<SearchResult> = {
    page: 1,
    results: allResults,
    total_pages: 1,
    total_results: allResults.length,
  };

  const apiResponse: ApiResponse<SearchResults<SearchResult>> = {
    data: searchResults,
    error: null,
  };

  return apiResponse;
}

// ==========================================================
// ==========================================================
// ==========================================================
function filterResultsByLanguage<
  T extends MovieSearchResult | TvShowSearchResult,
>(results: SearchResults<T>, language: string): SearchResults<T> {
  const filteredResults: T[] = results.results.filter(
    (result) => result.original_language === language,
  );
  return { ...results, results: filteredResults };
}
