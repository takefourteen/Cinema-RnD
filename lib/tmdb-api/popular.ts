const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

import { filterResultsByLanguage } from "@/helpers/filterResults";
import { filterMediaWithVideoUrl } from "@/helpers/filterMediaWithVideoUrl";

export async function getPopularMovies(
  page: number,
  region: string,
): Promise<PopularMovie[]> {
  const url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&region=${region}&page=${page}`;

  try {
    const response = await fetch(url, {next: {revalidate: 3600 * 24}});

    if (!response.ok) {
      // Parse the error response as JSON to extract status_message
      const errorResponse = await response.json();
      const errorMessage =
        errorResponse?.status_message || "Failed to fetch popular movies";
      throw new Error(errorMessage);
    }

    const data: PopularMoviesResponse = await response.json();

    // filter out movies that are not in English
    data.results = filterResultsByLanguage(data.results || [], "en");

    return data.results;
  } catch (error) {
    console.error("Error fetching popular movies:", error);

    return [];
  }
}

export async function getPopularTvSeries(
  page: number,
  originCountry: string,
): Promise<PopularTvSeries[]> {
  const url = `${BASE_URL}/tv/popular?api_key=${API_KEY}&language=en-US&region=${originCountry}&page=${page}`;

  try {
    const response = await fetch(url, {next: {revalidate: 3600 * 24}});

    if (!response.ok) {
      // Parse the error response as JSON to extract status_message
      const errorResponse = await response.json();
      const errorMessage =
        errorResponse?.status_message || "Failed to fetch popular tv series";
      throw new Error(errorMessage);
    }

    const data: PopularTvSeriesResponse = await response.json();

    // filter out tv series that are not in English
    data.results = filterResultsByLanguage(data.results || [], "en");

    return data.results;
  } catch (error) {
    console.error("Error fetching popular tv series:", error);

    return [];
  }
}

// ==========================================================
export async function fetchMultiplePagesOfPopularMovies(
  numPages: number,
): Promise<PopularMovie[]> {
  let finalResults: PopularMovie[] = [];

  for (let page = 1; page <= numPages; page++) {
    try {
      const intialFetch: PopularMovie[] = await getPopularMovies(page, "US");

      // Filter the results to retain only those with a video URL
      const filteredResults: PopularMovie[] =
        await filterMediaWithVideoUrl(intialFetch);

      // Put the filtered results into the final results
      finalResults = [...finalResults, ...filteredResults];
    } catch (error) {
      throw new Error(`Error fetching data for page ${page}: ${error}`);
    }
  }

  return finalResults;
}

export async function fetchMultiplePagesOfPopularTvSeries(
  numPages: number,
): Promise<PopularTvSeries[]> {
  let finalResults: PopularTvSeries[] = [];

  for (let page = 1; page <= numPages; page++) {
    try {
      const intialFetch: PopularTvSeries[] = await getPopularTvSeries(
        page,
        "US",
      );

      // Filter the results to retain only those with a video URL
      const filteredResults: PopularTvSeries[] =
        await filterMediaWithVideoUrl(intialFetch);

      // Put the filtered results into the final results
      finalResults = [...finalResults, ...filteredResults];
    } catch (error) {
      throw new Error(`Error fetching data for page ${page}: ${error}`);
    }
  }

  return finalResults;
}

// function that filters TV shows based on their origin_country
export function filterTVShowsByOriginCountry(
  tvShows: PopularTvSeries[],
  originCountry: string,
): PopularTvSeries[] {
  return tvShows.filter((tvShow) =>
    tvShow.origin_country.includes(originCountry),
  );
}
