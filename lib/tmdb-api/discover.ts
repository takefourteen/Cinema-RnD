const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

import { filterResultsByLanguage } from "@/helpers/filterResults";
import { getVideoPlayerUrl } from "@/helpers/getVideoPlayerUrl";
import { filterMediaWithVideoUrl } from "@/helpers/filterMediaWithVideoUrl";

const baseMovieURL = 'https://api.themoviedb.org/3/discover/movie';
const baseTVSeriesURL = 'https://api.themoviedb.org/3/discover/tv';

interface GenreList {
    [key: string]: {
      [key: string]: number[];
    };
  }
  
  const genres: GenreList = {
    movies: {
      latest: [],
      actionAdventure: [28, 12],
      anime: [16],
      childrenFamily: [10751],
      classic: [], // You might need a different approach for this, as "classic" isn't a standard genre tag
      comedies: [35],
      documentaries: [99],
      dramas: [18],
    },
    tvSeries: {
      latest: [],
      actionAdventure: [10759],
      anime: [16],
      childrenFamily: [10751],
      classic: [], // You might need a different approach for this, as "classic" isn't a standard genre tag
      comedies: [35],
      documentaries: [99],
      dramas: [18],
    },
  };
  
  
  const generateAPIUrl = (category: string, type: string): string => {
    const genreIds = genres[type][category].join(',');
    const baseUrl = type === 'movies' ? baseMovieURL : baseTVSeriesURL;
    return `${baseUrl}?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genreIds}`;
  };




  
  
  /* Example usage
  const latestMoviesUrl = generateAPIUrl('latest', 'movies');
  const latestTVSeriesUrl = generateAPIUrl('latest', 'tvSeries');
  const actionAdventureMoviesUrl = generateAPIUrl('actionAdventure', 'movies');
  const actionAdventureTVSeriesUrl = generateAPIUrl('actionAdventure', 'tvSeries');
  */

  