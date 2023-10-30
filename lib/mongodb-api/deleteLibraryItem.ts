"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../mongodb";
import User from "@/models/user";

// Define the shape of a library item
interface LibraryItem {
  id: string;
  type: string;
}

type FunctionParams = {
  mediaId: string;
  mediaType: "movie" | "tv";
  userEmail: string;
};

export async function deleteLibraryItem(data: FunctionParams): Promise<void> {
  // Destructure the data object
  const { userEmail, mediaId, mediaType } = data;

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
    (item: LibraryItem) => item.id === mediaId && item.type === mediaType,
  );

  if (!existingItem) {
    // Handle the case where the item is not found in the library
    throw new Error("Item not found in library");
  }

  // Remove the item from the user's library
  user.library = user.library.filter(
    (item: LibraryItem) => !(item.id === mediaId && item.type === mediaType),
  );

  // Save the updated user object
  await user.save();

  // Revalidate the user's library page
  const params = new URLSearchParams({ tab: mediaType as string });
  console.log(`/library?${params.toString()}`);
  revalidatePath(`/library?${params.toString()}`);
}
