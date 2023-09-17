import axios, { AxiosResponse, AxiosError } from "axios";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

interface MovieDetailsApiResponse {
  data: MovieDetailsData | null;
  error: string | null;
}

export async function fetchMovieDetails(
  movieId: string,
): Promise<MovieDetailsApiResponse> {
  try {
    const response: AxiosResponse<MovieDetailsData> = await axios.get(
      `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`,
    );

    return {
      data: response.data,
      error: null,
    };
  } catch (error) {
    const axiosError = error as AxiosError;

    // Handle different types of errors (e.g., network error, 404, 500, etc.)
    const errorMessage = axiosError.response
      ? `Error: ${axiosError.response.status} - ${axiosError.response.data}`
      : `Network Error: ${axiosError.message}`;

    return {
      data: null,
      error: errorMessage,
    };
  }
}
