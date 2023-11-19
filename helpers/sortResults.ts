// Define a generic type that extends an object with a popularity property
type ResultWithPopularity = { popularity: number };

// Modify the sortResultsByPopularity function to accept an array of objects with a popularity property
export function sortResultsByPopularity<T extends ResultWithPopularity>(
  results: T[]
): T[] {
  return results.sort((a, b) => b.popularity - a.popularity);
}

// ===============================================
type ResultWithVoteCount = { vote_count: number };

export const sortResultsByVoteCount = <T extends ResultWithVoteCount>(
  results: T[],
) => results.sort((a, b) => b.vote_count - a.vote_count);