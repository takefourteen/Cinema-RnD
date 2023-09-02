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
  // get body, which contains user info
  const body = (await req.json()) as NewUserRequest;

  // connect to database
  await connectToDatabase();

  // check if user exists
  const oldUser = await User.findOne({ email: body.email });

  if (oldUser) {
    return NextResponse.json({ error: "User already exists" }, { status: 422 });
  }

  // create user
  const user = await User.create({ ...body });

  return NextResponse.json({
    user: {
      id: user._id.toString(),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    },
  });
};
