const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

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

// ===============================================================================
// ===============================================================================
// ===============================================================================

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
