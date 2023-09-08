const apiKey = process.env.TMDB_API_KEY;

export async function getPopularMovies(page: number = 1) {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${page}`,
  );
  const data = await response.json();
  return data.results;
}

export async function getPopularTVShows(page: number = 1) {
  const response = await fetch(
    `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=en-US&page=${page}`,
  );
  const data = await response.json();
  return data.results;
}

// make a request to the tmdb api to get recommendations for a movie
export async function getRecommendations(movieId: string) {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${apiKey}&language=en-US&page=1`,
  );
  const data = await response.json();
  return data.results;
}

// make a request to the tmdb api to get recommendations for a tv show
export async function getTVRecommendations(tvId: string) {
  const response = await fetch(
    `https://api.themoviedb.org/3/tv/${tvId}/recommendations?api_key=${apiKey}&language=en-US&page=1`,
  );
  const data = await response.json();
  return data.results;
}

interface Movie {
  id: number;
  title: string;
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

// Function to get recommended content by weighted rating
function getRecommendedContent(contentList: Movie[]): Movie[] {
  // Calculate the weighted rating for each movie
  const moviesWithWeightedRating = contentList.map((movie) => ({
    ...movie,
    weightedRating: calculateWeightedRating(movie),
  }));

  // Sort the movies by weighted rating in descending order
  const recommendedContent = moviesWithWeightedRating.sort(
    (a, b) => b.weightedRating - a.weightedRating,
  );

  return recommendedContent;
}
