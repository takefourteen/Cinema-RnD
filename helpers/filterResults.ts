export function filterResultsByLanguage<T>(
  results: T[],
  language: string = "en",
): T[] {
  return results.filter(
    (result) => (result as any).original_language === language,
  );
}

// filter out zero or null ratings
export function filterOutZeroRatedResults<T>(results: T[]): T[] {
  return results.filter((result) => (result as any).vote_average !== 0);
}