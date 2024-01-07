"use server";

import { revalidateTag } from "next/cache";
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
  mediaTitle: string;
  userEmail: string;
};

export async function addMediaToLibrary(data: FunctionParams): Promise<void> {
  // Destructure the data object
  const { userEmail, mediaId, mediaType, mediaTitle } = data;

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

  if (existingItem) {
    // Handle the case where the item is already in the library
    throw new Error("Item already in library");
  }

  // Add the item to the user's library in the first position
  await User.findOneAndUpdate(
    { email: userEmail },
    {
      $push: {
        library: {
          $each: [{ id: mediaId, type: mediaType, title: mediaTitle }],
          $position: 0,
        },
      },
    },
    { new: true },
  );

  // Revalidate the fetch functions tagged with tv-details if mediaType is tv
  if (mediaType === "tv") {
    revalidateTag("tv-details");
  }

  // Revalidate the fetch functions tagged with movie-details if mediaType is movie
  if (mediaType === "movie") {
    revalidateTag("movie-details");
  }
}
