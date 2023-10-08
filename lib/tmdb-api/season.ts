const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export async function fetchSeasonData(
  tvSeriesId: string | number,
  seasonNumber: number,
): Promise<SeasonData> {
  try {
    const response = await fetch(
      `${BASE_URL}/tv/${tvSeriesId}/season/${seasonNumber}?api_key=${API_KEY}&language=en-US`,
    );

    if (!response.ok) {
      const errorResponse = await response.json();
      const errorMessage =
        errorResponse?.status_message || "Unknown error occurred";
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    throw new Error(errorMessage);
  }
}
