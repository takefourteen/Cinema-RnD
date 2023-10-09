export function filterResultsByLanguage<T>(
  results: T[],
  language: string = "en",
): T[] {
  return results.filter(
    (result) => (result as any).original_language === language,
  );
}
