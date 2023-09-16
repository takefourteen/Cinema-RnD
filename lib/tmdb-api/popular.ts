import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

export async function getPopularMovies(
  page: number,
  region: string,
): Promise<ApiResponse<PopularMovie[]>> {
  const apiUrl = `${BASE_URL}/movie/popular`;
  const params = {
    api_key: API_KEY,
    language: "en-US",
    region,
    page,
  };

  const apiResponse: ApiResponse<PopularMovie[]> = {
    data: null,
    error: null,
  };

  try {
    const response = await axios.get(apiUrl, { params });
    apiResponse.data = response.data.results;
  } catch (error) {
    apiResponse.error = "Error fetching popular movies.";
  }

  return apiResponse;
}

export async function getPopularTVShows(
  page: number,
  originCountry: string = "US",
): Promise<ApiResponse<PopularTVShow[]>> {
  const apiUrl = `${BASE_URL}/tv/popular`;

  const params = {
    api_key: API_KEY,
    language: "en-US",
    origin_country: originCountry,
    page,
  };

  const apiResponse: ApiResponse<PopularTVShow[]> = {
    data: null,
    error: null,
  };

  try {
    const response = await axios.get(apiUrl, { params });
    apiResponse.data = response.data.results;
  } catch (error) {
    apiResponse.error = "Error fetching popular TV shows.";
  } finally {
    return apiResponse;
  }
}

// ==========================================================
// ==========================================================
// ==========================================================
// function for fetching popular TV shows for pages 1 to 10, then filtering them by origin_country
export async function getPopularTVShowsForPages(
  numOfPages: number = 10,
  originCountry: string = "US",
): Promise<ApiResponse<PopularTVShow[]>> {
  const apiResponse: ApiResponse<PopularTVShow[]> = {
    data: [],
    error: null,
  };

  try {
    for (let page = 1; page <= numOfPages; page++) {
      const tvShowResponse = await getPopularTVShows(page);

      if (tvShowResponse.error) {
        throw new Error("Error fetching popular TV shows.");
      }

      if (tvShowResponse.data) {
        apiResponse.data?.push(...tvShowResponse.data); // Spread and push individual TV shows
      }
    }
  } catch (error) {
    apiResponse.error = "Error fetching popular TV shows.";
  }

  const filteredTVShows = filterTVShowsByOriginCountry(
    apiResponse.data!,
    originCountry,
  );

  apiResponse.data = filteredTVShows;

  return apiResponse;
}

// function that filters TV shows based on their origin_country
export function filterTVShowsByOriginCountry(
  tvShows: PopularTVShow[],
  originCountry: string,
): PopularTVShow[] {
  return tvShows.filter((tvShow) =>
    tvShow.origin_country.includes(originCountry),
  );
}
