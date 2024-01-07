const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export interface GenreListApiResponse<T> {
  data: T | null;
  error: string | null;
}

// function that gets the genres from https://api.themoviedb.org/3/genre/tv/list?api_key=<<api_key>>&language=en-US

export async function getTvGenres(): Promise<
  GenreListApiResponse<GenreListResponse>
> {
  try {
    const response = await fetch(
      `${BASE_URL}/genre/tv/list?api_key=${API_KEY}&language=en-US`,
      {
        cache: "force-cache",
      },
    );

    if (!response.ok) {
      // Parse the error response as JSON to extract status_message
      const errorResponse = await response.json();
      const errorMessage =
        errorResponse?.status_message || "Unknown error occurred";
      throw new Error(errorMessage);
    }

    const data: GenreListResponse = await response.json();

    // console.log("TV genres data", data);

    return {
      data: data,
      error: null,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";

    return {
      data: null,
      error: errorMessage,
    };
  }
}

// function that gets the genres from https://api.themoviedb.org/3/genre/movie/list?api_key=<<api_key>>&language=en-US

export async function getMovieGenres(): Promise<
  GenreListApiResponse<GenreListResponse>
> {
  try {
    const response = await fetch(
      `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`,
      {
        cache: "force-cache",
      },
    );

    if (!response.ok) {
      // Parse the error response as JSON to extract status_message
      const errorResponse = await response.json();
      const errorMessage =
        errorResponse?.status_message || "Unknown error occurred";
      throw new Error(errorMessage);
    }

    const data: GenreListResponse = await response.json();

    // console.log("Movie genres data", data);

    return {
      data: data,
      error: null,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";

    return {
      data: null,
      error: errorMessage,
    };
  }
}
