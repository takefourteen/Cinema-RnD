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
  const trendingPromises = [
    fetchMultiplePagesOfTrendingMovies(2),
    fetchMultiplePagesOfTrendingTVShows(2),
  ];

  const [trendingMovies, trendingTvShows] = await Promise.all(trendingPromises);

  const promises = [
    // ============================
    //            MOVIES
    // ============================
    //1. Pulse-Pounding Action
    fetchCategory("movie", "Pulse-Pounding Action", {
      sort_by: "popularity.desc",
      with_genres: `${movieGenres.action},${movieGenres.adventure}`,
      without_genres: `${movieGenres.horror},${movieGenres.sciFi}`,
    }),
    //2. Sci-Fi Galaxy Adventures
    fetchCategory("movie", "Sci-Fi Galaxy Adventures", {
      sort_by: "popularity.desc",
      with_genres: `${movieGenres.sciFi},${movieGenres.fantasy}`,
      without_genres: `${movieGenres.horror}`,
    }),
    //3. Spine-Tingling Horror Flicks
    fetchCategory("movie", "Spine-Tingling Horror Flicks", {
      sort_by: "popularity.desc",
      with_genres: `${movieGenres.horror},${movieGenres.thriller}`,
    }),
    //4. Family Adventures
    fetchCategory("movie", "Family Adventures", {
      sort_by: "popularity.desc",
      with_genres: `${movieGenres.family},${movieGenres.adventure}`,
    }),
    //5. Wild West Adventures
    fetchCategory("movie", "Wild West Adventures", {
      sort_by: "popularity.desc",
      with_genres: `${movieGenres.western},${movieGenres.adventure}`,
    }),

    // ============================
    //            Tv Series
    // ============================
    // 6. Laugh-Out-Loud Sitcoms (Comedy)
    fetchCategory("tvSeries", "Laugh-Out-Loud Sitcoms", {
      sort_by: "popularity.desc",
      with_genres: `${tvSeriesGenres.comedy}`,
      with_keywords: `${keywords.sitcom}|${keywords.comedy}`,
    }),
    // 7. Reality TV (Reality)
    fetchCategory("tvSeries", "Reality TV", {
      sort_by: "popularity.desc",
      with_genres: `${tvSeriesGenres.reality}|${tvSeriesGenres.drama}`,
    }),

    // ============================
    //      Movies & Tv Series
    // ============================
    // 8. Heartfelt Romantic Escapes (Romance, Drama)
    fetchCategory("movie", "Heartfelt Romantic Escapes", {
      sort_by: "popularity.desc",
      with_genres: `${movieGenres.romance},${movieGenres.drama}`,
    }),
    fetchCategory("tvSeries", "Heartfelt Romantic Escapes", {
      sort_by: "popularity.desc",
      with_genres: `${tvSeriesGenres.drama}`,
      with_keywords: `${keywords.romance}|${keywords.love}`,
    }),
    // 9. Mind Bending Mystery Tales (Mystery, Thriller)
    fetchCategory("movie", "Mind Bending Mystery Tales", {
      sort_by: "popularity.desc",
      with_genres: `${movieGenres.mystery},${movieGenres.thriller}`,
    }),
    fetchCategory("tvSeries", "Mind Bending Mystery Tales", {
      sort_by: "popularity.desc",
      with_genres: `${tvSeriesGenres.mystery}`,
      with_keywords: `${keywords.thriller}|${keywords.suspense}`,
    }),
    // 10. Small Town Drama (Small Town, highschool, Drama)
    fetchCategory("movie", "Small Town Drama", {
      sort_by: "popularity.desc",
      with_genres: `${movieGenres.drama}`,
      with_keywords: `${keywords.school}|${keywords.smallTown}|${keywords.highSchool}`,
    }),
    fetchCategory("tvSeries", "Small Town Drama", {
      sort_by: "popularity.desc",
      with_genres: `${tvSeriesGenres.drama}`,
      with_keywords: `${keywords.school}|${keywords.smallTown}|${keywords.highSchool}`,
    }),
  ];

  // Resolve all promises
  const [
    pulsePoundingActionMovies, // 1
    sciFiGalaxyAdventureMovies, // 2
    spineTinglingHorrorFlicksMovies, // 3
    familyAdventuresMovies, // 4
    wildWestAdventuresMovies, // 5
    laughOutLoudSitcomsTvSeries, // 6
    realityTvSeries, // 7
    heartfeltRomanticEscapesMovies, // 8 - combined
    heartfeltRomanticEscapesTvSeries, // 8 -  combined
    mindBendingMysteryTalesMovies, // 9 - combined
    mindBendingMysteryTalesTvSeries, // 9 - combined
    smallTownDramaMovies, // 10 - combined
    smallTownDramaTvSeries, // 10 - combined
  ] = await Promise.all(promises);

  // Combine the movie and tv series results
  const heartfeltRomanticEscapesCombined = {
    title: "Heartfelt Romantic Escapes",
    results: [
      ...heartfeltRomanticEscapesMovies.results.slice(0, 10),
      ...heartfeltRomanticEscapesTvSeries.results.slice(0, 10),
    ],
  };

  const mindBendingMysteryTalesCombined = {
    title: "Mind-Bending Mystery Tales",
    results: [
      ...mindBendingMysteryTalesMovies.results.slice(0, 10),
      ...mindBendingMysteryTalesTvSeries.results.slice(0, 10),
    ],
  };

  const smallTownDramaCombined = {
    title: "Small Town Drama",
    results: [
      ...smallTownDramaMovies.results.slice(0, 10),
      ...smallTownDramaTvSeries.results.slice(0, 10),
    ],
  };

  // log small town drama
  console.log("small town drama", smallTownDramaCombined);

  // Sort the combined array by popularity
  sortResultsByVoteCount(heartfeltRomanticEscapesCombined.results);
  sortResultsByVoteCount(mindBendingMysteryTalesCombined.results);
  sortResultsByPopularity(smallTownDramaCombined.results);

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
      data: pulsePoundingActionMovies.results.slice(0, 15),
      title: pulsePoundingActionMovies.title,
      ...defaultContentOptions,
    },
    {
      data: sciFiGalaxyAdventureMovies.results.slice(0, 15),
      title: sciFiGalaxyAdventureMovies.title,
      ...defaultContentOptions,
    },
    {
      data: laughOutLoudSitcomsTvSeries.results.slice(0, 15),
      title: laughOutLoudSitcomsTvSeries.title,
      ...defaultContentOptions,
    },
    {
      data: spineTinglingHorrorFlicksMovies.results.slice(0, 15),
      title: spineTinglingHorrorFlicksMovies.title,
      ...defaultContentOptions,
    },
    {
      data: heartfeltRomanticEscapesCombined.results.slice(0, 15),
      title: heartfeltRomanticEscapesCombined.title,
      ...defaultContentOptions,
    },
    {
      data: familyAdventuresMovies.results.slice(0, 15),
      title: familyAdventuresMovies.title,
      ...defaultContentOptions,
    },
    {
      data: wildWestAdventuresMovies.results.slice(0, 15),
      title: wildWestAdventuresMovies.title,
      ...defaultContentOptions,
    },
    {
      data: mindBendingMysteryTalesCombined.results.slice(0, 15),
      title: mindBendingMysteryTalesCombined.title,
      ...defaultContentOptions,
    },
    {
      data: smallTownDramaCombined.results.slice(0, 15),
      title: smallTownDramaCombined.title,
      ...defaultContentOptions,
    },
    {
      data: realityTvSeries.results.slice(0, 15),
      title: realityTvSeries.title,
      ...defaultContentOptions,
    },
  ];
}

/* 
the movies and tv series categories:

Movies:

Pulse-Pounding Action (Action, Adventure) - done
Sci-Fi Galaxy Adventures (Science Fiction, Fantasy) - done
Spine-Tingling Horror Flicks (Horror, Thriller) - done
Epic Fantasy Journeys (Fantasy, Adventure)
Wild West Adventures (Western, Adventure) - done
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
Laugh-Out-Loud Sitcoms (Comedy) - done
Unscripted Reality Experiences (Reality TV)
Heart-Pounding Crime Dramas (Crime, Drama)



Both Movies and TV Series:

Mind-Bending Mystery Tales (Mystery, Thriller) - done
Teenage Drama Diaries (Teen, Drama) - done
Heartfelt Romantic Escapes (Romance, Drama)
Wholesome Family Fun (Family, Comedy)
Romantic Comedy Rollercoaster (Romance, Comedy)
Musical Melodies and Dramas (Music, Drama)
Animated Adventures Galore (Animation, Adventure)
Travel and Adventure Escapes (Travel, Adventure)
*/
