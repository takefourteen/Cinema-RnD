import { connectToDatabase } from "../mongodb";
import User from "@/models/user";

// interface import
import { WatchHistoryItem } from "@/models/user";

/**
 * Fetches a user's watch history from the database.
 *
 * @param userEmail - The email of the user whose watch history is to be fetched.
 * @param numItems - The number of items to fetch from the user's watch history.
 *                   If not provided or if it's larger than the number of items in the watch history, all items will be returned.
 * @param page - The page number for pagination. If not provided, defaults to 1.
 * @param fetchAll - If true, fetch all items without pagination. Defaults to false.
 * @returns A promise that resolves to an array of WatchHistoryItem objects representing the user's watch history.
 *          If the user does not exist, the function will throw an error.
 * @throws Will throw an error if the connection to the database fails or if the user does not exist.
 */
export async function fetchUserWatchHistory(
  userEmail: string,
  numItems: number = 10,
  page: number = 1,
  fetchAll: boolean = false,
): Promise<WatchHistoryItem[] | []> {
  try {
    // Connect to the database
    await connectToDatabase();

    // Query the user with pagination and projection
    const query = { email: userEmail };
    const projection = fetchAll
      ? {}
      : { watchHistory: { $slice: [(page - 1) * numItems, numItems] } };

    const user = await User.findOne(query, projection);

    if (!user) {
      throw new Error("User not found");
    }

    return user.watchHistory || [];
  } catch (error) {
    console.error("Error fetching users watch history", error);
    throw error;
  }
}
