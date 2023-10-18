import { fetchCategory } from "@/lib/tmdb-api/discover";
import {
  fetchMultiplePagesOfTrendingMovies,
  fetchMultiplePagesOfTrendingTVShows,
} from "@/lib/tmdb-api/trending";
import { sortResultsByPopularity } from "./sortResults";

type HomePageData<T> = {
  data: T[];
  title: string;
  hasPriority: boolean;
  viewWithProgressBar: boolean;
  standOut: boolean;
};

export async function fetchAllDataForHome(): Promise<HomePageData<any>[]> {
  const trendingMoviesPromise = fetchMultiplePagesOfTrendingMovies(2);
  const trendingTvShowsPromise = fetchMultiplePagesOfTrendingTVShows(2);

  const movieDocumentariesPromise = fetchCategory({
    category: "documentary",
    type: "movies",
  });
  const tvSeriesDocumentariesPromise = fetchCategory({
    category: "documentary",
    type: "tvSeries",
  });
  const movieTopRatedPromise = fetchCategory({
    category: "topRated",
    type: "movies",
  });
  const tvSeriesTopRatedPromise = fetchCategory({
    category: "topRated",
    type: "tvSeries",
  });

  // Resolve all promises
  const [
    trendingMovies,
    trendingTvShows,
    movieDocumentaries,
    tvSeriesDocumentaries,
    topRatedMovies,
    topRatedTvSeries,
  ] = await Promise.all([
    trendingMoviesPromise,
    trendingTvShowsPromise,
    movieDocumentariesPromise,
    tvSeriesDocumentariesPromise,
    movieTopRatedPromise,
    tvSeriesTopRatedPromise,
  ]);

  // Combine movie and tv series results
  const allDocumentaries = [...movieDocumentaries, ...tvSeriesDocumentaries];
  
  const allTopRated = [...topRatedMovies, ...topRatedTvSeries];

  // Sort the combined array by popularity
  const sortedDocumentaries = sortResultsByPopularity(allDocumentaries);
  const sortedTopRated = sortResultsByPopularity(allTopRated);

  // Return the data in the shape we need for the home page
  return [
    {
      data: trendingMovies.slice(0, 15),
      title: "Latest Blockbuster Movies",
      hasPriority: true,
      viewWithProgressBar: true,
      standOut: false,
    },
    {
      data: trendingTvShows.slice(0, 15),
      title: "Latest Binge-Worthy TV Shows",
      hasPriority: true,
      viewWithProgressBar: true,
      standOut: false,
    },
    {
      data: sortedDocumentaries.slice(0, 15),
      title: "Documentaries",
      hasPriority: false,
      viewWithProgressBar: true,
      standOut: false,
    },
    {
      data: sortedTopRated.slice(0, 15),
      title: "Top Rated",
      hasPriority: false,
      viewWithProgressBar: true,
      standOut: false,
    },
  ];
}
