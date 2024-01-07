"use server";

import { connectToDatabase } from "../mongodb";
import User from "@/models/user";

// type import
import type { WatchHistoryItem } from "@/models/user";

type FunctionParams = {
  id: string;
  userEmail: string;
};

export async function fetchWatchedTVSeriesEpisodes(
  data: FunctionParams,
): Promise<WatchHistoryItem[]> {
  // Destructure the data object
  const { userEmail, id } = data;

  // Connect to the database
  await connectToDatabase(); // Implement your database connection logic here

  // Find the user using their email address
  const user = await User.findOne({ email: userEmail });

  if (!user) {
    // Handle the case where the user is not found
    throw new Error("User not found");
  }

  // Filter the user's watch history to get the TV series episodes with the same id
  const watchedEpisodes = user.watchHistory.filter((item: WatchHistoryItem) => {
    return (
      item.type === "tv" &&
      item.id === id
    );
  });

  return watchedEpisodes;
}