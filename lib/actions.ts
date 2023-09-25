"use server";

import { searchAll } from "@/lib/tmdb-api/search";
import { filterResultsByLanguage } from "./tmdb-api/filterResults";

export async function fetchSearchResults(term: string, page: number = 1) {
  const results = await searchAll(term, page);
  const filteredResults = filterResultsByLanguage(results as any, "en");
  return filteredResults;
}
