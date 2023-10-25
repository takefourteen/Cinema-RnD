import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/user";

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  try {
    const { itemId, itemType } = (await req.json()) as {
      itemId: string;
      itemType: "movie" | "tv";
    };

    // Ensure the user is authenticated and has the necessary role

    // Connect to the database
    await connectToDatabase();

    // Find the user
    const user = await User.findOne({
      /* your user identification criteria */
    });

    // Check if the item is already in the user's library to prevent duplicates
    const existingItem = user.library.find(
      (item) => item.id === itemId && item.type === itemType,
    );
    if (existingItem) {
      return NextResponse.json(
        { error: "Item already in the library" },
        { status: 422 },
      );
    }

    // Add the new item to the user's library
    user.library.push({ id: itemId, type: itemType });

    // Save the updated user document
    await user.save();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error adding item to library:", error);
    return NextResponse.json(
      { error: "Error adding item to library" },
      { status: 500 },
    );
  }
};
