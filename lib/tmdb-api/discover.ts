import { filterMediaWithVideoUrl } from "@/helpers/filterMediaWithVideoUrl";
import { categories } from "@/constants/categories";

const baseMovieURL = `https://api.themoviedb.org/3/discover/movie?`;
const baseTVSeriesURL = `https://api.themoviedb.org/3/discover/tv?`;
const BEARER_TOKEN = process.env.NEXT_PUBLIC_TMDB_BEARER_TOKEN;

type generateAPIUrl = (category: string, type: string) => string;

const generateAPIUrl = (category: string, type: string): string => {
  const genreIds = categories[type][category].genreIds.join(",");
  const filterAndSortOptions = categories[type][category].filterAndSortOptions;

  const baseAPIUrl = type === "movies" ? baseMovieURL : baseTVSeriesURL;

  const params = new URLSearchParams({
    include_adult: "false",
    include_video: "false",
    language: "en-US",
    page: "1",
    with_original_language: "en",
    with_genres: genreIds,
    ...filterAndSortOptions,
  });

  return `${baseAPIUrl}${params.toString()}`;
};

type Categories =
  | "actionAdventure"
  | "animation"
  | "action"
  | "comedy"
  | "crime"
  | "documentary"
  | "drama"
  | "family"
  | "fantasy"
  | "history"
  | "horror"
  | "music"
  | "mystery"
  | "reality"
  | "romance"
  | "sciFi"
  | "sciFiFantasy"
  | "standUpComedy"
  | "thriller"
  | "western"
  | "classic"
  | "topRated";

type fetchCategory = {
  category: Categories;
  type: "movies" | "tvSeries";
};

export const fetchCategory = async ({
  category,
  type,
}: fetchCategory): Promise<
  DiscoverMovieResult[] | DiscoverTVSeriesResult[]
> => {
  try {
    const url = generateAPIUrl(category, type);
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${BEARER_TOKEN}`,
      },
    };

    const response = await fetch(url, options);

    if (!response.ok) {
      // Parse the error response as JSON to extract status_message
      const errorResponse = await response.json();
      const errorMessage =
        errorResponse?.status_message || `Failed to fetch ${category} ${type}`;
      throw new Error(errorMessage);
    }

    const data: DiscoverMovieApiResponse | DiscoverTVSeriesApiResponse =
      await response.json();

    // filter out movies that don't have a video url
    data.results = await filterMediaWithVideoUrl(data.results || []);

    if (type === "movies") {
      return data.results as DiscoverMovieResult[];
    } else {
      return data.results as DiscoverTVSeriesResult[];
    }
  } catch (error) {
    console.error(`Error fetching ${category} ${type}:`, error);

    return [];
  }
};
