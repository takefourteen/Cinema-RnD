"use server";

import {
  searchAll,
  sortResults,
  filterResultsByLanguage,
} from "@/lib/tmdb-api/search";

export async function fetchSearchResults(term: string, page: number = 1) {
  const results = await searchAll(term, page);
  // const sortedResults = sortResults(results, "popularity");
  const filteredResults = filterResultsByLanguage(results as any, "en");
  return filteredResults;
}
