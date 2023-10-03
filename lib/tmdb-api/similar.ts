import axios, { AxiosResponse, AxiosError } from "axios";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

// fetch similar movies for a movie
export async function fetchSimilarMovies(
  movieId: string,
): Promise<SimilarMovie[]> {
  const apiUrl = `${BASE_URL}/movie/${movieId}/similar?api_key=${API_KEY}&language=en-US&page=1`;

  try {
    const response: AxiosResponse<SimilarMoviesResponse> =
      await axios.get(apiUrl);

    const data = response.data.results;

    return data;
  } catch (error) {
    const axiosError = error as AxiosError | any;

    if (axiosError.response) {
      // Extract the error message from the response data
      const errorMessage =
        axiosError.response.data?.status_message || "Unknown error occurred";

      throw new Error(errorMessage);
    } else if (axiosError.request) {
      // The request was made but no response was received
      throw new Error("Request failed. Please try again.");
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new Error("An unknown error occurred. Please try again.");
    }
  }
}
