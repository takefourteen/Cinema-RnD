export function sortResultsByPopularity<T extends { popularity: number }>(
  results: T[],
) {
  return results.sort((a, b) => b.popularity - a.popularity);
}
