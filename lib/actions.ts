"use server";

import { searchAll, filterResultsByLanguage } from "@/lib/tmdb-api/search";

export async function fetchSearchResults(term: string, page: number = 1) {
  const results = await searchAll(term, page);
  const filteredResults = filterResultsByLanguage(results as any, "en");
  return filteredResults;
}
