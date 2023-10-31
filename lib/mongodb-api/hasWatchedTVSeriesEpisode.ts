"use server";

import { connectToDatabase } from "../mongodb";
import User from "@/models/user";

// interface import
import type { WatchHistoryItem } from "@/models/user";

type FunctionParams = {
  id: string;
  season: number;
  episode: number;
  userEmail: string;
};

export async function hasWatchedTVSeriesEpisode(
  data: FunctionParams,
): Promise<boolean> {
  // Destructure the data object
  const { userEmail, id, season, episode } = data;

  // Connect to the database
  await connectToDatabase(); // Implement your database connection logic here

  // Find the user using their email address
  const user = await User.findOne({ email: userEmail });

  if (!user) {
    // Handle the case where the user is not found
    throw new Error("User not found");
  }

  // Check if the TV series episode is already in the user's watch history
  const hasWatched = user.watchHistory.some((item: WatchHistoryItem) => {
    return (
      item.type === "tv" &&
      item.id === id &&
      item.season === season &&
      item.episode === episode
    );
  });

  return hasWatched;
}
