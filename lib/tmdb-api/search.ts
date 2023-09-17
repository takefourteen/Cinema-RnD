import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

// Function to search for movies by a query
export async function searchMovies(
  query: string,
  page: number = 1,
): Promise<SearchResults<MovieSearchResult[]>> {
  try {
    const encodedQuery = encodeURIComponent(query);
    const response = await axios.get<SearchResults<MovieSearchResult[]>>(
      `${BASE_URL}/search/movie`,
      {
        params: {
          api_key: API_KEY,
          language: "en-US",
          query: encodedQuery,
          page: page,
          include_adult: false,
        },
      },
    );

    return response.data;
  } catch (error) {
    throw new Error(`Error searching for movies: ${error}`);
  }
}

// Function to search for TV shows by a query
export async function searchTVShows(
  query: string,
  page: number = 1,
): Promise<SearchResults<TvShowSearchResult[]>> {
  try {
    const encodedQuery = encodeURIComponent(query);
    const params = {
      api_key: API_KEY,
      language: "en-US",
      query: encodedQuery,
      page: page.toString(),
      include_adult: "false",
    };
    const response = await axios.get<SearchResults<TvShowSearchResult[]>>(
      `${BASE_URL}/search/tv`,
      { params },
    );

    return response.data;
  } catch (error) {
    throw new Error(`Error searching for TV shows: ${error}`);
  }
}

// Function to get all results for any search query
export async function searchAll(query: string, page: number = 1) {
  const movieResults = await searchMovies(query, page);
  const tvResults = await searchTVShows(query, page);

  // console.log("Movie results: ", movieResults);

  //  combine movie and tv results into one array
  const allResults = [...movieResults.results, ...tvResults.results];

  // console.log("All results: ", allResults);

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
