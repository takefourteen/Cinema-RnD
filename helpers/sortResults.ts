export const sortResultsByPopularity = <T extends { popularity: number }>(
  results: T[],
) => results.sort((a, b) => b.popularity - a.popularity);

export const sortResultsByVoteCount = <T extends { vote_count: number }>(
  results: T[],
) => results.sort((a, b) => b.vote_count - a.vote_count);