import { fetchCategory } from "@/lib/tmdb-api/discover";
import {
  fetchMultiplePagesOfTrendingMovies,
  fetchMultiplePagesOfTrendingTVShows,
} from "@/lib/tmdb-api/trending";
import { sortResultsByPopularity } from "./sortResults";

type HomePageData<T> = {
  data: T[];
  title: string;
  orientationStyle: "horizontal" | "vertical";
  hasPriority: boolean;
  viewWithProgressBar: boolean;
  standOut: boolean;
};

export async function fetchAllDataForHome(): Promise<HomePageData<any>[]> {
  const trendingMoviesPromise = fetchMultiplePagesOfTrendingMovies(2);
  const trendingTvShowsPromise = fetchMultiplePagesOfTrendingTVShows(2);
  const movieDocumentariesPromise = fetchCategory({
    category: "documentaries",
    type: "movies",
  });
  const tvSeriesDocumentariesPromise = fetchCategory({
    category: "documentaries",
    type: "tvSeries",
  });

  // Resolve all promises
  const [
    trendingMovies,
    trendingTvShows,
    movieDocumentaries,
    tvSeriesDocumentaries,
  ] = await Promise.all([
    trendingMoviesPromise,
    trendingTvShowsPromise,
    movieDocumentariesPromise,
    tvSeriesDocumentariesPromise,
  ]);

  // Combine movieDocumentaries and tvSeriesDocumentaries
  const allDocumentaries = [...movieDocumentaries, ...tvSeriesDocumentaries];

  // Sort the combined array by popularity
  const sortedDocumentaries = sortResultsByPopularity(allDocumentaries);

  // Return the data in the shape we need for the home page
  return [
    {
      data: trendingMovies,
      title: "Latest Blockbuster Movies",
      orientationStyle: "horizontal",
      hasPriority: true,
      viewWithProgressBar: true,
      standOut: true,
    },
    {
      data: trendingTvShows,
      title: "Latest Binge-Worthy TV Shows",
      orientationStyle: "horizontal",
      hasPriority: true,
      viewWithProgressBar: true,
      standOut: true,
    },
    {
      data: sortedDocumentaries,
      title: "Documentaries",
      orientationStyle: "horizontal",
      hasPriority: false,
      viewWithProgressBar: false,
      standOut: false,
    },
  ];
}
