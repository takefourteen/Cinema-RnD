// interface import
import { WatchHistoryItem } from "@/models/user";

import { fetchUserWatchHistory } from "@/lib/mongodb-api/fetchUserWatchHistory";

import DataFetchingMediaCard from "@/components/cards/DataFetchingMediaCard";
import WatchHistoryMediaCard from "@/components/cards/WatchHistoryMediaCard";

interface GroupedWatchHistory {
  [date: string]: WatchHistoryItem[];
}

type Props = {
  userEmail: string;
};

const WatchHistory = async ({ userEmail }: Props) => {
  const watchHistory: WatchHistoryItem[] | [] =
    await fetchUserWatchHistory(userEmail);

  // Group the watch history by date
  const groupedWatchHistory: GroupedWatchHistory = {};
  watchHistory.forEach((item) => {
    const date = new Date(item.watchedAt).toDateString();
    if (!groupedWatchHistory[date]) {
      groupedWatchHistory[date] = [];
    }
    groupedWatchHistory[date].push(item);
  });

  return (
    <div>
      <h1>Watch History</h1>
      <ul>
        {Object.keys(groupedWatchHistory).map((date) => (
          <li key={date}>
            <h2>{date}</h2>
            <ul className=" grid gap-x-4  gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {groupedWatchHistory[date].map((media, index) => (
                <WatchHistoryMediaCard
                  key={media.id}
                  mediaId={media.id.toString()}
                  mediaTitle={media.title}
                  seasonNumber={media.season}
                  episodeNumber={media.episode}
                  mediaType={media.type}
                  loaderType="skeleton"
                  priority={index < 5 ? true : false}
                />
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WatchHistory;
