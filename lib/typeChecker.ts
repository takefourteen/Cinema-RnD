// Import your interfaces

// Type guard for PopularMovie
export function isPopularMovie(data: any): data is PopularMovie {
  return (
    typeof data === "object" &&
    "original_title" in data &&
    "poster_path" in data
  );
}

// Type guard for PopularTVShow
export function isPopularTVShow(data: any): data is PopularTVShow {
  return (
    typeof data === "object" &&
    "original_name" in data &&
    "poster_path" in data
  );
}

// Type guard for MovieDetails
export function isMovieDetails(data: any): data is MovieDetails {
  return (
    typeof data === "object" &&
    "original_title" in data &&
    "poster_path" in data
  );
}

// Type guard for TVShowDetails
export function isTVShowDetails(data: any): data is TVShowDetails {
  return (
    typeof data === "object" &&
    "original_name" in data &&
    "poster_path" in data
  );
}