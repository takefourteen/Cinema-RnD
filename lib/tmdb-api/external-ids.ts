const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export async function fetchTvSeriesExternalIds(
  tvSeriesId: string,
): Promise<TvSeriesExternalIds> {
  const url = `${BASE_URL}/tv/${tvSeriesId}/external_ids?api_key=${API_KEY}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      // Parse the error response as JSON to extract status_message
      const errorResponse = await response.json();
      const errorMessage =
        errorResponse?.status_message || "Failed to fetch external ids";
      throw new Error(errorMessage);
    }

    const data: TvSeriesExternalIds = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching external ids:", error);

    return {} as TvSeriesExternalIds;
  }
}
