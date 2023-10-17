import {keywords} from "@/constants/keywords"

interface CategoryList {
    [key: string]: {
      [key: string]: {
        genreIds: number[];
        filterAndSortOptions: string;
      };
    };
  }
  
 export const categories: CategoryList = {
    movies: {
      actionAdventure: {
        genreIds: [28, 12],
        filterAndSortOptions: `&sort_by=popularity.desc`,
      },
      anime: {
        genreIds: [16],
        filterAndSortOptions: `&sort_by=popularity.desc`,
      },
      childrenFamily: {
        genreIds: [10751],
        filterAndSortOptions: `&sort_by=popularity.desc`,
      },
      classic: {
        genreIds: [],
        filterAndSortOptions: `&sort_by=popularity.desc`,
      },
      // You might need a different approach for this, as "classic" isn't a standard genre tag
      comedies: {
        genreIds: [35],
        filterAndSortOptions: `&sort_by=popularity.desc`,
      },
      documentaries: {
        genreIds: [99],
        filterAndSortOptions: `&sort_by=popularity.desc`,
      },
      dramas: {
        genreIds: [18],
        filterAndSortOptions: `&sort_by=popularity.desc`,
      },
      topRated: {
        genreIds: [],
        filterAndSortOptions:
          "&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200",
      },
    },
    tvSeries: {
      actionAdventure: {
        genreIds: [10759, 10762],
        filterAndSortOptions: `&sort_by=popularity.desc`,
      },
      anime: {
        genreIds: [16],
        filterAndSortOptions: `&sort_by=popularity.desc`,
      },
      childrenFamily: {
        genreIds: [10751],
        filterAndSortOptions: `&sort_by=popularity.desc`,
      },
      classic: {
        genreIds: [],
        filterAndSortOptions: `&sort_by=popularity.desc`,
      },
      comedies: {
        genreIds: [35],
        filterAndSortOptions: `&sort_by=popularity.desc`,
      },
      documentaries: {
        genreIds: [99],
        filterAndSortOptions: `&sort_by=popularity.desc`,
      },
      dramas: {
        genreIds: [18],
        filterAndSortOptions: `&sort_by=popularity.desc`,
      },
      topRated: {
        genreIds: [],
        filterAndSortOptions: "&sort_by=vote_average.desc&vote_count.gte=200",
      },
    },
  };