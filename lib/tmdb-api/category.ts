interface Genres {
    [key: string]: {
      [key: string]: number[];
    };
  }
  
  const genres: Genres = {
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
  
  const baseMovieURL = 'https://api.themoviedb.org/3/discover/movie';
  const baseTVSeriesURL = 'https://api.themoviedb.org/3/discover/tv';
  
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

  
//   console.log('Latest Movies URL:', latestMoviesUrl);
//   console.log('Latest TV Series URL:', latestTVSeriesUrl);
//   console.log('Action & Adventure Movies URL:', actionAdventureMoviesUrl);
//   console.log('Action & Adventure TV Series URL:', actionAdventureTVSeriesUrl);
  