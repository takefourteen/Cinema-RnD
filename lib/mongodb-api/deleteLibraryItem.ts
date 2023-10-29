import { connectToDatabase } from "../mongodb";
import User from "@/models/user";

type Response = {
  message: string;
};

type LibraryItem = {
  id: string;
  type: "movie" | "tv";
  title: string;
};

export default async function deleteLibraryItem(
  mediaId: string,
  mediaType: "movie" | "tv",
  userEmail: string
): Promise<Response> {
  try {
    // Connect to the database
    await connectToDatabase(); // Implement your database connection logic here

    // Find the user using their email address
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      // Handle the case where the user is not found
      throw new Error("User not found");
    }

    // Check if the item is already in the user's library to prevent duplicates
    const existingItem = user.library.find(
      (item: LibraryItem) => item.id === mediaId && item.type === mediaType
    );

    if (!existingItem) {
      // Handle the case where the item is not found in the library
      throw new Error("Item not found in library");
    }

    // Remove the item from the user's library
    user.library = user.library.filter(
      (item: LibraryItem) => !(item.id === mediaId && item.type === mediaType)
    );

    // Save the updated user object
    await user.save();

    return { message: "Item removed from the library" };
  } catch (error) {
    console.error("Error deleting item from the library:", error);
    // You can log the error and provide a more descriptive error message here
    throw error;
  }
}
