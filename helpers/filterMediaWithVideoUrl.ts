import { getVideoPlayerUrl } from "./getVideoPlayerUrl";

export async function filterMediaWithVideoUrl<T>(
  results: T[],
  season: number = 0,
  episode: number = 0,
): Promise<T[]> {
  const resultsWithVideoUrl: T[] = [];

  for (const result of results) {
    // Modify this part according to your specific structure and properties
    const id = (result as any).id;

    const isTmdb: number = 1;

    const videoUrl = await getVideoPlayerUrl(
      id.toString(),
      isTmdb,
      season,
      episode,
    );

    if (videoUrl) {
      resultsWithVideoUrl.push(result);
    }
  }

  return resultsWithVideoUrl;
}
