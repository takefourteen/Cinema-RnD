interface RecommendedMovie {
  adult: boolean;
  backdrop_path: string | null;
  id: number;
  title: string;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  media_type: string;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface RecommendedTvSeries {
  adult: boolean;
  backdrop_path: string | null;
  id: number;
  name: string;
  original_language: string;
  original_name: string;
  overview: string;
  poster_path: string | null;
  media_type: string;
  genre_ids: number[];
  popularity: number;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  origin_country: string[];
}

interface MovieRecommendationsResponse {
  page: number;
  results: RecommendedMovie[];
  total_pages: number;
  total_results: number;
}

interface TVSeriesRecommendationsResponse {
  page: number;
  results: RecommendedTvSeries[];
  total_pages: number;
  total_results: number;
}