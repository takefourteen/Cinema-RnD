import { Suspense } from "react";

// interface import
import { WatchHistoryItem } from "@/models/user";

import { fetchUserWatchHistory } from "@/lib/mongodb-api/fetchUserWatchHistory";

import WatchHistoryMediaCard from "@/components/cards/WatchHistoryMediaCard";
import CardSkeleton from "@/components/skeletons/CardSkeleton";
import AnimatedStringLoader from "@/components/skeletons/AnimatedStringLoader";

interface GroupedWatchHistory {
  [date: string]: WatchHistoryItem[];
}

type Props = {
  userEmail: string;
};

// Helper function to format date
const formatDate = (dateString: string) => {
  const today = new Date();
  const yesterday = new Date(today);
  const twoDaysAgo = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

  const date = new Date(dateString);

  if (date.toDateString() === today.toDateString()) {
    return "Today";
  } else if (date.toDateString() === yesterday.toDateString()) {
    return "Yesterday";
  } else if (date.toDateString() === twoDaysAgo.toDateString()) {
    return "Two Days Ago";
  } else {
    return dateString;
  }
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
      <h1 className="text-4xl font-bold">Watch History</h1>
      <ul>
        {Object.keys(groupedWatchHistory).map((date) => (
          <li key={date}>
            <h2 className="pb-2 pt-6 text-2xl font-semibold">
              {formatDate(date)}
            </h2>
            <ul className=" grid  gap-x-4 gap-y-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {groupedWatchHistory[date].map((media, index) => (
                <li className={`relative h-auto flex-1`} key={media.id}>
                  <Suspense
                    fallback={
                      <div className=" grid flex-1 grid-cols-2 gap-x-2 sm:flex sm:flex-col sm:gap-x-0 sm:gap-y-2">
                        <div className="aspect-video">
                          <CardSkeleton rows={0} />
                        </div>

                        <span className="flex h-fit">
                          <AnimatedStringLoader loadingString="..." />
                        </span>
                      </div>
                    }
                  >
                    <WatchHistoryMediaCard
                      mediaId={media.id.toString()}
                      mediaTitle={media.title}
                      seasonNumber={media.season}
                      episodeNumber={media.episode}
                      mediaType={media.type}
                      loaderType="skeleton"
                      priority={index < 5 ? true : false}
                    />
                  </Suspense>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WatchHistory;
