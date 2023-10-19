import { filterMediaWithVideoUrl } from "@/helpers/filterMediaWithVideoUrl";

const BEARER_TOKEN = process.env.NEXT_PUBLIC_TMDB_BEARER_TOKEN;
const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const baseMovieURL = `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&`;
const baseTVSeriesURL = `https://api.themoviedb.org/3/discover/tv?api_key=${TMDB_API_KEY}&`;

type FilterOptions = {
  sort_by?: "popularity.desc" | "vote_average.desc";
  "vote_average.gte"?: string;
  "vote_count.gte"?: string;
  with_genres?: string;
  without_genres?: string;
  with_keywords?: string;
};

type generateAPIUrl = (
  type: "movie" | "tvSeries",
  filterOptions: FilterOptions,
) => string;

const generateAPIUrl: generateAPIUrl = (type, filterOptions) => {
  const baseAPIUrl = type === "movie" ? baseMovieURL : baseTVSeriesURL;

  const params = new URLSearchParams({
    include_adult: "false",
    include_video: "false",
    language: "en-US",
    page: "1",
    with_original_language: "en",
    ...filterOptions,
  });

  return `${baseAPIUrl}${params.toString()}`;
};

export const fetchCategory = async (
  type: "movie" | "tvSeries",
  filterOptions: FilterOptions,
): Promise<DiscoverMovieResult[] | DiscoverTVSeriesResult[]> => {
  try {
    const url = generateAPIUrl(type, filterOptions);

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${BEARER_TOKEN}`,
      },
      next: { revalidate: 3600 * 24 },
    };

    // add an artificial delay to prevent hitting the API too quickly
    // await new Promise((resolve) => setTimeout(resolve, 300));

    // Fetch the data
    const response = await fetch(url, options);

    if (!response.ok) {
      // Parse the error response as JSON to extract status_message
      const errorResponse = await response.json();
      const errorMessage =
        errorResponse?.status_message ||
        `Failed to fetch Discovery ${type} Data.`;
      throw new Error(errorMessage);
    }

    const data: DiscoverMovieApiResponse | DiscoverTVSeriesApiResponse =
      await response.json();

    // filter out movies that don't have a video url
    data.results = await filterMediaWithVideoUrl(data.results || []);

    if (type === "movie") {
      return data.results as DiscoverMovieResult[];
    } else {
      return data.results as DiscoverTVSeriesResult[];
    }
  } catch (error) {
    console.error(`Error fetching discovery ${type}:`, error);

    return [];
  }
};
