// Interface for popular movie data
interface PopularMovie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface PopularMoviesResponse {
  page: number;
  results: PopularMovie[];
  total_pages: number;
  total_results: number;
}

// Interface for popular TV show data
interface PopularTvSeries {
  backdrop_path: string;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}

interface PopularTvSeriesResponse {
  page: number;
  results: PopularTvSeries[];
  total_pages: number;
  total_results: number;
}
