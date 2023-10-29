import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/user";
import { revalidatePath } from "next/cache";

interface Request {
  mediaId: string;
  mediaType: "movie" | "tv";
  mediaTitle: string;
  requestPath: string;
}

interface LibraryItem {
  id: string;
  type: "movie" | "tv";
  title: string;
}

interface LibraryResponse {
  message: string;
  library?: LibraryItem[];
}

interface LibraryResponse {
  message: string;
  library?: LibraryItem[];
}

export const PUT = async (req: NextRequest): Promise<NextResponse> => {
  try {
    const { mediaId, mediaType, mediaTitle, requestPath } =
      (await req.json()) as Request;

    // Ensure the user is authenticated and has the necessary role
    const session = await getServerSession(authOptions);

    // if there is no session, return an error message and status code letting the user know they are not authenticated
    if (!session?.user) {
      const response: LibraryResponse = {
        message: "Not authenticated",
      };
      return NextResponse.json(response, { status: 401 });
    }

    // Connect to the database
    await connectToDatabase();

    // Find the user using their email address
    const user = await User.findOne({ email: session.user?.email });

    // Check if the item is already in the user's library to prevent duplicates
    const existingItem = user.library.find(
      (item: LibraryItem) => item.id == mediaId && item.type === mediaType,
    );

    if (existingItem) {
      const response: LibraryResponse = {
        message: `This ${
          mediaType === "movie" ? "movie" : "TV show"
        } is already in your library`,
      };
      return NextResponse.json(response, { status: 422 });
    }

    // Add the new item to the beginning of the user's library
    const result = await User.findOneAndUpdate(
      { email: session.user?.email },
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

    const response: LibraryResponse = {
      message: "Item added to library",
      library: result.library,
    };

    revalidatePath(requestPath);

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Error adding item to library:", error);
    const response: LibraryResponse = {
      message: "Error adding item to library",
    };
    return NextResponse.json(response, { status: 500 });
  }
};
