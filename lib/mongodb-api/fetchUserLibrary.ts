import { connectToDatabase } from "../mongodb";
import User from "@/models/user";

interface LibraryItem {
    id: string;
    type: "movie" | "tv";
    title: string;
  }

  export async function fetchUserLibrary(
    userEmail: string
  ): Promise<LibraryItem[]> {
    try {
      // Connect to the database
      await connectToDatabase();
  
      // Find the user using their email address
      const user = await User.findOne({ email: userEmail });
  
      if (!user) {
        throw new Error("User not found");
      }
  
      return user.library; // Return the user's library
    } catch (error) {
      console.error("Error fetching user library:", error);
      throw error; // You can handle or log the error as needed
    }
  }