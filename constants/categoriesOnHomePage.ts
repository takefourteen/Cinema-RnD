import { fetchCategory } from "@/lib/tmdb-api/discover";

// import namespaced constants
import { keywords } from "@/constants/keywords";
import { movieGenres } from "@/constants/movieGenres";
import { tvSeriesGenres } from "@/constants/tvSeriesGenres";

import type { FilterOptions } from "@/lib/tmdb-api/discover";

export type MovieCategory = {
  type: "movie";
  title: string;
  filterOptions: {
    movieFilterOptions: FilterOptions;
    tvSeriesFilterOptions: FilterOptions;
  };
};

export type TvSeriesCategory = {
  type: "tvSeries";
  title: string;
  filterOptions: {
    movieFilterOptions: FilterOptions;
    tvSeriesFilterOptions: FilterOptions;
  };
};

export type MovieAndTvSeriesCategories = {
  type: "movieAndTVSeries";
  title: string;
  filterOptions: {
    movieFilterOptions: FilterOptions;
    tvSeriesFilterOptions: FilterOptions;
  };
};

type Category = MovieCategory | TvSeriesCategory | MovieAndTvSeriesCategories;


export async function fetchAllDataForHome() {
  const promises = [
    // ============================
    fetchCategory({
      type: "movie",
      categoryTitle: "Pulse-Pounding Action",
       movieFilterOptions: {
        sort_by: "popularity.desc",
        with_genres: `${movieGenres.action},${movieGenres.adventure}`,
        without_genres: `${movieGenres.horror},${movieGenres.sciFi}`,
      },
    }),

    // ============================
    fetchCategory({
      type: "movie",
      categoryTitle: "Sci-Fi Galaxy Adventures",
      movieFilterOptions: {
        sort_by: "popularity.desc",
        with_genres: `${movieGenres.sciFi},${movieGenres.fantasy}`,
        without_genres: `${movieGenres.horror}`,
      },
    }),

    // ============================
    fetchCategory({
      type: "movie",
      categoryTitle: "Spine-Tingling Horror Flicks",
      movieFilterOptions: {
        sort_by: "popularity.desc",
        with_genres: `${movieGenres.horror},${movieGenres.thriller}`,
      },
    }),

    // ============================
    fetchCategory({
      type: "movie",
      categoryTitle: "Family Adventures",
      movieFilterOptions: {
        sort_by: "popularity.desc",
        with_genres: `${movieGenres.family},${movieGenres.adventure}`,
        without_genres: `${movieGenres.horror},${movieGenres.sciFi}`,
      },
    }),

    // ============================
    fetchCategory({
      type: "movie",
      categoryTitle: "Wild West Adventures",
      movieFilterOptions: {
        sort_by: "popularity.desc",
        with_genres: `${movieGenres.western},${movieGenres.adventure}`,
      },
    }),

    // ============================
    fetchCategory({
      type: "tvSeries",
      categoryTitle: "Laugh-Out-Loud Sitcoms",
      tvSeriesFilterOptions: {
        sort_by: "popularity.desc",
        with_genres: `${tvSeriesGenres.comedy}`,
        with_keywords: `${keywords.sitcom}|${keywords.comedy}`,
      },
    }),

    // ============================
    fetchCategory({
      type: "movieAndTVSeries",
      categoryTitle: "Heartfelt Romantic Escapes",
      movieFilterOptions: {
        sort_by: "popularity.desc",
        with_genres: `${movieGenres.romance},${movieGenres.drama}`,
      },
      tvSeriesFilterOptions: {
        sort_by: "popularity.desc",
        with_genres: `${tvSeriesGenres.drama}`,
        with_keywords: `${keywords.romance}|${keywords.love}`,
      },
    }),

    // ============================
    fetchCategory({
      type: "movieAndTVSeries",
      categoryTitle: "Mind Bending Mystery Tales",
      movieFilterOptions: {
        sort_by: "popularity.desc",
        with_genres: `${movieGenres.mystery},${movieGenres.thriller}`,
      },
      tvSeriesFilterOptions: {
        sort_by: "popularity.desc",
        with_genres: `${tvSeriesGenres.mystery}`,
        with_keywords: `${keywords.thriller}|${keywords.suspense}`,
      },
    }),

    // ============================
    fetchCategory({
      type: "movieAndTVSeries",
      categoryTitle: "Small Town Drama",
      movieFilterOptions: {
        sort_by: "popularity.desc",
        with_genres: `${movieGenres.drama}`,
        with_keywords: `${keywords.school}|${keywords.smallTown}|${keywords.highSchool}`,
      },
      tvSeriesFilterOptions: {
        sort_by: "popularity.desc",
        with_genres: `${tvSeriesGenres.drama}`,
        with_keywords: `${keywords.school}|${keywords.smallTown}|${keywords.highSchool}`,
      },
    }),
  ];

  return await Promise.all(promises);
  // return promises;
}
