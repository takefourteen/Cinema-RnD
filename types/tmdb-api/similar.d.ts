interface SimilarMovie {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface SimilarTvSeries {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  first_air_date: string;
  name: string;
  vote_average: number;
  vote_count: number;
}

interface SimilarMoviesResponse {
  page: number;
  results: SimilarMovie[];
  total_pages: number;
  total_results: number;
}

interface SimilarTvSeriesResponse {
  page: number;
  results: SimilarTvSeries[];
  total_pages: number;
  total_results: number;
}
