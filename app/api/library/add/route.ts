import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/user";

interface Media {
  mediaId: string;
  mediaType: "movie" | "tv";
  mediaTitle: string;
}

interface LibraryItem {
  id: string;
  type: "movie" | "tv";
  title: string;
}

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  try {
    const { mediaId, mediaType, mediaTitle } = await req.json() as Media;

    // Ensure the user is authenticated and has the necessary role
    const session = await getServerSession(authOptions);

    // if there is no session, return an error message and status code letting the user know they are not authenticated
    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Connect to the database
    await connectToDatabase();

    // Find the user using their email address
    const user = await User.findOne({ email: session.user?.email });

    // Check if the item is already in the user's library to prevent duplicates
    const existingItem = user.library.find(
      (item: LibraryItem) => item.id === mediaId && item.type === mediaType,
    );
    if (existingItem) {
      return NextResponse.json({ error: "Item already in the library" }, { status: 422 });
    }

    // Add the new item to the user's library
    const result = await User.findOneAndUpdate(
      { email: session.user?.email },
      { $push: { library: { id: mediaId, type: mediaType, name: mediaTitle } } },
      { new: true },
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error adding item to library:", error);
    return NextResponse.json({ error: "Error adding item to library" }, { status: 500 });
  }
};