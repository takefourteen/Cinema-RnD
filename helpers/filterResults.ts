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

// filter out runtime that is zero
export function filterOutZeroRuntimeResults<T>(results: T[]): T[] {
  return results.filter((result) => (result as any).runtime !== 0);
}

export function filterResults<T>(results: T[], language: string = "en"): T[] {
  let filteredResults = filterResultsByLanguage(results, language);
  filteredResults = filterOutZeroRatedResults(filteredResults);
  return filteredResults;
}