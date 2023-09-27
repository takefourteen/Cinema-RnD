const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export interface TvSeriesApiResponse {
  data: TVSeriesData | null;
  error: string | null;
}

export async function fetchTvSeriesDetails(
  tvSeriesId: string | number,
): Promise<TvSeriesApiResponse> {
  try {
    const response = await fetch(
      `${BASE_URL}/tv/${tvSeriesId}?api_key=${API_KEY}&language=en-US&append_to_response=credits`,
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

    const data = await response.json();

    return {
      data,
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
/* is a type guard function that checks if a given object is of type 
TVSeriesData. */
export function isTVSeriesDetails(
  data: TVSeriesData | MovieDetailsData,
): data is TVSeriesData {
  return (data as TVSeriesData).number_of_episodes !== undefined;
}