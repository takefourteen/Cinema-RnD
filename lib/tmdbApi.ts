const API_KEY = process.env.TMDB_API_KEY;

// function to get popular movies from the tmdb api
export async function getPopularMovies(
  page: number = 1,
): Promise<PopularMovie[]> {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`,
  );
  const data = await response.json();
  return data.results;
}

// function to get popular tv shows from the tmdb api
export async function getPopularTVShows(
  page: number = 1,
): Promise<PopularTVShow[]> {
  const response = await fetch(
    `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&page=${page}`,
  );
  const data = await response.json();
  return data.results;
}

// function to get recommendations for a movie
export async function getMovieRecommendations(movieId: string) {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${API_KEY}&language=en-US&page=1`,
  );
  const data = await response.json();
  return data.results;
}

// function to get recommendations for a tv show
export async function getTVRecommendations(tvId: string) {
  const response = await fetch(
    `https://api.themoviedb.org/3/tv/${tvId}/recommendations?api_key=${API_KEY}&language=en-US&page=1`,
  );
  const data = await response.json();
  return data.results;
}

// function to get details for a movie
export async function getMovieDetails(movieId: string): Promise<MovieDetails> {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`,
  );
  const data = await response.json();
  return data;
}

// function to get details for a tv show
export async function getTVDetails(tvId: string): Promise<TVShowDetails> {
  const response = await fetch(
    `https://api.themoviedb.org/3/tv/${tvId}?api_key=${API_KEY}&language=en-US`,
  );
  const data = await response.json();
  return data;
}

// function to get searh using the multi search endpoint
export async function searchMulti(query: string, page: number = 1, language: string = 'en-US'): Promise<MultiSearchResult[]> {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&language=${language}&query=${query}&page=${page}&include_adult=false`,
  );
  const data = await response.json();
  return data.results;
}

// Define constants for API base URL and API key
const API_BASE_URL = "https://api.themoviedb.org/3";

// Generic function to search for items by a query
async function searchItems<T>(
  query: string,
  page: number = 1,
  itemType: "movie" | "tv",
): Promise<SearchResults<T>> {
  try {
    const encodedQuery = encodeURIComponent(query);
    const response = await fetch(
      `${API_BASE_URL}/search/${itemType}?api_key=${API_KEY}&language=en-US&query=${encodedQuery}&page=${page}&include_adult=false`,
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

  // Combine movie and TV results
  const allResults = [...movieResults, ...tvResults];

  // Sort the combined results by popularity in descending order
  const sortedResults = allResults.sort((a, b) => b.popularity - a.popularity);

  return sortedResults;
}

// ============================

interface Movie {
  id: number;
  title?: string;
  vote_average: number;
  vote_count: number;
}

// Function to calculate the Weighted Rating using the IMDB formula
function calculateWeightedRating(movie: Movie): number {
  const voteAverage = movie.vote_average;
  const voteCount = movie.vote_count;

  // Constants used in the IMDB formula (you can adjust these values)
  const minVotes = 1000; // Minimum number of votes required
  const minRating = 1; // Minimum rating required

  if (voteCount < minVotes || voteAverage < minRating) {
    return 0; // Return 0 if the movie doesn't meet the criteria
  }

  const weightedRating =
    (voteCount / (voteCount + minVotes)) * voteAverage +
    (minVotes / (voteCount + minVotes)) * minRating;

  return weightedRating;
}

// Function to get recommended movies based on the IMDb formula
export async function getRecommendedMovies(): Promise<PopularMovie[]> {
  // Fetch popular movies
  const popularMovies = await getPopularMovies();

  // Calculate weighted ratings for popular movies
  const moviesWithWeightedRating = popularMovies.map((movie) => ({
    ...movie,
    weightedRating: calculateWeightedRating(movie),
  }));

  // Sort movies by weighted rating in descending order
  const recommendedMovies = moviesWithWeightedRating.sort(
    (a, b) => b.weightedRating - a.weightedRating,
  );

  return recommendedMovies;
}

// Function to get recommended TV shows based on the IMDb formula
export async function getRecommendedTVShows(): Promise<PopularTVShow[]> {
  // Fetch popular TV shows
  const popularTVShows = await getPopularTVShows();

  // Calculate weighted ratings for popular TV shows
  const tvShowsWithWeightedRating = popularTVShows.map((tvShow) => ({
    ...tvShow,
    weightedRating: calculateWeightedRating(tvShow),
  }));

  // Sort TV shows by weighted rating in descending order
  const recommendedTVShows = tvShowsWithWeightedRating.sort(
    (a, b) => b.weightedRating - a.weightedRating,
  );

  return recommendedTVShows;
}
