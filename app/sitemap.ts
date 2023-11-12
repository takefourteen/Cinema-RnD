import { MetadataRoute } from "next";

import { fetchTrendingMovies } from "@/lib/tmdb-api/trending";
import { fetchTrendingTVSeries } from "@/lib/tmdb-api/trending";
import { slugify } from "@/helpers/slugify";

export default async function sitemap() {
  const baseUrl: string = "https://cozycinema.vercel.app";

  const [trendingMovies, trendingTVSeries] = await Promise.all([
    fetchTrendingMovies(),
    fetchTrendingTVSeries(),
  ]);

  const moviesRoutes: MetadataRoute.Sitemap = trendingMovies.map((movie) => ({
    url: `${baseUrl}/movie/${slugify(movie.original_title)}-${movie.id}`,
    priority: 0.8,
    lastModified: new Date().toISOString(),
  }));

  const tvSeriesRoutes: MetadataRoute.Sitemap = trendingTVSeries.map(
    (tvSeries) => ({
      url: `${baseUrl}/tv/${slugify(tvSeries.original_name)}-${tvSeries.id}`,
      priority: 0.8,
      lastModified: new Date().toISOString(),
    }),
  );

  return [
    {
      url: baseUrl,
      priority: 1,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${baseUrl}/explore-movies`,
      priority: 0.9,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${baseUrl}/explore-tv-series`,
      priority: 0.9,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${baseUrl}/library`,
      priority: 0.9,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${baseUrl}/login`,
      priority: 0.9,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${baseUrl}/sign-up`,
      lastModified: new Date().toISOString(),
    },
    ...moviesRoutes,
    ...tvSeriesRoutes,
  ];
}
