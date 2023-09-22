import axios, { AxiosResponse, AxiosError } from "axios";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

interface RecommendationsApiResponse<T> {
  data: T | null;
  error: string | null;
}

// fetch recommendations for a movie
export async function fetchMovieRecommendations(
  movieId: string,
): Promise<RecommendationsApiResponse<RecommendedMovie[]>> {
  const apiUrl = `${BASE_URL}/movie/${movieId}/recommendations?api_key=a${API_KEY}&language=en-US&page=1`;

  try {
    const response: AxiosResponse<MovieRecommendationsResponse> =
      await axios.get(apiUrl);
    return { data: response.data.results, error: null };
  } catch (error) {
    const axiosError = error as AxiosError | any;

    if (axiosError.response) {
       // Extract the error message from the response data
       const errorMessage = axiosError.response.data.status_message || "Unknown error occurred";

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
