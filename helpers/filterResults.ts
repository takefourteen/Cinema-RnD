export function filterResultsByLanguage<
  T extends { original_language: string },
>(results: T[], language: string = "en") {
  return results.filter((result) => result.original_language === language);
}
