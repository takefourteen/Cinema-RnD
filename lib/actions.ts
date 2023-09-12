"use server";

import { searchAll, sortResults, filterResultsByLanguage } from "@/lib/tmdbApi";

export async function fetchSearchResults(term: string, page: number = 1) {
  const results = await searchAll(term, page);
  const sortedResults = sortResults(results, "popularity");
  const filteredResults = filterResultsByLanguage(sortedResults);
  return filteredResults;
}
