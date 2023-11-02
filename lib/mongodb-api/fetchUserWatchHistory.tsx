import { connectToDatabase } from "../mongodb";
import User from "@/models/user";

// interface import
import { WatchHistoryItem } from "@/models/user";

export async function fetchUserWatchHistory(
  userEmail: string,
): Promise<WatchHistoryItem[] | []> {
  try {
    // Connect to the database
    await connectToDatabase();

    // Query the user
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      throw new Error("User not found");
    }

    return user.watchHistory;
  } catch (error) {
    console.error("Error fetching users watch history", error);
    throw error;
  }
}
