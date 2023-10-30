"use server";

import { revalidateTag } from "next/cache";
import { connectToDatabase } from "../mongodb";
import User from "@/models/user";

// interface import
import type { WatchHistoryItem } from "@/models/user";

type FunctionParams = WatchHistoryItem & {
  userEmail: string;
};

export async function addMediaToWatchHistory(
  data: FunctionParams,
): Promise<void> {
  // Destructure the data object
  const { userEmail, id, type, title, season, episode, watchedAt } = data;

  // Connect to the database
  await connectToDatabase(); // Implement your database connection logic here

  // Find the user using their email address
  const user = await User.findOne({ email: userEmail });

  if (!user) {
    // Handle the case where the user is not found
    throw new Error("User not found");
  }

  // Check if the item is already in the user's watch history to prevent duplicates
  const existingItem = user.watchHistory.find(
    (item: WatchHistoryItem) => item.id === id && item.type === type,
  );

  if (existingItem) {
    // Handle the case where the item is already in the watch history
    throw new Error("Item already in watch history");
  }

  // Add the item to the user's watch history in the first position
  await User.findOneAndUpdate(
    { email: userEmail },
    {
      $push: {
        watchHistory: {
          $each: [{ id, type, title, season, episode, watchedAt }],
          $position: 0,
        },
      },
    },
    { new: true },
  );

  // Revalidate the fetch functions tagged with tv-details if mediaType is tv
  if (type === "tv") {
    revalidateTag("tv-details");
  }

  // Revalidate the fetch functions tagged with movie-details if mediaType is movie
  if (type === "movie") {
    revalidateTag("movie-details");
  }
}
