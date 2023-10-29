import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/user";

interface LibraryItem {
    id: string;
    type: "movie" | "tv";
}

export type CheckForItemLibraryResponse = {
    message: string;
    items: LibraryItem[];
};

export const GET = async (req: NextRequest): Promise<NextResponse> => {
    try {
        // Ensure the user is authenticated and has the necessary role
        const session = await getServerSession(authOptions);

        // if there is no session, return an error message and status code letting the user know they are not authenticated
        if (!session?.user) {
            const response: CheckForItemLibraryResponse = {
                message: "Not authenticated",
                items: [],
            };
            return NextResponse.json(response, { status: 401 });
        }

        // Connect to the database
        await connectToDatabase();

        // Find the user using their email address
        const user = await User.findOne({ email: session.user?.email });

        const items = user.library;

        if (items.length > 0) {
            const response: CheckForItemLibraryResponse = {
                message: `Found ${items.length} items in your library`,
                items,
            };
            return NextResponse.json(response, { status: 200 });
        }

        const response: CheckForItemLibraryResponse = {
            message: "No items found in your library",
            items: [],
        };
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error("Error checking items in library:", error);
        const response: CheckForItemLibraryResponse = {
            message: "Error checking items in library",
            items: [],
        };
        return NextResponse.json(response, { status: 500 });
    }
};