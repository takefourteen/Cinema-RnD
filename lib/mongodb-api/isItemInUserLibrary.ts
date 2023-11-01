"use server"

import { connectToDatabase } from "../mongodb";
import User from "@/models/user";

interface LibraryItem {
    id: string;
    type: "movie" | "tv";
    title: string;
  }

export async function isItemInUserLibrary(
    userEmail: string,
    mediaId: string,
    mediaType: "movie" | "tv"
  ): Promise<boolean> {
    try {
      // Connect to the database
      await connectToDatabase(); // Implement your database connection logic here
  
      // Find the user using their email address
      const user = await User.findOne({ email: userEmail });
  
      if (!user) {
        throw new Error("User not found");
      }
  
      // Check if the item is already in the user's library to prevent duplicates
      const existingItem = user.library.find(
        (item: LibraryItem) => item.id === mediaId && item.type === mediaType
      );
  
      return !!existingItem; // Return true if the item exists, false otherwise
    } catch (error) {
      console.error("Error checking item in library:", error);
      throw error; // You can handle or log the error as needed
    }
  }
  