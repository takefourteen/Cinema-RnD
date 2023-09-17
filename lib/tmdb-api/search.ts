import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

// Generic function to search for items by a query
async function searchItems<T>(
  query: string,
  page: number = 1,
  itemType: "movie" | "tv",
): Promise<SearchResults<T>> {
  try {
    const encodedQuery = encodeURIComponent(query);
    const response = await fetch(
      `${BASE_URL}/search/${itemType}?api_key=${API_KEY}&language=en-US&query=${query}&page=${page}&include_adult=false`,
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data: SearchResults<T> = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(`Error searching for ${itemType}s: ${error.message}`);
  }
}

// Function to search for movies by a query
export async function searchMovies(
  query: string,
  page: number = 1,
): Promise<MovieSearchResult[]> {
  const results = await searchItems<MovieSearchResult>(query, page, "movie");
  return results.results;
}

// Function to search for TV shows by a query
export async function searchTVShows(
  query: string,
  page: number = 1,
): Promise<TvShowSearchResult[]> {
  const results = await searchItems<TvShowSearchResult>(query, page, "tv");
  return results.results;
}

// Function to get all results for any search query
export async function searchAll(query: string, page: number = 1) {
  const movieResults = await searchMovies(query, page);
  const tvResults = await searchTVShows(query, page);

  console.log(`Found ${movieResults.length} movies`);
  console.log(`Found ${tvResults.length} TV shows`);

  // Combine movie and TV results
  const allResults = [...movieResults, ...tvResults];

  return allResults;
}

// function that filters results to only return results where "original_language" is en
export function filterResultsByLanguage<
  T extends { original_language: string },
>(results: T[], language: string = "en") {
  return results.filter((result) => result.original_language === language);
}

// function that sorts any array of movies or tv shows by popularity, or by vote average, or by vote count
export function sortResults<
  T extends {
    popularity: number;
    vote_average: number;
    vote_count: number;
  },
>(results: T[], sortBy: "popularity" | "vote_average" | "vote_count") {
  if (sortBy === "popularity") {
    return results.sort((a: T, b: T) => {
      return b.popularity - a.popularity;
    });
  } else if (sortBy === "vote_average") {
    return results.sort((a: T, b: T) => {
      return b.vote_average - a.vote_average;
    });
  } else if (sortBy === "vote_count") {
    return results.sort((a: T, b: T) => {
      return b.vote_count - a.vote_count;
    });
  } else {
    return results;
  }
}
