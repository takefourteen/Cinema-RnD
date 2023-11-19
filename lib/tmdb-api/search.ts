"use server";

import { filterMediaWithVideoUrl } from "@/helpers/filterMediaWithVideoUrl";
import { filterResults } from "@/helpers/filterResults";
import { sortResultsByPopularity } from "@/helpers/sortResults";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = `https://api.themoviedb.org/3`;

// ========================================
// Function to search for movies by a query
export async function searchMovies(
  query: string,
  page: number = 1,
  region: string = "US",
): Promise<SearchResults<MovieSearchResult[]>> {
  try {
    const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=${page}&include_adult=false&region=${region}`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, options);
    const data: SearchResults<MovieSearchResult[]> = await response.json();

    return data;
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
    const url = `${BASE_URL}/search/tv?api_key=${API_KEY}&language=en-US&query=${query}&page=${page}&include_adult=false`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, options);
    const data: SearchResults<TvShowSearchResult[]> = await response.json();

    return data;
  } catch (error) {
    throw new Error(`Error searching for TV shows: ${error}`);
  }
}

// ===============================================
// Function to get all results for any search query
export async function searchAll(query: string, page: number = 1) {
  const movieResultsPromise = searchMovies(query, page);
  const tvResultsPromise = searchTVShows(query, page);

  const [movieResults, tvResults] = await Promise.all([
    movieResultsPromise,
    tvResultsPromise,
  ]);

  //  combine movie and tv results into one array
  const allResults = [...movieResults.results, ...tvResults.results];

  // filter out results that don't have a video url
  const filteredResults = await filterMediaWithVideoUrl(allResults);

  // filter results to only include English language results
  const filteredEnglishResults = filterResults(filteredResults, "en");

  // flatten the array before sorting
  const flattenedResults = filteredEnglishResults.flat();

  // sort results by popularity
  const sortedResults = sortResultsByPopularity(flattenedResults);

  return sortedResults;
}
