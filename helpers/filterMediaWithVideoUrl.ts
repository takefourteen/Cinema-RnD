import { getVideoPlayerUrl } from "./getVideoPlayerUrl";

export async function filterMediaWithVideoUrl<T>(
  results: T[],
): Promise<T[]> {
  const resultsWithVideoUrl: T[] = [];

  for (const result of results) {
    // Modify this part according to your specific structure and properties
    const id = (result as any).id;

    /* if the result is a movie, season and episode will be 0
      result is a movie if it has a property called original_title
    */
    const season: number = (result as any).original_title ? 0 : 1;
    const episode: number = (result as any).original_title ? 0 : 1;

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
