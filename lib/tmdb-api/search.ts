import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

// ========================================
// Function to search for movies by a query
export async function searchMovies(
  query: string,
  page: number = 1,
  region: string = "US",
): Promise<SearchResults<MovieSearchResult[]>> {
  try {
    const params = {
      api_key: API_KEY,
      language: "en-US",
      query: query,
      page: page,
      include_adult: false,
      region: region,
    };
    const response = await axios.get<SearchResults<MovieSearchResult[]>>(
      `${BASE_URL}/search/movie`,
      { params },
    );

    // console.log("Movie results: ", response.data.results);

    return response.data;
  } catch (error) {
    throw new Error(`Error searching for movies: ${error}`);
  }
}

// ========================================
// Function to search for TV shows by a query
export async function searchTVShows(
  query: string,
  page: number = 1,
): Promise<SearchResults<TvShowSearchResult[]>> {
  try {
    const params = {
      api_key: API_KEY,
      language: "en-US",
      page: page,
      query: query,
      include_adult: "false",
    };

    // const paramsString = params.toString();

    const response = await axios.get<SearchResults<TvShowSearchResult[]>>(
      `${BASE_URL}/search/tv`,
      { params },
    );

    // console.log("TV results: ", response.data.results);

    return response.data;
  } catch (error) {
    throw new Error(`Error searching for TV shows: ${error}`);
  }
}

// ===============================================
// Function to get all results for any search query
export async function searchAll(query: string, page: number = 1) {
  const movieResults = await searchMovies(query, page);
  const tvResults = await searchTVShows(query, page);

  //  combine movie and tv results into one array
  const allResults = [...movieResults.results, ...tvResults.results];

  return allResults;
}
