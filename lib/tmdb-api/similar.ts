import axios, { AxiosResponse, AxiosError } from "axios";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

interface SimilarApiResponse<T> {
  data: T | null;
  error: string | null;
}

// fetch similar movies for a movie
export async function fetchSimilarMovies(
  movieId: string,
): Promise<SimilarApiResponse<SimilarMovie[]>> {
  const apiUrl = `${BASE_URL}/movie/${movieId}/similar?api_key=${API_KEY}&language=en-US&page=1`;

  try {
    const response: AxiosResponse<SimilarMoviesResponse> =
      await axios.get(apiUrl);
    return { data: response.data.results, error: null };
  } catch (error) {
    const axiosError = error as AxiosError | any;

    if (axiosError.response) {
      // Extract the error message from the response data
      const errorMessage =
        axiosError.response.data?.status_message || "Unknown error occurred";

      return {
        data: null,
        error: `Request failed: ${errorMessage}`,
      };
    } else if (axiosError.request) {
      // The request was made but no response was received
      return { data: null, error: "No response received from the server" };
    } else {
      // Something happened in setting up the request that triggered an Error
      return { data: null, error: "Error setting up the request" };
    }
  }
}
