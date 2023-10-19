// import data fetching functions
import { fetchCategory } from "@/lib/tmdb-api/discover";
import {
  fetchMultiplePagesOfTrendingMovies,
  fetchMultiplePagesOfTrendingTVShows,
} from "@/lib/tmdb-api/trending";

// import helper functions
import { sortResultsByPopularity, sortResultsByVoteCount } from "./sortResults";

// import namespaced constants
import { keywords } from "@/constants/keywords";
import { movieGenres } from "@/constants/movieGenres";
import { tvSeriesGenres } from "@/constants/tvSeriesGenres";

interface ContentOptions {
  hasPriority: boolean;
  viewWithProgressBar: boolean;
  standOut: boolean;
}

const defaultContentOptions: ContentOptions = {
  hasPriority: false,
  viewWithProgressBar: true,
  standOut: false,
};

type HomePageData<T> = {
  data: T[];
  title: string;
} & ContentOptions; // Merge with ContentOptions

export async function fetchAllDataForHome(): Promise<HomePageData<any>[]> {
  const trendingMoviesPromise = fetchMultiplePagesOfTrendingMovies(2);
  const trendingTvShowsPromise = fetchMultiplePagesOfTrendingTVShows(2);

  // ============================
  // ============================
  //            MOVIES
  // ============================
  // ============================

  // Pulse-Pounding Action
  const pulsePoundingActionMoviesPromise = fetchCategory("movie", {
    sort_by: "popularity.desc",
    with_genres: `${movieGenres.action},${movieGenres.adventure}`,
    without_genres: `${movieGenres.horror},${movieGenres.sciFi}`,
  });

  // Sci-fi Galaxy Adventures
  const sciFiGalaxyAdventureMoviesPromise = fetchCategory("movie", {
    sort_by: "popularity.desc",
    with_genres: `${movieGenres.sciFi},${movieGenres.fantasy}`,
    without_genres: `${movieGenres.horror}`,
  });

  // Spine-Tingling Horror Flicks
  const spineTinglingHorrorFlicksMoviesPromise = fetchCategory("movie", {
    sort_by: "popularity.desc",
    with_genres: `${movieGenres.horror},${movieGenres.thriller}`,
  });

  // ============================
  // ============================
  //            Tv Series
  // ============================
  // ============================

  // ============================
  // ============================
  //      Movies & Tv Series
  // ============================
  // ============================

  // Heartfelt Romantic Escapes (Romance, Drama)
  const heartfeltRomanticEscapesMoviesPromise = fetchCategory("movie", {
    sort_by: "popularity.desc",
    with_genres: `${movieGenres.romance},${movieGenres.drama}`,
  });
  const heartfeltRomanticEscapesTvSeriesPromise = fetchCategory("tvSeries", {
    sort_by: "popularity.desc",
    with_genres: `${tvSeriesGenres.drama}`,
    with_keywords: `${keywords.romance}|${keywords.love}`,
  });

  // Resolve all promises
  const [
    trendingMovies,
    trendingTvShows,
    pulsePoundingActionMovies,
    sciFiGalaxyAdventureMovies,
    spineTinglingHorrorFlicksMovies,
    heartfeltRomanticEscapesMovies,
    heartfeltRomanticEscapesTvSeries,
  ] = await Promise.all([
    trendingMoviesPromise,
    trendingTvShowsPromise,
    pulsePoundingActionMoviesPromise,
    sciFiGalaxyAdventureMoviesPromise,
    spineTinglingHorrorFlicksMoviesPromise,
    heartfeltRomanticEscapesMoviesPromise,
    heartfeltRomanticEscapesTvSeriesPromise,
  ]);

  // Combine the movie and tv series results
  const combinedMoviesAndTvSeries = [
    ...heartfeltRomanticEscapesMovies.slice(0, 10),
    ...heartfeltRomanticEscapesTvSeries.slice(0, 10),
  ];

  // Sort the combined array by popularity
  sortResultsByVoteCount(combinedMoviesAndTvSeries);

  // Return the data in the shape we need for the home page
  return [
    {
      data: trendingMovies.slice(0, 15),
      title: "Latest Blockbuster Movies",
      ...defaultContentOptions, // Spread default options
    },
    {
      data: trendingTvShows.slice(0, 15),
      title: "Latest Binge-Worthy TV Series",
      ...defaultContentOptions,
    },
    {
      data: pulsePoundingActionMovies.slice(0, 15),
      title: "Pulse-Pounding Action",
      ...defaultContentOptions,
    },
    {
      data: sciFiGalaxyAdventureMovies.slice(0, 15),
      title: "Sci-fi Galaxy Adventures",
      ...defaultContentOptions,
    },
    {
      data: spineTinglingHorrorFlicksMovies.slice(0, 15),
      title: "Spine-Tingling Horror Flicks",
      ...defaultContentOptions,
    },
    {
      data: combinedMoviesAndTvSeries.slice(0, 15),
      title: "Heartfelt Romantic Escapes",
      ...defaultContentOptions,
    },
  ];
}

/* 
the movies and tv series categories:

Movies:

Pulse-Pounding Action (Action, Adventure)
Sci-Fi Galaxy Adventures (Science Fiction, Fantasy)
Spine-Tingling Horror Flicks (Horror, Thriller)
Epic Fantasy Journeys (Fantasy, Adventure)
Wild West Adventures (Western, Adventure)
Historical Drama Chronicles (Historical, Drama)
Magical Fantasy Worlds (Fantasy, Adventure)
Culinary Delights and Dramas (Food, Drama)
Supernatural Thrill Rides (Supernatural, Thriller)
Mind-Blowing Documentaries (Documentary)
Gripping Police Procedurals (Crime, Drama)
Adrenaline-Packed Sports Stories (Sports, Drama)
Futuristic Sci-Fi Fantasies (Science Fiction, Fantasy)
Binge-Worthy Crime Sagas (Crime, Thriller)
Heartwarming Family Adventures (Family, Adventure)

TV Series:

Comedy Club Laughs (Comedy)
Laugh-Out-Loud Sitcoms (Comedy)
Mind-Bending Mystery Tales (Mystery, Thriller)
Unscripted Reality Experiences (Reality TV)
Teenage Drama Diaries (Teen, Drama)
Heart-Pounding Crime Dramas (Crime, Drama)



Both Movies and TV Series:

Heartfelt Romantic Escapes (Romance, Drama)
Wholesome Family Fun (Family, Comedy)
Romantic Comedy Rollercoaster (Romance, Comedy)
Musical Melodies and Dramas (Music, Drama)
Animated Adventures Galore (Animation, Adventure)
Travel and Adventure Escapes (Travel, Adventure)
*/
