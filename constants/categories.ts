import { keywords } from "@/constants/keywords";
import { tvSeriesGenres } from "./tvSeriesGenres";
import { movieGenres } from "./movieGenres";

interface CategoryList {
  [key: string]: {
    [key: string]: {
      genreIds: number[];
      filterAndSortOptions: { [key: string]: any };
    };
  };
}

export const categories: CategoryList = {
  movies: {
    action: {
      genreIds: [movieGenres.action],
      filterAndSortOptions: {
        sort_by: "popularity.desc",
        with_keywords: `${keywords.action}`,
      },
    },
    adventure: {
      genreIds: [movieGenres.adventure],
      filterAndSortOptions: {
        sort_by: "popularity.desc",
        with_keywords: `${keywords.adventure}`,
      },
    },
    animation: {
      genreIds: [movieGenres.animation],
      filterAndSortOptions: {
        sort_by: "popularity.desc",
        with_keywords: `${keywords.animation}`,
      },
    },
    comedy: {
      genreIds: [movieGenres.comedy],
      filterAndSortOptions: {
        sort_by: "popularity.desc",
        with_keywords: `${keywords.comedy}`,
      },
    },
    crime: {
      genreIds: [movieGenres.crime],
      filterAndSortOptions: {
        sort_by: "popularity.desc",
        with_keywords: `${keywords.crime}`,
      },
    },
    documentary: {
      genreIds: [movieGenres.documentary],
      filterAndSortOptions: {
        sort_by: "popularity.desc",
        with_keywords: `${keywords.documentary}`,
      },
    },
    drama: {
      genreIds: [movieGenres.drama],
      filterAndSortOptions: {
        sort_by: "popularity.desc",
        with_keywords: `${keywords.drama}`,
      },
    },
    family: {
      genreIds: [movieGenres.family],
      filterAndSortOptions: {
        sort_by: "popularity.desc",
        with_keywords: `${keywords.family}`,
      },
    },
    fantasy: {
      genreIds: [movieGenres.fantasy],
      filterAndSortOptions: {
        sort_by: "popularity.desc",
        with_keywords: `${keywords.fantasy}`,
      },
    },
    history: {
      genreIds: [movieGenres.history],
      filterAndSortOptions: {
        sort_by: "popularity.desc",
        with_keywords: `${keywords.history}`,
      },
    },
    horror: {
      genreIds: [movieGenres.horror],
      filterAndSortOptions: {
        sort_by: "popularity.desc",
        with_keywords: `${keywords.horror}`,
      },
    },
    music: {
      genreIds: [movieGenres.music],
      filterAndSortOptions: {
        sort_by: "popularity.desc",
        with_keywords: `${keywords.music}`,
      },
    },
    mystery: {
      genreIds: [movieGenres.mystery],
      filterAndSortOptions: {
        sort_by: "popularity.desc",
        with_keywords: `${keywords.mystery}`,
      },
    },
    romance: {
      genreIds: [movieGenres.romance],
      filterAndSortOptions: {
        sort_by: "popularity.desc",
        with_keywords: `${keywords.romance}`,
      },
    },
    sciFi: {
      genreIds: [movieGenres.sciFi],
      filterAndSortOptions: {
        sort_by: "popularity.desc",
        with_keywords: `${keywords.sciFi}`,
      },
    },
    standUpComedy: {
      genreIds: [],
      filterAndSortOptions: {
        sort_by: "popularity.desc",
        with_keywords: `${keywords.standUpComedy}`,
      },
    },

    tvMovie: {
      genreIds: [movieGenres.tvMovie],
      filterAndSortOptions: {
        sort_by: "popularity.desc",
      },
    },
    thriller: {
      genreIds: [movieGenres.thriller],
      filterAndSortOptions: {
        sort_by: "popularity.desc",
        with_keywords: `${keywords.thriller}`,
      },
    },
    western: {
      genreIds: [movieGenres.western],
      filterAndSortOptions: {
        sort_by: "popularity.desc",
        with_keywords: `${keywords.western}`,
      },
    },
  },

  tvSeries: {
    actionAdventure: {
      genreIds: [tvSeriesGenres.actionAdventure],
      filterAndSortOptions: {
        sort_by: `popularity.desc`,
        with_keywords: `${keywords.action},${keywords.adventure}`,
      },
    },
    animation: {
      genreIds: [tvSeriesGenres.animation],
      filterAndSortOptions: {
        sort_by: `popularity.desc`,
        with_keywords: `${keywords.animation}`,
      },
    },

    comedy: {
      genreIds: [tvSeriesGenres.comedy],
      filterAndSortOptions: {
        sort_by: "popularity.desc",
        with_keywords: `${keywords.comedy}`,
      },
    },
    crime: {
      genreIds: [tvSeriesGenres.crime],
      filterAndSortOptions: {
        sort_by: "popularity.desc",
        with_keywords: `${keywords.crime}`,
      },
    },
    documentary: {
      genreIds: [tvSeriesGenres.documentary],
      filterAndSortOptions: {
        sort_by: "popularity.desc",
        with_keywords: `${keywords.documentary}`,
      },
    },
    drama: {
      genreIds: [tvSeriesGenres.drama],
      filterAndSortOptions: {
        sort_by: "popularity.desc",
        with_keywords: `${keywords.drama}`,
      },
    },
    family: {
      genreIds: [tvSeriesGenres.family],
      filterAndSortOptions: {
        sort_by: "popularity.desc",
        with_keywords: `${keywords.family}`,
      },
    },
    kids: {
      genreIds: [tvSeriesGenres.kids],
      filterAndSortOptions: {
        sort_by: "popularity.desc",
        with_keywords: `${keywords.kids}`,
      },
    },
    mystery: {
      genreIds: [tvSeriesGenres.mystery],
      filterAndSortOptions: {
        sort_by: "popularity.desc",
        with_keywords: `${keywords.mystery}`,
      },
    },

    reality: {
      genreIds: [tvSeriesGenres.reality],
      filterAndSortOptions: {
        sort_by: "popularity.desc",
      },
    },
    sciFiFantasy: {
      genreIds: [tvSeriesGenres.sciFiFantasy],
      filterAndSortOptions: {
        sort_by: "popularity.desc",
        with_keywords: `${keywords.sciFi}`,
      },
    },
    soap: {
      genreIds: [tvSeriesGenres.soap],
      filterAndSortOptions: {
        sort_by: "popularity.desc",
      },
    },

    western: {
      genreIds: [tvSeriesGenres.western],
      filterAndSortOptions: {
        sort_by: "popularity.desc",
        with_keywords: `${keywords.western}`,
      },
    },
  },
};
