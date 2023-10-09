import { getVideoPlayerUrl } from "./getVideoPlayerUrl";

export async function filterMediaWithVideoUrl<T>(results: T[]): Promise<T[]> {
    const resultsWithVideoUrl: T[] = [];
  
    for (const result of results) {
      // Modify this part according to your specific structure and properties
      const id = (result as any).id;
      const isTmdb = (result as any).isTmdb;
      const season = (result as any).season;
      const episode = (result as any).episode;
  
      const videoUrl = await getVideoPlayerUrl(id.toString(), isTmdb, season, episode);
  
      if (videoUrl) {
        resultsWithVideoUrl.push(result);
      }
    }
  
    return resultsWithVideoUrl;
  }
  