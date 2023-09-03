import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/user";

interface NewUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface NewUserResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

type NewResponse = NextResponse<{
  user?: NewUserResponse;
  error?: string;
}>;

export const POST = async (req: Request): Promise<NewResponse> => {
  try {
    // Get user data from the request body
    const body = (await req.json()) as NewUserRequest;

    // Connect to the database
    await connectToDatabase();

    // Check if a user with the same email already exists
    const existingUser = await User.findOne({ email: body.email });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 422 },
      );
    }

    // Create a new user
    const newUser = await User.create({ ...body, role: "user" });

    // Return the user details
    return NextResponse.json({
      user: {
        id: newUser._id.toString(),
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: "Error creating user" }, { status: 500 });
  }
};
